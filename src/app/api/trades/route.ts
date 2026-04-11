import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/store";
import { DirectTrade, BarterOffer } from "@/lib/types";

export async function GET() {
  const trades = store.getAllTrades();
  return NextResponse.json({
    trades,
    count: trades.length,
    byType: {
      direct: trades.filter((t) => t.type === "direct").length,
      barter: trades.filter((t) => t.type === "barter").length,
      multi: trades.filter((t) => t.type === "multi").length,
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type } = body;

    if (type === "direct") {
      const { listingId, fromUserId, offerSkill, needSkill } = body;
      if (!listingId || !fromUserId || !offerSkill || !needSkill) {
        return NextResponse.json(
          { error: "listingId, fromUserId, offerSkill, and needSkill are required" },
          { status: 400 }
        );
      }

      const listing = store.getPost(listingId);
      if (!listing) {
        return NextResponse.json({ error: "Listing not found" }, { status: 404 });
      }

      const trade: DirectTrade = {
        id: `direct-${Date.now()}`,
        type: "direct",
        listingId,
        fromUserId,
        toUserId: listing.id,
        offerSkill,
        needSkill,
        status: "accepted",
        createdAt: new Date().toISOString(),
      };

      store.addTrade(trade);
      return NextResponse.json({ trade, message: "Direct trade created and accepted!" });
    }

    if (type === "barter") {
      const { listingId, fromUserId, proposedOffer, inReturnFor, message } = body;
      if (!listingId || !fromUserId || !proposedOffer || !inReturnFor) {
        return NextResponse.json(
          { error: "listingId, fromUserId, proposedOffer, and inReturnFor are required" },
          { status: 400 }
        );
      }

      const listing = store.getPost(listingId);
      if (!listing) {
        return NextResponse.json({ error: "Listing not found" }, { status: 404 });
      }

      const trade: BarterOffer = {
        id: `barter-${Date.now()}`,
        type: "barter",
        listingId,
        fromUserId,
        toUserId: listing.id,
        proposedOffer,
        inReturnFor,
        message: message || undefined,
        status: "proposed",
        createdAt: new Date().toISOString(),
      };

      store.addTrade(trade);
      return NextResponse.json({ trade, message: "Barter offer sent! Waiting for response." });
    }

    return NextResponse.json({ error: "type must be 'direct' or 'barter'" }, { status: 400 });
  } catch (error) {
    console.error("Trade creation error:", error);
    return NextResponse.json({ error: "Failed to create trade" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { tradeId, action } = body;

    if (!tradeId || !["accept", "decline"].includes(action)) {
      return NextResponse.json(
        { error: "tradeId and action (accept/decline) are required" },
        { status: 400 }
      );
    }

    const trade = store.getTrade(tradeId);
    if (!trade) {
      return NextResponse.json({ error: "Trade not found" }, { status: 404 });
    }

    store.updateTrade(tradeId, {
      status: action === "accept" ? "accepted" : "declined",
    });

    return NextResponse.json({
      trade: store.getTrade(tradeId),
      message: `Trade ${tradeId} ${action}ed`,
    });
  } catch (error) {
    console.error("Trade update error:", error);
    return NextResponse.json({ error: "Failed to update trade" }, { status: 500 });
  }
}
