export const site = {
  name: "Modern Pix",
  tagline: "Mirror Photobooth",
  phoneDisplay: "0991 966 8820",
  phoneTel: "+639919668820",
  email: "modernpixilg@gmail.com",
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
