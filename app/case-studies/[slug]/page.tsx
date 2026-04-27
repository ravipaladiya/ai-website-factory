import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShareButton from "@/components/blog/ShareButton";
import { caseStudies, getCaseStudy, getReview } from "@/lib/testimonials";

type PageProps = { params: { slug: string } };

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const cs = getCaseStudy(params.slug);
  if (!cs) return {};
  return {
    title: `${cs.company} case study`,
    description: cs.summary,
    alternates: { canonical: `/case-studies/${cs.slug}` },
    openGraph: {
      title: `${cs.company} · AI Website Factory case study`,
      description: cs.summary,
      type: "article",
      url: `/case-studies/${cs.slug}`,
    },
  };
}

function Metric({ label, value, emphasis }: { label: string; value: string; emphasis?: boolean }) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-black/55 dark:text-white/55">
        {label}
      </p>
      <p
        className={
          (emphasis
            ? "text-brand-700 dark:text-brand-200"
            : "text-black/90 dark:text-white/90") +
          " mt-2 text-2xl font-semibold tracking-tight tabular-nums sm:text-3xl"
        }
      >
        {value}
      </p>
    </div>
  );
}

export default function CaseStudyPage({ params }: PageProps) {
  const cs = getCaseStudy(params.slug);
  if (!cs) notFound();
  const review = cs.reviewId ? getReview(cs.reviewId) : undefined;

  const lighthouseDelta = cs.metrics.lighthouseAfter - cs.metrics.lighthouseBefore;

  const canonicalUrl = `https://ai-website-factory.example.com/case-studies/${cs.slug}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: cs.tagline,
    description: cs.summary,
    about: cs.company,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    url: canonicalUrl,
    image: `${canonicalUrl}/opengraph-image`,
    inLanguage: "en-US",
    isAccessibleForFree: true,
    author: {
      "@type": "Organization",
      name: "AI Website Factory",
    },
    publisher: {
      "@type": "Organization",
      name: "AI Website Factory",
    },
    articleSection: "Case studies",
    mentions: {
      "@type": "Organization",
      name: cs.company,
      url: `https://${cs.siteUrl}`,
    },
  };

  return (
    <>
      <Header />
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        <section className="border-b border-black/5 py-16 sm:py-20 dark:border-white/10">
          <div className="container max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-wider text-brand-600 dark:text-brand-300">
              Case study
            </p>
            <h1 className="text-balance mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              {cs.tagline}
            </h1>
            <p className="mt-4 text-lg text-black/70 dark:text-white/70">
              {cs.summary}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs text-black/55 dark:text-white/55">
                Live site:{" "}
                <span className="font-mono text-black/80 dark:text-white/80">
                  {cs.siteUrl}
                </span>
              </p>
              <ShareButton
                title={`${cs.company} case study — ${cs.tagline}`}
                url={canonicalUrl}
              />
            </div>
          </div>
        </section>

        <section
          aria-labelledby="metrics-heading"
          className="py-14 sm:py-16"
        >
          <div className="container max-w-4xl">
            <h2 id="metrics-heading" className="sr-only">Key metrics</h2>
            <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <Metric
                label="Time to launch"
                value={cs.metrics.timeToLaunch}
                emphasis
              />
              <Metric
                label="Lighthouse before"
                value={cs.metrics.lighthouseBefore.toString()}
              />
              <Metric
                label="Lighthouse after"
                value={`${cs.metrics.lighthouseAfter}${
                  lighthouseDelta > 0 ? ` (+${lighthouseDelta})` : ""
                }`}
                emphasis
              />
              {cs.metrics.extra.map((m) => (
                <Metric key={m.label} label={m.label} value={m.value} />
              ))}
            </dl>
          </div>
        </section>

        <section aria-labelledby="preview-heading" className="pb-14 sm:pb-16">
          <div className="container max-w-4xl">
            <h2
              id="preview-heading"
              className="text-xs font-semibold uppercase tracking-wider text-black/55 dark:text-white/55"
            >
              Live site
            </h2>
            <div className="mt-3 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-xl dark:border-white/10 dark:bg-black/40">
              <div className="flex items-center gap-2 border-b border-black/5 bg-neutral-50 px-3 py-2 dark:border-white/10 dark:bg-[#11152a]">
                <span className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                </span>
                <span className="ml-2 truncate text-xs text-black/60 dark:text-white/60">
                  {cs.siteUrl}
                </span>
              </div>
              <iframe
                title={`${cs.company} live site preview`}
                src={`/demo/preview/${cs.previewTemplate}`}
                sandbox="allow-same-origin"
                loading="lazy"
                className="aspect-[16/10] w-full bg-white dark:bg-[#0b0e1a]"
              />
            </div>
            <p className="mt-3 text-xs text-black/50 dark:text-white/50">
              Preview frame served in-app. Real deployments point at the
              customer domain above.
            </p>
          </div>
        </section>

        <section
          aria-labelledby="story-heading"
          className="border-t border-black/5 py-14 sm:py-16 dark:border-white/10"
        >
          <div className="container max-w-2xl">
            <h2
              id="story-heading"
              className="text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              How it played out
            </h2>
            <div className="mt-6 space-y-5 text-[1.0625rem] leading-[1.75] text-black/85 dark:text-white/85">
              {cs.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {review && (
              <figure className="mt-10 rounded-2xl border border-brand-500/20 bg-brand-50 p-6 dark:border-brand-400/20 dark:bg-brand-500/10">
                <blockquote className="text-base leading-relaxed text-black/85 dark:text-white/90">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-4 text-sm">
                  <span className="font-medium">{review.name}</span>
                  <span className="text-black/55 dark:text-white/55">
                    {" "}· {review.title}
                  </span>
                </figcaption>
              </figure>
            )}

            <div className="mt-10 flex items-center justify-between text-sm">
              <Link
                href="/testimonials"
                className="text-black/70 transition hover:text-black dark:text-white/70 dark:hover:text-white"
              >
                ← All testimonials
              </Link>
              <Link
                href="/new"
                prefetch
                className="inline-flex items-center gap-1 font-medium text-brand-700 hover:text-brand-800 dark:text-brand-300 dark:hover:text-brand-200"
              >
                Start your own <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        {(() => {
          const others = caseStudies.filter((c) => c.slug !== cs.slug);
          if (others.length === 0) return null;
          return (
            <section
              aria-labelledby="related-cases-heading"
              className="border-t border-black/5 py-16 sm:py-20 dark:border-white/10"
            >
              <div className="container max-w-5xl">
                <h2
                  id="related-cases-heading"
                  className="text-2xl font-semibold tracking-tight"
                >
                  Other case studies
                </h2>
                <ul
                  role="list"
                  className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2"
                >
                  {others.map((other) => (
                    <li key={other.slug}>
                      <Link
                        href={`/case-studies/${other.slug}`}
                        className="group flex h-full flex-col rounded-2xl border border-black/5 bg-white/70 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-500/30 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:border-white/10 dark:bg-white/5"
                      >
                        <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-300">
                          {other.company}
                        </p>
                        <h3 className="mt-2 text-base font-semibold tracking-tight transition group-hover:text-brand-700 dark:group-hover:text-brand-200">
                          {other.tagline}
                        </h3>
                        <p className="mt-2 line-clamp-2 text-sm text-black/65 dark:text-white/65">
                          {other.summary}
                        </p>
                        <div className="mt-4 flex items-center gap-3 text-[11px] uppercase tracking-wider text-black/55 dark:text-white/55">
                          <span>{other.metrics.timeToLaunch}</span>
                          <span aria-hidden="true">·</span>
                          <span>
                            Lighthouse {other.metrics.lighthouseBefore}{" "}
                            <span aria-hidden="true">→</span>{" "}
                            <span className="text-emerald-700 dark:text-emerald-300">
                              {other.metrics.lighthouseAfter}
                            </span>
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          );
        })()}
      </main>
      <Footer />
    </>
  );
}
