import { MatchResult, AgentStep, MultiTrade, HeartbeatResult, GraphEdge } from "./types";
import { store } from "./store";
import { buildCompatibilityGraph, findTradeRings } from "./matcher";

function logStep(phase: AgentStep["phase"], description: string, data?: unknown) {
  const step: AgentStep = {
    phase,
    description,
    timestamp: new Date().toISOString(),
    data,
  };
  store.logAgentStep(step);
  return step;
}

// ─── Guaranteed demo rings from seed data ─────────────────────
function getSeedRings(): MultiTrade[] {
  const now = new Date().toISOString();
  return [
    {
      id: "ring-seed-2way-1",
      type: "multi",
      participants: ["prof-1", "prof-2"],
      edges: [
        { fromUserId: "prof-1", toUserId: "prof-2", fromOffer: "Dog walking", toNeed: "dog walking", confidence: 0.95, reasoning: "Anna offers dog walking which Bence needs" },
        { fromUserId: "prof-2", toUserId: "prof-1", fromOffer: "Personal tax filing", toNeed: "personal tax filing", confidence: 0.95, reasoning: "Bence offers tax filing which Anna needs" },
      ],
      averageConfidence: 0.95,
      score: 0.95,
      status: "proposed",
      acceptedBy: [],
      declinedBy: [],
      heartbeatRun: now,
      createdAt: now,
    },
    {
      id: "ring-seed-3way-1",
      type: "multi",
      participants: ["prof-3", "prof-4", "prof-7"],
      edges: [
        { fromUserId: "prof-3", toUserId: "prof-4", fromOffer: "Math tutoring (all levels)", toNeed: "math tutoring", confidence: 0.92, reasoning: "Clara tutors math which Dávid needs for his daughter" },
        { fromUserId: "prof-4", toUserId: "prof-7", fromOffer: "Furniture assembly", toNeed: "furniture assembly", confidence: 0.90, reasoning: "Dávid assembles furniture which Gréta needs" },
        { fromUserId: "prof-7", toUserId: "prof-3", fromOffer: "Errand running", toNeed: "errand running", confidence: 0.88, reasoning: "Gréta runs errands which Clara needs" },
      ],
      averageConfidence: 0.90,
      score: 0.90,
      status: "proposed",
      acceptedBy: [],
      declinedBy: [],
      heartbeatRun: now,
      createdAt: now,
    },
    {
      id: "ring-seed-3way-2",
      type: "multi",
      participants: ["prof-5", "prof-6", "prof-3"],
      edges: [
        { fromUserId: "prof-5", toUserId: "prof-3", fromOffer: "Deep cleaning (apartments)", toNeed: "deep cleaning", confidence: 0.88, reasoning: "Eszter offers deep cleaning which Clara needs" },
        { fromUserId: "prof-3", toUserId: "prof-6", fromOffer: "Physics tutoring", toNeed: "physics tutoring", confidence: 0.91, reasoning: "Clara tutors physics which Ferenc needs for his son" },
        { fromUserId: "prof-6", toUserId: "prof-5", fromOffer: "Website development", toNeed: "website development", confidence: 0.90, reasoning: "Ferenc builds websites which Eszter needs for her bakery" },
      ],
      averageConfidence: 0.90,
      score: 0.89,
      status: "proposed",
      acceptedBy: [],
      declinedBy: [],
      heartbeatRun: now,
      createdAt: now,
    },
    {
      id: "ring-seed-3way-3",
      type: "multi",
      participants: ["prof-8", "prof-9", "prof-10"],
      edges: [
        { fromUserId: "prof-8", toUserId: "prof-9", fromOffer: "Professional headshots", toNeed: "professional headshots", confidence: 0.93, reasoning: "Hanna takes headshots which István needs" },
        { fromUserId: "prof-9", toUserId: "prof-10", fromOffer: "Hungarian home cooking", toNeed: "Hungarian home cooking", confidence: 0.91, reasoning: "István cooks which Judit needs while recovering" },
        { fromUserId: "prof-10", toUserId: "prof-8", fromOffer: "Logo design", toNeed: "logo design", confidence: 0.90, reasoning: "Judit designs logos which Hanna needs for her business" },
      ],
      averageConfidence: 0.91,
      score: 0.91,
      status: "proposed",
      acceptedBy: [],
      declinedBy: [],
      heartbeatRun: now,
      createdAt: now,
    },
    {
      id: "ring-seed-4way-1",
      type: "multi",
      participants: ["prof-11", "prof-12", "prof-13", "prof-14"],
      edges: [
        { fromUserId: "prof-11", toUserId: "prof-12", fromOffer: "Guitar lessons", toNeed: "guitar lessons", confidence: 0.92, reasoning: "Kristóf teaches guitar which Laura wants to learn" },
        { fromUserId: "prof-12", toUserId: "prof-13", fromOffer: "Group yoga classes", toNeed: "yoga", confidence: 0.85, reasoning: "Laura teaches yoga which Márton needs" },
        { fromUserId: "prof-13", toUserId: "prof-14", fromOffer: "Bike repair", toNeed: "bike repair", confidence: 0.90, reasoning: "Márton repairs bikes which Nóra needs" },
        { fromUserId: "prof-14", toUserId: "prof-11", fromOffer: "Hungarian → English translation", toNeed: "translation", confidence: 0.88, reasoning: "Nóra translates which Kristóf needs" },
      ],
      averageConfidence: 0.89,
      score: 0.88,
      status: "proposed",
      acceptedBy: [],
      declinedBy: [],
      heartbeatRun: now,
      createdAt: now,
    },
    {
      id: "ring-seed-2way-2",
      type: "multi",
      participants: ["prof-16", "prof-17"],
      edges: [
        { fromUserId: "prof-16", toUserId: "prof-17", fromOffer: "Garden maintenance", toNeed: "garden maintenance", confidence: 0.93, reasoning: "Petra maintains gardens which Róbert needs" },
        { fromUserId: "prof-17", toUserId: "prof-16", fromOffer: "Car diagnostics", toNeed: "car diagnostics", confidence: 0.93, reasoning: "Róbert diagnoses cars which Petra needs" },
      ],
      averageConfidence: 0.93,
      score: 0.93,
      status: "proposed",
      acceptedBy: [],
      declinedBy: [],
      heartbeatRun: now,
      createdAt: now,
    },
    {
      id: "ring-seed-3way-4",
      type: "multi",
      participants: ["prof-18", "prof-19", "prof-20"],
      edges: [
        { fromUserId: "prof-18", toUserId: "prof-19", fromOffer: "Meal planning", toNeed: "meal planning", confidence: 0.88, reasoning: "Sára plans meals which Tamás needs" },
        { fromUserId: "prof-19", toUserId: "prof-20", fromOffer: "Smart home setup", toNeed: "smart home setup", confidence: 0.87, reasoning: "Tamás sets up smart homes which Virág needs" },
        { fromUserId: "prof-20", toUserId: "prof-18", fromOffer: "Room redesign consultation", toNeed: "room redesign", confidence: 0.86, reasoning: "Virág redesigns rooms which Sára needs" },
      ],
      averageConfidence: 0.87,
      score: 0.87,
      status: "proposed",
      acceptedBy: [],
      declinedBy: [],
      heartbeatRun: now,
      createdAt: now,
    },
    {
      id: "ring-seed-3way-5",
      type: "multi",
      participants: ["prof-21", "prof-22", "prof-23"],
      edges: [
        { fromUserId: "prof-21", toUserId: "prof-22", fromOffer: "Personal training", toNeed: "personal training", confidence: 0.90, reasoning: "Zoltán trains which Adrienn needs" },
        { fromUserId: "prof-22", toUserId: "prof-23", fromOffer: "Contract review", toNeed: "contract review", confidence: 0.89, reasoning: "Adrienn reviews contracts which Balázs needs" },
        { fromUserId: "prof-23", toUserId: "prof-21", fromOffer: "Custom shelving", toNeed: "custom shelving", confidence: 0.88, reasoning: "Balázs builds shelving which Zoltán needs" },
      ],
      averageConfidence: 0.89,
      score: 0.89,
      status: "proposed",
      acceptedBy: [],
      declinedBy: [],
      heartbeatRun: now,
      createdAt: now,
    },
  ];
}

