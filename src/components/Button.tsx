import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "nav";
  className?: string;
  external?: boolean;
};

const base =
  "inline-flex items-center justify-center rounded-full px-7 py-3.5 text-base font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy";

const variants = {
  primary:
    "bg-brand-gradient text-white shadow-sm hover:brightness-110 hover:scale-[1.02]",
  secondary:
    "border-2 border-brand-navy bg-white/80 text-brand-navy backdrop-blur-sm hover:bg-brand-navy hover:text-white",
  nav: "bg-brand-gradient gap-2 px-5 py-2.5 text-sm font-semibold text-white hover:brightness-110",
} as const;

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
