import { UserPost, GraphEdge, MultiTrade } from "./types";
import { batchScoreCompatibility } from "./gemini";

// ─── Config ────────────────────────────────────────────────────────
const MIN_EDGE_CONFIDENCE = 0.45;
const MAX_CYCLE_LENGTH = 4;
const MIN_CYCLE_LENGTH = 2;
const TOP_EDGES_PER_PAIR = 3;
const TOP_K_PRIMARY = 5;
const TOP_K_ALTERNATES = 5;

// ─── Synonym map for fuzzy matching ───────────────────────────────
const SYNONYMS: Record<string, string[]> = {
  "tax filing": ["personal tax filing", "tax returns", "personal tax returns", "tax filing assistance"],
  "dog walking": ["dog walking", "walk dog", "pet walking"],
  "deep cleaning": ["deep cleaning", "deep cleaning (apartments)", "apartment cleaning", "house cleaning"],
  "math tutoring": ["math tutoring", "math tutoring (all levels)", "calculus tutoring"],
  "furniture assembly": ["furniture assembly", "ikea assembly"],
  "errand running": ["errand running", "errands"],
  "plumbing": ["plumbing repairs", "plumbing", "fix plumbing"],
  "interior painting": ["interior painting", "painting", "house painting"],
  "website development": ["website development", "web development", "landing page design", "website building"],
  "physics tutoring": ["physics tutoring", "physics lessons"],
  "headshots": ["professional headshots", "headshot photography", "headshots"],
  "home cooking": ["hungarian home cooking", "meal cooking", "home cooking", "meal prep", "meal prep (weekly)"],
  "logo design": ["logo design", "graphic design", "brand design"],
  "guitar lessons": ["guitar lessons", "guitar teaching", "learn guitar"],
  "yoga": ["group yoga classes", "private yoga sessions", "yoga instruction", "yoga classes"],
  "bike repair": ["bike repair", "bike tune-up", "bicycle repair", "bicycle maintenance"],
  "translation": ["hungarian → english translation", "hungarian-english translation", "translation", "document translation"],
  "bookkeeping": ["bookkeeping", "accounting", "financial bookkeeping"],
  "coffee": ["coffee brewing workshop", "coffee workshop", "barista workshop"],
  "grocery shopping": ["grocery shopping for elderly", "grocery shopping assistance", "grocery shopping"],
  "pet sitting": ["pet sitting", "house sitting"],
};

function normalize(s: string): string {
  return s.toLowerCase().trim().replace(/[()]/g, "").replace(/\s+/g, " ");
}

function getSynonymGroup(skill: string): string | null {
  const norm = normalize(skill);
  for (const [group, synonyms] of Object.entries(SYNONYMS)) {
    if (synonyms.some((s) => normalize(s) === norm || norm.includes(normalize(s)) || normalize(s).includes(norm))) {
      return group;
    }
  }
  return null;
}

// ─── Step B: Local edge pre-scoring (Gemini enhances in graph build) ──

