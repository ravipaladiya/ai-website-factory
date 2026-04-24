import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Compare",
  description:
    "Side-by-side comparison of AI Website Factory, hand-rolled Next.js development, and no-code builders — time, cost, SEO, and extensibility.",
  alternates: { canonical: "/compare" },
  openGraph: {
    title: "Compare | AI Website Factory",
    description:
      "How AI Website Factory stacks up against hand-rolled Next.js and no-code builders.",
    type: "website",
    url: "/compare",
  },
};

type Cell = boolean | string;
type Row = { label: string; agent: Cell; diy: Cell; noCode: Cell };

const columns = [
  {
    key: "agent",
    name: "AI Website Factory",
    tag: "Us",
    accent:
      "bg-brand-600 text-white ring-1 ring-inset ring-brand-700 dark:bg-brand-500 dark:ring-brand-400",
  },
  {
    key: "diy",
    name: "Hand-rolled Next.js",
    tag: "DIY",
    accent:
      "bg-black/5 text-black/80 ring-1 ring-inset ring-black/10 dark:bg-white/10 dark:text-white/80 dark:ring-white/15",
  },
  {
    key: "noCode",
    name: "No-code builders",
    tag: "Other",
    accent:
      "bg-black/5 text-black/80 ring-1 ring-inset ring-black/10 dark:bg-white/10 dark:text-white/80 dark:ring-white/15",
  },
] as const;

const rows: Row[] = [
  {
    label: "Time to first deploy",
    agent: "~1 day",
    diy: "2–6 weeks",
    noCode: "Hours",
  },
  {
    label: "Production-ready Next.js codebase",
    agent: true,
    diy: true,
    noCode: false,
  },
  {
    label: "You own the code (git repo)",
    agent: true,
    diy: true,
    noCode: false,
  },
  {
    label: "SEO metadata + sitemap + JSON-LD",
    agent: "Built-in",
    diy: "Manual",
    noCode: "Partial",
  },
  {
    label: "Lighthouse 95+ by default",
    agent: true,
    diy: "Effort-dependent",
    noCode: false,
  },
  {
    label: "Mobile-first responsive design",
    agent: true,
    diy: true,
    noCode: "Template-dependent",
  },
  {
    label: "WCAG-aware accessibility",
    agent: true,
    diy: "Effort-dependent",
    noCode: "Partial",
  },
  {
    label: "Deploy anywhere (Vercel, AWS, self-host)",
    agent: true,
    diy: true,
    noCode: false,
  },
  {
    label: "Continuous iteration with CI gates",
    agent: true,
    diy: "If configured",
    noCode: false,
  },
  {
    label: "Predictable monthly cost",
    agent: "$29",
    diy: "$10k+ in dev time",
    noCode: "$20–200",
  },
];

function CellValue({ value }: { value: Cell }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700 dark:text-emerald-300">
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-4 w-4">
          <path
            d="m4 10 4 4 8-9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="sr-only">Included</span>
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm text-black/45 dark:text-white/40">
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-4 w-4">
          <path
            d="M5 5l10 10M15 5L5 15"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
        <span className="sr-only">Not included</span>
      </span>
    );
  }
  return (
    <span className="text-sm text-black/80 dark:text-white/80">{value}</span>
  );
}

export default function ComparePage() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="border-b border-black/5 py-16 sm:py-20 dark:border-white/10">
          <div className="container max-w-5xl">
            <Breadcrumbs
              items={[{ label: "Home", href: "/" }, { label: "Compare" }]}
            />
            <p className="mt-6 text-sm font-medium uppercase tracking-wider text-brand-600 dark:text-brand-300">
              Compare
            </p>
            <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Why teams ship with AI Website Factory.
            </h1>
            <p className="mt-4 max-w-2xl text-black/70 dark:text-white/70">
              A candid, side-by-side look at how the agent compares to writing
              Next.js by hand or using a no-code builder — across time, cost,
              SEO, and what you own at the end.
            </p>
          </div>
        </section>

        <section aria-labelledby="compare-table-heading" className="py-14 sm:py-20">
          <div className="container max-w-5xl">
            <h2 id="compare-table-heading" className="sr-only">
              Feature comparison
            </h2>

            <div className="overflow-x-auto rounded-2xl border border-black/5 bg-white/70 shadow-sm dark:border-white/10 dark:bg-white/5">
              <table className="min-w-full divide-y divide-black/5 text-left dark:divide-white/10">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="w-1/3 px-4 py-4 text-xs font-semibold uppercase tracking-wider text-black/55 dark:text-white/55 sm:px-6"
                    >
                      Capability
                    </th>
                    {columns.map((col) => (
                      <th
                        key={col.key}
                        scope="col"
                        className="px-4 py-4 sm:px-6"
                      >
                        <span
                          className={
                            col.accent +
                            " inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider"
                          }
                        >
                          {col.tag}
                        </span>
                        <p className="mt-1.5 text-sm font-semibold tracking-tight text-black/85 dark:text-white/90">
                          {col.name}
                        </p>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 dark:divide-white/10">
                  {rows.map((row) => (
                    <tr key={row.label}>
                      <th
                        scope="row"
                        className="px-4 py-4 text-sm font-medium text-black/80 dark:text-white/80 sm:px-6"
                      >
                        {row.label}
                      </th>
                      <td className="bg-brand-500/5 px-4 py-4 sm:px-6">
                        <CellValue value={row.agent} />
                      </td>
                      <td className="px-4 py-4 sm:px-6">
                        <CellValue value={row.diy} />
                      </td>
                      <td className="px-4 py-4 sm:px-6">
                        <CellValue value={row.noCode} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-6 text-xs text-black/50 dark:text-white/50">
              Comparisons describe a typical marketing-site engagement and are
              based on publicly available product docs and our own build
              telemetry. Your mileage may vary.
            </p>
          </div>
        </section>

        <section className="border-t border-black/5 py-16 sm:py-20 dark:border-white/10">
          <div className="container max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Ready to skip the 6-week sprint?
            </h2>
            <p className="mt-4 text-black/70 dark:text-white/70">
              Start building for free — ship a production-ready, SEO-optimized
              site in about a day.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="/#cta"
                className="inline-flex w-full items-center justify-center rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 sm:w-auto"
              >
                Start free
              </a>
              <a
                href="/#pricing"
                className="inline-flex w-full items-center justify-center rounded-lg border border-black/10 bg-white px-5 py-2.5 text-sm font-medium text-black/80 shadow-sm transition hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 sm:w-auto dark:border-white/10 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10"
              >
                See pricing →
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
