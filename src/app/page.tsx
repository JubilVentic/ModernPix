import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { StatsBar } from "@/components/StatsBar";
import { Experiences } from "@/components/Experiences";
import { Occasions } from "@/components/Occasions";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";
import { ReserveBanner } from "@/components/ReserveBanner";
import { ClosingCta } from "@/components/ClosingCta";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <JsonLd />
      <Hero />
      <StatsBar />
      <Experiences />
      <Occasions />
      <HowItWorks />
      <Testimonials />
      <ReserveBanner />
      <ClosingCta />
    </>
  );
}
