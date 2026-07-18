import { Hero } from "@/components/Hero";
import { StatsBar } from "@/components/StatsBar";
import { Experiences } from "@/components/Experiences";
import { Occasions } from "@/components/Occasions";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";
import { ReserveBanner } from "@/components/ReserveBanner";
import { ClosingCta } from "@/components/ClosingCta";

export default function Home() {
  return (
    <>
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
