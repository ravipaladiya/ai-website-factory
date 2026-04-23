import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on building, designing, and shipping production-ready websites autonomously.",
  alternates: { canonical: "/blog" },
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

export default function BlogIndexPage() {
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <>
      <Header />
      <main id="main">
        <section className="border-b border-black/5 py-16 sm:py-20 dark:border-white/10">
          <div className="container max-w-3xl">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Blog" },
              ]}
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
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="container max-w-3xl">
            <ul role="list" className="divide-y divide-black/5 dark:divide-white/10">
              {sorted.map((post) => (
                <li key={post.slug} className="py-8 first:pt-0 last:pb-0">
                  <article>
                    <p className="flex items-center gap-2 text-xs text-black/60 dark:text-white/60">
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                      <span aria-hidden="true">·</span>
                      <span>{post.readingTime}</span>
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="transition hover:text-brand-600 dark:hover:text-brand-300"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mt-3 text-black/70 dark:text-white/70">
                      {post.description}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-600 transition hover:text-brand-700 dark:text-brand-300 dark:hover:text-brand-200"
                    >
                      Read article <span aria-hidden="true">→</span>
                    </Link>
                  </article>
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
