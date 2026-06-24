import Link from "next/link";
import ProjectsGrid from "@/components/dashboard/ProjectsGrid";
import StatCards from "@/components/dashboard/StatCards";
import { projects } from "@/lib/dashboard-data";

export default function DashboardPage() {
  const counts = {
    total: projects.length,
    live: projects.filter((p) => p.status === "Live").length,
    building: projects.filter((p) => p.status === "Building").length,
    failed: projects.filter((p) => p.status === "Failed").length,
  };

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-wrap items-end justify-between gap-4 animate-fade-up">
        <div>
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Welcome back
          </h2>
          <p className="mt-1.5 text-sm text-black/55 dark:text-white/55">
            A live look at what your AI engineer has shipped.
          </p>
        </div>
        <Link
          href="/new"
          prefetch
          className="inline-flex items-center gap-1.5 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm shadow-brand-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-md hover:shadow-brand-600/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
        >
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-4 w-4">
            <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          New project
        </Link>
      </div>

      <div className="mt-6">
        <StatCards counts={counts} />
      </div>

      <div className="mt-10">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-lg font-semibold tracking-tight">
            Projects
          </h3>
          <p className="text-xs text-black/50 dark:text-white/50">
            {counts.total} total
          </p>
        </div>
        <div className="mt-4">
          <ProjectsGrid projects={projects} />
        </div>
      </div>
    </div>
  );
}
