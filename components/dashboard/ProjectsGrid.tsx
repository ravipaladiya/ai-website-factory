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

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
    >
      {projects.map((p) => (
        <li key={p.id}>
          <Link
            href={`/dashboard`}
            className="group flex h-full flex-col rounded-2xl border border-black/5 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-500/30 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:border-white/10 dark:bg-white/5 dark:hover:border-brand-500/30"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="truncate text-base font-semibold tracking-tight">
                  {p.name}
                </h3>
                <p className="mt-0.5 truncate text-xs text-black/55 dark:text-white/55">
                  {p.domain}
                </p>
              </div>
              <StatusBadge status={p.status} />
            </div>

            <p className="mt-3 line-clamp-2 text-sm text-black/70 dark:text-white/70">
              {p.description}
            </p>

            <div className="mt-auto flex items-center justify-between gap-2 pt-4 text-xs text-black/55 dark:text-white/55">
              <span className="inline-flex items-center gap-1.5">
                <span
                  aria-hidden="true"
                  className="inline-block h-1.5 w-1.5 rounded-full bg-black/25 dark:bg-white/25"
                />
                {p.framework}
              </span>
              <span>Updated {timeAgo(p.updatedAt)}</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
