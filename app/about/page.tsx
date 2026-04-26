import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About",
  description:
    "AI Website Factory is an autonomous engineering agent that plans, designs, builds, tests, and ships production-ready websites.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | AI Website Factory",
    description:
      "AI Website Factory is an autonomous engineering agent that plans, designs, builds, tests, and ships production-ready websites.",
    type: "website",
    url: "/about",
  },
};

const principles = [
  {
    title: "Ship-ready by default",
    body: "Every surface the agent emits is treated as production software: semantic HTML, typed components, Lighthouse-scored, a green CI pipeline.",
  },
  {
    title: "SEO is a first-class input",
    body: "Titles, descriptions, canonical URLs, Open Graph images, and JSON-LD are designed alongside the content — not bolted on before launch.",
  },
  {
    title: "Accessible for everyone",
    body: "Keyboard-first interaction, visible focus rings, reduced-motion support, and ARIA landmarks are non-negotiable.",
  },
  {
    title: "Own your output",
    body: "Every project is a normal Git repo. Inspect every line, deploy it anywhere, keep editing by hand whenever you want to.",
  },
];

const timeline = [
  {
    year: "Day 1",
    title: "Scaffold",
    body: "Next.js App Router, TypeScript, Tailwind, ESLint, CI, responsive landing page, SEO, manifest.",
  },
  {
    year: "Day 2+",
    title: "Iterate",
    body: "The agent opens feature PRs — Pricing, FAQ, Testimonials, Blog, Contact, Dark mode, Newsletter — each with a green build.",
  },
  {
    year: "Ongoing",
    title: "Maintain",
    body: "The loop never stops. The agent reviews its own site, finds weak spots, fixes them, and ships again.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="border-b border-black/5 py-16 sm:py-20 dark:border-white/10">
          <div className="container max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-wider text-brand-600 dark:text-brand-300">
              About
            </p>
            <h1 className="text-balance mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              A team that happens to be software.
            </h1>
            <p className="mt-4 text-lg text-black/70 dark:text-white/70">
              AI Website Factory is an autonomous engineering agent. It plans,
              designs, writes, tests, and ships production-ready websites —
              then keeps iterating on them. You review PRs; it writes the
              code.
            </p>
          </div>
        </section>

        <section
          aria-labelledby="principles-heading"
          className="py-16 sm:py-20"
        >
          <div className="container max-w-4xl">
            <h2
              id="principles-heading"
              className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              The principles behind every build.
            </h2>
            <ul
              role="list"
              className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2"
            >
              {principles.map((p) => (
                <li
                  key={p.title}
                  className="rounded-2xl border border-black/5 bg-white/70 p-6 shadow-sm dark:border-white/10 dark:bg-white/5"
                >
                  <h3 className="text-lg font-semibold tracking-tight">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-black/70 dark:text-white/70">
                    {p.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          aria-labelledby="timeline-heading"
          className="border-t border-black/5 py-16 sm:py-20 dark:border-white/10"
        >
          <div className="container max-w-3xl">
            <h2
              id="timeline-heading"
              className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              How a project actually runs.
            </h2>

            <ol role="list" className="mt-10 space-y-8">
              {timeline.map((step, i) => (
                <li key={step.title} className="flex gap-5">
                  <span
                    aria-hidden="true"
                    className="mt-1 flex h-9 w-9 flex-none items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-brand-600 dark:text-brand-300">
                      {step.year}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-black/70 dark:text-white/70">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-t border-black/5 py-16 sm:py-20 dark:border-white/10">
          <div className="container max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Ready to watch it build?
            </h2>
            <p className="mt-4 text-black/70 dark:text-white/70">
              Start a project in minutes — the agent handles the rest.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/new"
                prefetch
                className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
              >
                Start building free
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-black/10 bg-white px-6 py-3 text-sm font-medium text-black/80 shadow-sm transition hover:bg-black/5 dark:border-white/10 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10"
              >
                Talk to the team
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
