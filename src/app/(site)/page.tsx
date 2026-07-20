import { Hero } from "@/components/Hero";
import { StatsBar } from "@/components/StatsBar";
import { Experiences } from "@/components/Experiences";
import { Occasions } from "@/components/Occasions";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";
import { ClosingCta } from "@/components/ClosingCta";
import { JsonLd } from "@/components/JsonLd";
import { homeMetadata } from "@/lib/seo";

export const metadata = homeMetadata;

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
      <ClosingCta />
    </>
  );
}
