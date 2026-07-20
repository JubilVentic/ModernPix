import { absoluteUrl } from "@/lib/seo";
import { site } from "@/lib/site";

export function JsonLd() {
  const logo = absoluteUrl("/images/logo.png");
  const image = absoluteUrl(site.ogImage);

  const localBusiness = {
    "@type": "LocalBusiness",
    "@id": `${site.url}/#business`,
    name: `${site.name} ${site.tagline}`,
    alternateName: site.name,
    description: site.description,
    url: site.url,
    telephone: site.phoneTel,
    email: site.email,
    image: [logo, image],
    logo,
    priceRange: "₱₱",
    currenciesAccepted: "PHP",
    paymentAccepted: "Cash, Bank Transfer, GCash",
    areaServed: [
      {
        "@type": "City",
        name: "Iligan",
      },
      {
        "@type": "AdministrativeArea",
        name: "Mindanao",
      },
      {
        "@type": "Country",
        name: "Philippines",
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressRegion: site.region,
      addressCountry: site.country,
    },
    sameAs: [
      site.social.facebook,
      site.social.instagram,
      site.social.threads,
    ],
    knowsAbout: [
      "Mirror Photobooth",
      "Enclosed Photobooth",
      "High-Angle Photobooth",
      "Event photobooth rental",
    ],
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Mirror Photobooth Rental",
          areaServed: "Iligan and Mindanao",
          provider: { "@id": `${site.url}/#business` },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Enclosed Photobooth Rental",
          areaServed: "Iligan and Mindanao",
          provider: { "@id": `${site.url}/#business` },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "High-Angle Photobooth Rental",
          areaServed: "Iligan and Mindanao",
          provider: { "@id": `${site.url}/#business` },
        },
      },
    ],
  };

  const website = {
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: `${site.name} ${site.tagline}`,
    description: site.shortDescription,
    publisher: { "@id": `${site.url}/#business` },
    inLanguage: "en-PH",
  };

  const data = {
    "@context": "https://schema.org",
    "@graph": [localBusiness, website],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
