import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/store";
import { UserProfile, Offering } from "@/lib/types";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (id) {
    const profile = store.getProfile(id);
    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }
    return NextResponse.json({ profile, profiles: [profile], count: 1 });
  }

  const profiles = store.getAllProfiles();
  return NextResponse.json({ profiles, count: profiles.length });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userName, neighborhood, bio, offerings, openToNegotiation, openToCash } = body;

    if (!userName || !offerings || offerings.length === 0) {
      return NextResponse.json(
        { error: "userName and at least one offering are required" },
        { status: 400 }
      );
    }

    const profile: UserProfile = {
      id: `prof-${Date.now()}`,
      userName,
      neighborhood: neighborhood || "Budapest",
      bio: bio || undefined,
      offerings: (offerings as Array<{ skill: string; category: string; description?: string; availability?: string }>).map(
        (o, i) => ({
          id: `o-${Date.now()}-${i}`,
          skill: o.skill,
          category: o.category,
          description: o.description,
          availability: o.availability,
        } as Offering)
      ),
      openToNegotiation: openToNegotiation ?? true,
      openToCash: openToCash ?? false,
      trustScore: 1.0, // new users start at 1.0
      verified: false,
      createdAt: new Date().toISOString(),
    };

    store.addProfile(profile);

    return NextResponse.json({
      profile,
      message: `Welcome to Naibour, ${userName}! You have ${profile.offerings.length} offerings listed.`,
    });
  } catch (error) {
    console.error("Profile creation error:", error);
    return NextResponse.json(
      { error: "Failed to create profile" },
      { status: 500 }
    );
  }
}
