import { NextResponse } from "next/server";
import { listBlockedWindows } from "@/lib/availability";
import { listBookings } from "@/lib/bookings-store";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date") || undefined;

  if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "Invalid date." }, { status: 400 });
  }

  const bookings = await listBookings();
  const blocked = listBlockedWindows(bookings, date);

  return NextResponse.json({ blocked });
}
