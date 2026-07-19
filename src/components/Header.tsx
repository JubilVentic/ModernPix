"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./Button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/packages", label: "Packages" },
  { href: "/book", label: "Book" },
  { href: "/about", label: "About Us" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center">
      <div
        className={`pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled
            ? "mt-4 w-[min(56rem,calc(100%-1.5rem))] rounded-full border border-brand-navy/10 bg-white/55 px-5 py-3 shadow-[0_16px_40px_rgba(2,54,129,0.14)] backdrop-blur-md md:px-6"
            : "mt-0 w-full max-w-none rounded-none border-b border-brand-navy/5 bg-white/85 px-5 py-4 backdrop-blur-md md:px-8 md:py-5"
        }`}
      >
        <div
          className={`mx-auto flex w-full items-center justify-between gap-4 ${
            scrolled ? "max-w-none" : "max-w-6xl"
          }`}
        >
          <Link href="/" className="shrink-0">
            <Image
              src="/images/logo.png"
              alt="Modern Pix Mirror Photobooth"
              width={200}
              height={72}
              className={`w-auto transition-all duration-500 ${
                scrolled ? "h-9 md:h-10" : "h-12 md:h-14"
              }`}
              priority
            />
          </Link>

          <nav
            className={`hidden items-center md:flex ${
              scrolled ? "gap-7" : "gap-8"
            }`}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium text-brand-navy transition-opacity duration-300 hover:opacity-70 ${
                  scrolled ? "text-base" : "text-lg"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Button href="/book" variant="nav" className="shrink-0">
            Book Your Date
            <span aria-hidden="true">→</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
