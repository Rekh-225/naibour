import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/store";

const SESSION_COOKIE = "naibour_session";

export async function GET(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;

  if (!token) {
    return NextResponse.json({ profile: null });
  }

  const session = store.getSession(token);
  if (!session) {
    const response = NextResponse.json({ profile: null });
    response.cookies.delete(SESSION_COOKIE);
    return response;
  }

  const profile = store.getProfile(session.profileId);
  if (!profile) {
    store.deleteSession(token);
    const response = NextResponse.json({ profile: null });
    response.cookies.delete(SESSION_COOKIE);
    return response;
  }

  return NextResponse.json({ profile });
}
