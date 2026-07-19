import type { Metadata } from "next";
import { AboutContent } from "@/components/AboutContent";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet Modern Pix — the first Mirror Photobooth rental in Iligan and a trusted photobooth partner for celebrations across Mindanao.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <AboutContent />;
}
