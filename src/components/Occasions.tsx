const occasions = [
  { icon: "🎂", label: "Birthdays" },
  { icon: "💍", label: "Weddings" },
  { icon: "🏢", label: "Corporate Events" },
  { icon: "🎓", label: "Graduations" },
  { icon: "👶", label: "Baptisms" },
  { icon: "🎉", label: "Anniversaries" },
  { icon: "🎄", label: "Holiday Celebrations" },
  { icon: "🌟", label: "School Events" },
];

export function Occasions() {
  return (
    <section className="px-5 pb-16 md:px-8 md:pb-24">
      <div className="mx-auto max-w-5xl text-center">
        <h3 className="text-xl font-semibold text-brand-navy md:text-2xl">
          Perfect for Every Occasion
        </h3>
        <div className="mt-6 rounded-[1.75rem] bg-white px-5 py-7 shadow-[0_12px_40px_rgba(2,54,129,0.08)] md:px-10 md:py-8">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-4 text-left sm:grid-cols-4 sm:gap-x-8">
            {occasions.map((item) => (
              <li
                key={item.label}
                className="flex items-center gap-2.5 text-sm font-medium text-brand-navy md:text-base"
              >
                <span className="text-lg" aria-hidden="true">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
