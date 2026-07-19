import Image from "next/image";
import { Button } from "./Button";

const pillars = [
  {
    title: "Local from day one",
    body: "We started in Iligan with one goal: give Mindanao celebrations the same premium photobooth energy usually reserved for bigger cities.",
  },
  {
    title: "Built for the party",
    body: "Every setup is tuned for real events — quick prints, friendly hosts, and a booth guests actually line up for.",
  },
  {
    title: "Moments that travel home",
    body: "Guests leave with physical prints and digital keepsakes they can share long after the last song.",
  },
];

const booths = [
  {
    name: "Mirror Photobooth",
    detail: "Our signature interactive mirror — the centerpiece of Modern Pix.",
  },
  {
    name: "Enclosed Photobooth",
    detail: "A classic private booth for playful strips and smaller groups.",
  },
  {
    name: "High-Angle Photobooth",
    detail: "Elevated shots that catch the full vibe of the dance floor.",
  },
];

const gallery = [
  {
    src: "/images/carousel/karl-kristine.png",
    alt: "Guests posing at a Modern Pix Mirror Photobooth",
  },
  {
    src: "/images/carousel/ken-micah.png",
    alt: "Couple smiling at a Modern Pix event",
  },
  {
    src: "/images/carousel/zul-areej.png",
    alt: "Celebration moments captured by Modern Pix",
  },
];

export function AboutContent() {
  return (
    <>
      <section className="relative overflow-hidden px-5 pb-16 pt-32 md:px-8 md:pb-20 md:pt-36">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 50% at 8% 0%, rgba(186,2,114,0.09), transparent 55%), radial-gradient(ellipse 70% 45% at 92% 8%, rgba(2,54,129,0.11), transparent 50%), linear-gradient(180deg, #f7f9fc 0%, #ffffff 50%, #ffffff 100%)",
          }}
        />

        <div className="relative mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-magenta">
            About Modern Pix
          </p>
          <h1 className="mt-4 text-5xl font-bold tracking-tight text-brand-navy md:text-6xl lg:text-7xl">
            Modern Pix
          </h1>
          <p className="mt-4 text-xl font-medium text-brand-navy/80 md:text-2xl">
            Mirror Photobooth from Iligan to Mindanao
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-brand-navy/70">
            We are the first Mirror Photobooth rental in Iligan — and one of
            Mindanao&apos;s most trusted names for turning celebrations into
            shareable memories.
          </p>
        </div>
      </section>

      <section className="px-5 pb-20 md:px-8 md:pb-28">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem]">
          <div className="grid min-h-[18rem] grid-cols-3 gap-1 md:min-h-[26rem] md:gap-1.5">
            {gallery.map((shot, index) => (
              <div
                key={shot.src}
                className={`relative ${index === 1 ? "md:col-span-1" : ""}`}
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 33vw"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-navy/35 via-transparent to-transparent" />
        </div>
      </section>

      <section className="px-5 pb-20 md:px-8 md:pb-28">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-16 md:items-start">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-brand-navy md:text-4xl">
              Our story
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-brand-navy/75 md:text-lg">
              <p>
                Modern Pix began with a simple observation: Mindanao events were
                already unforgettable — but the photobooth experience guests
                loved elsewhere had not fully arrived here yet. We set out to
                change that, starting in Iligan.
              </p>
              <p>
                What started as a bold idea to bring the Mirror Photobooth home
                grew into a full celebration service. Couples, families, and
                companies trusted us with their milestones, and word traveled
                from venue to venue across the region.
              </p>
              <p>
                Today we show up with polished setups, warm on-site hosts, and
                prints guests actually keep. The tech is modern. The feeling is
                personal. That balance is still the heart of Modern Pix.
              </p>
            </div>
          </div>

          <aside className="border-l-2 border-brand-magenta/40 pl-6 md:pl-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-magenta">
              What guides us
            </p>
            <p className="mt-4 text-2xl font-semibold leading-snug text-brand-navy md:text-3xl">
              Make every guest feel like the moment was made for them.
            </p>
          </aside>
        </div>
      </section>

      <section className="bg-[#f7f9fc] px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold tracking-tight text-brand-navy md:text-4xl">
            Why hosts book us
          </h2>
          <ul className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {pillars.map((pillar) => (
              <li key={pillar.title}>
                <h3 className="text-lg font-semibold text-brand-navy">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-navy/70 md:text-base">
                  {pillar.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-3xl font-bold tracking-tight text-brand-navy md:text-4xl">
            What we bring to your event
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-brand-navy/70">
            Three booth styles, one team focused on making your celebration
            feel premium from setup to last print.
          </p>
          <ul className="mt-12 divide-y divide-brand-navy/10 border-y border-brand-navy/10">
            {booths.map((booth) => (
              <li
                key={booth.name}
                className="grid gap-2 py-6 md:grid-cols-[14rem_1fr] md:items-baseline md:gap-8"
              >
                <h3 className="text-lg font-semibold text-brand-navy">
                  {booth.name}
                </h3>
                <p className="text-brand-navy/70">{booth.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-5 pb-24 md:px-8 md:pb-32">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-brand-magenta md:text-4xl">
            Ready to write your chapter?
          </h2>
          <p className="mt-4 text-lg text-brand-navy/75">
            Tell us about your date and we&apos;ll help craft the booth
            experience your guests will talk about.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/book">Book Your Date</Button>
            <Button href="/contact" variant="secondary">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
