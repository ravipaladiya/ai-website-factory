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
          <div className="container max-w-2xl">
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
              <p className="mt-4 text-lg text-black/70 dark:text-white/70">
                {post.description}
              </p>
            </header>

            <div className="mt-10 space-y-6 text-base leading-relaxed text-black/80 dark:text-white/80">
              {post.body.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <footer className="mt-12 border-t border-black/5 pt-6 text-sm text-black/60 dark:border-white/10 dark:text-white/60">
              Written by {post.author}
            </footer>

            <RelatedPosts currentSlug={post.slug} />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
