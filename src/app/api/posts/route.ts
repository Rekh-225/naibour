import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/store";
import { runMatchingAgent } from "@/lib/agent";
import { NeedPost, ParseResponse, ParsedSkill } from "@/lib/types";

const CATEGORIES = [
  "finance", "education", "home services", "pet care", "technology",
  "creative services", "food services", "fitness", "maintenance",
  "language services", "elder care", "errands", "consulting", "goods", "other",
];

function localParseNeed(rawNeed: string): ParseResponse {
  const text = rawNeed.toLowerCase();
  const needs: ParsedSkill[] = [];

  // Simple keyword-to-category mapping
  const keywordMap: Record<string, string> = {
    tax: "finance", bookkeep: "finance", account: "finance", budget: "finance",
    tutor: "education", teach: "education", lesson: "education", learn: "education",
    clean: "home services", paint: "home services", repair: "home services", fix: "home services",
    assembl: "home services", plumb: "home services", furnitur: "home services",
    dog: "pet care", cat: "pet care", pet: "pet care", walk: "pet care",
    website: "technology", app: "technology", code: "technology", software: "technology",
    design: "creative services", logo: "creative services", photo: "creative services",
    headshot: "creative services", graphic: "creative services",
    cook: "food services", meal: "food services", food: "food services", bake: "food services",
    yoga: "fitness", fitness: "fitness", gym: "fitness", exercise: "fitness",
    bike: "maintenance", bicycle: "maintenance",
    translat: "language services", hungarian: "language services", english: "language services",
    elder: "elder care", senior: "elder care", grocery: "elder care",
    errand: "errands",
  };

  let category = "other";
  for (const [keyword, cat] of Object.entries(keywordMap)) {
    if (text.includes(keyword)) {
      category = cat;
      break;
    }
  }

  // Extract a concise skill name from the raw text
  const skill = rawNeed.length > 60 ? rawNeed.substring(0, 60).trim() + "..." : rawNeed.trim();
  needs.push({ skill, category });

  return { offers: [], needs, confidence: 0.7 };
}

async function parseNeedSmart(rawNeed: string): Promise<ParseResponse> {
  // Gemini is mandatory for agentic AI matching
  try {
    const { parsePost } = await import("@/lib/gemini");
    const result = await parsePost(rawNeed, "");
    if (result.confidence >= 0.5 && result.needs.length > 0) {
      return result;
    }
  } catch (err) {
    console.error("Gemini parse error (falling back to local):", err);
  }
  return localParseNeed(rawNeed);
}

// GET — return profiles, needs, and the flattened "posts" view
export async function GET() {
  const profiles = store.getAllProfiles();
  const needs = store.getAllNeeds();
  const posts = store.getAllPosts(); // backward-compat flattened view
  return NextResponse.json({ profiles, needs, posts, count: profiles.length });
}

// POST — create a new need post for an existing profile
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { profileId, rawNeed, urgency } = body;

    if (!profileId || !rawNeed) {
      return NextResponse.json(
        { error: "profileId and rawNeed are required" },
        { status: 400 }
      );
    }

    const profile = store.getProfile(profileId);
    if (!profile) {
      return NextResponse.json(
        { error: "Profile not found" },
        { status: 404 }
      );
    }

    const parsed = await parseNeedSmart(rawNeed);

    const newNeed: NeedPost = {
      id: `need-${Date.now()}`,
      profileId,
      rawNeed,
      parsedNeeds: parsed.needs,
      urgency: urgency || "medium",
      status: "open",
      createdAt: new Date().toISOString(),
    };

    store.addNeed(newNeed);

    // Trigger matching agent automatically after new post (fire-and-forget)
    runMatchingAgent().catch((err) =>
      console.error("Auto-matching after post failed:", err)
    );

    return NextResponse.json({
      need: newNeed,
      profile,
      parseConfidence: parsed.confidence,
      message: `Need posted for ${profile.userName}. Matching agent triggered.`,
    });
  } catch (error) {
    console.error("Need creation error:", error);
    return NextResponse.json(
      { error: "Failed to create need post. Please try again." },
      { status: 500 }
    );
  }
}
