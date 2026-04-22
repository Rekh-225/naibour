// Daily 6 AM Budapest cron scheduler for the matching agent heartbeat.
// Runs inside the Node.js server process via Next.js instrumentation.

const CHECK_INTERVAL_MS = 60_000; // check every minute

const globalCronState = globalThis as unknown as {
  __naibourSchedulerStarted?: boolean;
  __naibourLastRunDate?: string | null;
  __naibourCronInterval?: ReturnType<typeof setInterval>;
};

if (globalCronState.__naibourSchedulerStarted === undefined) {
  globalCronState.__naibourSchedulerStarted = false;
}
if (globalCronState.__naibourLastRunDate === undefined) {
  globalCronState.__naibourLastRunDate = null;
}

function isSchedulerStarted() {
  return Boolean(globalCronState.__naibourSchedulerStarted);
}

export function scheduleDailyHeartbeat() {
  if (isSchedulerStarted()) return;
  globalCronState.__naibourSchedulerStarted = true;

  console.log("[Cron] Naibour heartbeat scheduler started — daily at 06:00 Budapest time");

  globalCronState.__naibourCronInterval = setInterval(async () => {
    try {
      const now = new Date();
      // Get current Budapest time
      const budapestStr = now.toLocaleString("en-US", { timeZone: "Europe/Budapest" });
      const budapestNow = new Date(budapestStr);
      const hour = budapestNow.getHours();
      const minute = budapestNow.getMinutes();
      const dateStr = budapestNow.toDateString();

      // Trigger at 6:00 AM Budapest time, once per day
      if (hour === 6 && minute === 0 && globalCronState.__naibourLastRunDate !== dateStr) {
        globalCronState.__naibourLastRunDate = dateStr;
        console.log("[Cron] Triggering daily 6 AM heartbeat...");
        const { runHeartbeat } = await import("./agent");
        const result = await runHeartbeat();
        console.log(`[Cron] Heartbeat complete: ${result.ringsFound} rings found. Next run: ${result.nextRun}`);
      }
    } catch (err) {
      console.error("[Cron] Heartbeat error:", err);
    }
  }, CHECK_INTERVAL_MS);
}

export function stopDailyHeartbeatScheduler() {
  if (globalCronState.__naibourCronInterval) {
    clearInterval(globalCronState.__naibourCronInterval);
    globalCronState.__naibourCronInterval = undefined;
  }
  globalCronState.__naibourSchedulerStarted = false;
}
