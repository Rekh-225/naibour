"use client";

import { useState } from "react";
import { MultiTrade, UserPost, AgentStep } from "@/lib/types";
import TradeRingCard from "@/components/TradeRing";
import AgentSteps from "@/components/AgentSteps";

export default function MatchesPage() {
  const [rings, setRings] = useState<MultiTrade[]>([]);
  const [posts, setPosts] = useState<UserPost[]>([]);
  const [steps, setSteps] = useState<AgentStep[]>([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<{
    totalPostsAnalyzed: number;
    graphEdges: number;
    processingTimeMs: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runAgent = async () => {
    setLoading(true);
    setError(null);
    setRings([]);
    setSteps([]);
    setStats(null);

    try {
      const postsRes = await fetch("/api/posts");
      const postsData = await postsRes.json();
      setPosts(postsData.posts);

      const res = await fetch("/api/matches");
      const data = await res.json();

      if (res.ok) {
        setRings(data.rings || []);
        setSteps(data.agentSteps || []);
        setStats({
          totalPostsAnalyzed: data.totalPostsAnalyzed,
          graphEdges: data.graphEdges,
          processingTimeMs: data.processingTimeMs,
        });
      } else {
        setError(data.error || "Agent failed");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (ringId: string, userId: string, action: "accept" | "decline") => {
    try {
      const res = await fetch("/api/matches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ringId, userId, action }),
      });
      const data = await res.json();
      if (res.ok && data.allMultiTrades) {
        setRings(data.allMultiTrades);
      }
    } catch {
      console.error("Failed to process action");
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-5 py-12">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Trade rings</h1>
          <p className="text-[var(--fg-secondary)]">
            Multi-party trade rings discovered by AI. Normally runs every morning
            at 6 AM — or trigger it manually below.
          </p>
        </div>
        <button
          onClick={runAgent}
          disabled={loading}
          className="shrink-0 btn-primary"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Running...
            </span>
          ) : (
            "🔄 Run heartbeat now"
          )}
        </button>
      </div>

      {/* Heartbeat info */}
      <div className="card p-4 mb-6 flex items-center gap-3">
        <span className="text-xl heartbeat-pulse">💓</span>
        <div className="flex-1">
          <div className="text-sm font-medium">Daily heartbeat — 06:00 Budapest time</div>
          <div className="text-xs text-[var(--muted)]">
            The AI scans all open posts, finds multi-party rings, and proposes them to all participants.
            Everyone must accept for the trade to execute.
          </div>
        </div>
        <span className="pill bg-[var(--primary-light)] text-[var(--primary)]">
          {rings.filter((r) => r.status === "pending_all").length} pending
        </span>
      </div>

      {error && (
        <div className="card p-4 text-sm mb-6 bg-[var(--danger-light)] border-[var(--danger)]/20 text-[var(--danger)]">
          {error}
        </div>
      )}

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold">{stats.totalPostsAnalyzed}</div>
            <div className="text-xs text-[var(--muted)]">Posts analyzed</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold">{stats.graphEdges}</div>
            <div className="text-xs text-[var(--muted)]">Compatibility edges</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold">{(stats.processingTimeMs / 1000).toFixed(1)}s</div>
            <div className="text-xs text-[var(--muted)]">Processing time</div>
          </div>
        </div>
      )}

      {/* Agent Log */}
      {steps.length > 0 && (
        <div className="mb-6">
          <AgentSteps steps={steps} />
        </div>
      )}

      {/* Trade Rings */}
      {rings.length > 0 && (
        <div className="space-y-5">
          <h2 className="text-lg font-semibold">
            Discovered rings ({rings.length})
          </h2>
          {rings.map((ring) => (
            <TradeRingCard
              key={ring.id}
              ring={ring}
              posts={posts}
              onAccept={(id, userId) => handleAction(id, userId, "accept")}
              onDecline={(id, userId) => handleAction(id, userId, "decline")}
            />
          ))}
        </div>
      )}

      {/* Empty / Initial states */}
      {!loading && rings.length === 0 && stats && (
        <div className="text-center py-16 text-[var(--muted)]">
          <div className="text-4xl mb-3">🔍</div>
          <p className="font-semibold">No trade rings found</p>
          <p className="text-sm mt-1">Add more diverse posts to create matching opportunities.</p>
        </div>
      )}

      {!loading && !stats && (
        <div className="text-center py-16 text-[var(--muted)]">
          <div className="text-5xl mb-4">🤖</div>
          <p className="font-semibold text-lg text-[var(--fg)]">Agent ready</p>
          <p className="text-sm mt-1 max-w-md mx-auto">
            Click &quot;Run heartbeat now&quot; to trigger the AI. It will scan all posts,
            build a compatibility graph, and discover optimal trade rings.
          </p>
        </div>
      )}
    </div>
  );
}
