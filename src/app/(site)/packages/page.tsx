import { PackagesContent } from "@/components/PackagesContent";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Packages & Print Layouts",
  description:
    "Compare Modern Pix Mirror Photobooth packages, add-ons, and 2-, 4-, and 6-image print layouts for weddings, birthdays, and events in Iligan and Mindanao.",
  path: "/packages",
});

export default function PackagesPage() {
  return <PackagesContent />;
}
