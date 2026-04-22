"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";

export default function NavBar() {
  const { profile, loading, signOut } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadNotifications() {
      if (!profile) {
        setUnreadCount(0);
        return;
      }

      try {
        const res = await fetch(`/api/notifications?profileId=${profile.id}&unreadOnly=true`);
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled) {
          setUnreadCount(data.unreadCount || 0);
        }
      } catch {
        if (!cancelled) setUnreadCount(0);
      }
    }

    loadNotifications();
    const interval = window.setInterval(loadNotifications, 15_000);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [profile]);

  return (
    <nav className="border-b border-[var(--card-border)] bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="mx-auto max-w-5xl px-5 py-3.5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-[var(--primary)] flex items-center justify-center text-white font-bold text-sm shadow-sm">
            N
          </div>
          <span className="font-semibold text-lg tracking-tight relative">
            <span className="group-hover:opacity-0 transition-opacity duration-200">Naibour</span>
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[var(--primary)]">Szomszéd</span>
          </span>
        </Link>
        <div className="flex items-center gap-1">
          <Link
            href="/"
            className="px-3.5 py-2 rounded-lg text-sm text-[var(--fg-secondary)] hover:text-[var(--fg)] hover:bg-[var(--bg-secondary)] transition-all"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="px-3.5 py-2 rounded-lg text-sm text-[var(--fg-secondary)] hover:text-[var(--fg)] hover:bg-[var(--bg-secondary)] transition-all"
          >
            About
          </Link>
          <Link
            href="/marketplace"
            className="px-3.5 py-2 rounded-lg text-sm text-[var(--fg-secondary)] hover:text-[var(--fg)] hover:bg-[var(--bg-secondary)] transition-all"
          >
            Marketplace
          </Link>

          {/* Only show "Post a Need" when signed in */}
          {!loading && profile && (
            <Link
              href="/post"
              className="px-3.5 py-2 rounded-lg text-sm text-[var(--fg-secondary)] hover:text-[var(--fg)] hover:bg-[var(--bg-secondary)] transition-all"
            >
              Post a Need
            </Link>
          )}

          <Link
            href="/matches"
            className="px-3.5 py-2 rounded-lg text-sm text-[var(--fg-secondary)] hover:text-[var(--fg)] hover:bg-[var(--bg-secondary)] transition-all"
          >
            Trade Rings
          </Link>
          {!loading && profile && (
            <Link
              href="/notifications"
              className="px-3.5 py-2 rounded-lg text-sm text-[var(--fg-secondary)] hover:text-[var(--fg)] hover:bg-[var(--bg-secondary)] transition-all"
            >
              Notifications{unreadCount > 0 ? ` (${unreadCount})` : ""}
            </Link>
          )}
          {/* Auth-aware CTA */}
          {!loading && !profile && (
            <>
              <Link
                href="/signin"
                className="px-3.5 py-2 rounded-lg text-sm text-[var(--fg-secondary)] hover:text-[var(--fg)] hover:bg-[var(--bg-secondary)] transition-all"
              >
                Sign in
              </Link>
              <Link
                href="/onboarding"
                className="ml-2 btn-primary text-sm !py-2 !px-4"
              >
                Join Naibour
              </Link>
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
