"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function Newsletter() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = String(new FormData(form).get("email") ?? "").trim();

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setStatus("error");
      setMessage("Enter a valid email address.");
      return;
    }

    setStatus("submitting");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        message?: string;
      };

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Try again.");
        return;
      }

      setStatus("success");
      setMessage("You’re on the list — watch your inbox.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Network error. Check your connection and try again.");
    }
  }

  return (
    <section
      id="newsletter"
      aria-labelledby="newsletter-heading"
      className="border-t border-black/5 py-20 sm:py-24 dark:border-white/10"
    >
      <div className="container">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-brand-600 dark:text-brand-300">
            Newsletter
          </p>
          <h2
            id="newsletter-heading"
            className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Field notes, delivered monthly.
          </h2>
          <p className="max-w-xl text-black/70 dark:text-white/70">
            One email a month on AI website automation, SEO, and
            shipping-velocity tactics. No spam — unsubscribe anytime.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-2 flex w-full max-w-md flex-col gap-3 sm:flex-row"
            aria-label="Subscribe to the newsletter"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              aria-invalid={status === "error"}
              aria-describedby={
                status === "error" || status === "success"
                  ? "newsletter-status"
                  : undefined
              }
              placeholder="you@company.com"
              className="flex-1 rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm shadow-sm transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-white/10 dark:bg-white/5"
            />
            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "submitting" ? "Subscribing…" : "Subscribe"}
            </button>
          </form>

          <p
            id="newsletter-status"
            role="status"
            aria-live="polite"
            className={
              status === "success"
                ? "min-h-5 text-sm text-brand-700 dark:text-brand-200"
                : status === "error"
                  ? "min-h-5 text-sm text-red-600 dark:text-red-400"
                  : "min-h-5 text-sm text-transparent"
            }
          >
            {message || " "}
          </p>
        </div>
      </div>
    </section>
  );
}
