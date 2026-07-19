import type { BookingDraft } from "@/lib/booking";

type BookingLike = Pick<
  BookingDraft,
  "eventDate" | "startTime" | "duration"
> & {
  id?: string;
  status?: string;
};

export type TimeWindow = {
  date: string;
  startMinutes: number;
  endMinutes: number;
  allDay: boolean;
  label: string;
};

/** Statuses that hold a slot. Declined frees it again. */
const BLOCKING_STATUSES = new Set(["new", "reviewed", "confirmed"]);

function parseDurationHours(duration: string) {
  if (duration === "5+") return 5;
  const n = Number(duration);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

function parseTimeToMinutes(time: string) {
  const match = /^(\d{1,2}):(\d{2})$/.exec(time.trim());
  if (!match) return null;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return null;
  return hours * 60 + minutes;
}

function formatMinutes(total: number) {
  const clamped = Math.max(0, Math.min(total, 24 * 60));
  const h = Math.floor(clamped / 60);
  const m = clamped % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** Build a bookable window from date / start / duration. */
export function bookingToWindow(
  booking: Pick<BookingDraft, "eventDate" | "startTime" | "duration">,
): TimeWindow | null {
  if (!booking.eventDate) return null;

  const hours = parseDurationHours(booking.duration);
  const startMinutes = booking.startTime
    ? parseTimeToMinutes(booking.startTime)
    : null;

  // Bookings without a start time lock the whole day.
  if (startMinutes === null) {
    return {
      date: booking.eventDate,
      startMinutes: 0,
      endMinutes: 24 * 60,
      allDay: true,
      label: `${booking.eventDate} (all day)`,
    };
  }

  if (hours <= 0) return null;

  const endMinutes = Math.min(startMinutes + hours * 60, 24 * 60);
  return {
    date: booking.eventDate,
    startMinutes,
    endMinutes,
    allDay: false,
    label: `${booking.eventDate} ${formatMinutes(startMinutes)}–${formatMinutes(endMinutes)}`,
  };
}

function windowsOverlap(a: TimeWindow, b: TimeWindow) {
  if (a.date !== b.date) return false;
  return a.startMinutes < b.endMinutes && b.startMinutes < a.endMinutes;
}

function isBlockingStatus(status: string | undefined) {
  return Boolean(status && BLOCKING_STATUSES.has(status));
}

export function findSlotConflict(
  candidate: Pick<BookingDraft, "eventDate" | "startTime" | "duration">,
  bookings: BookingLike[],
  options?: { ignoreId?: string },
) {
  const candidateWindow = bookingToWindow(candidate);
  if (!candidateWindow) return null;

  for (const booking of bookings) {
    if (!isBlockingStatus(booking.status)) continue;
    if (options?.ignoreId && booking.id === options.ignoreId) continue;

    const taken = bookingToWindow(booking);
    if (!taken) continue;
    if (windowsOverlap(candidateWindow, taken)) {
      return { booking, window: taken };
    }
  }

  return null;
}

/** @deprecated use findSlotConflict */
export const findConfirmedConflict = findSlotConflict;

export function listBlockedWindows(bookings: BookingLike[], date?: string) {
  return bookings
    .filter((booking) => isBlockingStatus(booking.status))
    .map((booking) => {
      const window = bookingToWindow(booking);
      return window ? { booking, window } : null;
    })
    .filter(
      (item): item is { booking: BookingLike; window: TimeWindow } =>
        Boolean(item),
    )
    .filter((item) => (date ? item.window.date === date : true))
    .map((item) => ({
      id: item.booking.id ?? item.window.label,
      date: item.window.date,
      startTime: item.window.allDay
        ? null
        : formatMinutes(item.window.startMinutes),
      endTime: item.window.allDay
        ? null
        : formatMinutes(item.window.endMinutes),
      allDay: item.window.allDay,
      label: item.window.label,
      duration: item.booking.duration,
      status: item.booking.status ?? "new",
    }));
}

/** @deprecated use listBlockedWindows */
export const listConfirmedWindows = listBlockedWindows;

export function conflictMessage(
  window: TimeWindow,
  status?: string,
) {
  const kind =
    status === "confirmed" ? "confirmed booking" : "existing booking request";
  if (window.allDay) {
    return `That date is already taken (${window.date}). Please choose another day.`;
  }
  return `That time overlaps an ${kind} (${window.label}). Please pick another time or date.`;
}
