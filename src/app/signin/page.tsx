"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { UserProfile } from "@/lib/types";

export default function SignInPage() {
  const { profile, signIn } = useAuth();
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [signingIn, setSigningIn] = useState(false);

  useEffect(() => {
    fetch("/api/profiles")
      .then((r) => r.json())
      .then((data) => setProfiles(data.profiles || []))
      .finally(() => setLoading(false));
  }, []);

  // Already signed in — redirect
  if (profile) {
    return (
      <div className="mx-auto max-w-md px-5 py-24 text-center">
        <div className="text-5xl mb-4">👋</div>
        <h1 className="text-2xl font-bold mb-3">
          You&apos;re signed in as {profile.userName}
        </h1>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
          <a href="/post" className="btn-primary px-6 py-2.5">
            Post what you need
          </a>
          <a href="/marketplace" className="btn-secondary">
            Browse marketplace
          </a>
        </div>
      </div>
    );
  }

  const handleSignIn = async (profileId: string) => {
    setSigningIn(true);
    const ok = await signIn(profileId);
    if (ok) {
      window.location.href = "/post";
    }
    setSigningIn(false);
  };

  return (
    <div className="mx-auto max-w-2xl px-5 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Sign in</h1>
        <p className="text-[var(--fg-secondary)]">
          Select your profile to continue. In the full app this will use secure authentication.
        </p>
      </div>

      {loading && (
        <div className="text-center py-12 text-[var(--muted)]">Loading profiles...</div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {profiles.map((p) => (
          <button
            key={p.id}
            onClick={() => handleSignIn(p.id)}
            disabled={signingIn}
            className="card p-4 text-left hover:border-[var(--primary)] cursor-pointer transition-all disabled:opacity-50"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shrink-0"
                style={{ backgroundColor: p.avatarColor || "var(--primary)" }}
              >
                {p.userName.charAt(0)}
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-sm">{p.userName}</div>
                <div className="text-xs text-[var(--muted)]">
                  {p.neighborhood} · ★ {p.trustScore.toFixed(1)}
                  {p.verified && " ✓"}
                </div>
                <div className="text-xs text-[var(--fg-secondary)] mt-0.5 truncate">
                  {p.offerings.slice(0, 3).map((o) => o.skill).join(", ")}
                  {p.offerings.length > 3 && ` +${p.offerings.length - 3}`}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-[var(--muted)]">
          New here?{" "}
          <a href="/onboarding" className="text-[var(--primary)] hover:underline font-medium">
            Create a profile →
          </a>
        </p>
      </div>
    </div>
  );
}
