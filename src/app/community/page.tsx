"use client";

import { useState, useEffect } from "react";
import { UserProfile } from "@/lib/types";

export default function CommunityPage() {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/profiles")
      .then((res) => res.json())
      .then((data) => setProfiles(data.profiles || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Community</h1>
        <p className="text-[var(--fg-secondary)]">
          Meet your {profiles.length} neighbours. Everyone has something to offer — browse profiles or head to the{" "}
          <a href="/marketplace" className="text-[var(--primary)] underline">marketplace</a>{" "}
          to trade.
        </p>
      </div>

      {loading && (
        <div className="text-center py-12 text-[var(--muted)]">Loading...</div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {profiles.map((p) => (
          <a
            key={p.id}
            href="/marketplace"
            className="card p-4 text-center hover:border-[var(--primary)] cursor-pointer transition-all"
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold mx-auto mb-2"
              style={{ backgroundColor: p.avatarColor || "var(--primary)" }}
            >
              {p.userName.charAt(0)}
            </div>
            <div className="font-semibold text-sm">{p.userName}</div>
            <div className="text-xs text-[var(--muted)] mb-1">{p.neighborhood}</div>
            <div className="text-xs text-[var(--fg-secondary)] mb-2">
              ★ {p.trustScore.toFixed(1)}
              {p.verified && " ✓"}
            </div>
            <div className="flex flex-wrap justify-center gap-1">
              {p.offerings.slice(0, 2).map((o) => (
                <span key={o.id} className="pill bg-[var(--primary-light)] text-[var(--primary)] text-[10px]">
                  {o.skill.split(" ").slice(0, 2).join(" ")}
                </span>
              ))}
              {p.offerings.length > 2 && (
                <span className="pill bg-[var(--bg-secondary)] text-[var(--muted)] text-[10px]">
                  +{p.offerings.length - 2}
                </span>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
