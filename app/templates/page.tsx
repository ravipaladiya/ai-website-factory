import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { demoTemplates, type DemoTemplateId } from "@/lib/demo-store";

const siteUrl = "https://ai-website-factory.example.com";

export const metadata: Metadata = {
  title: "Templates",
  description:
    "Browse the production-ready website templates the AI Website Factory agent ships with — SaaS landing, portfolio, e-commerce, blog, and docs. Preview live, then start a project.",
  alternates: { canonical: "/templates" },
  openGraph: {
    title: "Templates | AI Website Factory",
    description:
      "Production-ready Next.js templates: SaaS landing, portfolio, e-commerce, blog, and docs. Preview live, then start a project.",
    type: "website",
    url: "/templates",
  },
};

type TemplateMeta = {
  id: DemoTemplateId;
  tagline: string;
  description: string;
  highlights: string[];
  audience: string;
  swatch: string;
};

const templateMeta: Record<DemoTemplateId, TemplateMeta> = {
  "saas-landing": {
    id: "saas-landing",
    tagline: "Convert visitors into trial signups",
    description:
      "Hero, social proof, feature grid, pricing toggle, FAQ, and a closing CTA — designed to push qualified visitors into a free-trial flow.",
    highlights: [
      "Built-in pricing toggle (monthly / annual)",
      "Stripe Checkout-ready pricing tiers",
      "Lighthouse 95+ on the marketing page",
    ],
    audience: "Founders launching a B2B product",
    swatch: "from-indigo-400 via-indigo-500 to-blue-600",
  },
  portfolio: {
    id: "portfolio",
    tagline: "An editorial showcase for your work",
    description:
      "Quiet typography, big images, and a project grid that lets the work breathe. Includes case-study pages and a contact CTA.",
    highlights: [
      "MDX-driven case studies",
      "Color-aware focus rings + reduced-motion support",
      "Optimized images via next/image",
    ],
    audience: "Designers and freelance studios",
    swatch: "from-amber-300 via-orange-400 to-rose-500",
  },
  ecommerce: {
    id: "ecommerce",
    tagline: "Same-day, conversion-tuned storefront",
    description:
      "Product grid, PDP layout, cart drawer, and a checkout-ready order summary. Wired for Stripe and a structured-data product feed.",
    highlights: [
      "Product schema.org markup for rich SERPs",
      "Cart drawer with optimistic UI",
      "Static-first product pages with on-demand revalidation",
    ],
    audience: "Independent brands and DTC stores",
    swatch: "from-emerald-300 via-emerald-500 to-teal-600",
  },
  blog: {
    id: "blog",
    tagline: "A serious editorial home for your writing",
    description:
      "MDX posts with reading-time, table of contents, prev/next, RSS feed, tag filtering, and Article JSON-LD on every post.",
    highlights: [
      "Static-rendered, instant page loads",
      "Tag filtering with noindex on filtered views",
      "Built-in RSS feed at /rss.xml",
    ],
    audience: "Indie writers and content teams",
    swatch: "from-slate-300 via-slate-400 to-slate-700",
  },
  docs: {
    id: "docs",
    tagline: "Developer-grade docs out of the box",
    description:
      "Sidebar nav, in-page TOC, code blocks with language tabs, and a doc-search-ready structure. Linked from your product surfaces by default.",
    highlights: [
      "Nested layouts with persistent sidebar",
      "Anchored headings + scroll-margin",
      "Search-engine-friendly nav structure",
    ],
    audience: "Developer-tooling and platform teams",
    swatch: "from-sky-300 via-sky-500 to-indigo-600",
  },
};

function templateLabel(id: DemoTemplateId): string {
  return demoTemplates.find((t) => t.id === id)?.label ?? id;
}

const orderedTemplates: DemoTemplateId[] = demoTemplates.map((t) => t.id);

