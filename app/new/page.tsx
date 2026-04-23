import type { Metadata } from "next";
import Link from "next/link";
import Wizard from "@/components/wizard/Wizard";

export const metadata: Metadata = {
  title: "New project",
  description: "Spin up a new AI-built site in four quick steps.",
  alternates: { canonical: "/new" },
  robots: { index: false, follow: false },
};

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
      <Wizard />
    </main>
  );
}
