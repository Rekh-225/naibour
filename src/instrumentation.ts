// Next.js instrumentation — runs once when the server starts.
// Used to bootstrap the daily 6 AM cron scheduler.

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { scheduleDailyHeartbeat } = await import("./lib/cron");
    scheduleDailyHeartbeat();
  }
}
