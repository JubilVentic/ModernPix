import type { Metadata } from "next";
import { site } from "@/lib/site";

const defaultTitle = `${site.name} | ${site.tagline} in Iligan & Mindanao`;

type PageSeoInput = {
  title: string;
  description: string;
  path: string;
  /** Absolute or site-relative image path */
  image?: string;
  noIndex?: boolean;
};

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  const base = site.url.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized === "/" ? "" : normalized}` || base;
}

export function createPageMetadata({
  title,
  description,
  path,
  image = site.ogImage,
  noIndex = false,
}: PageSeoInput): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = title.includes(site.name) ? title : `${title} | ${site.name}`;
  const imageUrl = absoluteUrl(image);

  return {
    // Home uses an absolute title so the root template doesn't double the brand.
    title: path === "/" ? { absolute: fullTitle } : title,
    description,
    keywords: [...site.keywords],
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: site.locale,
      url,
      siteName: `${site.name} ${site.tagline}`,
      title: fullTitle,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${site.name} ${site.tagline}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
    },

    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}

export const homeMetadata = createPageMetadata({
  title: defaultTitle,
  description: site.description,
  path: "/",
});

export { defaultTitle };
