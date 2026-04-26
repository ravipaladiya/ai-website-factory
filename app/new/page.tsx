import type { Metadata } from "next";
import Link from "next/link";
import Wizard from "@/components/wizard/Wizard";
import { summary as reviewSummary } from "@/lib/testimonials";

export const metadata: Metadata = {
  title: "New project",
  description: "Spin up a new AI-built site in four quick steps.",
  alternates: { canonical: "/new" },
  robots: { index: false, follow: false },
};

const trustItems = [
  { label: "Lighthouse 95+", icon: "speed" as const },
  { label: "SEO + JSON-LD baked in", icon: "search" as const },
  { label: "Mobile-first responsive", icon: "device" as const },
];

function TrustIcon({ kind }: { kind: "speed" | "search" | "device" }) {
  if (kind === "speed") {
    return (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-3.5 w-3.5">
        <path d="m11 2-7 10h5l-1 6 7-10h-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    );
  }
  if (kind === "search") {
    return (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-3.5 w-3.5">
        <circle cx="9" cy="9" r="5" stroke="currentColor" strokeWidth="1.5" />
        <path d="m13 13 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-3.5 w-3.5">
      <rect x="3" y="4" width="11" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="11" y="8" width="6" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default function NewProjectPage() {
  return (
    <main id="main" className="min-h-screen px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto mb-8 flex w-full max-w-3xl items-center justify-between">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-black/70 transition hover:text-black dark:text-white/70 dark:hover:text-white"
        >
          <span aria-hidden="true">←</span> Dashboard
        </Link>
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold tracking-tight"
          aria-label="AI Website Factory home"
        >
          <span
            aria-hidden="true"
            className="inline-block h-6 w-6 rounded-md bg-gradient-to-br from-brand-400 to-brand-700 shadow-sm"
          />
        </Link>
      </div>

      <aside
        aria-label="What teams ship with the agent"
        className="mx-auto mb-6 flex w-full max-w-3xl flex-col gap-3 rounded-2xl border border-black/5 bg-white/60 px-5 py-4 text-sm text-black/70 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-white/10 dark:bg-white/5 dark:text-white/70"
      >
        <p>
          <Link
            href="/testimonials"
            className="rounded font-semibold text-black underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:text-white"
          >
            {reviewSummary.averageRating.toFixed(1)}/5
          </Link>{" "}
          from {reviewSummary.totalReviews.toLocaleString("en-US")} teams
          shipping with the agent.
        </p>
        <ul role="list" className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-black/65 dark:text-white/65">
          {trustItems.map((item) => (
            <li key={item.label} className="inline-flex items-center gap-1.5">
              <span className="text-brand-600 dark:text-brand-300">
                <TrustIcon kind={item.icon} />
              </span>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </aside>

      <Wizard />
    </main>
  );
}
