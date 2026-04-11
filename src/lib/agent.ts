import { MatchResult, AgentStep, MultiTrade, HeartbeatResult } from "./types";
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

  const edges = await buildCompatibilityGraph(posts);

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

  const rings = findTradeRings(edges, posts);

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
