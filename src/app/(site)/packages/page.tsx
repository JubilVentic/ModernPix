import type { Metadata } from "next";
import { PackagesContent } from "@/components/PackagesContent";

export const metadata: Metadata = {
  title: "Packages",
  description:
    "Explore Modern Pix Mirror Photobooth packages, add-ons, and print layouts for weddings, birthdays, corporate events, and celebrations in Iligan and Mindanao.",
  alternates: { canonical: "/packages" },
};

export default function PackagesPage() {
  return <PackagesContent />;
}
