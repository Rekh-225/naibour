import { NextRequest, NextResponse } from "next/server";
import { runMatchingAgent, acceptMultiTrade, declineMultiTrade } from "@/lib/agent";
import { store } from "@/lib/store";

export async function GET() {
  try {
    const { result, steps } = await runMatchingAgent();

    return NextResponse.json({
      ...result,
      agentSteps: steps,
      message: `Agent discovered ${result.rings.length} trade rings from ${result.totalPostsAnalyzed} posts in ${result.processingTimeMs}ms`,
    });
  } catch (error) {
    console.error("Matching agent error:", error);
    return NextResponse.json(
      { error: "Matching agent failed. Please try again." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ringId, userId, action } = body;

    if (!ringId || !userId || !["accept", "decline"].includes(action)) {
      return NextResponse.json(
        { error: "ringId, userId, and action (accept/decline) are required" },
        { status: 400 }
      );
    }

    const trade =
      action === "accept"
        ? acceptMultiTrade(ringId, userId)
        : declineMultiTrade(ringId, userId);

    if (!trade) {
      return NextResponse.json(
        { error: "Trade ring not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      trade,
      allMultiTrades: store.getAllMultiTrades(),
      message: `${userId} ${action}ed ring ${ringId} (${trade.acceptedBy.length}/${trade.participants.length} accepted)`,
    });
  } catch (error) {
    console.error("Trade action error:", error);
    return NextResponse.json(
      { error: "Failed to process trade action" },
      { status: 500 }
    );
  }
}
