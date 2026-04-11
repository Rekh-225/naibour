"use client";

import { MultiTrade, UserPost } from "@/lib/types";

interface TradeRingProps {
  ring: MultiTrade;
  posts: UserPost[];
  onAccept: (ringId: string, userId: string) => void;
  onDecline: (ringId: string, userId: string) => void;
}

export default function TradeRingCard({ ring, posts, onAccept, onDecline }: TradeRingProps) {
  const participants = ring.participants
    .map((id) => posts.find((p) => p.id === id)!)
    .filter(Boolean);

  const confidenceColor =
    ring.averageConfidence >= 0.8
      ? "text-[var(--success)]"
      : ring.averageConfidence >= 0.6
        ? "text-[var(--warm)]"
        : "text-[var(--danger)]";

  const statusLabel: Record<string, { text: string; cls: string }> = {
    pending_all: { text: "Awaiting responses", cls: "bg-[var(--warm-light)] text-[var(--warm)]" },
    executed: { text: "Executed", cls: "bg-[var(--success-light)] text-[var(--success)]" },
    declined: { text: "Declined", cls: "bg-[var(--danger-light)] text-[var(--danger)]" },
  };
  const status = statusLabel[ring.status] || statusLabel.pending_all;

  return (
    <div className="card ring-glow p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {participants.map((p, i) => (
              <div
                key={p.id}
                className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white"
                style={{ backgroundColor: p.avatarColor || "var(--primary)", zIndex: participants.length - i }}
                title={p.userName}
              >
                {p.userName.charAt(0)}
              </div>
            ))}
          </div>
          <div>
            <span className="text-sm font-semibold">
              {ring.participants.length}-way trade ring
            </span>
            <span className={`ml-2 text-xs ${confidenceColor}`}>
              {Math.round(ring.averageConfidence * 100)}% match
            </span>
          </div>
        </div>
        <span className={`pill ${status.cls}`}>{status.text}</span>
      </div>

      {/* Ring SVG */}
      <div className="relative mb-4">
        {(() => {
          const total = participants.length;
          const nodeR = 22;
          const pad = 8;
          const cx = 200;
          const layoutR = Math.min(110, Math.max(55, total * 22));
          const cy = layoutR + nodeR + pad;
          const svgH = cy + layoutR + nodeR + pad;
          return (
            <svg
              viewBox={`0 0 400 ${svgH}`}
              className="w-full"
              style={{ maxHeight: "280px" }}
            >
              {ring.edges.map((edge, i) => {
                const fromIdx = ring.participants.indexOf(edge.fromUserId);
                const toIdx = ring.participants.indexOf(edge.toUserId);
                const a1 = (fromIdx / total) * 2 * Math.PI - Math.PI / 2;
                const a2 = (toIdx / total) * 2 * Math.PI - Math.PI / 2;
                return (
                  <g key={`e-${i}`}>
                    <line
                      x1={cx + layoutR * Math.cos(a1)} y1={cy + layoutR * Math.sin(a1)}
                      x2={cx + layoutR * Math.cos(a2)} y2={cy + layoutR * Math.sin(a2)}
                      stroke="var(--primary)" strokeWidth="1.5" opacity={0.25} className="ring-line"
                    />
                  </g>
                );
              })}
              {participants.map((p, i) => {
                const a = (i / total) * 2 * Math.PI - Math.PI / 2;
                const x = cx + layoutR * Math.cos(a), y = cy + layoutR * Math.sin(a);
                const accepted = ring.acceptedBy.includes(p.id);
                return (
                  <g key={p.id}>
                    <circle cx={x} cy={y} r={nodeR} fill={p.avatarColor || "var(--primary-light)"} stroke={accepted ? "var(--success)" : "var(--card-border)"} strokeWidth="2" />
                    <text x={x} y={y - 3} textAnchor="middle" fill="var(--fg)" fontSize="9" fontWeight="600">{p.userName.split(" ")[0]}</text>
                    <text x={x} y={y + 8} textAnchor="middle" fill="var(--muted)" fontSize="7">{accepted ? "✓" : `★${p.trustScore.toFixed(1)}`}</text>
                  </g>
                );
              })}
            </svg>
          );
        })()}
      </div>

      {/* Edge details */}
      <div className="space-y-1.5 mb-4">
        {ring.edges.map((edge, i) => {
          const from = posts.find((p) => p.id === edge.fromUserId);
          const to = posts.find((p) => p.id === edge.toUserId);
          return (
            <div key={i} className="flex items-center gap-2 text-xs rounded-xl bg-[var(--bg-secondary)] p-2.5">
              <span className="font-semibold text-[var(--primary)]">{from?.userName}</span>
              <span className="text-[var(--muted)]">→</span>
              <span className="font-semibold text-[var(--accent)]">{to?.userName}</span>
              <span className="text-[var(--fg-secondary)] flex-1 truncate">{edge.reasoning}</span>
              <span className={confidenceColor}>{Math.round(edge.confidence * 100)}%</span>
            </div>
          );
        })}
      </div>

      {/* Acceptance tracker */}
      <div className="flex items-center gap-2 mb-4 text-xs">
        <span className="text-[var(--muted)]">Accepted:</span>
        <span className="font-semibold">{ring.acceptedBy.length}/{ring.participants.length}</span>
        <div className="flex-1 h-1.5 rounded-full bg-[var(--bg-secondary)] overflow-hidden">
          <div
            className="h-full rounded-full bg-[var(--success)] transition-all"
            style={{ width: `${(ring.acceptedBy.length / ring.participants.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Per-participant actions */}
      {ring.status === "pending_all" && (
        <div className="space-y-2">
          {participants.map((p) => {
            const accepted = ring.acceptedBy.includes(p.id);
            const declined = ring.declinedBy.includes(p.id);
            if (accepted) return (
              <div key={p.id} className="flex items-center gap-2 text-xs text-[var(--success)] bg-[var(--success-light)] rounded-xl px-3 py-2">
                ✓ {p.userName} accepted
              </div>
            );
            if (declined) return (
              <div key={p.id} className="flex items-center gap-2 text-xs text-[var(--danger)] bg-[var(--danger-light)] rounded-xl px-3 py-2">
                ✗ {p.userName} declined
              </div>
            );
            return (
              <div key={p.id} className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                  style={{ backgroundColor: p.avatarColor || "var(--primary)" }}
                >
                  {p.userName.charAt(0)}
                </div>
                <span className="text-sm flex-1">{p.userName}</span>
                <button
                  onClick={() => onAccept(ring.id, p.id)}
                  className="btn-primary text-xs !py-1.5 !px-3"
                >
                  Accept
                </button>
                <button
                  onClick={() => onDecline(ring.id, p.id)}
                  className="btn-secondary text-xs !py-1.5 !px-3"
                >
                  Decline
                </button>
              </div>
            );
          })}
        </div>
      )}

      {ring.status === "executed" && (
        <div className="rounded-xl bg-[var(--success-light)] text-[var(--success)] text-sm text-center py-3 font-semibold">
          All participants accepted — trade executed!
        </div>
      )}

      {ring.status === "declined" && (
        <div className="rounded-xl bg-[var(--bg-secondary)] text-[var(--muted)] text-sm text-center py-3">
          Declined — agent will find alternatives in next heartbeat
        </div>
      )}
    </div>
  );
}
