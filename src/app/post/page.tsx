"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";

// ─── Types mirroring the API response ─────────────────────
interface DirectMatch {
  type: "exact" | "close";
  theirProfileId: string;
  theirName: string;
  theirTrust: number;
  theirVerified: boolean;
  theyOffer: string;
  youNeed: string;
  youOffer: string;
  theyNeed: string;
  confidence: number;
  reasoning: string;
}

interface RingMatch {
  participantCount: number;
  participants: Array<{ id: string; name: string; gives: string; gets: string }>;
  avgConfidence: number;
  score: number;
}

interface MatchResult {
  directMatches: DirectMatch[];
  ringMatches: RingMatch[];
  totalEdges: number;
  processingTimeMs: number;
}

// ─── Confetti burst component ─────────────────────────────
const CONFETTI_COLORS = ["#D97757", "#6B8F71", "#C49A6C", "#7CC0E8", "#E8927C", "#A78BFA"];

function ConfettiBurst() {
  const pieces = useRef(
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      delay: `${Math.random() * 0.6}s`,
      duration: `${1.2 + Math.random() * 1.2}s`,
      size: 5 + Math.random() * 6,
      rotation: Math.random() * 360,
    }))
  ).current;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: p.left,
            top: "-4px",
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            "--delay": p.delay,
            "--duration": p.duration,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

