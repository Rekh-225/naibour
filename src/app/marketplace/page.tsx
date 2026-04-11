"use client";

import { useState, useEffect } from "react";
import { UserProfile, NeedPost } from "@/lib/types";

interface NeedWithProfile extends NeedPost {
  profile: UserProfile;
}

export default function MarketplacePage() {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [needs, setNeeds] = useState<NeedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [view, setView] = useState<"needs" | "profiles">("needs");
  const [toast, setToast] = useState<string | null>(null);
  const [barterModal, setBarterModal] = useState<NeedWithProfile | null>(null);
  const [barterOffer, setBarterOffer] = useState("");
  const [barterMsg, setBarterMsg] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetch("/api/posts")
      .then((r) => r.json())
      .then((data) => {
        setProfiles(data.profiles || []);
        setNeeds(data.needs || []);
      })
      .finally(() => setLoading(false));
  }, []);

  const profileMap = new Map(profiles.map((p) => [p.id, p]));

  const needsWithProfile: NeedWithProfile[] = needs
    .filter((n) => n.status === "open")
    .map((n) => ({ ...n, profile: profileMap.get(n.profileId)! }))
    .filter((n) => n.profile);

  const needCategories = [
    "all",
    ...Array.from(new Set(needsWithProfile.flatMap((n) => n.parsedNeeds.map((p) => p.category)))),
  ];

  const offeringCategories = [
    "all",
    ...Array.from(new Set(profiles.flatMap((p) => p.offerings.map((o) => o.category)))),
  ];

  const filteredNeeds =
    filter === "all"
      ? needsWithProfile
      : needsWithProfile.filter((n) => n.parsedNeeds.some((p) => p.category === filter));

  const filteredProfiles =
    filter === "all"
      ? profiles
      : profiles.filter((p) => p.offerings.some((o) => o.category === filter));

  const handleDirectTrade = async (need: NeedWithProfile, offerSkill: string) => {
    try {
      const res = await fetch("/api/trades", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "direct",
          listingId: need.profile.id,
          fromUserId: "current-user",
          offerSkill,
          needSkill: need.rawNeed,
        }),
      });
      if (res.ok) {
        setToast(`Direct trade offered to ${need.profile.userName}!`);
        setTimeout(() => setToast(null), 3000);
      }
    } catch {
      setToast("Failed to create trade");
      setTimeout(() => setToast(null), 3000);
    }
  };

  const handleBarterSubmit = async () => {
    if (!barterModal || !barterOffer) return;
    setSending(true);
    try {
      const res = await fetch("/api/trades", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "barter",
          listingId: barterModal.profile.id,
          fromUserId: "current-user",
          proposedOffer: barterOffer,
          inReturnFor: barterModal.rawNeed,
          message: barterMsg || undefined,
        }),
      });
      if (res.ok) {
        setToast(`Barter offer sent to ${barterModal.profile.userName}!`);
        setBarterModal(null);
        setBarterOffer("");
        setBarterMsg("");
        setTimeout(() => setToast(null), 3000);
      }
    } catch {
      setToast("Failed to send offer");
      setTimeout(() => setToast(null), 3000);
    } finally {
      setSending(false);
    }
  };

  const urgencyStyle = {
    high: "bg-[var(--danger-light)] text-[var(--danger)]",
    medium: "bg-[var(--warm-light)] text-[var(--warm)]",
    low: "bg-[var(--accent-light)] text-[var(--accent)]",
  };

  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Marketplace</h1>
          <p className="text-[var(--fg-secondary)]">
            Turn what you have into what you need. Browse active needs or explore neighbour profiles.
          </p>
        </div>
        <a href="/post" className="btn-primary shrink-0">+ Post a need</a>
      </div>

      {/* View Toggle */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => { setView("needs"); setFilter("all"); }}
          className={`pill cursor-pointer text-sm ${view === "needs" ? "bg-[var(--primary)] text-white" : "bg-[var(--bg-secondary)] text-[var(--fg-secondary)]"}`}
        >
          🔍 Active needs ({needsWithProfile.length})
        </button>
        <button
          onClick={() => { setView("profiles"); setFilter("all"); }}
          className={`pill cursor-pointer text-sm ${view === "profiles" ? "bg-[var(--primary)] text-white" : "bg-[var(--bg-secondary)] text-[var(--fg-secondary)]"}`}
        >
          👥 Neighbour profiles ({profiles.length})
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(view === "needs" ? needCategories : offeringCategories).map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`pill cursor-pointer transition-all ${
              filter === cat
                ? "bg-[var(--fg)] text-white"
                : "bg-[var(--bg-secondary)] text-[var(--fg-secondary)] hover:bg-[var(--card-border)]"
            }`}
          >
            {cat === "all" ? "All" : cat}
          </button>
        ))}
      </div>

      {loading && <div className="text-center py-16 text-[var(--muted)]">Loading...</div>}

      {/* ═══ NEEDS VIEW ═══ */}
      {!loading && view === "needs" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredNeeds.map((need) => (
            <div key={need.id} className="card p-5">
              {/* Profile header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: need.profile.avatarColor || "var(--primary)" }}
                  >
                    {need.profile.userName.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{need.profile.userName}</div>
                    <div className="text-xs text-[var(--muted)]">
                      {need.profile.neighborhood} · ★ {need.profile.trustScore.toFixed(1)}
                      {need.profile.verified && " ✓"}
                    </div>
                  </div>
                </div>
                {need.urgency && (
                  <span className={`pill ${urgencyStyle[need.urgency]}`}>{need.urgency}</span>
                )}
              </div>

              {/* The need */}
              <div className="rounded-xl bg-[var(--bg-secondary)] p-3 mb-3">
                <div className="text-[10px] uppercase tracking-wider text-[var(--muted)] font-medium mb-1">Needs</div>
                <p className="text-sm">{need.rawNeed}</p>
              </div>

              {/* What they offer in return */}
              <div className="rounded-xl bg-[var(--accent-light)] p-3 mb-3">
                <div className="text-[10px] uppercase tracking-wider text-[var(--accent)] font-medium mb-1">
                  Can offer in return ({need.profile.offerings.length} skills)
                </div>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {need.profile.offerings.slice(0, 5).map((o) => (
                    <span key={o.id} className="pill bg-white/60 text-[var(--accent)] text-[10px]">
                      {o.skill}
                    </span>
                  ))}
                  {need.profile.offerings.length > 5 && (
                    <span className="pill bg-white/60 text-[var(--muted)] text-[10px]">
                      +{need.profile.offerings.length - 5} more
                    </span>
                  )}
                  {need.profile.openToNegotiation && (
                    <span className="pill bg-[var(--warm-light)] text-[var(--warm)] text-[10px]">
                      open to requests
                    </span>
                  )}
                  {need.profile.openToCash && (
                    <span className="pill bg-[var(--success-light)] text-[var(--success)] text-[10px]">
                      accepts cash
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleDirectTrade(need, need.profile.offerings[0]?.skill || "help")}
                  className="flex-1 btn-primary text-sm !py-2"
                >
                  ⚡ I can help
                </button>
                <button
                  onClick={() => setBarterModal(need)}
                  className="flex-1 btn-secondary text-sm !py-2"
                >
                  🤝 Make offer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ═══ PROFILES VIEW ═══ */}
      {!loading && view === "profiles" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredProfiles.map((p) => {
            const userNeeds = needs.filter((n) => n.profileId === p.id && n.status === "open");
            return (
              <div key={p.id} className="card p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold"
                    style={{ backgroundColor: p.avatarColor || "var(--primary)" }}
                  >
                    {p.userName.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{p.userName}</div>
                    <div className="text-xs text-[var(--muted)]">
                      {p.neighborhood} · ★ {p.trustScore.toFixed(1)}
                      {p.verified && " ✓ Verified"}
                    </div>
                  </div>
                  {p.openToNegotiation && (
                    <span className="pill bg-[var(--warm-light)] text-[var(--warm)]">flexible</span>
                  )}
                  {p.openToCash && (
                    <span className="pill bg-[var(--success-light)] text-[var(--success)]">💵 cash</span>
                  )}
                </div>
                {p.bio && (
                  <p className="text-sm text-[var(--fg-secondary)] mb-3 italic">{p.bio}</p>
                )}
                <div className="text-[10px] uppercase tracking-wider text-[var(--muted)] font-medium mb-1.5">
                  Offerings ({p.offerings.length})
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {p.offerings.map((o) => (
                    <span key={o.id} className="pill bg-[var(--accent-light)] text-[var(--accent)]">
                      {o.skill}
                    </span>
                  ))}
                </div>
                {userNeeds.length > 0 && (
                  <div className="rounded-xl bg-[var(--bg-secondary)] p-3 text-sm">
                    <div className="text-[10px] uppercase tracking-wider text-[var(--muted)] font-medium mb-1">
                      Active needs ({userNeeds.length})
                    </div>
                    {userNeeds.map((n) => (
                      <div key={n.id} className="text-[var(--fg-secondary)] text-xs mt-1">• {n.rawNeed}</div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {!loading && view === "needs" && filteredNeeds.length === 0 && (
        <div className="text-center py-16 text-[var(--muted)]">
          <div className="text-4xl mb-3">🔍</div>
          <p className="font-semibold">No open needs match this filter</p>
        </div>
      )}

      {/* Barter Modal */}
      {barterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
          <div className="card max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Make a barter offer</h3>
              <button onClick={() => setBarterModal(null)} className="text-[var(--muted)] hover:text-[var(--fg)] text-xl">×</button>
            </div>
            <div className="rounded-xl bg-[var(--bg-secondary)] p-3 mb-4 text-sm">
              <span className="font-semibold">{barterModal.profile.userName}</span> needs:{" "}
              <span className="text-[var(--fg-secondary)]">{barterModal.rawNeed}</span>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-[var(--fg-secondary)] mb-1 block">What you can offer</label>
                <textarea
                  value={barterOffer}
                  onChange={(e) => setBarterOffer(e.target.value)}
                  placeholder="e.g. I can do your taxes this weekend"
                  rows={2}
                  className="w-full rounded-xl bg-[var(--bg-secondary)] border border-[var(--card-border)] px-3 py-2.5 text-sm focus:outline-none focus:border-[var(--primary)] transition-colors resize-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[var(--fg-secondary)] mb-1 block">Note (optional)</label>
                <input
                  type="text"
                  value={barterMsg}
                  onChange={(e) => setBarterMsg(e.target.value)}
                  placeholder="Hey neighbour!"
                  className="w-full rounded-xl bg-[var(--bg-secondary)] border border-[var(--card-border)] px-3 py-2.5 text-sm focus:outline-none focus:border-[var(--primary)] transition-colors"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={handleBarterSubmit} disabled={sending || !barterOffer} className="flex-1 btn-primary text-sm">
                {sending ? "Sending..." : "Send offer"}
              </button>
              <button onClick={() => setBarterModal(null)} className="btn-secondary text-sm">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 card px-6 py-3 text-sm font-medium shadow-lg border-[var(--success)] bg-[var(--success-light)] text-[var(--success)]">
          {toast}
        </div>
      )}
    </div>
  );
}
