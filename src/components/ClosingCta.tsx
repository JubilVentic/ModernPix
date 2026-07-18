import { Button } from "./Button";

export function ClosingCta() {
  return (
    <section className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-brand-magenta md:text-4xl lg:text-5xl">
          Ready to Make Your Event Unforgettable?
        </h2>
        <p className="mt-6 text-lg text-brand-navy md:text-xl">
          Experience the original Mirror Photobooth that transformed events
          across Mindanao.
        </p>
        <div className="mt-10">
          <Button href="/contact">Book Your Date</Button>
        </div>
      </div>
    </section>
  );
}
