import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const galanoStandIn = Plus_Jakarta_Sans({
  variable: "--font-galano",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Modern Pix | Mirror Photobooth in Iligan & Mindanao",
    template: "%s | Modern Pix",
  },
  description: site.description,
  keywords: [...site.keywords],
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: site.url,
    siteName: `${site.name} ${site.tagline}`,
    title: "Modern Pix | Mirror Photobooth in Iligan & Mindanao",
    description: site.description,
    images: [
      {
        url: "/images/hero-collage-v2.png",
        width: 1024,
        height: 652,
        alt: "Modern Pix Mirror Photobooth collage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Modern Pix | Mirror Photobooth in Iligan & Mindanao",
    description: site.description,
    images: ["/images/hero-collage-v2.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${galanoStandIn.variable} h-full antialiased`}>
      <body className="relative flex min-h-full flex-col font-sans text-brand-navy">
        {children}
      </body>
    </html>
  );
}
