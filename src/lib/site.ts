export const site = {
  name: "Modern Pix",
  tagline: "Mirror Photobooth",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://modernpix.vercel.app",
  locale: "en_PH",
  phoneDisplay: "0991 966 8820",
  phoneTel: "+639919668820",
  email: "modernpixilg@gmail.com",
  city: "Iligan City",
  region: "Lanao del Norte",
  country: "PH",
  ogImage: "/images/hero-collage-v2.png",
  description:
    "Book the first Mirror Photobooth rental in Iligan and one of Mindanao's most trusted photobooth teams for weddings, birthdays, corporate events, and celebrations.",
  shortDescription:
    "Premium Mirror Photobooth rental in Iligan and across Mindanao.",
  keywords: [
    "Modern Pix",
    "mirror photobooth",
    "mirror photobooth Iligan",
    "photobooth rental Iligan",
    "photobooth Mindanao",
    "wedding photobooth Philippines",
    "wedding photobooth Iligan",
    "birthday photobooth Mindanao",
    "enclosed photobooth",
    "high angle photobooth",
    "photobooth rental Philippines",
    "event photobooth Northern Mindanao",
  ],
  social: {
    facebook: "https://www.facebook.com/Modernpixmirrorphotobooth",
    instagram: "https://www.instagram.com/modernpixilgn/",
    threads: "https://www.threads.com/@modernpixilgn",
    messenger: "https://m.me/Modernpixmirrorphotobooth",
  },
} as const;

export function telUrl() {
  return `tel:${site.phoneTel}`;
}

export function mailtoUrl(subject?: string, body?: string) {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString();
  return query ? `mailto:${site.email}?${query}` : `mailto:${site.email}`;
}
