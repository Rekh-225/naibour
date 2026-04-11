"use client";

import { useState, useEffect } from "react";
import { UserProfile } from "@/lib/types";

export default function PostNeedPage() {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<string>("");
  const [rawNeed, setRawNeed] = useState("");
  const [urgency, setUrgency] = useState<"low" | "medium" | "high">("medium");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    fetch("/api/profiles")
      .then((r) => r.json())
      .then((data) => {
        setProfiles(data.profiles || []);
        // Check URL for pre-selected profile
        const params = new URLSearchParams(window.location.search);
        const prof = params.get("profile");
        if (prof) setSelectedProfile(prof);
      });
  }, []);

  const profile = profiles.find((p) => p.id === selectedProfile);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProfile || !rawNeed.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profileId: selectedProfile, rawNeed: rawNeed.trim(), urgency }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult({ success: true, message: data.message || "Need posted!" });
        setRawNeed("");
      } else {
        setResult({ success: false, message: data.error || "Failed to post" });
      }
    } catch {
      setResult({ success: false, message: "Network error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-5 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Post what you need</h1>
        <p className="text-[var(--fg-secondary)]">
          Describe what you need in plain language. Your profile shows what you
          can offer in return — neighbours will see both when matching.
        </p>
      </div>

      {/* Profile selector */}
      <div className="card p-5 mb-6">
        <label className="block text-sm font-medium text-[var(--fg-secondary)] mb-2">
          Posting as
        </label>
        <select
          value={selectedProfile}
          onChange={(e) => setSelectedProfile(e.target.value)}
          className="w-full rounded-xl bg-[var(--bg-secondary)] border border-[var(--card-border)] px-3 py-2.5 text-[var(--fg)] focus:outline-none focus:border-[var(--primary)] transition-colors"
        >
          <option value="">Select your profile...</option>
          {profiles.map((p) => (
            <option key={p.id} value={p.id}>
              {p.userName} — {p.neighborhood} ({p.offerings.length} offerings)
            </option>
          ))}
        </select>

        {profile && (
          <div className="mt-3 rounded-xl bg-[var(--bg-secondary)] p-3">
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                style={{ backgroundColor: profile.avatarColor || "var(--primary)" }}
              >
                {profile.userName.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-sm">{profile.userName}</div>
                <div className="text-xs text-[var(--muted)]">★ {profile.trustScore.toFixed(1)} {profile.verified && "✓ Verified"}</div>
              </div>
            </div>
            <div className="text-xs text-[var(--fg-secondary)] mb-2">Your offerings:</div>
            <div className="flex flex-wrap gap-1.5">
              {profile.offerings.map((o) => (
                <span key={o.id} className="pill bg-[var(--accent-light)] text-[var(--accent)]">
                  {o.skill}
                </span>
              ))}
              {profile.openToNegotiation && (
                <span className="pill bg-[var(--warm-light)] text-[var(--warm)]">+ open to requests</span>
              )}
            </div>
          </div>
        )}

        {!selectedProfile && (
          <div className="mt-3 text-sm text-[var(--muted)]">
            Don&apos;t have a profile yet?{" "}
            <a href="/onboarding" className="text-[var(--primary)] hover:underline font-medium">
              Create one first →
            </a>
          </div>
        )}
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
          disabled={loading || !selectedProfile || !rawNeed.trim()}
          className="w-full btn-primary py-3"
        >
          {loading ? "AI is parsing your need..." : "Post need"}
        </button>
      </form>

      {result && (
        <div
          className={`mt-4 rounded-xl p-4 text-sm ${
            result.success
              ? "bg-[var(--success-light)] border border-[var(--success)]/20 text-[var(--success)]"
              : "bg-[var(--danger-light)] border border-[var(--danger)]/20 text-[var(--danger)]"
          }`}
        >
          {result.message}
        </div>
      )}

      {/* Examples */}
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
    </div>
  );
}