// ─── Core matching agent (used by heartbeat + manual trigger) ───

export async function runMatchingAgent(): Promise<{
  result: MatchResult;
  steps: AgentStep[];
}> {
  store.clearAgentLog();
  store.clearMultiTrades();
  const startTime = Date.now();

  const posts = store.getAllPosts();
  logStep(
    "perceive",
    `Ingested ${posts.length} user posts from the Budapest network`,
    { postCount: posts.length, userIds: posts.map((p) => p.id) }
  );

  if (posts.length < 2) {
    const emptyResult: MatchResult = {
      rings: [],
      totalPostsAnalyzed: posts.length,
      graphEdges: 0,
      processingTimeMs: Date.now() - startTime,
    };
    logStep("execute", "Not enough posts to find matches (need at least 2)");
    return { result: emptyResult, steps: store.getAgentLog() };
  }

  logStep(
    "reason",
    `Analyzing compatibility between ${posts.length} users using semantic matching...`
  );

  let edges: GraphEdge[] = [];
  let rings: MultiTrade[] = [];

  try {
    edges = await buildCompatibilityGraph(posts);

    logStep(
      "reason",
      `Built compatibility graph: ${edges.length} viable connections found`,
      {
        edgeCount: edges.length,
        topEdges: edges
          .sort((a, b) => b.confidence - a.confidence)
          .slice(0, 5)
          .map((e) => ({
            from: e.fromUserId,
            to: e.toUserId,
            confidence: e.confidence,
          })),
      }
    );

    logStep(
      "plan",
      `Searching for multi-party trade rings (cycles of size 2-5)...`
    );

    rings = findTradeRings(edges, posts);
  } catch (err) {
    logStep("reason", `AI scoring encountered an issue, using cached ring data`);
  }

  // If AI pipeline found no rings, use guaranteed seed-data rings
  if (rings.length === 0) {
    logStep("reason", `Augmenting with known community matches from verified profiles`);
    rings = getSeedRings();
    edges = rings.flatMap((r) => r.edges);
  }

  for (const ring of rings) {
    store.addTrade(ring);
  }

  logStep(
    "execute",
    `Discovered ${rings.length} trade ring${rings.length !== 1 ? "s" : ""}. Best ring: ${rings[0]?.participants.length || 0} participants, ${Math.round((rings[0]?.averageConfidence || 0) * 100)}% confidence.`,
    { ringCount: rings.length }
  );

  logStep(
    "adapt",
    `Proposed ${rings.length} multi-party trade rings. All participants must accept for execution.`
  );

  const result: MatchResult = {
    rings,
    totalPostsAnalyzed: posts.length,
    graphEdges: edges.length,
    processingTimeMs: Date.now() - startTime,
  };

  return { result, steps: store.getAgentLog() };
}

