"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function FooterNewsletter() {
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
      };
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Try again.");
        return;
      }
      setStatus("success");
      setMessage("Subscribed. Check your inbox.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Network error. Try again.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mt-4 flex w-full max-w-sm flex-col gap-2"
      aria-label="Subscribe to the newsletter"
    >
      <div className="flex gap-2">
        <label htmlFor="footer-newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="footer-newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={status === "error"}
          aria-describedby={
            status === "error" || status === "success"
              ? "footer-newsletter-status"
              : undefined
          }
          placeholder="you@company.com"
          className="flex-1 rounded-lg border border-black/10 bg-white px-3 py-2 text-sm shadow-sm transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-white/10 dark:bg-white/5"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "…" : "Subscribe"}
        </button>
      </div>
      <p
        id="footer-newsletter-status"
        role="status"
        aria-live="polite"
        className={
          status === "success"
            ? "min-h-4 text-xs text-brand-700 dark:text-brand-200"
            : status === "error"
              ? "min-h-4 text-xs text-red-600 dark:text-red-400"
              : "min-h-4 text-xs text-transparent"
        }
      >
        {message || " "}
      </p>
    </form>
  );
}
