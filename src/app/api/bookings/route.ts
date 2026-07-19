import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { OWNER_COOKIE, verifyOwnerSessionToken } from "@/lib/auth";
import { emptyBookingDraft, type BookingDraft } from "@/lib/booking";
import {
  BookingConflictError,
  createBooking,
  listBookings,
} from "@/lib/bookings-store";

function isFilledDraft(draft: BookingDraft) {
  return Boolean(
    draft.occasion &&
      draft.eventDate &&
      draft.startTime &&
      draft.city.trim() &&
      draft.duration &&
      draft.booth &&
      draft.firstName.trim() &&
      draft.lastName.trim() &&
      draft.email.trim() &&
      draft.phone.trim(),
  );
}

export async function GET() {
  const jar = await cookies();
  const ok = await verifyOwnerSessionToken(jar.get(OWNER_COOKIE)?.value);
  if (!ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const bookings = await listBookings();
  return NextResponse.json({ bookings });
}

export async function POST(request: Request) {
  let body: Partial<BookingDraft>;
  try {
    body = (await request.json()) as Partial<BookingDraft>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const draft: BookingDraft = {
    ...emptyBookingDraft(),
    ...body,
  };

  if (!isFilledDraft(draft)) {
    return NextResponse.json(
      { error: "Please complete all required booking fields, including start time." },
      { status: 400 },
    );
  }

  try {
    const booking = await createBooking(draft);
    return NextResponse.json({ ok: true, id: booking.id }, { status: 201 });
  } catch (error) {
    if (error instanceof BookingConflictError) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }
    throw error;
  }
}
