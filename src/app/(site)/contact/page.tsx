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
      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z" />
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
