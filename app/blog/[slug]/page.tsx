import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReadingProgress from "@/components/ReadingProgress";
import RelatedPosts from "@/components/RelatedPosts";
import { getAllSlugs, getPost } from "@/lib/posts";

type PageProps = { params: { slug: string } };

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      url: `/blog/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
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

  const siteUrl = "https://ai-website-factory.example.com";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "AI Website Factory",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/favicon.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${post.slug}`,
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
          <div className="container max-w-prose">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: post.title },
              ]}
            />

            <header className="mt-6">
              <p className="flex items-center gap-2 text-xs text-black/60 dark:text-white/60">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span aria-hidden="true">·</span>
                <span>{post.readingTime}</span>
              </p>
              <h1 className="text-balance mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
                {post.title}
              </h1>
              <p className="mt-5 text-xl leading-snug text-black/70 dark:text-white/70">
                {post.description}
              </p>
            </header>

            <div className="mt-12 space-y-6 text-[1.0625rem] leading-[1.75] text-black/85 dark:text-white/85 [text-wrap:pretty]">
              {post.body.map((para, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "first-letter:float-left first-letter:mr-2 first-letter:text-5xl first-letter:font-semibold first-letter:leading-none first-letter:text-brand-700 dark:first-letter:text-brand-300"
                      : undefined
                  }
                >
                  {para}
                </p>
              ))}
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

            <RelatedPosts currentSlug={post.slug} />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
