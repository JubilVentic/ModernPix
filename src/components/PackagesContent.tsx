import Link from "next/link";
import { Button } from "./Button";
import { PrintLayoutExamples } from "./PrintLayoutExamples";
import {
  packageAddOns,
  packageNotes,
  packageTiers,
} from "@/lib/packages";

export function PackagesContent() {
  return (
    <div className="relative overflow-hidden px-5 pb-24 pt-32 md:px-8 md:pb-32 md:pt-36">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 10% 0%, rgba(186,2,114,0.07), transparent 55%), radial-gradient(ellipse 70% 45% at 90% 8%, rgba(2,54,129,0.09), transparent 50%), linear-gradient(180deg, #f7f9fc 0%, #ffffff 40%, #ffffff 100%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-magenta">
            Packages
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-brand-navy md:text-5xl">
            Packages &amp; print layouts
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-brand-navy/75">
            Sample packages for planning — final rates and inclusions will be
            confirmed with you when you book.
          </p>
          <p className="mt-3 text-xs font-medium uppercase tracking-[0.14em] text-brand-navy/40">
            Proof-of-concept pricing · subject to change
          </p>
        </div>

        <section className="mt-14 md:mt-16">
          <div className="grid gap-6 lg:grid-cols-3">
            {packageTiers.map((tier) => (
              <article
                key={tier.id}
                className={`flex flex-col rounded-[1.75rem] px-6 py-7 md:px-7 md:py-8 ${
                  tier.featured
                    ? "bg-brand-navy text-white shadow-[0_20px_50px_rgba(2,54,129,0.28)]"
                    : "border border-brand-navy/10 bg-white text-brand-navy shadow-[0_12px_40px_rgba(2,54,129,0.08)]"
                }`}
              >
                {tier.featured ? (
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">
                    Most booked
                  </p>
                ) : (
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-magenta">
                    Package
                  </p>
                )}
                <h2 className="mt-2 text-2xl font-bold tracking-tight">
                  {tier.name}
                </h2>
                <p
                  className={`mt-1 text-sm ${
                    tier.featured ? "text-white/70" : "text-brand-navy/60"
                  }`}
                >
                  {tier.hours}
                </p>
                <p className="mt-5 text-3xl font-bold tracking-tight">
                  <span
                    className={`text-sm font-semibold ${
                      tier.featured ? "text-white/60" : "text-brand-navy/45"
                    }`}
                  >
                    from{" "}
                  </span>
                  {tier.priceFrom}
                </p>
                <p
                  className={`mt-3 text-sm leading-relaxed ${
                    tier.featured ? "text-white/75" : "text-brand-navy/70"
                  }`}
                >
                  {tier.blurb}
                </p>
                <ul
                  className={`mt-6 space-y-2.5 border-t pt-5 text-sm ${
                    tier.featured
                      ? "border-white/15 text-white/85"
                      : "border-brand-navy/10 text-brand-navy/75"
                  }`}
                >
                  {tier.includes.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <span
                        className={
                          tier.featured
                            ? "text-brand-magenta"
                            : "text-brand-magenta"
                        }
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link
                    href="/book"
                    className={`inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition ${
                      tier.featured
                        ? "bg-white text-brand-navy hover:bg-white/90"
                        : "bg-brand-gradient text-white hover:brightness-110"
                    }`}
                  >
                    Request this package
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-brand-navy/45">
            *Unlimited prints subject to fair use during the booked hours.
            Sample rates only.
          </p>
        </section>

        <section className="mt-20 md:mt-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-brand-navy md:text-3xl">
              Popular add-ons
            </h2>
            <p className="mt-3 text-brand-navy/65">
              Optional extras you can mix into any package.
            </p>
          </div>
          <ul className="mx-auto mt-10 max-w-3xl divide-y divide-brand-navy/10 border-y border-brand-navy/10">
            {packageAddOns.map((addon) => (
              <li
                key={addon.name}
                className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <span className="font-semibold text-brand-navy">
                  {addon.name}
                </span>
                <span className="text-sm text-brand-navy/60">{addon.detail}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-20 md:mt-24">
          <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2 md:gap-x-12 md:gap-y-10">
            {packageNotes.map((note) => (
              <div key={note.title}>
                <h3 className="text-lg font-semibold text-brand-navy">
                  {note.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-navy/70 md:text-base">
                  {note.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <PrintLayoutExamples />

        <div className="mx-auto mt-16 max-w-xl text-center md:mt-20">
          <h2 className="text-2xl font-bold text-brand-navy md:text-3xl">
            Need a custom quote?
          </h2>
          <p className="mt-3 text-brand-navy/70">
            Share your date, guest count, and preferred booth — we&apos;ll
            confirm availability and final package pricing.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/book">Book Your Date</Button>
            <Button href="/contact" variant="secondary">
              Ask about packages
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
