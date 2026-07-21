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
      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z" />
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
            <Link href="/book" className="transition hover:text-brand-navy">
              Book
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
