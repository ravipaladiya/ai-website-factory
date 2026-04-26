import Link from "next/link";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { projects } from "@/lib/dashboard-data";

export const metadata = {
  title: "Builds",
  robots: { index: false, follow: false },
};

function relativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diffMin = Math.max(1, Math.round((now - then) / 60_000));
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.round(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.round(diffHr / 24);
  return `${diffDay}d ago`;
}

export default function BuildsPage() {
  // The dashboard data treats each project as having a single most-recent
  // build; surface that as a flat list sorted newest first.
  const recent = [...projects].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Builds</h2>
          <p className="mt-1 text-sm text-black/60 dark:text-white/60">
            Latest build for each project. Iteration history coming soon.
          </p>
        </div>
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

      <ul
        role="list"
        className="mt-6 divide-y divide-black/5 overflow-hidden rounded-2xl border border-black/5 bg-white/70 dark:divide-white/10 dark:border-white/10 dark:bg-white/5"
      >
        {recent.map((p) => (
          <li
            key={p.id}
            className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:gap-6 sm:px-6"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold tracking-tight">
                {p.name}
              </p>
              <p className="mt-0.5 truncate text-xs text-black/60 dark:text-white/60">
                {p.domain} · {p.framework}
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs text-black/60 dark:text-white/60">
              <span>{relativeTime(p.updatedAt)}</span>
              <StatusBadge status={p.status} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
