import Link from "next/link";
import ProjectsGrid from "@/components/dashboard/ProjectsGrid";
import { projects } from "@/lib/dashboard-data";

export default function DashboardPage() {
  const counts = {
    live: projects.filter((p) => p.status === "Live").length,
    building: projects.filter((p) => p.status === "Building").length,
    failed: projects.filter((p) => p.status === "Failed").length,
  };

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="text-sm text-black/60 dark:text-white/60">
          {projects.length} projects · {counts.live} live · {counts.building}{" "}
          building · {counts.failed} failed
        </p>
        <Link
          href="/new"
          prefetch
          className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
        >
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-4 w-4">
            <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          New project
        </Link>
      </div>

      <div className="mt-6">
        <ProjectsGrid projects={projects} />
      </div>
    </div>
  );
}
