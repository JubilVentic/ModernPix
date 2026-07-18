import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Packages",
  description:
    "Explore Modern Pix Mirror Photobooth packages for weddings, birthdays, corporate events, and celebrations in Iligan and Mindanao.",
  alternates: { canonical: "/packages" },
};

export default function PackagesPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 pb-24 pt-36 text-center md:px-8">
      <h1 className="text-4xl font-bold text-brand-navy md:text-5xl">
        Packages
      </h1>
      <p className="mt-6 text-lg text-brand-navy/80">
        Package details are being finalized. Reach out through Contact and
        we&apos;ll help with a custom quote for your event date.
      </p>
      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Button href="/contact">Book Your Date</Button>
        <Link
          href="/"
          className="text-brand-navy underline-offset-4 hover:underline"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