export default function TemplatesPage() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "AI Website Factory templates",
    description:
      "Production-ready Next.js templates: SaaS landing, portfolio, e-commerce, blog, and docs.",
    itemListElement: orderedTemplates.map((id, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${siteUrl}/demo/preview/${id}`,
      name: templateLabel(id),
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
          <div className="container max-w-3xl">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Templates" },
              ]}
            />
            <p className="mt-6 text-sm font-medium uppercase tracking-wider text-brand-600 dark:text-brand-300">
              Templates
            </p>
            <h1 className="text-balance mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              Pick a starting point. Ship the same day.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-black/70 dark:text-white/70">
              Every template is a real Next.js + TypeScript + Tailwind project —
              not a static screenshot. Preview the layout live, then hand it
              to the agent to brand it, fill it, and ship it.
            </p>
          </div>
        </section>

        <section
          aria-labelledby="grid-heading"
          className="py-14 sm:py-20"
        >
          <h2 id="grid-heading" className="sr-only">
            All templates
          </h2>
          <div className="container max-w-6xl">
            <ul
              role="list"
              className="grid grid-cols-1 gap-6 md:grid-cols-2"
            >
              {orderedTemplates.map((id) => {
                const m = templateMeta[id];
                const label = templateLabel(id);
                return (
                  <li
                    key={id}
                    className="flex flex-col overflow-hidden rounded-3xl border border-black/5 bg-white/70 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-white/5"
                  >
                    <div
                      aria-hidden="true"
                      className={
                        "relative aspect-[16/8] w-full bg-gradient-to-br " +
                        m.swatch
                      }
                    >
                      <div className="absolute inset-x-6 bottom-6 flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-white/90" />
                        <span className="h-2.5 w-2.5 rounded-full bg-white/70" />
                        <span className="h-2.5 w-2.5 rounded-full bg-white/50" />
                        <span className="ml-2 truncate rounded-md bg-white/90 px-2 py-0.5 text-[11px] font-medium text-black/80">
                          {id}.vercel.app
                        </span>
                      </div>
                      <div className="absolute left-6 top-6 inline-flex items-center gap-1.5 rounded-full bg-black/30 px-2.5 py-0.5 text-[11px] font-medium text-white backdrop-blur">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                        Live preview
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-xs font-medium uppercase tracking-wider text-brand-600 dark:text-brand-300">
                        {m.audience}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold tracking-tight">
                        {label}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-black/80 dark:text-white/85">
                        {m.tagline}
                      </p>
                      <p className="mt-3 text-sm text-black/70 dark:text-white/70">
                        {m.description}
                      </p>

                      <ul
                        role="list"
                        className="mt-4 space-y-1.5 text-sm text-black/70 dark:text-white/70"
                      >
                        {m.highlights.map((h) => (
                          <li key={h} className="flex gap-2">
                            <span
                              aria-hidden="true"
                              className="mt-1.5 inline-block h-1.5 w-1.5 flex-none rounded-full bg-brand-500"
                            />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-auto flex flex-col gap-2 pt-6 sm:flex-row">
                        <Link
                          href="/new"
                          prefetch
                          className="inline-flex w-full items-center justify-center rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 sm:w-auto"
                        >
                          Start with this
                        </Link>
                        <Link
                          href={`/demo/preview/${id}`}
                          className="inline-flex w-full items-center justify-center rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm font-medium text-black/80 shadow-sm transition hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 sm:w-auto dark:border-white/10 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10"
                        >
                          View live preview <span aria-hidden="true" className="ml-1">→</span>
                        </Link>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section className="border-t border-black/5 py-16 sm:py-20 dark:border-white/10">
          <div className="container max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Don&apos;t see your shape?
            </h2>
            <p className="mt-4 text-black/70 dark:text-white/70">
              Templates are starting points, not constraints. Describe what you
              want and the agent will adapt the closest match — or build a
              fresh layout from scratch.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/new"
                prefetch
                className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
              >
                Start a custom project
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-black/10 bg-white px-5 py-3 text-sm font-medium text-black/80 shadow-sm transition hover:bg-black/5 dark:border-white/10 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10"
              >
                Talk to the team
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
