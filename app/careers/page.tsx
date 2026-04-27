import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join AI Website Factory — we’re building the autonomous engineering loop that ships production-ready websites.",
  alternates: { canonical: "/careers" },
  openGraph: {
    title: "Careers | AI Website Factory",
    description:
      "Join us in building the autonomous engineering loop behind modern websites.",
    type: "website",
    url: "/careers",
  },
};

const values = [
  {
    title: "Ship small, ship often",
    body: "We move in tight feedback loops — small PRs, green CI, real users on day one.",
  },
  {
    title: "Automate the boring parts",
    body: "If we did it twice, we script it. The agent eats our own dogfood.",
  },
  {
    title: "Write for the reader",
    body: "Clear code, clear docs, clear PRs. Future teammates are also users.",
  },
  {
    title: "Own the outcome",
    body: "Engineers here ship end-to-end — from research to deploy to on-call.",
  },
];

const roles = [
  {
    title: "Senior Full-Stack Engineer",
    team: "Engineering",
    location: "Remote (US / EU)",
    type: "Full-time",
    description:
      "Design and build core agent capabilities: planner, designer, builder, and shipping loop.",
  },
  {
    title: "Design Engineer",
    team: "Design",
    location: "Remote",
    type: "Full-time",
    description:
      "Turn design systems into reusable, accessible, beautifully built components.",
  },
  {
    title: "Developer Advocate",
    team: "Growth",
    location: "Remote",
    type: "Full-time",
    description:
      "Teach the autonomous dev workflow with docs, videos, and open-source examples.",
  },
];

const siteUrl = "https://ai-website-factory.example.com";

export default function CareersPage() {
  const careersJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteUrl}/careers#webpage`,
    name: "Careers at AI Website Factory",
    description:
      "Join AI Website Factory — we're building the autonomous engineering loop that ships production-ready websites.",
    url: `${siteUrl}/careers`,
    inLanguage: "en-US",
    isAccessibleForFree: true,
    about: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "AI Website Factory",
      url: siteUrl,
      logo: `${siteUrl}/favicon.svg`,
    },
    mainEntity: {
      "@type": "ItemList",
      name: "Open roles",
      numberOfItems: roles.length,
      itemListElement: roles.map((role, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: role.title,
        description: role.description,
      })),
    },
  };

  return (
    <>
      <Header />
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(careersJsonLd) }}
        />
        <section className="border-b border-black/5 py-16 sm:py-20 dark:border-white/10">
          <div className="container max-w-4xl">
            <Breadcrumbs
              items={[{ label: "Home", href: "/" }, { label: "Careers" }]}
            />
            <p className="mt-6 text-sm font-medium uppercase tracking-wider text-brand-600 dark:text-brand-300">
              Careers
            </p>
            <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Build the factory that builds the web.
            </h1>
            <p className="mt-4 max-w-2xl text-black/70 dark:text-white/70">
              We’re a small, remote team composing an autonomous engineering
              loop that plans, designs, codes, tests, and ships production
              websites. If shipping fast with high craft is your thing, we’d
              love to talk.
            </p>
          </div>
        </section>

        <section
          aria-labelledby="values-heading"
          className="py-14 sm:py-20"
        >
          <div className="container max-w-5xl">
            <h2
              id="values-heading"
              className="text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              How we work
            </h2>
            <ul
              role="list"
              className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              {values.map((v) => (
                <li
                  key={v.title}
                  className="rounded-2xl border border-black/5 bg-white/70 p-6 shadow-sm dark:border-white/10 dark:bg-white/5"
                >
                  <h3 className="text-base font-semibold tracking-tight">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-black/70 dark:text-white/70">
                    {v.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          aria-labelledby="open-roles-heading"
          className="border-t border-black/5 py-14 sm:py-20 dark:border-white/10"
        >
          <div className="container max-w-5xl">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2
                id="open-roles-heading"
                className="text-2xl font-semibold tracking-tight sm:text-3xl"
              >
                Open roles
              </h2>
              <p className="text-sm text-black/55 dark:text-white/55">
                {roles.length} open · remote-first
              </p>
            </div>

            <ul role="list" className="mt-8 space-y-4">
              {roles.map((role) => (
                <li
                  key={role.title}
                  className="rounded-2xl border border-black/5 bg-white/70 p-5 shadow-sm transition hover:border-brand-500/30 hover:shadow-md dark:border-white/10 dark:bg-white/5 sm:p-6"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold tracking-tight">
                        {role.title}
                      </h3>
                      <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-wider text-black/55 dark:text-white/55">
                        <span>{role.team}</span>
                        <span aria-hidden="true">·</span>
                        <span>{role.location}</span>
                        <span aria-hidden="true">·</span>
                        <span>{role.type}</span>
                      </p>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-black/70 dark:text-white/70">
                        {role.description}
                      </p>
                    </div>
                    <Link
                      href={`/contact?role=${encodeURIComponent(role.title)}`}
                      className="inline-flex shrink-0 items-center justify-center rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
                    >
                      Apply →
                    </Link>
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-10 text-center text-sm text-black/55 dark:text-white/55">
              Don&apos;t see the role you&apos;re after?{" "}
              <Link
                href="/contact"
                className="font-medium text-brand-700 hover:text-brand-800 dark:text-brand-300 dark:hover:text-brand-200"
              >
                Pitch us anyway
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
