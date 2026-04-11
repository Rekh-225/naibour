import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/store";
import { buildCompatibilityGraph, findTradeRings } from "@/lib/matcher";
import { GraphEdge } from "@/lib/types";

export interface DirectMatch {
  type: "exact" | "close";
  theirProfileId: string;
  theirName: string;
  theirTrust: number;
  theirVerified: boolean;
  theyOffer: string;
  youNeed: string;
  youOffer: string;
  theyNeed: string;
  confidence: number;
  reasoning: string;
}

export interface RingMatch {
  participantCount: number;
  participants: Array<{ id: string; name: string; gives: string; gets: string }>;
  avgConfidence: number;
  score: number;
}

export interface InstantMatchResult {
  directMatches: DirectMatch[];
  ringMatches: RingMatch[];
  totalEdges: number;
  processingTimeMs: number;
}

export async function GET(request: NextRequest) {
  const profileId = request.nextUrl.searchParams.get("profileId");
  if (!profileId) {
    return NextResponse.json({ error: "profileId required" }, { status: 400 });
  }

  const profile = store.getProfile(profileId);
  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  const start = Date.now();
  const posts = store.getAllPosts();

  if (posts.length < 2) {
    return NextResponse.json({
      directMatches: [],
      ringMatches: [],
      totalEdges: 0,
      processingTimeMs: Date.now() - start,
    } as InstantMatchResult);
  }

  const edges = await buildCompatibilityGraph(posts);
  const myPost = posts.find((p) => p.id === profileId);
  if (!myPost) {
    return NextResponse.json({
      directMatches: [],
      ringMatches: [],
      totalEdges: edges.length,
      processingTimeMs: Date.now() - start,
    } as InstantMatchResult);
  }

  // ── 1:1 matches: edges TO me (someone offers what I need) ──
  const inbound = edges.filter((e) => e.toUserId === profileId);
  // ── 1:1 matches: edges FROM me (I offer what someone needs) ──
  const outbound = edges.filter((e) => e.fromUserId === profileId);

  // Find reciprocal pairs (someone offers what I need AND needs what I offer)
  const directMatches: DirectMatch[] = [];
  const seenPairs = new Set<string>();

  for (const inEdge of inbound) {
    const counterpart = outbound.find((o) => o.toUserId === inEdge.fromUserId);
    const partnerId = inEdge.fromUserId;
    if (seenPairs.has(partnerId)) continue;
    seenPairs.add(partnerId);

    const partner = store.getProfile(partnerId);
    if (!partner) continue;

    const combinedConf = counterpart
      ? (inEdge.confidence + counterpart.confidence) / 2
      : inEdge.confidence;

    directMatches.push({
      type: combinedConf >= 0.7 ? "exact" : "close",
      theirProfileId: partnerId,
      theirName: partner.userName,
      theirTrust: partner.trustScore,
      theirVerified: partner.verified,
      theyOffer: inEdge.fromOffer,
      youNeed: inEdge.toNeed,
      youOffer: counterpart?.fromOffer || profile.offerings[0]?.skill || "",
      theyNeed: counterpart?.toNeed || "",
      confidence: Math.round(combinedConf * 100) / 100,
      reasoning: counterpart
        ? `Two-way match: they can "${inEdge.fromOffer}" for your "${inEdge.toNeed}", and you can "${counterpart.fromOffer}" for their "${counterpart.toNeed}"`
        : `They offer "${inEdge.fromOffer}" which matches your need for "${inEdge.toNeed}". ${inEdge.reasoning}`,
    });
  }

  // Also add outbound-only matches (I can help someone but no inbound edge yet)
  for (const outEdge of outbound) {
    const partnerId = outEdge.toUserId;
    if (seenPairs.has(partnerId)) continue;
    seenPairs.add(partnerId);

    const partner = store.getProfile(partnerId);
    if (!partner) continue;

    directMatches.push({
      type: outEdge.confidence >= 0.7 ? "exact" : "close",
      theirProfileId: partnerId,
      theirName: partner.userName,
      theirTrust: partner.trustScore,
      theirVerified: partner.verified,
      theyOffer: "",
      youNeed: "",
      youOffer: outEdge.fromOffer,
      theyNeed: outEdge.toNeed,
      confidence: Math.round(outEdge.confidence * 100) / 100,
      reasoning: `You can "${outEdge.fromOffer}" for their "${outEdge.toNeed}". ${outEdge.reasoning}`,
    });
  }

  directMatches.sort((a, b) => b.confidence - a.confidence);

  // ── Rings involving me ──
  const rings = findTradeRings(edges, posts);
  const myRings = rings.filter((r) => r.participants.includes(profileId));

  const ringMatches: RingMatch[] = myRings.map((ring) => {
    const participants = ring.participants.map((uid) => {
      const p = store.getProfile(uid);
      const giveEdge = ring.edges.find((e) => e.fromUserId === uid);
      const getEdge = ring.edges.find((e) => e.toUserId === uid);
      return {
        id: uid,
        name: p?.userName || uid,
        gives: giveEdge?.fromOffer || "?",
        gets: getEdge?.toNeed || "?",
      };
    });
    return {
      participantCount: ring.participants.length,
      participants,
      avgConfidence: ring.averageConfidence,
      score: ring.score,
    };
  });

  return NextResponse.json({
    directMatches: directMatches.slice(0, 10),
    ringMatches: ringMatches.slice(0, 5),
    totalEdges: edges.length,
    processingTimeMs: Date.now() - start,
  } as InstantMatchResult);
}
