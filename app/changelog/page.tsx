import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MDXContent from "@/components/blog/MDXContent";
import { getAllChangelogEntries } from "@/lib/changelog";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Weekly product updates from the AI Website Factory agent.",
  alternates: { canonical: "/changelog" },
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

export default function ChangelogPage() {
  const entries = getAllChangelogEntries();

  return (
    <>
      <Header />
      <main id="main">
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
