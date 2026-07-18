import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Modern Pix — the first-ever Mirror Photobooth rental in Iligan and a trusted photobooth provider across Mindanao.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 pb-24 pt-36 text-center md:px-8">
      <h1 className="text-4xl font-bold text-brand-navy md:text-5xl">
        About Us
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-brand-navy/80">
        Modern Pix brings the original Mirror Photobooth experience to Iligan
        and across Mindanao — creating unforgettable moments for weddings,
        birthdays, corporate events, and celebrations of every kind.
      </p>
      <Link
        href="/"
        className="mt-10 inline-block text-brand-navy underline-offset-4 hover:underline"
      >
        Back to Home
      </Link>
    </section>
  );
}
