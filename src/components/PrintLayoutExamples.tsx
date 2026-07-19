import type { ReactNode } from "react";

type LayoutKind = 2 | 4 | 6;

function GraySlot({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden bg-[#c8c8c8] ${className}`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.18)_0%,transparent_45%,rgba(0,0,0,0.06)_100%)]" />
    </div>
  );
}

function StripChrome({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full flex-col border border-neutral-300 bg-white shadow-[0_8px_28px_rgba(0,0,0,0.12)]">
      <div className="flex items-start justify-between px-2.5 pb-1.5 pt-2.5">
        <div>
          <p className="text-[9px] font-semibold leading-none tracking-tight text-neutral-800 sm:text-[10px]">
            Modern <span className="font-bold">pix</span>
          </p>
          <p className="mt-0.5 text-[6px] font-medium uppercase tracking-[0.14em] text-neutral-500 sm:text-[7px]">
            Mirror Photobooth
          </p>
        </div>
        <div className="h-4 w-4 rounded-full border border-neutral-300 bg-neutral-100 sm:h-5 sm:w-5" />
      </div>
      <div className="min-h-0 flex-1 px-2.5">{children}</div>
      <div className="mt-auto border-t border-neutral-200 px-2.5 pb-2.5 pt-2 text-center">
        <div className="mx-auto mb-1.5 h-5 w-5 rounded-full border border-neutral-300 bg-neutral-200 sm:h-6 sm:w-6" />
        <p className="text-[10px] font-bold uppercase tracking-wide text-neutral-700 sm:text-xs">
          Event Name
        </p>
        <p className="text-[8px] font-medium uppercase tracking-wider text-neutral-500 sm:text-[9px]">
          Celebration
        </p>
        <p className="mt-0.5 text-[7px] tracking-wide text-neutral-400 sm:text-[8px]">
          00.00.0000
        </p>
      </div>
    </div>
  );
}

function LayoutCard({
  count,
  title,
  description,
  children,
}: {
  count: LayoutKind;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <article className="flex flex-col">
      <div className="mx-auto w-full max-w-[18rem]">{children}</div>
      <div className="mt-5 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-magenta">
          {`${count}-image format`}
        </p>
        <h3 className="mt-1.5 text-lg font-bold text-brand-navy">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-brand-navy/65">
          {description}
        </p>
      </div>
    </article>
  );
}

function TwoImageLayout() {
  return (
    <div className="aspect-[4/5] w-full">
      <div className="grid h-full grid-cols-2 gap-1 bg-neutral-200 p-1">
        {[0, 1].map((i) => (
          <StripChrome key={i}>
            <GraySlot className="h-full min-h-[8rem] w-full" />
          </StripChrome>
        ))}
      </div>
    </div>
  );
}

function FourImageLayout() {
  return (
    <div className="aspect-[4/5] w-full">
      <div className="grid h-full grid-cols-2 gap-1 bg-neutral-200 p-1">
        {[0, 1].map((col) => (
          <StripChrome key={col}>
            <div className="grid h-full grid-rows-2 gap-1.5">
              <GraySlot className="h-full w-full" />
              <GraySlot className="h-full w-full" />
            </div>
          </StripChrome>
        ))}
      </div>
    </div>
  );
}

function SixImageLayout() {
  return (
    <div className="aspect-[4/5] w-full">
      <div className="grid h-full grid-cols-2 gap-1 bg-neutral-200 p-1">
        {[0, 1].map((col) => (
          <StripChrome key={col}>
            <div className="grid h-full grid-rows-3 gap-1">
              <GraySlot className="h-full w-full" />
              <GraySlot className="h-full w-full" />
              <GraySlot className="h-full w-full" />
            </div>
          </StripChrome>
        ))}
      </div>
    </div>
  );
}

export function PrintLayoutExamples() {
  return (
    <section className="mt-14 md:mt-16">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-magenta">
          Print layouts
        </p>
        <h2 className="mt-2 text-2xl font-bold text-brand-navy md:text-3xl">
          Example photo formats
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-brand-navy/65 md:text-base">
          Gray placeholders show where guest photos sit. Themes, colors, and
          captions are customized for each event.
        </p>
      </div>

      <div className="mt-10 grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        <LayoutCard
          count={2}
          title="Dual portrait"
          description="Two large side-by-side frames — bold and guest-friendly."
        >
          <TwoImageLayout />
        </LayoutCard>

        <LayoutCard
          count={4}
          title="Classic strip pair"
          description="Four shots across two strips — great for group poses."
        >
          <FourImageLayout />
        </LayoutCard>

        <LayoutCard
          count={6}
          title="Full sequence"
          description="Six frames for the full booth session energy."
        >
          <SixImageLayout />
        </LayoutCard>
      </div>
    </section>
  );
}