// ─── Scanning indicator ───────────────────────────────────
function ScanningIndicator() {
  const [dots, setDots] = useState("");
  useEffect(() => {
    const iv = setInterval(() => setDots((d) => (d.length >= 3 ? "" : d + ".")), 400);
    return () => clearInterval(iv);
  }, []);
  return (
    <div className="card p-5 mt-4">
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 shrink-0">
          <div className="absolute inset-0 rounded-full border-2 border-[var(--primary)] border-t-transparent animate-spin" />
          <div className="absolute inset-2 rounded-full bg-[var(--primary-light)] flex items-center justify-center text-sm">
            🔍
          </div>
        </div>
        <div className="flex-1">
          <div className="font-semibold text-sm">Scanning your neighbourhood{dots}</div>
          <div className="text-xs text-[var(--muted)] mt-0.5">
            AI is checking all profiles for 1:1 matches and multi-party trade rings
          </div>
        </div>
      </div>
      <div className="mt-3 h-2 rounded-full overflow-hidden scanning-shimmer" />
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────
export default function PostNeedPage() {
  const { profile, loading: authLoading } = useAuth();
  const [rawNeed, setRawNeed] = useState("");
  const [urgency, setUrgency] = useState<"low" | "medium" | "high">("medium");
  const [loading, setLoading] = useState(false);
  const [postResult, setPostResult] = useState<{ success: boolean; message: string } | null>(null);

  // Match scanning state
  const [scanning, setScanning] = useState(false);
  const [matches, setMatches] = useState<MatchResult | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const matchRef = useRef<HTMLDivElement>(null);

  const runInstantMatch = useCallback(async () => {
    if (!profile) return;
    setScanning(true);
    setMatches(null);
    setShowConfetti(false);
    try {
      const res = await fetch(`/api/instant-match?profileId=${profile.id}`);
      if (res.ok) {
        const data: MatchResult = await res.json();
        setMatches(data);
        if (data.directMatches.length > 0 || data.ringMatches.length > 0) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
          setTimeout(() => {
            matchRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 300);
        }
      }
    } catch (err) {
      console.error("Instant match failed:", err);
    } finally {
      setScanning(false);
    }
  }, [profile]);

  // Not signed in — show gate
  if (!authLoading && !profile) {
    return (
      <div className="mx-auto max-w-md px-5 py-24 text-center">
        <div className="text-5xl mb-4">🔒</div>
        <h1 className="text-2xl font-bold mb-3">Sign in to post a need</h1>
        <p className="text-[var(--fg-secondary)] mb-6">
          You need a profile to post what you need. Your offerings are what neighbours see when deciding to trade with you.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href="/signin" className="btn-primary px-6 py-2.5">
            Sign in
          </a>
          <a href="/onboarding" className="btn-secondary">
            Create a profile
          </a>
        </div>
      </div>
    );
  }

  // Still loading auth
  if (authLoading) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24 text-center text-[var(--muted)]">
        Loading...
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile || !rawNeed.trim()) return;
    setLoading(true);
    setPostResult(null);
    setMatches(null);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profileId: profile.id, rawNeed: rawNeed.trim(), urgency }),
      });
      const data = await res.json();
      if (res.ok) {
        setPostResult({ success: true, message: data.message || "Need posted!" });
        setRawNeed("");
        // Automatically run instant match check
        setTimeout(() => runInstantMatch(), 200);
      } else {
        setPostResult({ success: false, message: data.error || "Failed to post" });
      }
    } catch {
      setPostResult({ success: false, message: "Network error" });
    } finally {
      setLoading(false);
    }
  };

  const totalMatches = (matches?.directMatches.length || 0) + (matches?.ringMatches.length || 0);

  return (
    <div className="mx-auto max-w-2xl px-5 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Post what you need</h1>
        <p className="text-[var(--fg-secondary)]">
          Describe what you need in plain language. Your neighbours will see your
          offerings when deciding to help.
        </p>
      </div>

      {/* Posting as — read-only profile card */}
      <div className="card p-4 mb-6">
        <div className="text-[10px] uppercase tracking-wider text-[var(--muted)] font-medium mb-2">
          Posting as
        </div>
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
            style={{ backgroundColor: profile!.avatarColor || "var(--primary)" }}
          >
            {profile!.userName.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="font-semibold text-sm">{profile!.userName}</div>
            <div className="text-xs text-[var(--muted)]">
              {profile!.neighborhood} · ★ {profile!.trustScore.toFixed(1)}
              {profile!.verified && " ✓ Verified"}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {profile!.offerings.map((o) => (
            <span key={o.id} className="pill bg-[var(--accent-light)] text-[var(--accent)]">
              {o.skill}
            </span>
          ))}
          {profile!.openToNegotiation && (
            <span className="pill bg-[var(--warm-light)] text-[var(--warm)]">+ open to requests</span>
          )}
          {profile!.openToCash && (
            <span className="pill bg-[var(--success-light)] text-[var(--success)]">💵 accepts cash</span>
          )}
        </div>
      </div>

      {/* Need form */}
      <form onSubmit={handleSubmit}>
        <div className="card p-5 mb-4">
          <label className="block text-sm font-medium text-[var(--fg-secondary)] mb-2">
            What do you need?
          </label>
          <textarea
            value={rawNeed}
            onChange={(e) => setRawNeed(e.target.value)}
            placeholder="Describe what you need in plain language. e.g. 'I need help filing my personal taxes this month' or 'I need someone to walk my dog 3x a week'"
            rows={4}
            required
            className="w-full rounded-xl bg-[var(--bg-secondary)] border border-[var(--card-border)] px-3 py-2.5 text-[var(--fg)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--primary)] transition-colors resize-none"
          />

          <div className="mt-3">
            <label className="block text-xs font-medium text-[var(--fg-secondary)] mb-1.5">Urgency</label>
            <div className="flex gap-2">
              {(["low", "medium", "high"] as const).map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => setUrgency(u)}
                  className={`pill cursor-pointer transition-all ${
                    urgency === u
                      ? u === "high"
                        ? "bg-[var(--danger-light)] text-[var(--danger)]"
                        : u === "medium"
                          ? "bg-[var(--warm-light)] text-[var(--warm)]"
                          : "bg-[var(--accent-light)] text-[var(--accent)]"
                      : "bg-[var(--bg-secondary)] text-[var(--muted)]"
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || scanning || !rawNeed.trim()}
          className="w-full btn-primary py-3"
        >
          {loading ? "AI is parsing your need..." : "Post need"}
        </button>
      </form>

      {postResult && !scanning && !matches && (
        <div
          className={`mt-4 rounded-xl p-4 text-sm ${
            postResult.success
              ? "bg-[var(--success-light)] border border-[var(--success)]/20 text-[var(--success)]"
              : "bg-[var(--danger-light)] border border-[var(--danger)]/20 text-[var(--danger)]"
          }`}
        >
          {postResult.message}
        </div>
      )}

      {/* Scanning indicator */}
      {scanning && <ScanningIndicator />}

      {/* ─── Match Results Banner ──────────────────────────────── */}
      {matches && !scanning && (
        <div ref={matchRef} className="mt-6 relative">
          {showConfetti && <ConfettiBurst />}

          {totalMatches > 0 ? (
            <div className="match-banner card ring-glow p-5 border-[var(--primary)]/30 relative overflow-hidden">
              <div className="flex items-start gap-3 mb-4">
                <div className="text-3xl">🎉</div>
                <div>
                  <h3 className="font-bold text-lg">
                    {totalMatches} potential match{totalMatches !== 1 ? "es" : ""} found!
                  </h3>
                  <p className="text-sm text-[var(--fg-secondary)]">
                    Scanned {matches.totalEdges} connections in {matches.processingTimeMs}ms
                  </p>
                </div>
              </div>

              {/* 1:1 Direct & Close matches */}
              {matches.directMatches.length > 0 && (
                <div className="mb-5">
                  <h4 className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider mb-3">
                    1:1 Matches
                  </h4>
                  <div className="space-y-3">
                    {matches.directMatches.map((m, i) => (
                      <div
                        key={i}
                        className="rounded-xl bg-[var(--bg-secondary)] p-4 agent-step"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm">{m.theirName}</span>
                            {m.theirVerified && (
                              <span className="text-xs text-[var(--accent)]">✓</span>
                            )}
                            <span className="text-xs text-[var(--muted)]">
                              ★ {m.theirTrust.toFixed(1)}
                            </span>
                          </div>
                          <span
                            className={`pill text-xs ${
                              m.type === "exact"
                                ? "bg-[var(--success-light)] text-[var(--success)]"
                                : "bg-[var(--warm-light)] text-[var(--warm)]"
                            }`}
                          >
                            {m.type === "exact" ? "Exact match" : "Close match"}{" "}
                            {Math.round(m.confidence * 100)}%
                          </span>
                        </div>

                        {/* What they offer / what you offer */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-2">
                          {m.theyOffer && m.youNeed && (
                            <div className="flex items-center gap-1.5">
                              <span className="text-[var(--accent)]">←</span>
                              <span className="text-[var(--fg-secondary)]">
                                They offer <strong className="text-[var(--fg)]">{m.theyOffer}</strong> for your &quot;{m.youNeed}&quot;
                              </span>
                            </div>
                          )}
                          {m.youOffer && m.theyNeed && (
                            <div className="flex items-center gap-1.5">
                              <span className="text-[var(--primary)]">→</span>
                              <span className="text-[var(--fg-secondary)]">
                                You offer <strong className="text-[var(--fg)]">{m.youOffer}</strong> for their &quot;{m.theyNeed}&quot;
                              </span>
                            </div>
                          )}
                        </div>

                        <p className="text-xs text-[var(--muted)] italic">{m.reasoning}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Multi-party ring matches */}
              {matches.ringMatches.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider mb-3">
                    Trade Rings
                  </h4>
                  <div className="space-y-3">
                    {matches.ringMatches.map((ring, i) => (
                      <div
                        key={i}
                        className="rounded-xl bg-[var(--bg-secondary)] p-4 ring-glow agent-step"
                        style={{ animationDelay: `${(matches.directMatches.length + i) * 0.1}s` }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">🔄</span>
                            <span className="font-semibold text-sm">
                              {ring.participantCount}-way trade ring
                            </span>
                          </div>
                          <span className="pill bg-[var(--primary-light)] text-[var(--primary)] text-xs">
                            {Math.round(ring.avgConfidence * 100)}% confidence
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-1 text-xs">
                          {ring.participants.map((p, pi) => (
                            <span key={p.id} className="flex items-center gap-1">
                              <span className="inline-flex items-center gap-1 rounded-lg bg-[var(--card)] px-2 py-1 border border-[var(--card-border)]">
                                <strong>{p.name}</strong>
                                <span className="text-[var(--muted)]">gives</span>
                                <span className="text-[var(--primary)]">{p.gives}</span>
                              </span>
                              {pi < ring.participants.length - 1 && (
                                <span className="text-[var(--muted)] mx-0.5">→</span>
                              )}
                            </span>
                          ))}
                          <span className="text-[var(--muted)] mx-0.5">↩</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-4 pt-3 border-t border-[var(--card-border)] flex items-center justify-between">
                <span className="text-xs text-[var(--muted)]">
                  These matches will be proposed during the next heartbeat or you can view them now.
                </span>
                <a
                  href="/matches"
                  className="text-xs font-medium text-[var(--primary)] hover:underline"
                >
                  View all matches →
                </a>
              </div>
            </div>
          ) : (
            <div className="match-banner card p-5">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🔍</div>
                <div>
                  <h3 className="font-semibold">No matches found yet</h3>
                  <p className="text-sm text-[var(--fg-secondary)] mt-1">
                    Your need has been posted. The AI will keep looking and check again
                    during the next daily heartbeat at 06:00 CET. As more neighbours
                    join, your chances of finding a match increase.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Examples */}
      {!matches && !scanning && (
        <div className="card mt-6 p-5">
          <h3 className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider mb-3">
            Example needs
          </h3>
          <div className="space-y-2 text-sm">
            {[
              "I need help filing my personal taxes this month — it's due soon",
              "I need someone to walk my dog 3 times a week",
              "I need my apartment deep-cleaned before a family visit",
              "I need a website built for my small bakery",
              "I need my bike fixed — flat tire and slipping gears",
            ].map((ex, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setRawNeed(ex)}
                className="block w-full text-left rounded-xl bg-[var(--bg-secondary)] p-3 hover:bg-[var(--card-hover)] transition-colors cursor-pointer"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
