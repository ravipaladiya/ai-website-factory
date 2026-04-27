import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MDXContent from "@/components/blog/MDXContent";
import { getAllChangelogEntries } from "@/lib/changelog";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Weekly product updates from the AI Website Factory agent.",
  alternates: {
    canonical: "/changelog",
    types: { "application/rss+xml": "/changelog/feed.xml" },
  },
  openGraph: {
    title: "Changelog | AI Website Factory",
    description: "Weekly product updates from the AI Website Factory agent.",
    type: "website",
    url: "/changelog",
  },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const siteUrl = "https://ai-website-factory.example.com";

export default function ChangelogPage() {
  const entries = getAllChangelogEntries();

  const latestEntryDate = entries[0]?.date;
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${siteUrl}/changelog#blog`,
    name: "AI Website Factory changelog",
    description: "Weekly product updates from the AI Website Factory agent.",
    url: `${siteUrl}/changelog`,
    image: `${siteUrl}/changelog/opengraph-image`,
    inLanguage: "en-US",
    isAccessibleForFree: true,
    ...(latestEntryDate ? { dateModified: latestEntryDate } : {}),
    publisher: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "AI Website Factory",
    },
    blogPost: entries.map((e) => ({
      "@type": "BlogPosting",
      headline: e.title,
      datePublished: e.date,
      description: e.summary,
      url: `${siteUrl}/changelog#${e.slug}`,
      ...(e.tags && e.tags.length > 0 ? { keywords: e.tags.join(", ") } : {}),
    })),
  };

  return (
    <>
      <Header />
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
        />
        <section className="border-b border-black/5 py-16 sm:py-20 dark:border-white/10">
          <div className="container max-w-3xl">
            <Breadcrumbs
              items={[{ label: "Home", href: "/" }, { label: "Changelog" }]}
            />
            <p className="mt-6 text-sm font-medium uppercase tracking-wider text-brand-600 dark:text-brand-300">
              Changelog
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              Every week, a little better.
            </h1>
            <p className="mt-4 max-w-2xl text-black/70 dark:text-white/70">
              Product updates from the autonomous agent. New features, small
              fixes, and the occasional architectural rethink.
            </p>
            <p className="mt-6">
              <a
                href="/changelog/feed.xml"
                className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 transition hover:text-brand-700 dark:text-brand-300 dark:hover:text-brand-200"
              >
                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-4 w-4">
                  <path d="M4 11a5 5 0 0 1 5 5M4 5a11 11 0 0 1 11 11" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                  <circle cx="5" cy="15" r="1.25" fill="currentColor" />
                </svg>
                Subscribe via RSS
              </a>
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="container max-w-3xl">
            {entries.length === 0 ? (
              <p className="text-black/70 dark:text-white/70">
                No updates yet. Check back soon.
              </p>
            ) : (
              <ol role="list" className="space-y-16">
                {entries.map((entry) => (
                  <li
                    key={entry.slug}
                    id={entry.slug}
                    className="scroll-mt-24 border-l-2 border-brand-500/30 pl-6"
                  >
                    <p className="text-xs font-medium uppercase tracking-wider text-black/55 dark:text-white/55">
                      <time dateTime={entry.date}>{formatDate(entry.date)}</time>
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                      {entry.title}
                    </h2>
                    <p className="mt-2 text-black/70 dark:text-white/70">
                      {entry.summary}
                    </p>
                    <div className="mt-6 max-w-prose">
                      <MDXContent source={entry.raw} />
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
