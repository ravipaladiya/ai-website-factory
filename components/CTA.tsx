import Link from "next/link";

const guarantees = [
  "Free while in beta",
  "No credit card",
  "Deploy in minutes",
];

function Check() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="h-4 w-4 flex-none"
    >
      <path
        d="m5 10 3.5 3.5L15 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CTA() {
  return (
    <section
      id="cta"
      aria-labelledby="cta-heading"
      className="border-t border-black/5 py-20 sm:py-28 dark:border-white/10"
    >
      <div className="container">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 px-6 py-14 text-center shadow-xl sm:px-12 sm:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-grid opacity-20"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"
          />

          <h2
            id="cta-heading"
            className="text-balance relative text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          >
            Ready to launch a site built the right way?
          </h2>
          <p className="text-balance relative mx-auto mt-4 max-w-2xl text-base text-white/80 sm:text-lg">
            Spin up a production-ready, SEO-optimized website in minutes —
            no setup, no boilerplate, no guesswork.
          </p>

          <div className="relative mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/new"
              prefetch
              className="inline-flex w-full items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-brand-700 shadow-sm transition hover:bg-brand-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-700 sm:w-auto"
            >
              Start building free
              <span aria-hidden="true" className="ml-2">
                →
              </span>
            </Link>
            <Link
              href="/#pricing"
              className="inline-flex w-full items-center justify-center rounded-lg border border-white/30 bg-white/0 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-700 sm:w-auto"
            >
              See pricing
            </Link>
          </div>

          <ul
            role="list"
            className="relative mx-auto mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-white/80 sm:text-sm"
          >
            {guarantees.map((g) => (
              <li key={g} className="inline-flex items-center gap-1.5">
                <Check />
                <span>{g}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
