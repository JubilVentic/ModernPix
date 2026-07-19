import Link from "next/link";
import { site } from "@/lib/site";

export default function OwnerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-full bg-[#f4f6fa]">
      <header className="border-b border-brand-navy/10 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 md:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-magenta">
              Owner access
            </p>
            <p className="text-lg font-bold text-brand-navy">{site.name}</p>
          </div>
          <Link
            href="/"
            className="text-sm font-medium text-brand-navy/70 transition hover:text-brand-navy"
          >
            View site
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-5 py-10 md:px-8 md:py-12">
        {children}
      </main>
    </div>
  );
}
