"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const fieldClass =
  "w-full rounded-xl border border-brand-navy/15 bg-white px-4 py-3 text-sm text-brand-navy outline-none transition placeholder:text-brand-navy/35 focus:border-brand-magenta focus:ring-2 focus:ring-brand-magenta/20";

export function OwnerLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("owner");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(data.error || "Could not sign in.");
        setLoading(false);
        return;
      }

      const next = searchParams.get("next") || "/owner/bookings";
      router.replace(next.startsWith("/owner") ? next : "/owner/bookings");
      router.refresh();
    } catch {
      setError("Could not sign in. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[1.5rem] bg-white p-6 shadow-[0_12px_40px_rgba(2,54,129,0.08)] md:p-8"
    >
      <label className="block text-sm font-medium text-brand-navy">
        Username
        <input
          className={`mt-2 ${fieldClass}`}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          required
        />
      </label>
      <label className="mt-4 block text-sm font-medium text-brand-navy">
        Password
        <input
          type="password"
          className={`mt-2 ${fieldClass}`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
      </label>

      {error ? (
        <p className="mt-4 text-sm font-medium text-brand-magenta" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-70"
      >
        {loading ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
