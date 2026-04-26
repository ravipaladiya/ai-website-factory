import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { caseStudies } from "@/lib/testimonials";

const siteUrl = "https://ai-website-factory.example.com";

export const metadata: Metadata = {
  title: "Case studies",
  description:
    "Real teams shipped real sites with AI Website Factory — time to launch, Lighthouse lift, and what they kept after.",
  alternates: { canonical: "/case-studies" },
  openGraph: {
    title: "Case studies | AI Website Factory",
    description:
      "Real teams shipped real sites — time to launch, Lighthouse lift, and what they kept after.",
    type: "website",
    url: "/case-studies",
  },
};

export default function CaseStudiesIndexPage() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "AI Website Factory case studies",
    description:
      "Real teams shipped real sites — time to launch, Lighthouse lift, and what they kept after.",
    numberOfItems: caseStudies.length,
    itemListElement: caseStudies.map((cs, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${siteUrl}/case-studies/${cs.slug}`,
      name: `${cs.company} — ${cs.tagline}`,
    })),
  };

  return (
    <>
      <Header />
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
        />
        <section className="border-b border-black/5 py-16 sm:py-20 dark:border-white/10">
          <div className="container max-w-4xl">
            <Breadcrumbs
              items={[{ label: "Home", href: "/" }, { label: "Case studies" }]}
            />
            <p className="mt-6 text-sm font-medium uppercase tracking-wider text-brand-600 dark:text-brand-300">
              Case studies
            </p>
            <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Real teams, shipped in hours.
            </h1>
            <p className="mt-4 max-w-2xl text-black/70 dark:text-white/70">
              A look at what the agent actually shipped for our customers —
              time to launch, Lighthouse lift, and what they kept after.
            </p>
          </div>
        </section>

        <section className="py-14 sm:py-20">
          <div className="container max-w-5xl">
            <ul role="list" className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {caseStudies.map((cs) => (
                <li key={cs.slug}>
                  <Link
                    href={`/case-studies/${cs.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-black/5 bg-white/70 p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-500/30 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:border-white/10 dark:bg-white/5"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-300">
                      {cs.company}
                    </p>
                    <h2 className="mt-2 text-xl font-semibold tracking-tight transition group-hover:text-brand-700 dark:group-hover:text-brand-200">
                      {cs.tagline}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-black/70 dark:text-white/70">
                      {cs.summary}
                    </p>

                    <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-black/5 pt-4 text-xs dark:border-white/10">
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
                      <div>
                        <dt className="uppercase tracking-wider text-black/50 dark:text-white/50">
                          Template
                        </dt>
                        <dd className="mt-1 text-sm font-semibold capitalize">
                          {cs.previewTemplate.replace(/-/g, " ")}
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
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