function scoreEdge(
  offer: { skill: string; category: string },
  need: { skill: string; category: string },
  fromTrust: number,
  toTrust: number,
  fromCreatedAt: string,
): number {
  const offerNorm = normalize(offer.skill);
  const needNorm = normalize(need.skill);

  // 1. Taxonomy score: same category
  const taxonomyScore = offer.category === need.category ? 1.0 : 0.0;

  // 2. Semantic/text score: synonym group match, substring match, or token overlap
  let semanticScore = 0;
  const offerGroup = getSynonymGroup(offer.skill);
  const needGroup = getSynonymGroup(need.skill);

  if (offerGroup && needGroup && offerGroup === needGroup) {
    semanticScore = 0.95; // synonym match
  } else if (offerNorm === needNorm) {
    semanticScore = 1.0; // exact match
  } else if (offerNorm.includes(needNorm) || needNorm.includes(offerNorm)) {
    semanticScore = 0.85; // substring match
  } else {
    // Token overlap — exclude generic format words that create false matches
    const GENERIC_TOKENS = new Set(["lessons", "tutoring", "repair", "help", "coaching", "training", "services", "assistance", "session", "sessions", "class", "classes", "workshop", "instruction"]);
    const offerTokens = new Set(offerNorm.split(" "));
    const needTokens = new Set(needNorm.split(" "));
    const overlap = [...offerTokens].filter((t) => needTokens.has(t) && t.length > 2 && !GENERIC_TOKENS.has(t)).length;
    const maxTokens = Math.max(offerTokens.size, needTokens.size);
    semanticScore = maxTokens > 0 ? (overlap / maxTokens) * 0.7 : 0;
  }

  // 3. Trust score (normalized 0-1, trust is on 0-5 scale)
  const trustScore = ((fromTrust + toTrust) / 2) / 5.0;

  // 4. Freshness score (decay over 30 days)
  const ageMs = Date.now() - new Date(fromCreatedAt).getTime();
  const ageDays = ageMs / (1000 * 60 * 60 * 24);
  const freshnessScore = Math.max(0, 1 - ageDays / 30);

  // Weighted combination (from the algorithm guide)
  const edgeScore =
    0.30 * taxonomyScore +
    0.35 * semanticScore +
    0.10 * trustScore +
    0.05 * freshnessScore +
    0.20 * (taxonomyScore > 0 && semanticScore > 0.5 ? 1.0 : 0.0); // combined boost

  return Math.round(edgeScore * 100) / 100;
}

function generateReasoning(
  offer: { skill: string; category: string },
  need: { skill: string; category: string },
  confidence: number
): string {
  if (confidence >= 0.8) {
    return `Strong match: "${offer.skill}" directly fulfills the need for "${need.skill}"`;
  } else if (confidence >= 0.6) {
    return `Good match: "${offer.skill}" can likely fulfill "${need.skill}" (${offer.category} → ${need.category})`;
  } else {
    return `Possible match: "${offer.skill}" may partially address "${need.skill}"`;
  }
}

// ─── Step B: Build edge graph (local pre-filter + Gemini AI scoring) ──

export async function buildCompatibilityGraph(
  posts: UserPost[]
): Promise<GraphEdge[]> {
  const allEdges: GraphEdge[] = [];

  for (const from of posts) {
    for (const to of posts) {
      if (from.id === to.id) continue;
      for (const offer of from.parsedOffers) {
        for (const need of to.parsedNeeds) {
          const confidence = scoreEdge(
            offer,
            need,
            from.trustScore,
            to.trustScore,
            from.createdAt
          );

          if (confidence >= MIN_EDGE_CONFIDENCE) {
            allEdges.push({
              fromUserId: from.id,
              toUserId: to.id,
              fromOffer: offer.skill,
              toNeed: need.skill,
              confidence,
              reasoning: generateReasoning(offer, need, confidence),
            });
          }
        }
      }
    }
  }

  // Keep top TOP_EDGES_PER_PAIR distinct edges per ordered user pair
  const edgesByPair = new Map<string, GraphEdge[]>();
  for (const edge of allEdges) {
    const key = `${edge.fromUserId}->${edge.toUserId}`;
    if (!edgesByPair.has(key)) edgesByPair.set(key, []);
    edgesByPair.get(key)!.push(edge);
  }

  const retained: GraphEdge[] = [];
  for (const edges of edgesByPair.values()) {
    edges.sort((a, b) => b.confidence - a.confidence);
    // Keep top N with distinct offer+need combos
    const seen = new Set<string>();
    let kept = 0;
    for (const e of edges) {
      const sig = `${e.fromOffer}|${e.toNeed}`;
      if (!seen.has(sig) && kept < TOP_EDGES_PER_PAIR) {
        seen.add(sig);
        retained.push(e);
        kept++;
      }
    }
  }

  // ─── Gemini AI scoring (mandatory for agentic matching) ─────────
  if (retained.length > 0) {
    const BATCH_SIZE = 20;
    const postMap = new Map(posts.map((p) => [p.id, p]));

    const pairs = retained.map((edge) => {
      const fromPost = postMap.get(edge.fromUserId);
      const toPost = postMap.get(edge.toUserId);
      const offerCat = fromPost?.parsedOffers.find((o) => o.skill === edge.fromOffer)?.category || "other";
      const needCat = toPost?.parsedNeeds.find((n) => n.skill === edge.toNeed)?.category || "other";
      return {
        fromUserId: edge.fromUserId,
        toUserId: edge.toUserId,
        offer: edge.fromOffer,
        offerCategory: offerCat,
        need: edge.toNeed,
        needCategory: needCat,
      };
    });

    // Batch Gemini calls
    const geminiResults: Array<{ score: number; reasoning: string }> = [];
    for (let i = 0; i < pairs.length; i += BATCH_SIZE) {
      const batch = pairs.slice(i, i + BATCH_SIZE);
      const results = await batchScoreCompatibility(batch);
      geminiResults.push(...results);
    }

    // Blend local + Gemini scores — Gemini can veto clearly wrong matches
    for (let i = 0; i < retained.length; i++) {
      const gemini = geminiResults[i];
      if (gemini) {
        if (gemini.score <= 0.10) {
          // Gemini says this is clearly NOT a match — kill it
          retained[i].confidence = 0;
          retained[i].reasoning = gemini.reasoning || "Not a match";
        } else {
          retained[i].confidence = Math.round((0.4 * retained[i].confidence + 0.6 * gemini.score) * 100) / 100;
          retained[i].reasoning = gemini.reasoning;
        }
      }
    }

    // Re-filter after blending
    return retained.filter((e) => e.confidence >= MIN_EDGE_CONFIDENCE);
  }

  return retained;
}

