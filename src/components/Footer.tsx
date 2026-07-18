import Link from "next/link";
import { site } from "@/lib/site";

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M14 8h2V5h-2c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.1l.4-3H13V9c0-.6.4-1 1-1Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="12" r="3.75" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.25" cy="6.75" r="1" fill="currentColor" />
    </svg>
  );
}

function ThreadsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M16.3 10.2c-.2-1.9-1.5-3.2-3.9-3.2-2.7 0-4.5 1.9-4.5 4.8 0 2.4 1.3 4.4 3.7 4.4 1.5 0 2.6-.6 3.3-1.6.1.5.2 1 .2 1.5 0 2.4-1.4 3.7-3.6 3.7-1.7 0-2.9-.7-3.7-1.8l-1.4 1.3c1.1 1.5 2.9 2.4 5.1 2.4 3.4 0 5.5-2.1 5.5-5.5 0-.6-.1-1.3-.2-1.9.9-.9 1.4-2.1 1.4-3.5 0-3.1-2.2-5.1-5.7-5.1-3.8 0-6.2 2.4-6.2 5.9 0 .8.1 1.5.3 2.2l1.8-.5c-.2-.5-.2-1.1-.2-1.7 0-2.4 1.5-4 4.3-4 2.3 0 3.7 1.2 3.7 3.1 0 1-.4 1.8-1.1 2.4Zm-1.6 2.1c-.4.7-1.1 1.2-2.1 1.2-1.3 0-2.1-1-2.1-2.5 0-1.6.9-2.7 2.3-2.7.9 0 1.6.4 2 1.1v2.9Z" />
    </svg>
  );
}

const socialLinks = [
  {
    href: site.social.facebook,
    label: "Facebook",
    icon: <FacebookIcon />,
  },
  {
    href: site.social.instagram,
    label: "Instagram",
    icon: <InstagramIcon />,
  },
  {
    href: site.social.threads,
    label: "Threads",
    icon: <ThreadsIcon />,
  },
];

const offerings = [
  "Mirror Photobooth",
  "Enclosed Photobooth",
  "High-Angle Photobooth",
];

export function Footer() {
  return (
    <footer className="border-t border-brand-navy/10 bg-[#f7f9fc] px-5 py-12 md:px-8">
      <div className="mx-auto grid max-w-6xl items-stretch gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
        {/* Box 1 — contact + nav */}
        <div className="flex h-full flex-col">
          <a
            href={`tel:${site.phoneTel}`}
            className="text-base font-semibold tracking-tight text-brand-navy transition hover:text-brand-magenta md:text-lg"
          >
            {site.phoneDisplay}
          </a>
          <a
            href={`mailto:${site.email}`}
            className="mt-2 text-sm text-brand-navy/70 transition hover:text-brand-navy"
          >
            {site.email}
          </a>
          <nav className="mt-auto flex flex-wrap items-center gap-5 pt-10 text-sm font-medium text-brand-navy/80 md:pt-16">
            <Link href="/about" className="transition hover:text-brand-navy">
              About
            </Link>
            <Link href="/packages" className="transition hover:text-brand-navy">
              Packages
            </Link>
            <Link href="/contact" className="transition hover:text-brand-navy">
              Contact
            </Link>
          </nav>
        </div>

        {/* Box 2 — about */}
        <div>
          <p className="text-lg font-semibold text-brand-navy">
            Modern Pix Mirror Photobooth
          </p>
          <p className="mt-3 text-sm leading-relaxed text-brand-navy/75">
            First-ever and leading Mirror Photobooth rental in Iligan &amp;
            whole Mindanao. High quality service &amp; premium photobooth
            experience.
          </p>
          <ul className="mt-4 space-y-1.5 text-sm text-brand-navy/80">
            {offerings.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="text-brand-magenta" aria-hidden="true">
                  ✦
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Box 3 — social icons */}
        <div className="flex h-full flex-col md:items-end">
          <p className="text-sm font-semibold text-brand-navy">Follow us</p>
          <div className="mt-auto flex flex-wrap items-center gap-3 pt-10 md:justify-end md:pt-16">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-navy/15 bg-white text-brand-navy transition hover:border-brand-magenta/40 hover:text-brand-magenta"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-brand-navy/10 pt-6 text-center text-xs text-brand-navy/50">
        © {new Date().getFullYear()} Modern Pix Mirror Photobooth
      </div>
    </footer>
  );
}
