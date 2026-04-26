import type { Metadata } from "next";
import Link from "next/link";
import BuildView from "@/components/project-build/BuildView";
import { projects as dashboardProjects } from "@/lib/dashboard-data";
import { getProject } from "@/lib/project-store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Build",
  robots: { index: false, follow: false },
};

export default function BuildPage({
  params,
}: {
  params: { id: string };
}) {
  const project = getProject(params.id);

  if (project) {
    return (
      <main id="main" className="min-h-screen px-4 py-10 sm:px-6 sm:py-14">
        <BuildView projectId={project.id} brandName={project.input.brandName} />
      </main>
    );
  }

  // Fall back to dashboard-data (which carries example, already-shipped
  // projects). The in-memory build store doesn't know about them, but we
  // can still tell the user what the project is rather than 404'ing.
  const archived = dashboardProjects.find((p) => p.id === params.id);

  return (
    <main id="main" className="min-h-screen px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-2xl rounded-2xl border border-black/5 bg-white/70 p-8 text-center shadow-sm dark:border-white/10 dark:bg-white/5">
        <p className="text-xs font-medium uppercase tracking-wider text-brand-600 dark:text-brand-300">
          Build session
        </p>
        <h1 className="text-balance mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          {archived ? `${archived.name} is already live.` : "Build session ended."}
        </h1>
        <p className="mt-3 text-sm text-black/65 dark:text-white/65">
          {archived
            ? `The streaming build log for ${archived.name} has expired -- the site has been deployed and is serving from ${archived.domain}.`
            : "We couldn't find a live build session for this project. The build log is only kept while the agent is iterating."}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {archived && (
            <a
              href={`https://${archived.domain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 sm:w-auto"
            >
              Open the live site →
            </a>
          )}
          <Link
            href="/dashboard"
            className="inline-flex w-full items-center justify-center rounded-lg border border-black/10 bg-white px-5 py-2.5 text-sm font-medium text-black/80 shadow-sm transition hover:bg-black/5 dark:border-white/10 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10 sm:w-auto"
          >
            Back to dashboard
          </Link>
          <Link
            href="/new"
            prefetch
            className="inline-flex w-full items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-black/70 transition hover:text-black dark:text-white/70 dark:hover:text-white sm:w-auto"
          >
            Start a new project
          </Link>
        </div>
      </div>
    </main>
  );
}