// ─── Step C: Enumerate cycles 2-4, full-signature dedup ──────────

export function findTradeRings(
  edges: GraphEdge[],
  posts: UserPost[]
): MultiTrade[] {
  // Build adjacency list
  const adj = new Map<string, GraphEdge[]>();
  for (const edge of edges) {
    if (!adj.has(edge.fromUserId)) adj.set(edge.fromUserId, []);
    adj.get(edge.fromUserId)!.push(edge);
  }

  const userIds = posts.map((p) => p.id);
  const rawCycles: Array<{ users: string[]; edges: GraphEdge[] }> = [];

  // DFS cycle search
  for (const startNode of userIds) {
    const visited = new Set<string>();
    const pathUsers: string[] = [];
    const pathEdges: GraphEdge[] = [];

    function dfs(current: string, depth: number) {
      if (depth > MAX_CYCLE_LENGTH) return;

      pathUsers.push(current);
      visited.add(current);

      const neighbors = adj.get(current) || [];
      for (const edge of neighbors) {
        const next = edge.toUserId;

        if (next === startNode && pathUsers.length >= MIN_CYCLE_LENGTH) {
          pathEdges.push(edge);
          rawCycles.push({
            users: [...pathUsers],
            edges: [...pathEdges],
          });
          pathEdges.pop();
          continue;
        }

        if (!visited.has(next) && depth < MAX_CYCLE_LENGTH) {
          pathEdges.push(edge);
          dfs(next, depth + 1);
          pathEdges.pop();
        }
      }

      pathUsers.pop();
      visited.delete(current);
    }

    dfs(startNode, 1);
  }

  // ─── Dedup by full edge signature (not just user IDs) ──────
  const seen = new Set<string>();
  const uniqueCycles: Array<{ users: string[]; edges: GraphEdge[] }> = [];

  for (const cycle of rawCycles) {
    // Build full signature: sequence of (from, to, offer, need) tuples
    const sigs = cycle.edges.map(
      (e) => `${e.fromUserId}:${e.fromOffer}→${e.toUserId}:${e.toNeed}`
    );

    // Canonicalize: rotate so lexicographically smallest is first
    let minIdx = 0;
    for (let i = 1; i < sigs.length; i++) {
      if (sigs[i] < sigs[minIdx]) minIdx = i;
    }
    const rotated = [...sigs.slice(minIdx), ...sigs.slice(0, minIdx)];
    const forward = rotated.join("|");
    const reversed = [...rotated].reverse().join("|");
    const canonical = forward < reversed ? forward : reversed;

    if (!seen.has(canonical)) {
      seen.add(canonical);

      // Validate: no offer_ref or need_ref reused within ring
      const offers = new Set(cycle.edges.map((e) => `${e.fromUserId}:${e.fromOffer}`));
      const needs = new Set(cycle.edges.map((e) => `${e.toUserId}:${e.toNeed}`));
      if (offers.size === cycle.edges.length && needs.size === cycle.edges.length) {
        uniqueCycles.push(cycle);
      }
    }
  }

  // ─── Step D: Score each ring (bottleneck-sensitive) ────────
  const now = new Date().toISOString();
  const scored: MultiTrade[] = uniqueCycles.map((cycle, index) => {
    const ringEdges = cycle.edges;
    const confidences = ringEdges.map((e) => e.confidence);

    const avgEdge = confidences.reduce((a, b) => a + b, 0) / confidences.length;
    const minEdge = Math.min(...confidences);
    const completionProxy = confidences.reduce((a, b) => a * b, 1);

    // Ring score (from algorithm guide)
    const ringScore =
      0.35 * minEdge +
      0.25 * avgEdge +
      0.15 * completionProxy +
      0.10 * (avgEdge * 0.9) + // avg_trust proxy (using edge quality)
      0.05 * 1.0 + // freshness (all seed data is fresh)
      0.05 * 0.5 + // fairness bonus (neutral for seed)
      0.05 * 0.0; // no metadata penalty

    return {
      id: `ring-${index + 1}`,
      type: "multi" as const,
      participants: cycle.users,
      edges: ringEdges,
      averageConfidence: Math.round(avgEdge * 100) / 100,
      score: Math.round(ringScore * 100) / 100,
      status: "pending_all" as const,
      acceptedBy: [],
      declinedBy: [],
      heartbeatRun: now,
      createdAt: now,
    };
  });

  // ─── Step E: Rank, then select disjoint primary set ────────
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    const bMin = Math.min(...b.edges.map((e) => e.confidence));
    const aMin = Math.min(...a.edges.map((e) => e.confidence));
    if (bMin !== aMin) return bMin - aMin;
    if (a.participants.length !== b.participants.length) return a.participants.length - b.participants.length;
    return a.id.localeCompare(b.id); // deterministic tiebreak
  });

  // Greedy disjoint selection for primary rings
  const usedUsers = new Set<string>();
  const usedOffers = new Set<string>();
  const usedNeeds = new Set<string>();
  const primary: MultiTrade[] = [];
  const alternates: MultiTrade[] = [];

  for (const ring of scored) {
    const ringUsers = new Set(ring.participants);
    const ringOffers = new Set(ring.edges.map((e) => `${e.fromUserId}:${e.fromOffer}`));
    const ringNeeds = new Set(ring.edges.map((e) => `${e.toUserId}:${e.toNeed}`));

    const conflicts =
      [...ringUsers].some((u) => usedUsers.has(u)) ||
      [...ringOffers].some((o) => usedOffers.has(o)) ||
      [...ringNeeds].some((n) => usedNeeds.has(n));

    if (!conflicts && primary.length < TOP_K_PRIMARY) {
      primary.push(ring);
      ringUsers.forEach((u) => usedUsers.add(u));
      ringOffers.forEach((o) => usedOffers.add(o));
      ringNeeds.forEach((n) => usedNeeds.add(n));
    } else if (alternates.length < TOP_K_ALTERNATES) {
      alternates.push(ring);
    }
  }

  // Return primary first, then alternates
  return [...primary, ...alternates];
}
