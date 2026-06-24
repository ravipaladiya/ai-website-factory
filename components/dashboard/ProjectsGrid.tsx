import Link from "next/link";
import type { Project } from "@/lib/dashboard-data";
import StatusBadge from "./StatusBadge";

function timeAgo(iso: string) {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diffMin = Math.max(1, Math.round((now - then) / 60_000));
  if (diffMin < 60) return `${diffMin}m ago`;
  const h = Math.round(diffMin / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.round(h / 24);
  return `${d}d ago`;
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-black/10 bg-white/40 px-6 py-16 text-center dark:border-white/10 dark:bg-white/5">
      <div
        aria-hidden="true"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-200"
      >
        <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
          <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">
        No projects yet
      </h3>
      <p className="mt-2 max-w-sm text-sm text-black/60 dark:text-white/60">
        Spin up your first AI-built site in four quick steps. The agent
        scopes it, designs it, codes it, and ships a green build.
      </p>
      <Link
        href="/new"
        prefetch
        className="mt-6 inline-flex items-center gap-1.5 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
      >
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-4 w-4">
          <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        New project
      </Link>
    </div>
  );
}

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
    >
      {projects.map((p, i) => (
        <li
          key={p.id}
          style={{ animationDelay: `${i * 60}ms` }}
          className="animate-fade-up"
        >
          <Link
            href={`/projects/${p.id}/build`}
            className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-black/5 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:border-white/10 dark:bg-white/5 dark:hover:border-brand-500/40"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h4 className="truncate font-display text-base font-semibold tracking-tight">
                  {p.name}
                </h4>
                <p className="mt-0.5 truncate text-xs text-black/55 dark:text-white/55">
                  {p.domain}
                </p>
              </div>
              <StatusBadge status={p.status} />
            </div>

            <p className="mt-3 line-clamp-2 text-sm text-black/65 dark:text-white/65">
              {p.description}
            </p>

            <div className="mt-auto flex items-center justify-between gap-2 pt-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-black/5 px-2.5 py-1 text-[11px] font-medium text-black/65 dark:bg-white/10 dark:text-white/70">
                {p.framework}
              </span>
              <span className="flex items-center gap-1 text-xs text-black/45 transition-colors group-hover:text-brand-600 dark:text-white/45 dark:group-hover:text-brand-300">
                Updated {timeAgo(p.updatedAt)}
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                >
                  <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
