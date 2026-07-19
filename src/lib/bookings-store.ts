import { promises as fs } from "fs";
import path from "path";
import type { BookingDraft } from "@/lib/booking";
import { conflictMessage, findSlotConflict } from "@/lib/availability";

export type StoredBooking = BookingDraft & {
  id: string;
  createdAt: string;
  status: "new" | "reviewed" | "confirmed" | "declined";
};

export class BookingConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BookingConflictError";
  }
}

/** Confirmed bookings are removed this many days after the event date. */
export const BOOKING_RETENTION_DAYS = 15;

const dataDir = path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "bookings.json");

async function ensureStore() {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(dataFile);
  } catch {
    await fs.writeFile(dataFile, "[]", "utf8");
  }
}

async function readAll() {
  await ensureStore();
  const raw = await fs.readFile(dataFile, "utf8");
  return JSON.parse(raw) as StoredBooking[];
}

async function writeAll(bookings: StoredBooking[]) {
  await ensureStore();
  await fs.writeFile(dataFile, JSON.stringify(bookings, null, 2), "utf8");
}

function startOfTodayUtc() {
  const now = new Date();
  return Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
}

function eventDateUtc(eventDate: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(eventDate);
  if (!match) return null;
  return Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}

/** Drop confirmed bookings whose event was more than RETENTION_DAYS ago. */
export function shouldAutoDelete(booking: StoredBooking, todayUtc = startOfTodayUtc()) {
  if (booking.status !== "confirmed") return false;
  const eventUtc = eventDateUtc(booking.eventDate);
  if (eventUtc === null) return false;
  const cutoff = eventUtc + BOOKING_RETENTION_DAYS * 24 * 60 * 60 * 1000;
  return todayUtc > cutoff;
}

async function purgeExpiredBookings(bookings: StoredBooking[]) {
  const kept = bookings.filter((booking) => !shouldAutoDelete(booking));
  if (kept.length !== bookings.length) {
    await writeAll(kept);
  }
  return kept;
}

export async function listBookings() {
  const parsed = await readAll();
  const purged = await purgeExpiredBookings(parsed);
  return purged.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export async function createBooking(draft: BookingDraft) {
  const bookings = await listBookings();

  const conflict = findSlotConflict(draft, bookings);
  if (conflict) {
    throw new BookingConflictError(
      conflictMessage(conflict.window, conflict.booking.status),
    );
  }

  const booking: StoredBooking = {
    ...draft,
    id: `bk_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    status: "new",
  };
  bookings.unshift(booking);
  await writeAll(bookings);
  return booking;
}

export async function updateBookingStatus(
  id: string,
  status: StoredBooking["status"],
) {
  const bookings = await listBookings();
  const index = bookings.findIndex((item) => item.id === id);
  if (index === -1) return null;

  const current = bookings[index]!;

  if (status === "confirmed") {
    const conflict = findSlotConflict(current, bookings, {
      ignoreId: id,
    });
    if (conflict) {
      throw new BookingConflictError(
        `Cannot confirm — overlaps ${conflict.window.label}. Decline the other request first.`,
      );
    }
  }

  bookings[index] = { ...current, status };
  await writeAll(bookings);
  return bookings[index]!;
}

export async function deleteBooking(id: string) {
  const bookings = await listBookings();
  const next = bookings.filter((item) => item.id !== id);
  if (next.length === bookings.length) return false;
  await writeAll(next);
  return true;
}
