import type { ReactNode } from "react";
import { ContactForm } from "@/components/ContactForm";
import { createPageMetadata } from "@/lib/seo";
import { mailtoUrl, site, telUrl } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Contact Us",
  description:
    "Contact Modern Pix Mirror Photobooth in Iligan. Call, email, or message us on Facebook, Instagram, or Threads to book your event across Mindanao.",
  path: "/contact",
});

function IconWrap({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-magenta/10 text-brand-magenta">
      {children}
    </span>
  );
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M4 6.5h16v11H4v-11Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="m4.5 7 7.5 6 7.5-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M7.5 3.75h3l1.5 4.5-2 1.5a12 12 0 0 0 5.25 5.25l1.5-2 4.5 1.5v3A1.5 1.5 0 0 1 19.5 19 15.75 15.75 0 0 1 3.75 3.25 1.5 1.5 0 0 1 5.25 1.75h2.25Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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

const details = [
  {
    label: "Email",
    value: site.email,
    href: mailtoUrl(),
    icon: <EmailIcon />,
  },
  {
    label: "Phone",
    value: site.phoneDisplay,
    href: telUrl(),
    icon: <PhoneIcon />,
  },
  {
    label: "Facebook",
    value: "Modern Pix Mirror Photobooth",
    href: site.social.facebook,
    icon: <FacebookIcon />,
    external: true,
  },
  {
    label: "Instagram",
    value: "@modernpixilgn",
    href: site.social.instagram,
    icon: <InstagramIcon />,
    external: true,
  },
  {
    label: "Threads",
    value: "@modernpixilgn",
    href: site.social.threads,
    icon: <ThreadsIcon />,
    external: true,
  },
];

export default function ContactPage() {
  return (
    <section className="px-5 pb-24 pt-32 md:px-8 md:pt-36">
      <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-navy/10 bg-white px-3 py-1.5 text-sm font-medium text-brand-navy shadow-sm">
            <EmailIcon />
            Contact
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-brand-navy md:text-5xl">
            How can we help you today?
          </h1>
          <p className="mt-4 max-w-md text-lg text-brand-navy/70">
            Our team is just a message or call away — book your Mirror
            Photobooth date or ask about packages.
          </p>

          <ul className="mt-10 space-y-5">
            {details.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="flex items-start gap-4 rounded-2xl p-2 transition hover:bg-brand-navy/[0.03]"
                >
                  <IconWrap>{item.icon}</IconWrap>
                  <span className="min-w-0 pt-1">
                    <span className="block text-sm text-brand-navy/55">
                      {item.label}:
                    </span>
                    <span className="mt-0.5 block text-base font-semibold break-words text-brand-navy">
                      {item.value}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
