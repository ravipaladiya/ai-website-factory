import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReadingProgress from "@/components/ReadingProgress";
import RelatedPosts from "@/components/RelatedPosts";
import ShareButton from "@/components/blog/ShareButton";
import MDXContent from "@/components/blog/MDXContent";
import {
  extractHeadings,
  getAllSlugs,
  getPost,
  getPrevNext,
} from "@/lib/posts";

const siteUrl = "https://ai-website-factory.example.com";

type PageProps = { params: { slug: string } };

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      url: `/blog/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const headings = extractHeadings(post.raw);
  const { prev, next } = getPrevNext(post.slug);
  const shareUrl = `${siteUrl}/blog/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    keywords: post.tags.join(", "),
    author: { "@type": "Organization", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "AI Website Factory",
      logo: { "@type": "ImageObject", url: `${siteUrl}/favicon.svg` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": shareUrl,
    },
  };

  return (
    <>
      <ReadingProgress />
      <Header />
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <article className="py-16 sm:py-20">
          <div className="container grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[1fr_minmax(0,18rem)]">
            <div className="min-w-0">
              <Breadcrumbs
                items={[
                  { label: "Home", href: "/" },
                  { label: "Blog", href: "/blog" },
                  { label: post.title },
                ]}
              />

              <header className="mt-6">
                <p className="flex flex-wrap items-center gap-2 text-xs text-black/60 dark:text-white/60">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span aria-hidden="true">·</span>
                  <span>{post.readingTime}</span>
                  {post.tags.length > 0 && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="flex flex-wrap gap-1.5">
                        {post.tags.map((t) => (
                          <Link
                            key={t}
                            href={`/blog?tag=${encodeURIComponent(t)}`}
                            className="rounded-full bg-black/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-black/60 transition hover:text-black dark:bg-white/10 dark:text-white/60 dark:hover:text-white"
                          >
                            #{t}
                          </Link>
                        ))}
                      </span>
                    </>
                  )}
                </p>
                <h1 className="text-balance mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
                  {post.title}
                </h1>
                <p className="mt-5 text-xl leading-snug text-black/70 dark:text-white/70">
                  {post.excerpt}
                </p>
                <div className="mt-6">
                  <ShareButton title={post.title} url={shareUrl} />
                </div>
              </header>

              <div className="prose-fallback mt-8 max-w-prose">
                <MDXContent source={post.raw} />
              </div>

              <footer className="mt-14 flex items-center gap-3 border-t border-black/5 pt-6 text-sm text-black/60 dark:border-white/10 dark:text-white/60">
                <span
                  aria-hidden="true"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700 text-xs font-semibold text-white"
                >
                  {post.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </span>
                <span>
                  Written by{" "}
                  <span className="font-medium text-black/80 dark:text-white/80">
                    {post.author}
                  </span>
                </span>
              </footer>

              <nav
                aria-label="Previous and next post"
                className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2"
              >
                {prev ? (
                  <Link
                    href={`/blog/${prev.slug}`}
                    className="group flex flex-col rounded-xl border border-black/5 bg-white p-4 shadow-sm transition hover:border-brand-500/30 dark:border-white/10 dark:bg-white/5"
                  >
                    <span className="text-xs text-black/55 dark:text-white/55">
                      ← Previous
                    </span>
                    <span className="mt-1 text-sm font-medium tracking-tight group-hover:text-brand-700 dark:group-hover:text-brand-200">
                      {prev.title}
                    </span>
                  </Link>
                ) : (
                  <span />
                )}
                {next ? (
                  <Link
                    href={`/blog/${next.slug}`}
                    className="group flex flex-col rounded-xl border border-black/5 bg-white p-4 text-right shadow-sm transition hover:border-brand-500/30 dark:border-white/10 dark:bg-white/5"
                  >
                    <span className="text-xs text-black/55 dark:text-white/55">
                      Next →
                    </span>
                    <span className="mt-1 text-sm font-medium tracking-tight group-hover:text-brand-700 dark:group-hover:text-brand-200">
                      {next.title}
                    </span>
                  </Link>
                ) : (
                  <span />
                )}
              </nav>

              <RelatedPosts currentSlug={post.slug} />
            </div>

            {headings.length > 1 && (
              <aside
                aria-labelledby="toc-heading"
                className="hidden lg:block"
              >
                <div className="sticky top-24">
                  <h2
                    id="toc-heading"
                    className="text-xs font-semibold uppercase tracking-wider text-black/60 dark:text-white/60"
                  >
                    On this page
                  </h2>
                  <ol role="list" className="mt-3 space-y-2 text-sm">
                    {headings.map((h) => (
                      <li
                        key={h.id}
                        className={h.depth === 3 ? "ml-4" : undefined}
                      >
                        <a
                          href={`#${h.id}`}
                          className="text-black/60 transition hover:text-black dark:text-white/60 dark:hover:text-white"
                        >
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              </aside>
            )}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
