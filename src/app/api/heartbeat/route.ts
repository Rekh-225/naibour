import { NextResponse } from "next/server";
import { runHeartbeat } from "@/lib/agent";
import { store } from "@/lib/store";

export async function POST() {
  try {
    const result = await runHeartbeat();

    return NextResponse.json({
      ...result,
      message: `Heartbeat complete: found ${result.ringsFound} multi-party trade rings`,
    });
  } catch (error) {
    console.error("Heartbeat error:", error);
    return NextResponse.json(
      { error: "Heartbeat failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const lastRun = store.lastHeartbeat;
  const multiTrades = store.getAllMultiTrades();

  // Next run: tomorrow 6 AM Budapest
  const now = new Date();
  const next = new Date(now);
  next.setDate(next.getDate() + (now.getHours() >= 6 ? 1 : 0));
  next.setHours(6, 0, 0, 0);

  return NextResponse.json({
    lastRun,
    nextRun: next.toISOString(),
    pendingRings: multiTrades.filter((t) => t.status === "pending_all").length,
    executedRings: multiTrades.filter((t) => t.status === "executed").length,
    schedule: "Daily at 06:00 Budapest time (CET/CEST)",
  });
}
