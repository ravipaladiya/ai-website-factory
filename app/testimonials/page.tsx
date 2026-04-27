import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { reviews, summary } from "@/lib/testimonials";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Real reviews from teams shipping production websites with AI Website Factory.",
  alternates: { canonical: "/testimonials" },
  openGraph: {
    title: "Testimonials | AI Website Factory",
    description: "Real reviews from teams shipping production websites with AI Website Factory.",
    type: "website",
    url: "/testimonials",
  },
};

function avatarUrl(seed: string) {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}&backgroundColor=eef4ff,d9e5ff,b8cdff`;
}

function Stars({ value }: { value: number }) {
  const filled = Math.round(value);
  return (
    <div
      className="flex items-center gap-0.5 text-brand-500"
      aria-label={`${value} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          fill={i < filled ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={i < filled ? 0 : 1.5}
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path d="M10 1.5 12.472 7.06l6.028.618-4.5 4.083 1.25 5.937L10 14.75 4.75 17.698 6 11.761 1.5 7.678l6.028-.618z" />
        </svg>
      ))}
    </div>
  );
}

const siteUrl = "https://ai-website-factory.example.com";

export default function TestimonialsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "AI Website Factory",
    url: siteUrl,
    description:
      "Autonomous engineering agent that plans, designs, builds, tests, and ships production-ready websites.",
    brand: {
      "@type": "Brand",
      name: "AI Website Factory",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: summary.averageRating.toFixed(1),
      reviewCount: summary.totalReviews,
      bestRating: 5,
      worstRating: 1,
    },
    review: reviews.map((r) => ({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 5,
        worstRating: 1,
      },
      author: {
        "@type": "Person",
        name: r.name,
        jobTitle: r.title,
      },
      reviewBody: r.quote,
      ...(r.caseStudySlug
        ? { url: `${siteUrl}/case-studies/${r.caseStudySlug}` }
        : {}),
    })),
  };

  return (
    <>
      <Header />
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <section className="border-b border-black/5 py-16 sm:py-20 dark:border-white/10">
          <div className="container max-w-4xl">
            <Breadcrumbs
              items={[{ label: "Home", href: "/" }, { label: "Testimonials" }]}
            />
          </div>
          <div className="container max-w-4xl text-center">
            <p className="mt-6 text-sm font-medium uppercase tracking-wider text-brand-600 dark:text-brand-300">
              Testimonials
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              Every review. Every team.
            </h1>

            <div className="mt-6 inline-flex items-center gap-3">
              <Stars value={summary.averageRating} />
              <p className="text-sm text-black/70 dark:text-white/70">
                <span className="font-semibold text-black dark:text-white">
                  {summary.averageRating.toFixed(1)}/5
                </span>{" "}
                from {summary.totalReviews.toLocaleString("en-US")} reviews
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="container max-w-5xl">
            <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
              {reviews.map((r) => (
                <figure
                  key={r.id}
                  className="mb-6 inline-block w-full break-inside-avoid rounded-2xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5"
                >
                  <Stars value={r.rating} />
                  <blockquote className="mt-3 text-sm leading-relaxed text-black/80 dark:text-white/80">
                    &ldquo;{r.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={avatarUrl(r.avatarSeed)}
                      alt=""
                      width={36}
                      height={36}
                      loading="lazy"
                      className="h-9 w-9 rounded-full border border-black/10 bg-brand-50 dark:border-white/10"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{r.name}</p>
                      <p className="truncate text-xs text-black/60 dark:text-white/60">
                        {r.title}
                      </p>
                    </div>
                  </figcaption>
                  {r.caseStudySlug && (
                    <Link
                      href={`/case-studies/${r.caseStudySlug}`}
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-700 hover:text-brand-800 dark:text-brand-300 dark:hover:text-brand-200"
                    >
                      View case study <span aria-hidden="true">→</span>
                    </Link>
                  )}
                </figure>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
