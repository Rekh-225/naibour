import { NextResponse } from "next/server";
import { getDatabaseHealth } from "@/lib/db-health";

export async function GET() {
  const db = await getDatabaseHealth();

  return NextResponse.json({
    service: "naibour-api",
    status: db.healthy ? "ok" : "degraded",
    timestamp: new Date().toISOString(),
    database: db,
  });
}
