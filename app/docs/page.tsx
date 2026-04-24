import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Docs",
  description:
    "Get started with AI Website Factory: install, run the agent, deploy, and extend the generated site.",
  alternates: { canonical: "/docs" },
  openGraph: {
    title: "Docs | AI Website Factory",
    description:
      "Get started, deploy, and extend sites built by AI Website Factory.",
    type: "website",
    url: "/docs",
  },
};

type Section = {
  id: string;
  title: string;
  summary: string;
  items: { title: string; body: string; code?: string }[];
};

const sections: Section[] = [
  {
    id: "quickstart",
    title: "Quickstart",
    summary:
      "Spin up a production-ready site in under five minutes with the CLI.",
    items: [
      {
        title: "Install the CLI",
        body: "Install the factory globally with your favorite package manager.",
        code: "npm i -g @ai-website-factory/cli",
      },
      {
        title: "Create a project",
        body: "Interactive wizard that scopes the site and generates a Next.js repo.",
        code: "awf new my-site",
      },
      {
        title: "Run the agent",
        body: "Kick off the plan → design → build → ship loop.",
        code: "cd my-site && awf build",
      },
    ],
  },
  {
    id: "deploy",
    title: "Deploy",
    summary:
      "Ship the generated site to Vercel, Netlify, Cloudflare, or any Node host.",
    items: [
      {
        title: "Vercel",
        body: "Push the repo to GitHub and import it at vercel.com/new. No config needed.",
      },
      {
        title: "Docker / Node",
        body: "Run next build then next start. The Dockerfile in /infra is production-ready.",
        code: "docker build -t my-site . && docker run -p 3000:3000 my-site",
      },
    ],
  },
  {
    id: "extend",
    title: "Extend",
    summary:
      "The generated repo is yours — edit components, add routes, integrate APIs.",
    items: [
      {
        title: "Add a route",
        body: "Create a new folder under /app with a page.tsx. The agent respects your manual edits on future iterations.",
      },
      {
        title: "Theme the site",
        body: "Edit tailwind.config.ts to swap the brand palette. All components inherit the theme.",
      },
      {
        title: "Wire up data",
        body: "Server components fetch at the edge. Drop your database client into /lib and import from any route.",
      },
    ],
  },
  {
    id: "agent",
    title: "Agent behavior",
    summary:
      "How the autonomous loop decides what to change and when to stop.",
    items: [
      {
        title: "Definition of done",
        body: "Every pass must pass lint, type-check, build, and the project's test suite before the agent commits.",
      },
      {
        title: "Scope boundaries",
        body: "The agent works in feature branches, opens a PR per iteration, and never force-pushes to main.",
      },
      {
        title: "Stopping the loop",
        body: "Set AWF_MAX_ITERATIONS or send STOP in the CLI to pause indefinitely — in-flight work is committed first.",
      },
    ],
  },
];

export default function DocsPage() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="border-b border-black/5 py-16 sm:py-20 dark:border-white/10">
          <div className="container max-w-4xl">
            <Breadcrumbs
              items={[{ label: "Home", href: "/" }, { label: "Docs" }]}
            />
            <p className="mt-6 text-sm font-medium uppercase tracking-wider text-brand-600 dark:text-brand-300">
              Docs
            </p>
            <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Build, ship, and extend sites with the agent.
            </h1>
            <p className="mt-4 max-w-2xl text-black/70 dark:text-white/70">
              A short tour: install the CLI, run the plan → design → build →
              ship loop, and deploy anywhere.
            </p>
          </div>
        </section>

        <section className="py-14 sm:py-20">
          <div className="container max-w-5xl">
            <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
              <nav
                aria-label="Docs sections"
                className="top-24 h-fit lg:sticky"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-black/55 dark:text-white/55">
                  On this page
                </p>
                <ul role="list" className="mt-3 space-y-1.5 text-sm">
                  {sections.map((s) => (
                    <li key={s.id}>
                      <Link
                        href={`#${s.id}`}
                        className="block rounded-md px-2 py-1 text-black/70 transition hover:bg-black/5 hover:text-black dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white"
                      >
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="space-y-16">
                {sections.map((section) => (
                  <article
                    key={section.id}
                    id={section.id}
                    aria-labelledby={`${section.id}-heading`}
                    className="scroll-mt-24"
                  >
                    <h2
                      id={`${section.id}-heading`}
                      className="text-2xl font-semibold tracking-tight sm:text-3xl"
                    >
                      {section.title}
                    </h2>
                    <p className="mt-2 text-black/70 dark:text-white/70">
                      {section.summary}
                    </p>

                    <ol
                      role="list"
                      className="mt-6 space-y-4 border-l border-black/10 pl-6 dark:border-white/10"
                    >
                      {section.items.map((item, i) => (
                        <li
                          key={item.title}
                          className="relative"
                        >
                          <span
                            aria-hidden="true"
                            className="absolute -left-[29px] top-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-[10px] font-semibold text-white"
                          >
                            {i + 1}
                          </span>
                          <h3 className="text-base font-semibold tracking-tight">
                            {item.title}
                          </h3>
                          <p className="mt-1 text-sm leading-relaxed text-black/70 dark:text-white/70">
                            {item.body}
                          </p>
                          {item.code && (
                            <pre className="mt-3 overflow-x-auto rounded-lg border border-black/10 bg-black/5 p-3 text-xs font-mono text-black/80 dark:border-white/10 dark:bg-black/40 dark:text-white/80">
                              <code>{item.code}</code>
                            </pre>
                          )}
                        </li>
                      ))}
                    </ol>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-black/5 py-16 dark:border-white/10">
          <div className="container max-w-3xl text-center">
            <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
              Need something that&apos;s not documented yet?
            </h2>
            <p className="mt-3 text-sm text-black/70 dark:text-white/70">
              Open an issue on GitHub or drop a note — we add docs for the
              questions we see most.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="https://github.com/ravipaladiya/ai-website-factory/issues/new"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg border border-black/10 bg-white px-4 py-2 text-sm font-medium text-black/80 shadow-sm transition hover:bg-black/5 dark:border-white/10 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10"
              >
                Open an issue
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-brand-700"
              >
                Contact us →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
