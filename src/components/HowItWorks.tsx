import { Button } from "./Button";

const steps = [
  {
    number: "1",
    title: "Choose Your Booth",
    detail: "Mirror, enclosed, or high-angle — pick what fits your event.",
  },
  {
    number: "2",
    title: "Select Your Event Date",
    detail: "Share your date and venue so we can confirm availability.",
  },
  {
    number: "3",
    title: "Customize Your Print Layout",
    detail: "Borders, captions, and filters tailored to your theme.",
  },
  {
    number: "4",
    title: "Enjoy Your Event",
    detail: "We handle setup, hosting, and prints — you enjoy the night.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-[#f7f9fc] px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-bold tracking-tight text-brand-navy md:text-4xl lg:text-5xl">
          HOW IT WORKS
        </h2>
        <div className="mt-12 grid grid-cols-2 gap-6 rounded-[2rem] bg-white px-4 py-10 shadow-[0_12px_40px_rgba(2,54,129,0.08)] md:mt-16 md:grid-cols-4 md:gap-0 md:px-6 md:py-14">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`flex flex-col items-center px-4 text-center ${
                index < steps.length - 1
                  ? "md:border-r md:border-brand-navy/10"
                  : ""
              }`}
            >
              <span className="text-7xl font-bold leading-none text-brand-magenta md:text-8xl">
                {step.number}
              </span>
              <p className="mt-4 max-w-[11rem] text-base font-semibold text-brand-navy">
                {step.title}
              </p>
              <p className="mt-2 max-w-[12rem] text-sm leading-relaxed text-brand-navy/60">
                {step.detail}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          <p className="text-base text-brand-navy/70">
            Ready to start planning?
          </p>
          <Button href="/book">Book Your Date</Button>
        </div>
      </div>
    </section>
  );
}
