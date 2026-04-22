import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/store";

const SESSION_COOKIE = "naibour_session";

export async function POST(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (token) {
    store.deleteSession(token);
  }

  const response = NextResponse.json({ message: "Signed out" });
  response.cookies.delete(SESSION_COOKIE);
  return response;
}
