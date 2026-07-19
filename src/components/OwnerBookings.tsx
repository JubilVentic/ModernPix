"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { boothLabel } from "@/lib/booking";
import type { StoredBooking } from "@/lib/bookings-store";

const statuses: StoredBooking["status"][] = [
  "new",
  "reviewed",
  "confirmed",
  "declined",
];

type StatusFilter = "all" | StoredBooking["status"];

const filterOptions: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "new", label: "New" },
  { value: "reviewed", label: "Reviewed" },
  { value: "confirmed", label: "Confirmed" },
  { value: "declined", label: "Declined" },
];

function formatDate(value: string) {
  try {
    return new Intl.DateTimeFormat("en-PH", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export function OwnerBookings() {
  const router = useRouter();
  const [bookings, setBookings] = useState<StoredBooking[]>([]);
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");

  const counts = statuses.reduce(
    (acc, status) => {
      acc[status] = bookings.filter((b) => b.status === status).length;
      return acc;
    },
    { all: bookings.length } as Record<StatusFilter, number>,
  );

  const visibleBookings =
    filter === "all"
      ? bookings
      : bookings.filter((booking) => booking.status === filter);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/bookings");
      if (response.status === 401) {
        router.replace("/owner/login");
        return;
      }
      const data = (await response.json()) as {
        bookings?: StoredBooking[];
        error?: string;
      };
      if (!response.ok) {
        setError(data.error || "Could not load bookings.");
        setLoading(false);
        return;
      }
      setBookings(data.bookings ?? []);
    } catch {
      setError("Could not load bookings.");
    }
    setLoading(false);
  };

  useEffect(() => {
    void load();
  }, []);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/owner/login");
    router.refresh();
  };

  const setStatus = async (id: string, status: StoredBooking["status"]) => {
    setActionError("");
    const response = await fetch(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const data = (await response.json()) as { error?: string };
    if (!response.ok) {
      setActionError(data.error || "Could not update booking status.");
      await load();
      return;
    }
    setBookings((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item)),
    );
  };

  const removeBooking = async (booking: StoredBooking) => {
    const name = `${booking.firstName} ${booking.lastName}`.trim();
    const ok = window.confirm(
      `Delete booking for ${name} on ${booking.eventDate}? This cannot be undone.`,
    );
    if (!ok) return;

    setActionError("");
    const response = await fetch(`/api/bookings/${booking.id}`, {
      method: "DELETE",
    });
    const data = (await response.json()) as { error?: string };
    if (!response.ok) {
      setActionError(data.error || "Could not delete booking.");
      return;
    }
    setBookings((prev) => prev.filter((item) => item.id !== booking.id));
  };

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-brand-navy">
            Bookings
          </h1>
          <p className="mt-2 text-sm text-brand-navy/65">
            Incoming requests from the public booking form. Any request that
            isn&apos;t <span className="font-semibold">declined</span> holds its
            date, time, and duration. Confirmed bookings auto-delete 15 days
            after the event date.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => void load()}
            className="rounded-full border border-brand-navy/15 px-4 py-2 text-sm font-semibold text-brand-navy transition hover:bg-white"
          >
            Refresh
          </button>
          <button
            type="button"
            onClick={() => void logout()}
            className="rounded-full bg-brand-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-navy/90"
          >
            Sign out
          </button>
        </div>
      </div>

      {loading ? (
        <p className="mt-10 text-sm text-brand-navy/60">Loading bookings…</p>
      ) : null}

      {error ? (
        <p className="mt-10 text-sm font-medium text-brand-magenta">{error}</p>
      ) : null}

      {actionError ? (
        <p className="mt-4 text-sm font-medium text-brand-magenta" role="alert">
          {actionError}
        </p>
      ) : null}

      {!loading && !error && bookings.length > 0 ? (
        <div
          className="mt-8 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filter bookings by status"
        >
          {filterOptions.map((option) => {
            const active = filter === option.value;
            const count = counts[option.value] ?? 0;
            return (
              <button
                key={option.value}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(option.value)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-brand-gradient text-white shadow-sm"
                    : "border border-brand-navy/12 bg-white text-brand-navy hover:border-brand-navy/30"
                }`}
              >
                {option.label}
                <span
                  className={`ml-1.5 tabular-nums ${
                    active ? "text-white/80" : "text-brand-navy/45"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      ) : null}

      {!loading && !error && bookings.length === 0 ? (
        <div className="mt-10 rounded-[1.5rem] bg-white px-6 py-10 text-center shadow-[0_12px_40px_rgba(2,54,129,0.06)]">
          <p className="font-semibold text-brand-navy">No bookings yet</p>
          <p className="mt-2 text-sm text-brand-navy/60">
            When guests submit the booking form, their requests will show up
            here.
          </p>
        </div>
      ) : null}

      {!loading && !error && bookings.length > 0 && visibleBookings.length === 0 ? (
        <div className="mt-10 rounded-[1.5rem] bg-white px-6 py-10 text-center shadow-[0_12px_40px_rgba(2,54,129,0.06)]">
          <p className="font-semibold text-brand-navy">
            No {filter} bookings
          </p>
          <p className="mt-2 text-sm text-brand-navy/60">
            Try another filter, or refresh after new requests come in.
          </p>
        </div>
      ) : null}

      <ul className="mt-8 space-y-4">
        {visibleBookings.map((booking) => (
          <li
            key={booking.id}
            className="rounded-[1.5rem] bg-white px-5 py-5 shadow-[0_12px_40px_rgba(2,54,129,0.06)] md:px-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-lg font-bold text-brand-navy">
                  {booking.firstName} {booking.lastName}
                </p>
                <p className="mt-1 text-sm text-brand-navy/60">
                  {booking.occasion} · {booking.eventDate}
                  {booking.startTime ? ` · ${booking.startTime}` : ""}
                </p>
              </div>
              <div className="flex flex-wrap items-end gap-2">
                <label className="text-xs font-semibold uppercase tracking-wide text-brand-navy/50">
                  Status
                  <select
                    className="mt-1 block rounded-full border border-brand-navy/15 bg-[#f7f9fc] px-3 py-1.5 text-sm font-semibold normal-case tracking-normal text-brand-navy"
                    value={booking.status}
                    onChange={(e) =>
                      void setStatus(
                        booking.id,
                        e.target.value as StoredBooking["status"],
                      )
                    }
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </label>
                <button
                  type="button"
                  onClick={() => void removeBooking(booking)}
                  className="rounded-full border border-brand-magenta/25 px-3 py-1.5 text-sm font-semibold text-brand-magenta transition hover:bg-brand-magenta/5"
                >
                  Delete
                </button>
              </div>
            </div>

            <dl className="mt-4 grid gap-2 text-sm text-brand-navy/80 sm:grid-cols-2">
              <div>
                <dt className="text-brand-navy/45">Submitted</dt>
                <dd className="font-medium">{formatDate(booking.createdAt)}</dd>
              </div>
              <div>
                <dt className="text-brand-navy/45">Booth</dt>
                <dd className="font-medium">{boothLabel(booking.booth)}</dd>
              </div>
              <div>
                <dt className="text-brand-navy/45">Duration</dt>
                <dd className="font-medium">
                  {booking.duration ? `${booking.duration} hours` : "TBD"}
                </dd>
              </div>
              <div>
                <dt className="text-brand-navy/45">Guests</dt>
                <dd className="font-medium">{booking.guestCount || "TBD"}</dd>
              </div>
              <div>
                <dt className="text-brand-navy/45">Venue</dt>
                <dd className="font-medium">
                  {[booking.venue, booking.city].filter(Boolean).join(", ") ||
                    "TBD"}
                </dd>
              </div>
              <div>
                <dt className="text-brand-navy/45">Contact</dt>
                <dd className="font-medium">
                  <a
                    className="underline-offset-2 hover:underline"
                    href={`mailto:${booking.email}`}
                  >
                    {booking.email}
                  </a>
                  {" · "}
                  <a
                    className="underline-offset-2 hover:underline"
                    href={`tel:${booking.phone}`}
                  >
                    {booking.phone}
                  </a>
                </dd>
              </div>
            </dl>

            {booking.notes.trim() ? (
              <p className="mt-4 rounded-xl bg-[#f7f9fc] px-4 py-3 text-sm text-brand-navy/75">
                {booking.notes}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
