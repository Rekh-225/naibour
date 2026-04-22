import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function GET(request: NextRequest) {
  const profileId = request.nextUrl.searchParams.get("profileId");
  const unreadOnly = request.nextUrl.searchParams.get("unreadOnly") === "true";

  if (!profileId) {
    return NextResponse.json({ error: "profileId is required" }, { status: 400 });
  }

  const notifications = store.getNotificationsForProfile(profileId, unreadOnly);
  const unreadCount = store.getNotificationsForProfile(profileId, true).length;

  return NextResponse.json({ notifications, unreadCount });
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { profileId, notificationId, markAll } = body;

    if (!profileId) {
      return NextResponse.json({ error: "profileId is required" }, { status: 400 });
    }

    if (markAll) {
      const updated = store.markAllNotificationsRead(profileId);
      return NextResponse.json({ updated, message: "All notifications marked as read." });
    }

    if (!notificationId) {
      return NextResponse.json({ error: "notificationId is required" }, { status: 400 });
    }

    const notification = store.markNotificationRead(notificationId, profileId);
    if (!notification) {
      return NextResponse.json({ error: "Notification not found" }, { status: 404 });
    }

    return NextResponse.json({ notification });
  } catch (error) {
    console.error("Notification update error:", error);
    return NextResponse.json({ error: "Failed to update notification" }, { status: 500 });
  }
}
