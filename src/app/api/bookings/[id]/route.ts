import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { OWNER_COOKIE, verifyOwnerSessionToken } from "@/lib/auth";
import {
  BookingConflictError,
  deleteBooking,
  updateBookingStatus,
  type StoredBooking,
} from "@/lib/bookings-store";

const statuses: StoredBooking["status"][] = [
  "new",
  "reviewed",
  "confirmed",
  "declined",
];

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const jar = await cookies();
  const ok = await verifyOwnerSessionToken(jar.get(OWNER_COOKIE)?.value);
  if (!ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  let body: { status?: string };
  try {
    body = (await request.json()) as { status?: string };
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const status = body.status as StoredBooking["status"] | undefined;
  if (!status || !statuses.includes(status)) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }

  try {
    const updated = await updateBookingStatus(id, status);
    if (!updated) {
      return NextResponse.json({ error: "Booking not found." }, { status: 404 });
    }
    return NextResponse.json({ booking: updated });
  } catch (error) {
    if (error instanceof BookingConflictError) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }
    throw error;
  }
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const jar = await cookies();
  const ok = await verifyOwnerSessionToken(jar.get(OWNER_COOKIE)?.value);
  if (!ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const removed = await deleteBooking(id);
  if (!removed) {
    return NextResponse.json({ error: "Booking not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
