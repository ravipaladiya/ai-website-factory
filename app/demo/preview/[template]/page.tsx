import { notFound } from "next/navigation";
import { demoTemplateIds, type DemoTemplateId } from "@/lib/demo-store";

export function generateStaticParams() {
  return demoTemplateIds.map((t) => ({ template: t }));
}

export const metadata = {
  title: "Demo preview",
  robots: { index: false, follow: false },
};

function Ecommerce() {
  const products = [
    { c: "from-emerald-300 to-emerald-600", name: "Sage bundle", p: "$48" },
    { c: "from-amber-300 to-amber-600", name: "Citrus oil", p: "$29" },
    { c: "from-rose-300 to-rose-600", name: "Balm", p: "$32" },
    { c: "from-sky-300 to-sky-600", name: "Cleanser", p: "$22" },
    { c: "from-violet-300 to-violet-600", name: "Mask", p: "$52" },
    { c: "from-teal-300 to-teal-600", name: "Serum", p: "$64" },
  ];
  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold text-emerald-700">
          <span className="h-4 w-4 rounded bg-gradient-to-br from-emerald-400 to-emerald-700" />
          Verdant
        </div>
        <nav className="text-sm text-black/70">Shop · About · Cart</nav>
      </div>
      <h1 className="mt-12 text-center text-4xl font-semibold tracking-tight">Plant-based skincare, shipped same-day.</h1>
      <p className="mt-3 text-center text-black/60">Small batch. Carbon-neutral. Loved by 12,000+ customers.</p>
      <div className="mt-10 grid grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p.name} className="rounded-xl border border-black/5 bg-white p-3 shadow-sm">
            <div className={`aspect-square rounded-lg bg-gradient-to-br ${p.c}`} />
            <p className="mt-2 text-sm font-medium">{p.name}</p>
            <p className="text-xs text-black/60">{p.p}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SaasLanding() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold">
          <span className="h-4 w-4 rounded bg-gradient-to-br from-indigo-400 to-indigo-700" />
          Pulseboard
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-black/70">Sign in</span>
          <span className="rounded-md bg-indigo-600 px-3 py-1 font-medium text-white">Start free</span>
        </div>
      </div>
      <div className="mt-16 text-center">
        <span className="inline-flex rounded-full border border-indigo-500/20 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
          • Analytics that doesn&apos;t ship to a third party
        </span>
        <h1 className="mt-5 text-5xl font-semibold tracking-tight">One dashboard. Every metric.</h1>
        <p className="mx-auto mt-4 max-w-xl text-black/70">
          Pulseboard unifies product usage, revenue, and support tickets in a single view your whole team can read.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <span className="rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white">Start free</span>
          <span className="rounded-lg border border-black/10 bg-white px-5 py-2.5 font-medium text-black/80">See it work</span>
        </div>
      </div>
      <div className="mt-14 grid grid-cols-3 gap-4">
        {["Real-time events", "Native integrations", "SQL-level access"].map((f) => (
          <div key={f} className="rounded-xl border border-black/5 bg-white p-5 shadow-sm">
            <div className="h-4 w-4 rounded bg-gradient-to-br from-indigo-400 to-indigo-700" />
            <p className="mt-3 font-medium">{f}</p>
            <p className="mt-1 text-sm text-black/60">Ship faster with defaults that just work.</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Portfolio() {
  const tiles = [
    "from-zinc-300 to-zinc-600",
    "from-amber-300 to-orange-600",
    "from-sky-300 to-blue-700",
    "from-rose-300 to-fuchsia-600",
    "from-emerald-300 to-teal-600",
    "from-violet-300 to-indigo-700",
  ];
  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold italic">Maya Takahashi</p>
        <nav className="text-sm text-black/70">Work · About · Contact</nav>
      </div>
      <div className="mt-14 max-w-2xl">
        <h1 className="text-5xl font-semibold leading-tight tracking-tight">
          Designer making things that feel calm, clear, and a little unexpected.
        </h1>
        <p className="mt-4 text-black/70">
          Based in Tokyo. Currently taking projects for identity, web, and editorial work.
        </p>
      </div>
      <div className="mt-10 grid grid-cols-3 gap-4">
        {tiles.map((c, i) => (
          <div key={i} className={`aspect-[5/4] rounded-xl bg-gradient-to-br ${c}`} />
        ))}
      </div>
    </div>
  );
}

function Blog() {
  const posts = [
    { title: "Writing for fast readers", t: "6 min · Craft" },
    { title: "Why we prerender", t: "8 min · Eng" },
    { title: "SEO isn't a checklist", t: "5 min · Growth" },
  ];
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <p className="text-sm font-medium uppercase tracking-wider text-brand-600">Field notes</p>
      <h1 className="mt-3 text-5xl font-semibold tracking-tight">Notes from the factory</h1>
      <p className="mt-4 text-black/70">Ideas on craft, engineering, and the small choices that add up.</p>
      <ul className="mt-10 divide-y divide-black/5">
        {posts.map((p) => (
          <li key={p.title} className="py-6">
            <p className="text-xs text-black/55">{p.t}</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight">{p.title}</h2>
            <p className="mt-2 text-black/70">A short excerpt about the idea and what the reader will learn.</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Docs() {
  return (
    <div className="mx-auto flex max-w-6xl gap-8 px-6 py-10">
      <aside className="w-56 shrink-0">
        <p className="text-sm font-semibold">Docs</p>
        <ul className="mt-4 space-y-1.5 text-sm text-black/70">
          {["Getting started", "Concepts", "CLI", "API reference", "Recipes", "Migration"].map((s, i) => (
            <li key={s} className={i === 1 ? "font-medium text-brand-700" : ""}>
              {s}
            </li>
          ))}
        </ul>
      </aside>
      <main className="flex-1">
        <p className="text-xs text-black/55">Concepts</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">Routing &amp; layouts</h1>
        <p className="mt-4 text-black/70">
          Next.js supports nested layouts that let you compose reusable UI across routes without re-mounting shared components.
        </p>
        <h2 className="mt-8 text-2xl font-semibold tracking-tight">Nested routes</h2>
        <p className="mt-3 text-black/70">Each folder in the app directory maps to a URL segment.</p>
        <pre className="mt-4 overflow-x-auto rounded-lg bg-black/90 p-4 font-mono text-xs text-emerald-200">
          {`app/
├── layout.tsx
├── page.tsx
└── blog/
    ├── layout.tsx
    └── page.tsx`}
        </pre>
      </main>
    </div>
  );
}

function Preview({ template }: { template: DemoTemplateId }) {
  switch (template) {
    case "ecommerce":
      return <Ecommerce />;
    case "saas-landing":
      return <SaasLanding />;
    case "portfolio":
      return <Portfolio />;
    case "blog":
      return <Blog />;
    case "docs":
      return <Docs />;
    default:
      return null;
  }
}

export default function DemoPreviewPage({
  params,
}: {
  params: { template: string };
}) {
  const template = demoTemplateIds.find((t) => t === params.template);
  if (!template) notFound();

  return (
    <div className="min-h-screen bg-neutral-50 text-black dark:bg-[#0b0e1a] dark:text-white">
      <Preview template={template} />
    </div>
  );
}
