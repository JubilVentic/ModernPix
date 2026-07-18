export const site = {
  name: "Modern Pix",
  tagline: "Mirror Photobooth",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://modernpix.vercel.app",
  phoneDisplay: "0991 966 8820",
  phoneTel: "+639919668820",
  email: "modernpixilg@gmail.com",
  description:
    "First-ever and leading Mirror Photobooth rental in Iligan and Mindanao. Premium photobooth experiences for weddings, birthdays, corporate events, and celebrations.",
  keywords: [
    "mirror photobooth",
    "photobooth rental Iligan",
    "photobooth Mindanao",
    "wedding photobooth Philippines",
    "enclosed photobooth",
    "high angle photobooth",
    "Modern Pix",
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
