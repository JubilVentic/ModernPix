import type { Metadata } from "next";
import { Suspense } from "react";
import { OwnerLoginForm } from "@/components/OwnerLoginForm";

export const metadata: Metadata = {
  title: "Owner Login",
  robots: { index: false, follow: false },
};

export default function OwnerLoginPage() {
  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-3xl font-bold tracking-tight text-brand-navy">
        Owner login
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-brand-navy/65">
        Sign in to review booking requests. This area is for Modern Pix owners
        only.
      </p>
      <div className="mt-8">
        <Suspense
          fallback={
            <div className="rounded-[1.5rem] bg-white p-8 text-sm text-brand-navy/60">
              Loading…
            </div>
          }
        >
          <OwnerLoginForm />
        </Suspense>
      </div>
    </div>
  );
}
