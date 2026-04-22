"use client";

import { useEffect } from "react";

const AUTO_HEARTBEAT_COOLDOWN_MS = 5 * 60 * 1000;
const LAST_AUTO_HEARTBEAT_KEY = "naibour_last_auto_heartbeat";

export default function HeartbeatAutoRunner() {
  useEffect(() => {
    const runHeartbeat = async () => {
      try {
        const now = Date.now();
        const last = Number(localStorage.getItem(LAST_AUTO_HEARTBEAT_KEY) || "0");
        if (now - last < AUTO_HEARTBEAT_COOLDOWN_MS) return;

        localStorage.setItem(LAST_AUTO_HEARTBEAT_KEY, String(now));
        await fetch("/api/heartbeat", { method: "POST" });
      } catch {
        // Silent fail to avoid disrupting navigation.
      }
    };

    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        runHeartbeat();
      }
    };

    runHeartbeat();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return null;
}
