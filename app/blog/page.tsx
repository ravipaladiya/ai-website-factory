import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllPosts, getAllTags } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on building, designing, and shipping production-ready websites autonomously.",
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": "/rss.xml" },
  },
  openGraph: {
    title: "Blog | AI Website Factory",
    description:
      "Notes on building, designing, and shipping production-ready websites autonomously.",
    type: "website",
    url: "/blog",
  },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogIndexPage({
  searchParams,
}: {
  searchParams?: { tag?: string };
}) {
  const activeTag = searchParams?.tag;
  const allPosts = getAllPosts();
  const allTags = getAllTags();

  const filtered = activeTag
    ? allPosts.filter((p) => p.tags.includes(activeTag))
    : allPosts;

  const [hero, ...rest] = filtered;
  const recent = rest.slice(0, 6);

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: activeTag ? `Blog posts tagged #${activeTag}` : "AI Website Factory blog",
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    numberOfItems: filtered.length,
    itemListElement: filtered.slice(0, 20).map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `/blog/${p.slug}`,
      name: p.title,
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
              items={[{ label: "Home", href: "/" }, { label: "Blog" }]}
            />
            <p className="mt-6 text-sm font-medium uppercase tracking-wider text-brand-600 dark:text-brand-300">
              Blog
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              Field notes from the factory.
            </h1>
            <p className="mt-4 max-w-2xl text-black/70 dark:text-white/70">
              Writing on the design decisions, engineering trade-offs, and SEO
              practices that go into every site the agent ships.
            </p>
            <p className="mt-6">
              <a
                href="/rss.xml"
                className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 transition hover:text-brand-700 dark:text-brand-300 dark:hover:text-brand-200"
              >
                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-4 w-4">
                  <path d="M4 11a5 5 0 0 1 5 5M4 5a11 11 0 0 1 11 11" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                  <circle cx="5" cy="15" r="1.25" fill="currentColor" />
                </svg>
                Subscribe via RSS
              </a>
            </p>

            {allTags.length > 0 && (
              <nav
                aria-label="Filter posts by tag"
                className="mt-8 flex flex-wrap items-center gap-2"
              >
                <Link
                  href="/blog"
                  className={
                    (!activeTag
                      ? "border-brand-500 bg-brand-600 text-white"
                      : "border-black/10 bg-white text-black/70 hover:border-brand-500/40 dark:border-white/10 dark:bg-white/5 dark:text-white/70") +
                    " inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition"
                  }
                >
                  All
                </Link>
                {allTags.map((tag) => {
                  const active = activeTag === tag;
                  return (
                    <Link
                      key={tag}
                      href={`/blog?tag=${encodeURIComponent(tag)}`}
                      className={
                        (active
                          ? "border-brand-500 bg-brand-600 text-white"
                          : "border-black/10 bg-white text-black/70 hover:border-brand-500/40 dark:border-white/10 dark:bg-white/5 dark:text-white/70") +
                        " inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition"
                      }
                    >
                      #{tag}
                    </Link>
                  );
                })}
              </nav>
            )}
          </div>
        </section>

        {filtered.length === 0 ? (
          <section className="container max-w-3xl py-20 text-center">
            <p className="text-black/70 dark:text-white/70">
              No posts tagged <strong>#{activeTag}</strong> yet.
            </p>
            <Link
              href="/blog"
              className="mt-4 inline-flex text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-300"
            >
              ← All posts
            </Link>
          </section>
        ) : (
          <>
            {hero && (
              <section
                aria-labelledby="hero-post-heading"
                className="py-14 sm:py-16"
              >
                <div className="container max-w-4xl">
                  <h2
                    id="hero-post-heading"
                    className="sr-only"
                  >
                    Featured post
                  </h2>
                  <Link
                    href={`/blog/${hero.slug}`}
                    className="group block rounded-3xl border border-black/5 bg-gradient-to-br from-brand-50 to-white p-8 shadow-sm transition hover:border-brand-500/30 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 sm:p-12 dark:border-white/10 dark:from-brand-500/10 dark:to-transparent"
                  >
                    <p className="flex items-center gap-2 text-xs text-black/60 dark:text-white/60">
                      <span className="inline-flex rounded-full bg-brand-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                        Latest
                      </span>
                      <time dateTime={hero.date}>{formatDate(hero.date)}</time>
                      <span aria-hidden="true">·</span>
                      <span>{hero.readingTime}</span>
                    </p>
                    <h3 className="mt-4 text-3xl font-semibold tracking-tight transition group-hover:text-brand-700 sm:text-4xl dark:group-hover:text-brand-200">
                      {hero.title}
                    </h3>
                    <p className="mt-4 max-w-2xl text-base text-black/70 dark:text-white/70">
                      {hero.excerpt}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-brand-700 dark:text-brand-300">
                      Read article <span aria-hidden="true">→</span>
                    </span>
                  </Link>
                </div>
              </section>
            )}

            {recent.length > 0 && (
              <section
                aria-labelledby="recent-posts-heading"
                className="border-t border-black/5 py-14 sm:py-20 dark:border-white/10"
              >
                <div className="container max-w-5xl">
                  <h2
                    id="recent-posts-heading"
                    className="text-2xl font-semibold tracking-tight"
                  >
                    More posts
                  </h2>
                  <ul
                    role="list"
                    className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                  >
                    {recent.map((post) => (
                      <li key={post.slug}>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="group flex h-full flex-col rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-500/30 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:border-white/10 dark:bg-white/5"
                        >
                          <p className="flex items-center gap-2 text-xs text-black/55 dark:text-white/55">
                            <time dateTime={post.date}>{formatDate(post.date)}</time>
                            <span aria-hidden="true">·</span>
                            <span>{post.readingTime}</span>
                          </p>
                          <h3 className="mt-3 text-lg font-semibold tracking-tight transition group-hover:text-brand-700 dark:group-hover:text-brand-200">
                            {post.title}
                          </h3>
                          <p className="mt-2 flex-1 text-sm text-black/70 dark:text-white/70">
                            {post.excerpt}
                          </p>
                          {post.tags.length > 0 && (
                            <p className="mt-4 flex flex-wrap gap-1.5">
                              {post.tags.map((t) => (
                                <span
                                  key={t}
                                  className="rounded-full bg-black/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-black/60 dark:bg-white/10 dark:text-white/60"
                                >
                                  #{t}
                                </span>
                              ))}
                            </p>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
