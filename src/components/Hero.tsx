import { Button } from "./Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-24">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          // White veil + collage in one layer (same approach as Figma)
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.78), rgba(255,255,255,0.78)), url('/images/hero-collage-v2.png')",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-white" />

      <div className="relative mx-auto flex min-h-[68vh] max-w-4xl flex-col items-center justify-center px-5 pb-28 pt-6 text-center md:min-h-[74vh] md:pb-36">
        <h1 className="animate-fade-up max-w-3xl text-4xl font-bold leading-tight tracking-tight text-brand-navy md:text-5xl lg:text-[3.6rem]">
          Premium Mirror Photobooth Experience in Mindanao
        </h1>
        <p className="animate-fade-up-delay-1 mt-6 max-w-2xl text-lg leading-relaxed text-brand-navy/90 md:text-xl">
          The first-ever Mirror Photobooth rental in Iligan and one of
          Mindanao&apos;s most trusted photobooth providers for weddings,
          birthdays, corporate events, and special celebrations.
        </p>
        <div className="animate-fade-up-delay-2 mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Button href="/contact">Book Your Date</Button>
          <Button href="/packages" variant="secondary">
            View Packages
          </Button>
        </div>
      </div>
    </section>
  );
}
