"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";

type AppNotification = {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  type: "match_found" | "system";
};

export default function NotificationsPage() {
  const { profile, loading } = useAuth();
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  const load = useCallback(async () => {
    if (!profile) return;
    const res = await fetch(`/api/notifications?profileId=${profile.id}`);
    if (!res.ok) return;
    const data = await res.json();
    setNotifications(data.notifications || []);
  }, [profile]);

  useEffect(() => {
    load();
  }, [load]);

  const markAllRead = async () => {
    if (!profile) return;
    await fetch("/api/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profileId: profile.id, markAll: true }),
    });
    load();
  };

  if (!loading && !profile) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-20 text-center">
        <h1 className="text-2xl font-bold mb-2">Notifications</h1>
        <p className="text-[var(--fg-secondary)]">Sign in to see your match notifications.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Notifications</h1>
        {notifications.some((n) => !n.read) && (
          <button className="btn-secondary" onClick={markAllRead}>
            Mark all read
          </button>
        )}
      </div>

      <div className="space-y-3">
        {notifications.length === 0 && (
          <div className="card p-5 text-[var(--muted)]">No notifications yet.</div>
        )}

        {notifications.map((n) => (
          <div key={n.id} className={`card p-4 ${n.read ? "opacity-75" : "border-[var(--primary)]/30"}`}>
            <div className="flex items-center justify-between mb-1">
              <p className="font-semibold">{n.title}</p>
              {!n.read && <span className="pill bg-[var(--primary-light)] text-[var(--primary)]">new</span>}
            </div>
            <p className="text-sm text-[var(--fg-secondary)]">{n.message}</p>
            <p className="text-xs text-[var(--muted)] mt-2">{new Date(n.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
