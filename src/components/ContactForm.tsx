"use client";

import { FormEvent, useState } from "react";
import { site, whatsappUrl } from "@/lib/site";

const fieldClass =
  "w-full rounded-xl border border-brand-navy/15 bg-white px-4 py-3 text-sm text-brand-navy outline-none transition placeholder:text-brand-navy/35 focus:border-brand-magenta focus:ring-2 focus:ring-brand-magenta/20";

export function ContactForm() {
  const [sending, setSending] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSending(true);

    const data = new FormData(event.currentTarget);
    const firstName = String(data.get("firstName") ?? "").trim();
    const lastName = String(data.get("lastName") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const composed = [
      `Hi Modern Pix! I'm ${firstName} ${lastName}.`,
      email ? `Email: ${email}` : null,
      phone ? `Phone: ${phone}` : null,
      "",
      message,
    ]
      .filter((line) => line !== null)
      .join("\n");

    window.open(whatsappUrl(composed), "_blank", "noopener,noreferrer");
    setSending(false);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[1.75rem] bg-[#f4f6fa] p-6 shadow-[0_12px_40px_rgba(2,54,129,0.08)] md:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-left text-sm font-medium text-brand-navy">
          First name*
          <input
            required
            name="firstName"
            autoComplete="given-name"
            className={`mt-2 ${fieldClass}`}
            placeholder="First name"
          />
        </label>
        <label className="block text-left text-sm font-medium text-brand-navy">
          Last name*
          <input
            required
            name="lastName"
            autoComplete="family-name"
            className={`mt-2 ${fieldClass}`}
            placeholder="Last name"
          />
        </label>
      </div>

      <label className="mt-4 block text-left text-sm font-medium text-brand-navy">
        Email*
        <input
          required
          type="email"
          name="email"
          autoComplete="email"
          className={`mt-2 ${fieldClass}`}
          placeholder="Enter email"
        />
      </label>

      <label className="mt-4 block text-left text-sm font-medium text-brand-navy">
        Phone number*
        <input
          required
          type="tel"
          name="phone"
          autoComplete="tel"
          className={`mt-2 ${fieldClass}`}
          placeholder="09XX XXX XXXX"
        />
      </label>

      <label className="mt-4 block text-left text-sm font-medium text-brand-navy">
        Message*
        <textarea
          required
          name="message"
          rows={5}
          className={`mt-2 resize-y ${fieldClass}`}
          placeholder="Tell us about your event date, venue, and package questions..."
        />
      </label>

      <button
        type="submit"
        disabled={sending}
        className="mt-6 inline-flex items-center justify-center rounded-full bg-brand-gradient px-8 py-3.5 text-base font-semibold text-white shadow-sm transition hover:brightness-110 disabled:opacity-70"
      >
        {sending ? "Opening…" : "Submit"}
      </button>

      <p className="mt-4 text-left text-xs text-brand-navy/50">
        Submitting opens WhatsApp to {site.phoneDisplay} with your message.
      </p>
    </form>
  );
}
