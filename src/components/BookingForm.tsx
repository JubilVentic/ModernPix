"use client";

import { useEffect, useState } from "react";
import {
  bookingOccasions,
  boothOptions,
  durationOptions,
  emptyBookingDraft,
  type BookingDraft,
  type BoothOptionId,
} from "@/lib/booking";
import { site } from "@/lib/site";

type BlockedSlot = {
  id: string;
  date: string;
  startTime: string | null;
  endTime: string | null;
  allDay: boolean;
  label: string;
  duration: string;
};

const steps = [
  { id: 1, label: "Occasion" },
  { id: 2, label: "Event" },
  { id: 3, label: "Booth" },
  { id: 4, label: "Details" },
  { id: 5, label: "Review" },
] as const;

const fieldClass =
  "w-full rounded-xl border border-brand-navy/15 bg-white px-4 py-3 text-sm text-brand-navy outline-none transition placeholder:text-brand-navy/35 focus:border-brand-magenta focus:ring-2 focus:ring-brand-magenta/20";

const optionBase =
  "rounded-2xl border px-4 py-4 text-left transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy";

function OptionButton({
  selected,
  onClick,
  title,
  description,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  description?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${optionBase} ${
        selected
          ? "border-brand-magenta bg-brand-magenta/[0.06] shadow-[0_8px_24px_rgba(186,2,114,0.12)]"
          : "border-brand-navy/12 bg-white hover:border-brand-navy/30"
      }`}
    >
      <span className="block text-sm font-semibold text-brand-navy md:text-base">
        {title}
      </span>
      {description ? (
        <span className="mt-1 block text-xs leading-relaxed text-brand-navy/65 md:text-sm">
          {description}
        </span>
      ) : null}
    </button>
  );
}

function minEventDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

export function BookingForm() {
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<BookingDraft>(emptyBookingDraft);
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [blocked, setBlocked] = useState<BlockedSlot[]>([]);
  const [checkingAvailability, setCheckingAvailability] = useState(false);

  useEffect(() => {
    if (!draft.eventDate) {
      setBlocked([]);
      return;
    }

    let cancelled = false;
    const load = async () => {
      try {
        const response = await fetch(
          `/api/availability?date=${encodeURIComponent(draft.eventDate)}`,
        );
        const data = (await response.json()) as { blocked?: BlockedSlot[] };
        if (!cancelled) setBlocked(data.blocked ?? []);
      } catch {
        if (!cancelled) setBlocked([]);
      }
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, [draft.eventDate]);

  const update = <K extends keyof BookingDraft>(key: K, value: BookingDraft[K]) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
    setError("");
  };

  const canContinue = () => {
    if (step === 1) return Boolean(draft.occasion);
    if (step === 2) {
      return Boolean(
        draft.eventDate &&
          draft.startTime &&
          draft.city.trim() &&
          draft.duration,
      );
    }
    if (step === 3) return Boolean(draft.booth);
    if (step === 4) {
      return Boolean(
        draft.firstName.trim() &&
          draft.lastName.trim() &&
          draft.email.trim() &&
          draft.phone.trim(),
      );
    }
    return true;
  };

  const checkStep2Availability = async () => {
    const params = new URLSearchParams({
      date: draft.eventDate,
      startTime: draft.startTime,
      duration: draft.duration,
    });
    const response = await fetch(`/api/availability?${params.toString()}`);
    const data = (await response.json()) as {
      available?: boolean;
      blocked?: BlockedSlot[];
      error?: string;
    };
    if (data.blocked) setBlocked(data.blocked);
    if (!response.ok || data.available === false) {
      setError(
        data.error ||
          "That time isn’t available. Please choose another time or date.",
      );
      return false;
    }
    return true;
  };

  const goNext = async () => {
    if (!canContinue()) {
      setError("Please complete the required fields before continuing.");
      return;
    }

    if (step === 2) {
      setCheckingAvailability(true);
      setError("");
      try {
        const ok = await checkStep2Availability();
        if (!ok) {
          setCheckingAvailability(false);
          return;
        }
      } catch {
        setError("Could not check availability. Please try again.");
        setCheckingAvailability(false);
        return;
      }
      setCheckingAvailability(false);
    }

    setError("");
    setStep((s) => Math.min(5, s + 1));
  };

  const goBack = () => {
    setError("");
    setStep((s) => Math.max(1, s - 1));
  };

  const onSubmit = async () => {
    if (!canContinue()) {
      setError("Please complete the required fields before continuing.");
      return;
    }

    setSending(true);
    setError("");

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(data.error || "Could not submit booking. Please try again.");
        setSending(false);
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Could not submit booking. Please try again.");
    }
    setSending(false);
  };

  if (submitted) {
    return (
      <div className="rounded-[1.75rem] bg-white px-6 py-10 text-center shadow-[0_16px_48px_rgba(2,54,129,0.1)] md:px-10 md:py-14">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-magenta">
          Request received
        </p>
        <h2 className="mt-3 text-2xl font-bold text-brand-navy md:text-3xl">
          Thanks — we&apos;ll be in touch
        </h2>
        <p className="mx-auto mt-4 max-w-md text-brand-navy/75">
          Your booking request was sent to Modern Pix. We&apos;ll confirm
          availability soon. Need a faster reply? Call {site.phoneDisplay} or
          email {site.email}.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setStep(1);
            setDraft(emptyBookingDraft());
          }}
          className="mt-8 text-sm font-semibold text-brand-navy underline-offset-4 hover:underline"
        >
          Start another booking
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-[1.75rem] bg-white/90 p-5 shadow-[0_16px_48px_rgba(2,54,129,0.1)] backdrop-blur-sm md:p-8">
      <ol className="flex items-center gap-1 md:gap-2" aria-label="Booking progress">
        {steps.map((item, index) => {
          const active = step === item.id;
          const done = step > item.id;
          return (
            <li key={item.id} className="flex min-w-0 flex-1 items-center gap-1 md:gap-2">
              <div className="flex min-w-0 flex-col items-center gap-1">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition ${
                    active || done
                      ? "bg-brand-gradient text-white"
                      : "bg-brand-navy/8 text-brand-navy/45"
                  }`}
                >
                  {item.id}
                </span>
                <span
                  className={`hidden text-[11px] font-medium sm:block ${
                    active ? "text-brand-navy" : "text-brand-navy/45"
                  }`}
                >
                  {item.label}
                </span>
              </div>
              {index < steps.length - 1 ? (
                <div
                  className={`mb-4 hidden h-px flex-1 sm:block ${
                    done ? "bg-brand-magenta/50" : "bg-brand-navy/10"
                  }`}
                  aria-hidden="true"
                />
              ) : null}
            </li>
          );
        })}
      </ol>

      <div className="mt-8 min-h-[22rem]">
        {step === 1 ? (
          <section>
            <h2 className="text-xl font-bold text-brand-navy md:text-2xl">
              What are you celebrating?
            </h2>
            <p className="mt-2 text-sm text-brand-navy/65">
              Pick the occasion that best matches your event.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {bookingOccasions.map((occasion) => (
                <OptionButton
                  key={occasion}
                  selected={draft.occasion === occasion}
                  onClick={() => update("occasion", occasion)}
                  title={occasion}
                />
              ))}
            </div>
          </section>
        ) : null}

        {step === 2 ? (
          <section>
            <h2 className="text-xl font-bold text-brand-navy md:text-2xl">
              Event details
            </h2>
            <p className="mt-2 text-sm text-brand-navy/65">
              Tell us when and where. We&apos;ll check availability here before
              you continue — each booking also reserves +1 hour after for the
              team.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium text-brand-navy">
                Event date*
                <input
                  type="date"
                  required
                  min={minEventDate()}
                  value={draft.eventDate}
                  onChange={(e) => update("eventDate", e.target.value)}
                  className={`mt-2 ${fieldClass}`}
                />
              </label>
              <label className="block text-sm font-medium text-brand-navy">
                Start time*
                <input
                  type="time"
                  required
                  value={draft.startTime}
                  onChange={(e) => update("startTime", e.target.value)}
                  className={`mt-2 ${fieldClass}`}
                />
              </label>
              <label className="block text-sm font-medium text-brand-navy sm:col-span-2">
                Duration*
                <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {durationOptions.map((option) => (
                    <OptionButton
                      key={option.value}
                      selected={draft.duration === option.value}
                      onClick={() => update("duration", option.value)}
                      title={option.label}
                    />
                  ))}
                </div>
              </label>
              <label className="block text-sm font-medium text-brand-navy">
                Venue / location
                <input
                  value={draft.venue}
                  onChange={(e) => update("venue", e.target.value)}
                  className={`mt-2 ${fieldClass}`}
                  placeholder="Hotel, garden, hall…"
                />
              </label>
              <label className="block text-sm font-medium text-brand-navy">
                City / area*
                <input
                  required
                  value={draft.city}
                  onChange={(e) => update("city", e.target.value)}
                  className={`mt-2 ${fieldClass}`}
                  placeholder="Iligan, Cagayan de Oro…"
                />
              </label>
              <label className="block text-sm font-medium text-brand-navy sm:col-span-2">
                Expected guests
                <input
                  inputMode="numeric"
                  value={draft.guestCount}
                  onChange={(e) => update("guestCount", e.target.value)}
                  className={`mt-2 ${fieldClass}`}
                  placeholder="e.g. 120"
                />
              </label>
            </div>
            {blocked.length > 0 ? (
              <div className="mt-5 rounded-2xl border border-brand-navy/10 bg-[#f7f9fc] px-4 py-3 text-left text-sm text-brand-navy/75">
                <p className="font-semibold text-brand-navy">
                  Unavailable times on this date
                </p>
                <p className="mt-1 text-xs text-brand-navy/55">
                  Windows include the event length plus a 1-hour team buffer.
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  {blocked.map((slot) => (
                    <li key={slot.id}>
                      {slot.allDay
                        ? "Full day reserved"
                        : `${slot.startTime} – ${slot.endTime}`}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </section>
        ) : null}

        {step === 3 ? (
          <section>
            <h2 className="text-xl font-bold text-brand-navy md:text-2xl">
              Booth preference
            </h2>
            <p className="mt-2 text-sm text-brand-navy/65">
              Choose what you have in mind — we can always adjust later.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {boothOptions.map((option) => (
                <OptionButton
                  key={option.id}
                  selected={draft.booth === option.id}
                  onClick={() => update("booth", option.id as BoothOptionId)}
                  title={option.label}
                  description={option.description}
                />
              ))}
            </div>
          </section>
        ) : null}

        {step === 4 ? (
          <section>
            <h2 className="text-xl font-bold text-brand-navy md:text-2xl">
              Your details
            </h2>
            <p className="mt-2 text-sm text-brand-navy/65">
              We’ll use this to confirm availability and send your quote.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium text-brand-navy">
                First name*
                <input
                  required
                  autoComplete="given-name"
                  value={draft.firstName}
                  onChange={(e) => update("firstName", e.target.value)}
                  className={`mt-2 ${fieldClass}`}
                />
              </label>
              <label className="block text-sm font-medium text-brand-navy">
                Last name*
                <input
                  required
                  autoComplete="family-name"
                  value={draft.lastName}
                  onChange={(e) => update("lastName", e.target.value)}
                  className={`mt-2 ${fieldClass}`}
                />
              </label>
              <label className="block text-sm font-medium text-brand-navy">
                Email*
                <input
                  required
                  type="email"
                  autoComplete="email"
                  value={draft.email}
                  onChange={(e) => update("email", e.target.value)}
                  className={`mt-2 ${fieldClass}`}
                />
              </label>
              <label className="block text-sm font-medium text-brand-navy">
                Phone*
                <input
                  required
                  type="tel"
                  autoComplete="tel"
                  value={draft.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className={`mt-2 ${fieldClass}`}
                  placeholder="09XX XXX XXXX"
                />
              </label>
              <label className="block text-sm font-medium text-brand-navy sm:col-span-2">
                Anything else we should know?
                <textarea
                  rows={4}
                  value={draft.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  className={`mt-2 resize-y ${fieldClass}`}
                  placeholder="Theme, print preferences, outdoor setup, special requests…"
                />
              </label>
            </div>
          </section>
        ) : null}

        {step === 5 ? (
          <section>
            <h2 className="text-xl font-bold text-brand-navy md:text-2xl">
              Review your request
            </h2>
            <p className="mt-2 text-sm text-brand-navy/65">
              Confirm the details, then send — we’ll get back to lock your date.
            </p>
            <dl className="mt-6 space-y-3 rounded-2xl bg-[#f4f6fa] px-5 py-5 text-sm text-brand-navy">
              {[
                ["Occasion", draft.occasion],
                ["Date", draft.eventDate],
                ["Start time", draft.startTime || "TBD"],
                ["Duration", draft.duration ? `${draft.duration} hours` : "TBD"],
                ["Venue", draft.venue || "TBD"],
                ["City / area", draft.city],
                ["Guests", draft.guestCount || "TBD"],
                [
                  "Booth",
                  boothOptions.find((b) => b.id === draft.booth)?.label ?? "TBD",
                ],
                ["Name", `${draft.firstName} ${draft.lastName}`.trim()],
                ["Email", draft.email],
                ["Phone", draft.phone],
                ["Notes", draft.notes.trim() || "—"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="grid gap-1 border-b border-brand-navy/8 pb-3 last:border-none last:pb-0 sm:grid-cols-[8rem_1fr]"
                >
                  <dt className="font-medium text-brand-navy/55">{label}</dt>
                  <dd className="font-semibold">{value}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}
      </div>

      {error ? (
        <p className="mt-4 text-sm font-medium text-brand-magenta" role="alert">
          {error}
        </p>
      ) : null}

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-brand-navy/8 pt-6">
        <button
          type="button"
          onClick={goBack}
          disabled={step === 1}
          className="rounded-full px-5 py-2.5 text-sm font-semibold text-brand-navy transition hover:bg-brand-navy/5 disabled:cursor-not-allowed disabled:opacity-30"
        >
          Back
        </button>

        {step < 5 ? (
          <button
            type="button"
            onClick={() => void goNext()}
            disabled={checkingAvailability}
            className="inline-flex items-center justify-center rounded-full bg-brand-gradient px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-110 disabled:opacity-70"
          >
            {checkingAvailability ? "Checking…" : "Continue"}
          </button>
        ) : (
          <button
            type="button"
            onClick={onSubmit}
            disabled={sending}
            className="inline-flex items-center justify-center rounded-full bg-brand-gradient px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-110 disabled:opacity-70"
          >
            {sending ? "Sending…" : "Send booking request"}
          </button>
        )}
      </div>

      <p className="mt-4 text-xs text-brand-navy/45">
        This sends a request to Modern Pix — we’ll confirm availability before
        anything is locked in. Prefer to talk? Call {site.phoneDisplay}.
      </p>
    </div>
  );
}
