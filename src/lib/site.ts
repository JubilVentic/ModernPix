export const site = {
  name: "Modern Pix",
  tagline: "Mirror Photobooth",
  phoneDisplay: "0991 966 8820",
  phoneTel: "+639919668820",
  email: "modernpixilg@gmail.com",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "639919668820",
  whatsappMessage:
    "Hi Modern Pix! I'd like to book a Mirror Photobooth for my event.",
  social: {
    facebook: "https://www.facebook.com/Modernpixmirrorphotobooth",
    instagram: "https://www.instagram.com/modernpixilgn/",
    threads: "https://www.threads.com/@modernpixilgn",
    messenger: "https://m.me/Modernpixmirrorphotobooth",
  },
} as const;

export function whatsappUrl(message = site.whatsappMessage) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${site.whatsappNumber}?text=${text}`;
}

export function telUrl() {
  return `tel:${site.phoneTel}`;
}

export function mailtoUrl() {
  return `mailto:${site.email}`;
}
