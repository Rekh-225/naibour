import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/store";

const SESSION_COOKIE = "naibour_session";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const profileId = String(body?.profileId || "").trim();

    if (!profileId) {
      return NextResponse.json({ error: "profileId is required" }, { status: 400 });
    }

    const profile = store.getProfile(profileId);
    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const session = store.createSession(profile.id);

    const response = NextResponse.json({ profile, message: "Signed in" });
    response.cookies.set(SESSION_COOKIE, session.token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: new Date(session.expiresAt),
    });

    return response;
  } catch (error) {
    console.error("Signin error:", error);
    return NextResponse.json({ error: "Failed to sign in" }, { status: 500 });
  }
}
