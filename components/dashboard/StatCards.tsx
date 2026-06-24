import type { ReactNode } from "react";

type Counts = {
  total: number;
  live: number;
  building: number;
  failed: number;
};

type Metric = {
  label: string;
  value: number;
  chip: string;
  valueColor: string;
  icon: ReactNode;
};

export default function StatCards({ counts }: { counts: Counts }) {
  const metrics: Metric[] = [
    {
      label: "Total projects",
      value: counts.total,
      chip: "bg-brand-500/10 text-brand-700 dark:bg-brand-500/15 dark:text-brand-200",
      valueColor: "text-black dark:text-white",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
          <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
        </svg>
      ),
    },
    {
      label: "Live",
      value: counts.live,
      chip: "bg-emerald-500/10 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300",
      valueColor: "text-emerald-600 dark:text-emerald-300",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
          <path d="M8.5 12.5l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      label: "Building",
      value: counts.building,
      chip: "bg-amber-500/10 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300",
      valueColor: "text-amber-600 dark:text-amber-300",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
          <path d="M4 7l4 4-4 4M11 17h9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      label: "Failed",
      value: counts.failed,
      chip: "bg-red-500/10 text-red-700 dark:bg-red-400/10 dark:text-red-300",
      valueColor: "text-red-600 dark:text-red-300",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
          <path d="M12 7.5v5M12 16h.01" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <dl className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {metrics.map((m, i) => (
        <div
          key={m.label}
          style={{ animationDelay: `${i * 70}ms` }}
          className="animate-fade-up rounded-2xl border border-black/5 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/5 sm:p-5"
        >
          <div className="flex items-center justify-between gap-2">
            <dt className="text-xs font-medium text-black/55 dark:text-white/55">
              {m.label}
            </dt>
            <span
              aria-hidden="true"
              className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${m.chip}`}
            >
              {m.icon}
            </span>
          </div>
          <dd className={`mt-3 font-display text-3xl font-semibold tracking-tight ${m.valueColor}`}>
            {m.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
