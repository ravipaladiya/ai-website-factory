import type { Metadata } from "next";
import Link from "next/link";
import { getDemo } from "@/lib/demo-store";
import DemoClient from "./DemoClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Try the AI agent live",
  description:
    "Describe your site in one line and watch the AI Website Factory agent stream its build log, then reveal a live preview.",
  alternates: { canonical: "/demo" },
  openGraph: {
    title: "Try the AI agent live | AI Website Factory",
    description:
      "Describe your site in one line and watch the AI Website Factory agent stream its build log, then reveal a live preview.",
    type: "website",
    url: "/demo",
  },
};

export default function DemoPage({
  searchParams,
}: {
  searchParams?: { session?: string };
}) {
  const id = searchParams?.session;
  const session = id ? getDemo(id) ?? null : null;

  return (
    <main id="main" className="min-h-screen">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 pt-6 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight"
          aria-label="AI Website Factory home"
        >
          <span
            aria-hidden="true"
            className="inline-block h-6 w-6 rounded-md bg-gradient-to-br from-brand-400 to-brand-700 shadow-sm"
          />
          <span className="text-sm">AI Website Factory</span>
        </Link>
        <Link
          href="/#pricing"
          className="text-sm text-black/70 transition hover:text-black dark:text-white/70 dark:hover:text-white"
        >
          Pricing →
        </Link>
      </div>

      <DemoClient
        initialSession={
          session
            ? {
                id: session.id,
                description: session.description,
                template: session.template,
              }
            : null
        }
      />
    </main>
  );
}
