import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "We couldn't find that page. Try one of the popular destinations below or jump straight into the AI Website Factory wizard.",
  robots: { index: false, follow: false },
};

type Destination = {
  href: string;
  label: string;
  description: string;
};

const destinations: Destination[] = [
  {
    href: "/new",
    label: "Start a new project",
    description: "Spin up a production-ready site in four steps.",
  },
  {
    href: "/demo",
    label: "Watch a live build",
    description: "Type a prompt; watch the agent stream its build log.",
  },
  {
    href: "/templates",
    label: "Templates",
    description: "SaaS, portfolio, e-commerce, blog, docs — preview live.",
  },
  {
    href: "/compare",
    label: "Compare",
    description: "AI Website Factory vs DIY vs no-code, side by side.",
  },
  {
    href: "/docs",
    label: "Docs",
    description: "Quickstart, project structure, and deployment.",
  },
  {
    href: "/case-studies",
    label: "Case studies",
    description: "Real teams shipping with the agent.",
  },
];

export default function NotFound() {
  return (
    <>
      <Header />
      <main
        id="main"
        className="container flex min-h-[70vh] flex-col items-center justify-center py-20 text-center sm:py-28"
      >
        <p className="text-sm font-medium uppercase tracking-wider text-brand-600 dark:text-brand-300">
          404
        </p>
        <h1 className="text-balance mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          We couldn&apos;t find that page.
        </h1>
        <p className="text-balance mt-4 max-w-xl text-black/70 dark:text-white/70">
          The link may be out of date, or the page may have moved. Pick a
          popular destination below — or jump straight into the wizard and
          ship something new.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/new"
            prefetch
            className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            Start a new project
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg border border-black/10 bg-white px-5 py-3 text-sm font-medium text-black/80 shadow-sm transition hover:bg-black/5 dark:border-white/10 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10"
          >
            Back home
          </Link>
        </div>

        <ul
          role="list"
          aria-label="Popular destinations"
          className="mt-14 grid w-full max-w-3xl grid-cols-1 gap-3 text-left sm:grid-cols-2"
        >
          {destinations.map((d) => (
            <li key={d.href}>
              <Link
                href={d.href}
                className="group flex h-full flex-col rounded-2xl border border-black/5 bg-white/70 px-5 py-4 transition hover:-translate-y-0.5 hover:border-brand-500/30 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:border-white/10 dark:bg-white/5 dark:hover:border-brand-400/30"
              >
                <span className="flex items-center justify-between text-sm font-semibold tracking-tight">
                  {d.label}
                  <span
                    aria-hidden="true"
                    className="text-black/30 transition group-hover:translate-x-0.5 group-hover:text-brand-600 dark:text-white/30 dark:group-hover:text-brand-300"
                  >
                    →
                  </span>
                </span>
                <span className="mt-1 text-sm text-black/65 dark:text-white/65">
                  {d.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