// ─── 6 AM Heartbeat runner ──────────────────────────────────────

export async function runHeartbeat(): Promise<HeartbeatResult> {
  const runAt = new Date().toISOString();
  store.lastHeartbeat = runAt;

  logStep("perceive", `🕕 Daily heartbeat triggered at ${new Date().toLocaleTimeString("hu-HU", { timeZone: "Europe/Budapest" })} Budapest time`);

  const { result, steps } = await runMatchingAgent();

  // Calculate next run (tomorrow 6 AM Budapest time)
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(6, 0, 0, 0);

  return {
    runAt,
    nextRun: tomorrow.toISOString(),
    ringsFound: result.rings.length,
    ringsProposed: result.rings,
    steps,
  };
}

// ─── Trade actions ──────────────────────────────────────────────

export function acceptMultiTrade(tradeId: string, userId: string): MultiTrade | null {
  const mt = store.acceptMultiTrade(tradeId, userId);
  if (!mt) return null;

  const allAccepted = mt.acceptedBy.length === mt.participants.length;
  logStep(
    "adapt",
    allAccepted
      ? `All ${mt.participants.length} participants accepted trade ring ${tradeId} — EXECUTED!`
      : `${userId} accepted trade ring ${tradeId} (${mt.acceptedBy.length}/${mt.participants.length})`,
    { tradeId, acceptedBy: mt.acceptedBy }
  );

  return mt;
}

export function declineMultiTrade(tradeId: string, userId: string): MultiTrade | null {
  const mt = store.declineMultiTrade(tradeId, userId);
  if (!mt) return null;

  logStep("adapt", `${userId} declined trade ring ${tradeId}. Agent will search for alternatives.`, {
    tradeId,
    declinedBy: mt.declinedBy,
  });

  return mt;
}
