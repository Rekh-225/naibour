// Daily 6 AM Budapest cron scheduler for the matching agent heartbeat.
// Runs inside the Node.js server process via Next.js instrumentation.

const CHECK_INTERVAL_MS = 60_000; // check every minute

let schedulerStarted = false;
let lastRunDate: string | null = null;

export function scheduleDailyHeartbeat() {
  if (schedulerStarted) return;
  schedulerStarted = true;

  console.log("[Cron] Naibour heartbeat scheduler started — daily at 06:00 Budapest time");

  setInterval(async () => {
    try {
      const now = new Date();
      // Get current Budapest time
      const budapestStr = now.toLocaleString("en-US", { timeZone: "Europe/Budapest" });
      const budapestNow = new Date(budapestStr);
      const hour = budapestNow.getHours();
      const minute = budapestNow.getMinutes();
      const dateStr = budapestNow.toDateString();

      // Trigger at 6:00 AM Budapest time, once per day
      if (hour === 6 && minute === 0 && lastRunDate !== dateStr) {
        lastRunDate = dateStr;
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
