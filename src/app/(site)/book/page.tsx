import Link from "next/link";
import { BookingForm } from "@/components/BookingForm";
import { createPageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Book Your Date",
  description:
    "Reserve a Modern Pix Mirror Photobooth for your wedding, birthday, corporate event, or celebration in Iligan and across Mindanao. Check availability and send your booking request online.",
  path: "/book",
});

export default function BookPage() {
  return (
    <section className="relative overflow-hidden px-5 pb-24 pt-32 md:px-8 md:pb-32 md:pt-36">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 10% 0%, rgba(186,2,114,0.08), transparent 55%), radial-gradient(ellipse 70% 45% at 90% 10%, rgba(2,54,129,0.1), transparent 50%), linear-gradient(180deg, #f7f9fc 0%, #ffffff 45%, #ffffff 100%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-magenta">
          Book with Modern Pix
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-brand-navy md:text-5xl">
          Reserve your event date
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-brand-navy/75">
          Share a few details about your celebration and we&apos;ll follow up
          to confirm availability and package options. Prefer to talk first?{" "}
          <a
            href={`tel:${site.phoneTel}`}
            className="font-semibold text-brand-navy underline-offset-4 hover:underline"
          >
            Call {site.phoneDisplay}
          </a>{" "}
          or{" "}
          <Link
            href="/contact"
            className="font-semibold text-brand-navy underline-offset-4 hover:underline"
          >
            message us
          </Link>
          .
        </p>

        <div className="mt-10">
          <BookingForm />
        </div>
      </div>
    </section>
  );
}
