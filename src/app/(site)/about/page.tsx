import { AboutContent } from "@/components/AboutContent";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About Us",
  description:
    "Meet Modern Pix — the first Mirror Photobooth rental in Iligan and a trusted photobooth partner for weddings, birthdays, and events across Mindanao.",
  path: "/about",
});

export default function AboutPage() {
  return <AboutContent />;
}
