const slots = [
  "First Mirror Photobooth in Mindanao",
  "Hundreds of Successful Events",
  "Premium Quality Prints",
  "Professional On-Site Team",
];

export function StatsBar() {
  return (
    <section className="relative z-10 -mt-16 px-5 md:-mt-20 md:px-8">
      <div className="mx-auto grid max-w-5xl grid-cols-2 overflow-hidden rounded-full bg-white shadow-[0_12px_40px_rgba(2,54,129,0.12)] sm:grid-cols-4">
        {slots.map((label, index) => (
          <div
            key={label}
            className={`flex min-h-20 items-center justify-center px-4 py-5 text-center sm:min-h-24 ${
              index < slots.length - 1 ? "border-r border-brand-navy/10" : ""
            }`}
          >
            <span className="max-w-[11rem] text-sm font-semibold leading-snug text-brand-navy">
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
