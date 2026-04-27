"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app error]", error);
  }, [error]);

  return (
    <>
      <Header />
      <main
        id="main"
        className="container flex min-h-[70vh] flex-col items-center justify-center py-20 text-center sm:py-28"
      >
        <p className="text-sm font-medium uppercase tracking-wider text-brand-600 dark:text-brand-300">
          Error
        </p>
        <h1 className="text-balance mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Something went wrong.
        </h1>
        <p className="text-balance mt-4 max-w-md text-black/70 dark:text-white/70">
          An unexpected error occurred. You can try again, check whether it&rsquo;s
          an incident, or head somewhere else.
        </p>

        {error.digest && (
          <p className="mt-3 text-xs text-black/50 dark:text-white/50">
            Reference: <code className="font-mono">{error.digest}</code>
          </p>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            Try again
          </button>
          <Link
            href="/status"
            className="inline-flex items-center justify-center rounded-lg border border-black/10 bg-white px-5 py-3 text-sm font-medium text-black/80 shadow-sm transition hover:bg-black/5 dark:border-white/10 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10"
          >
            View status
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-medium text-black/70 transition hover:text-black dark:text-white/70 dark:hover:text-white"
          >
            Back home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-medium text-black/70 transition hover:text-black dark:text-white/70 dark:hover:text-white"
          >
            Contact support
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
