import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const galanoStandIn = Plus_Jakarta_Sans({
  variable: "--font-galano",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Modern Pix | Mirror Photobooth in Mindanao",
  description:
    "The first-ever Mirror Photobooth rental in Iligan and one of Mindanao's most trusted photobooth providers for weddings, birthdays, corporate events, and special celebrations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${galanoStandIn.variable} h-full antialiased`}>
      <body className="relative min-h-full flex flex-col font-sans text-brand-navy">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
