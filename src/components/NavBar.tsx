"use client";

import { useAuth } from "@/lib/auth-context";

export default function NavBar() {
  const { profile, loading, signOut } = useAuth();

  return (
    <nav className="border-b border-[var(--card-border)] bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="mx-auto max-w-5xl px-5 py-3.5 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-[var(--primary)] flex items-center justify-center text-white font-bold text-sm shadow-sm">
            N
          </div>
          <span className="font-semibold text-lg tracking-tight relative">
            <span className="group-hover:opacity-0 transition-opacity duration-200">Naibour</span>
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[var(--primary)]">Szomszéd</span>
          </span>
        </a>
        <div className="flex items-center gap-1">
          <a
            href="/marketplace"
            className="px-3.5 py-2 rounded-lg text-sm text-[var(--fg-secondary)] hover:text-[var(--fg)] hover:bg-[var(--bg-secondary)] transition-all"
          >
            Marketplace
          </a>

          {/* Only show "Post a Need" when signed in */}
          {!loading && profile && (
            <a
              href="/post"
              className="px-3.5 py-2 rounded-lg text-sm text-[var(--fg-secondary)] hover:text-[var(--fg)] hover:bg-[var(--bg-secondary)] transition-all"
            >
              Post a Need
            </a>
          )}

          <a
            href="/matches"
            className="px-3.5 py-2 rounded-lg text-sm text-[var(--fg-secondary)] hover:text-[var(--fg)] hover:bg-[var(--bg-secondary)] transition-all"
          >
            Trade Rings
          </a>
          <a
            href="/trust"
            className="px-3.5 py-2 rounded-lg text-sm text-[var(--fg-secondary)] hover:text-[var(--fg)] hover:bg-[var(--bg-secondary)] transition-all"
          >
            Trust
          </a>

          {/* Auth-aware CTA */}
          {!loading && !profile && (
            <>
              <a
                href="/signin"
                className="px-3.5 py-2 rounded-lg text-sm text-[var(--fg-secondary)] hover:text-[var(--fg)] hover:bg-[var(--bg-secondary)] transition-all"
              >
                Sign in
              </a>
              <a
                href="/onboarding"
                className="ml-2 btn-primary text-sm !py-2 !px-4"
              >
                Join Naibour
              </a>
            </>
          )}

          {!loading && profile && (
            <div className="flex items-center gap-2 ml-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--card-border)]">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: profile.avatarColor || "var(--primary)" }}
                >
                  {profile.userName.charAt(0)}
                </div>
                <span className="text-sm font-medium">{profile.userName}</span>
              </div>
              <button
                onClick={signOut}
                className="text-xs text-[var(--muted)] hover:text-[var(--fg)] transition-colors"
                title="Sign out"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
