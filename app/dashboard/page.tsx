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
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Projects</h2>
          <p className="mt-1 text-sm text-black/60 dark:text-white/60">
            {projects.length} projects · {counts.live} live · {counts.building}{" "}
            building · {counts.failed} failed
          </p>
        </div>
      </div>

      <div className="mt-6">
        <ProjectsGrid projects={projects} />
      </div>
    </div>
  );
}
