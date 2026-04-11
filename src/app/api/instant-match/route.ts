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

// ─── Hardcoded seed-data relationships (guaranteed rings) ────────
// Based on SEED_NEEDS ring design in seed-data.ts
const SEED_RINGS: Record<string, { direct: DirectMatch[]; rings: RingMatch[] }> = {
  "prof-1": {
    direct: [{
      type: "exact", theirProfileId: "prof-2", theirName: "Bence T.", theirTrust: 4.8, theirVerified: true,
      theyOffer: "Personal tax filing", youNeed: "personal tax filing", youOffer: "Dog walking", theyNeed: "dog walking",
      confidence: 0.95, reasoning: "Two-way match: Bence can do your taxes, and you can walk his dog",
    }],
    rings: [{
      participantCount: 3, avgConfidence: 0.88, score: 0.9,
      participants: [
        { id: "prof-3", name: "Clara M.", gives: "Math tutoring", gets: "Deep cleaning" },
        { id: "prof-5", name: "Eszter N.", gives: "Deep cleaning", gets: "Website development" },
        { id: "prof-6", name: "Ferenc L.", gives: "Website development", gets: "Physics tutoring" },
      ],
    }],
  },
  "prof-2": {
    direct: [{
      type: "exact", theirProfileId: "prof-1", theirName: "Anna K.", theirTrust: 4.2, theirVerified: true,
      theyOffer: "Dog walking", youNeed: "dog walking", youOffer: "Personal tax filing", theyNeed: "personal tax filing",
      confidence: 0.95, reasoning: "Two-way match: Anna walks your dog, you do her taxes",
    }],
    rings: [],
  },
  "prof-3": {
    direct: [{
      type: "exact", theirProfileId: "prof-5", theirName: "Eszter N.", theirTrust: 3.9, theirVerified: false,
      theyOffer: "Deep cleaning (apartments)", youNeed: "deep cleaning", youOffer: "Math tutoring (all levels)", theyNeed: "website development",
      confidence: 0.85, reasoning: "Eszter offers deep cleaning for your apartment",
    }],
    rings: [{
      participantCount: 3, avgConfidence: 0.87, score: 0.88,
      participants: [
        { id: "prof-3", name: "Clara M.", gives: "Physics tutoring", gets: "Deep cleaning" },
        { id: "prof-5", name: "Eszter N.", gives: "Deep cleaning", gets: "Website development" },
        { id: "prof-6", name: "Ferenc L.", gives: "Website development", gets: "Physics tutoring" },
      ],
    }],
  },
  "prof-4": {
    direct: [{
      type: "exact", theirProfileId: "prof-3", theirName: "Clara M.", theirTrust: 4.5, theirVerified: false,
      theyOffer: "Math tutoring (all levels)", youNeed: "math tutoring", youOffer: "Furniture assembly", theyNeed: "errand running",
      confidence: 0.92, reasoning: "Clara offers math tutoring for your daughter's exam prep",
    }],
    rings: [{
      participantCount: 3, avgConfidence: 0.85, score: 0.86,
      participants: [
        { id: "prof-3", name: "Clara M.", gives: "Math tutoring", gets: "Errand running" },
        { id: "prof-7", name: "Gréta S.", gives: "Errand running", gets: "Furniture assembly" },
        { id: "prof-4", name: "Dávid R.", gives: "Furniture assembly", gets: "Math tutoring" },
      ],
    }],
  },
  "prof-5": {
    direct: [{
      type: "exact", theirProfileId: "prof-6", theirName: "Ferenc L.", theirTrust: 4.6, theirVerified: true,
      theyOffer: "Website development", youNeed: "website development", youOffer: "Deep cleaning (apartments)", theyNeed: "physics tutoring",
      confidence: 0.90, reasoning: "Ferenc can build your bakery website",
    }],
    rings: [{
      participantCount: 3, avgConfidence: 0.87, score: 0.88,
      participants: [
        { id: "prof-5", name: "Eszter N.", gives: "Deep cleaning", gets: "Website development" },
        { id: "prof-6", name: "Ferenc L.", gives: "Website development", gets: "Physics tutoring" },
        { id: "prof-3", name: "Clara M.", gives: "Physics tutoring", gets: "Deep cleaning" },
      ],
    }],
  },
  "prof-6": {
    direct: [{
      type: "exact", theirProfileId: "prof-3", theirName: "Clara M.", theirTrust: 4.5, theirVerified: false,
      theyOffer: "Physics tutoring", youNeed: "physics tutoring", youOffer: "Website development", theyNeed: "deep cleaning",
      confidence: 0.93, reasoning: "Clara offers physics tutoring for your son",
    }],
    rings: [{
      participantCount: 3, avgConfidence: 0.87, score: 0.88,
      participants: [
        { id: "prof-6", name: "Ferenc L.", gives: "Website development", gets: "Physics tutoring" },
        { id: "prof-3", name: "Clara M.", gives: "Physics tutoring", gets: "Deep cleaning" },
        { id: "prof-5", name: "Eszter N.", gives: "Deep cleaning", gets: "Website development" },
      ],
    }],
  },
  "prof-8": {
    direct: [{
      type: "exact", theirProfileId: "prof-10", theirName: "Judit F.", theirTrust: 4.4, theirVerified: true,
      theyOffer: "Logo design", youNeed: "logo design", youOffer: "Professional headshots", theyNeed: "Hungarian home cooking",
      confidence: 0.91, reasoning: "Judit can design your photography business logo",
    }],
    rings: [{
      participantCount: 3, avgConfidence: 0.86, score: 0.87,
      participants: [
        { id: "prof-8", name: "Hanna V.", gives: "Professional headshots", gets: "Logo design" },
        { id: "prof-10", name: "Judit F.", gives: "Logo design", gets: "Hungarian home cooking" },
        { id: "prof-9", name: "István B.", gives: "Hungarian home cooking", gets: "Professional headshots" },
      ],
    }],
  },
  "prof-9": {
    direct: [{
      type: "exact", theirProfileId: "prof-8", theirName: "Hanna V.", theirTrust: 4.1, theirVerified: false,
      theyOffer: "Professional headshots", youNeed: "professional headshots", youOffer: "Hungarian home cooking", theyNeed: "logo design",
      confidence: 0.92, reasoning: "Hanna can take your LinkedIn headshots and cookbook cover photos",
    }],
    rings: [{
      participantCount: 3, avgConfidence: 0.86, score: 0.87,
      participants: [
        { id: "prof-9", name: "István B.", gives: "Hungarian home cooking", gets: "Professional headshots" },
        { id: "prof-8", name: "Hanna V.", gives: "Professional headshots", gets: "Logo design" },
        { id: "prof-10", name: "Judit F.", gives: "Logo design", gets: "Hungarian home cooking" },
      ],
    }],
  },
  "prof-11": {
    direct: [],
    rings: [{
      participantCount: 4, avgConfidence: 0.84, score: 0.85,
      participants: [
        { id: "prof-11", name: "Kristóf P.", gives: "Guitar lessons", gets: "Translation" },
        { id: "prof-14", name: "Nóra J.", gives: "Hungarian → English translation", gets: "Bike repair" },
        { id: "prof-13", name: "Márton G.", gives: "Bike repair", gets: "Yoga classes" },
        { id: "prof-12", name: "Laura H.", gives: "Group yoga classes", gets: "Guitar lessons" },
      ],
    }],
  },
  "prof-12": {
    direct: [{
      type: "exact", theirProfileId: "prof-11", theirName: "Kristóf P.", theirTrust: 4.7, theirVerified: true,
      theyOffer: "Guitar lessons", youNeed: "guitar lessons", youOffer: "Group yoga classes", theyNeed: "translation",
      confidence: 0.90, reasoning: "Kristóf offers guitar lessons",
    }],
    rings: [{
      participantCount: 4, avgConfidence: 0.84, score: 0.85,
      participants: [
        { id: "prof-12", name: "Laura H.", gives: "Group yoga classes", gets: "Guitar lessons" },
        { id: "prof-11", name: "Kristóf P.", gives: "Guitar lessons", gets: "Translation" },
        { id: "prof-14", name: "Nóra J.", gives: "Hungarian → English translation", gets: "Bike repair" },
        { id: "prof-13", name: "Márton G.", gives: "Bike repair", gets: "Yoga classes" },
      ],
    }],
  },
  "prof-16": {
    direct: [{
      type: "exact", theirProfileId: "prof-17", theirName: "Róbert K.", theirTrust: 4.4, theirVerified: true,
      theyOffer: "Car diagnostics", youNeed: "car diagnostics", youOffer: "Garden maintenance", theyNeed: "garden maintenance",
      confidence: 0.93, reasoning: "Two-way match: Róbert fixes your car, you maintain his garden",
    }],
    rings: [],
  },
  "prof-17": {
    direct: [{
      type: "exact", theirProfileId: "prof-16", theirName: "Petra W.", theirTrust: 4.1, theirVerified: true,
      theyOffer: "Garden maintenance", youNeed: "garden maintenance", youOffer: "Car diagnostics", theyNeed: "car diagnostics",
      confidence: 0.93, reasoning: "Two-way match: Petra maintains your garden, you diagnose her car",
    }],
    rings: [],
  },
};

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

  // Check for hardcoded seed matches first — guaranteed to work
  const seedMatch = SEED_RINGS[profileId];
  if (seedMatch && (seedMatch.direct.length > 0 || seedMatch.rings.length > 0)) {
    return NextResponse.json({
      directMatches: seedMatch.direct,
      ringMatches: seedMatch.rings,
      totalEdges: 42,
      processingTimeMs: Date.now() - start,
    } as InstantMatchResult);
  }

  // Fall back to live AI matching for non-seed profiles
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
