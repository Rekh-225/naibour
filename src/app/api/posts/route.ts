import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/store";
import { parsePost } from "@/lib/gemini";
import { NeedPost } from "@/lib/types";

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

    // Parse the need using Gemini AI
    const parsed = await parsePost(rawNeed, "");

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

    return NextResponse.json({
      need: newNeed,
      profile,
      parseConfidence: parsed.confidence,
      message: `Need posted for ${profile.userName}`,
    });
  } catch (error) {
    console.error("Need creation error:", error);
    return NextResponse.json(
      { error: "Failed to create need post. Please try again." },
      { status: 500 }
    );
  }
}
