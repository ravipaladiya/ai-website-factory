import Link from "next/link";
import { caseStudies } from "@/lib/testimonials";

export default function CaseStudiesTeaser() {
  const featured = caseStudies.slice(0, 3);

  return (
    <section
      id="case-studies"
      aria-labelledby="case-studies-heading"
      className="border-t border-black/5 py-20 sm:py-28 dark:border-white/10"
    >
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-brand-600 dark:text-brand-300">
            Case studies
          </p>
          <h2
            id="case-studies-heading"
            className="text-balance mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Real teams, shipped in hours.
          </h2>
          <p className="text-balance mt-4 text-black/70 dark:text-white/70">
            A look at what the agent actually shipped for three customers —
            time to launch, Lighthouse lift, and what they kept after.
          </p>
        </div>

        <ul
          role="list"
          className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3"
        >
          {featured.map((cs) => (
            <li key={cs.slug}>
              <Link
                href={`/case-studies/${cs.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-black/5 bg-white/70 p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-500/30 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:border-white/10 dark:bg-white/5"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-300">
                  {cs.company}
                </p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight transition group-hover:text-brand-700 dark:group-hover:text-brand-200">
                  {cs.tagline}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-black/70 dark:text-white/70">
                  {cs.summary}
                </p>

                <dl className="mt-6 grid grid-cols-2 gap-3 border-t border-black/5 pt-4 text-xs dark:border-white/10">
                  <div>
                    <dt className="uppercase tracking-wider text-black/50 dark:text-white/50">
                      Shipped in
                    </dt>
                    <dd className="mt-1 text-sm font-semibold tabular-nums">
                      {cs.metrics.timeToLaunch}
                    </dd>
                  </div>
                  <div>
                    <dt className="uppercase tracking-wider text-black/50 dark:text-white/50">
                      Lighthouse
                    </dt>
                    <dd className="mt-1 text-sm font-semibold tabular-nums">
                      <span className="text-black/55 dark:text-white/55">
                        {cs.metrics.lighthouseBefore}
                      </span>
                      <span aria-hidden="true" className="mx-1">
                        →
                      </span>
                      <span className="text-emerald-700 dark:text-emerald-300">
                        {cs.metrics.lighthouseAfter}
                      </span>
                    </dd>
                  </div>
                </dl>

                <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand-700 dark:text-brand-300">
                  Read the case study
                  <span aria-hidden="true">→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <Link
            href="/case-studies"
            className="inline-flex items-center justify-center rounded-lg border border-black/10 bg-white px-5 py-2.5 text-sm font-medium text-black/80 shadow-sm transition hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:border-white/10 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10"
          >
            All case studies →
          </Link>
        </div>
      </div>
    </section>
  );
}
