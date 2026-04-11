import { UserPost, GraphEdge, MultiTrade } from "./types";
import { batchScoreCompatibility } from "./gemini";

const CONFIDENCE_THRESHOLD = 0.6;
const MAX_RING_SIZE = 5;

export async function buildCompatibilityGraph(
  posts: UserPost[]
): Promise<GraphEdge[]> {
  const pairs: Array<{
    fromUserId: string;
    toUserId: string;
    offer: string;
    offerCategory: string;
    need: string;
    needCategory: string;
  }> = [];

  // Generate all potential offer→need pairs between different users
  for (const from of posts) {
    for (const to of posts) {
      if (from.id === to.id) continue;
      for (const offer of from.parsedOffers) {
        for (const need of to.parsedNeeds) {
          pairs.push({
            fromUserId: from.id,
            toUserId: to.id,
            offer: offer.skill,
            offerCategory: offer.category,
            need: need.skill,
            needCategory: need.category,
          });
        }
      }
    }
  }

  // Batch score in chunks to avoid overwhelming the API
  const BATCH_SIZE = 20;
  const edges: GraphEdge[] = [];

  for (let i = 0; i < pairs.length; i += BATCH_SIZE) {
    const batch = pairs.slice(i, i + BATCH_SIZE);
    const results = await batchScoreCompatibility(batch);

    for (const result of results) {
      if (result.score >= CONFIDENCE_THRESHOLD) {
        edges.push({
          fromUserId: result.fromUserId,
          toUserId: result.toUserId,
          fromOffer: result.offerSkill,
          toNeed: result.needSkill,
          confidence: result.score,
          reasoning: result.reasoning,
        });
      }
    }
  }

  // Deduplicate: keep the best edge between any two users
  const bestEdges = new Map<string, GraphEdge>();
  for (const edge of edges) {
    const key = `${edge.fromUserId}->${edge.toUserId}`;
    const existing = bestEdges.get(key);
    if (!existing || edge.confidence > existing.confidence) {
      bestEdges.set(key, edge);
    }
  }

  return Array.from(bestEdges.values());
}

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

  const allCycles: string[][] = [];
  const userIds = posts.map((p) => p.id);

  // DFS-based cycle detection
  for (const startNode of userIds) {
    const visited = new Set<string>();
    const path: string[] = [];

    function dfs(current: string, depth: number) {
      if (depth > MAX_RING_SIZE) return;

      path.push(current);
      visited.add(current);

      const neighbors = adj.get(current) || [];
      for (const edge of neighbors) {
        const next = edge.toUserId;

        // Found a cycle back to start
        if (next === startNode && path.length >= 2) {
          allCycles.push([...path]);
          continue;
        }

        if (!visited.has(next) && depth < MAX_RING_SIZE) {
          dfs(next, depth + 1);
        }
      }

      path.pop();
      visited.delete(current);
    }

    dfs(startNode, 1);
  }

  // Deduplicate cycles (same participants, different starting points)
  const uniqueCycles = deduplicateCycles(allCycles);

  // Convert cycles to MultiTrade objects
  const now = new Date().toISOString();
  const rings: MultiTrade[] = uniqueCycles.map((cycle, index) => {
    const ringEdges: GraphEdge[] = [];
    for (let i = 0; i < cycle.length; i++) {
      const from = cycle[i];
      const to = cycle[(i + 1) % cycle.length];
      const edge = edges.find(
        (e) => e.fromUserId === from && e.toUserId === to
      );
      if (edge) ringEdges.push(edge);
    }

    const avgConfidence =
      ringEdges.length > 0
        ? ringEdges.reduce((sum, e) => sum + e.confidence, 0) /
          ringEdges.length
        : 0;

    const sizePenalty = 1 - (cycle.length - 2) * 0.05;
    const score = avgConfidence * Math.max(sizePenalty, 0.7);

    return {
      id: `ring-${index + 1}`,
      type: "multi" as const,
      participants: cycle,
      edges: ringEdges,
      averageConfidence: Math.round(avgConfidence * 100) / 100,
      score: Math.round(score * 100) / 100,
      status: "pending_all" as const,
      acceptedBy: [],
      declinedBy: [],
      heartbeatRun: now,
      createdAt: now,
    };
  });

  // Sort by score descending
  rings.sort((a, b) => b.score - a.score);

  return rings.slice(0, 10);
}

function deduplicateCycles(cycles: string[][]): string[][] {
  const seen = new Set<string>();
  const unique: string[][] = [];

  for (const cycle of cycles) {
    // Normalize: sort participant IDs to create a canonical key
    const key = [...cycle].sort().join(",");
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(cycle);
    }
  }

  return unique;
}
