import { site } from "@/lib/site";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${site.name} ${site.tagline}`,
    description: site.description,
    url: site.url,
    telephone: site.phoneTel,
    email: site.email,
    image: `${site.url}/images/logo.png`,
    areaServed: ["Iligan", "Mindanao", "Philippines"],
    sameAs: [
      site.social.facebook,
      site.social.instagram,
      site.social.threads,
    ],
    makesOffer: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mirror Photobooth" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Enclosed Photobooth" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "High-Angle Photobooth" } },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
