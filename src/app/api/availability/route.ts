import { NextResponse } from "next/server";
import {
  conflictMessage,
  findSlotConflict,
  listBlockedWindows,
} from "@/lib/availability";
import { listBookings } from "@/lib/bookings-store";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date") || undefined;
  const startTime = searchParams.get("startTime") || "";
  const duration = searchParams.get("duration") || "";

  if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "Invalid date." }, { status: 400 });
  }

  const bookings = await listBookings();
  const blocked = listBlockedWindows(bookings, date);

  if (date && startTime && duration) {
    const conflict = findSlotConflict(
      { eventDate: date, startTime, duration },
      bookings,
    );
    if (conflict) {
      return NextResponse.json({
        available: false,
        blocked,
        error: conflictMessage(conflict.window, conflict.booking.status),
      });
    }
    return NextResponse.json({ available: true, blocked });
  }

  return NextResponse.json({ blocked });
}
