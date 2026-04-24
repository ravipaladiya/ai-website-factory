import type { DayPoint, ServiceHealth } from "@/lib/status-data";

const fill: Record<ServiceHealth, string> = {
  operational: "bg-emerald-500",
  degraded: "bg-amber-500",
  outage: "bg-red-500",
};

const label: Record<ServiceHealth, string> = {
  operational: "Operational",
  degraded: "Degraded",
  outage: "Outage",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function UptimeChart({ history }: { history: DayPoint[] }) {
  return (
    <div
      role="img"
      aria-label="90-day uptime history. Most recent day on the right."
      className="flex h-12 w-full items-end gap-[2px]"
    >
      {history.map((d) => (
        <span
          key={d.date}
          tabIndex={0}
          className={
            fill[d.health] +
            " group relative flex-1 rounded-t-[2px] transition hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          }
          style={{ height: "100%" }}
        >
          <span className="sr-only">
            {formatDate(d.date)}: {label[d.health]}, {d.uptime.toFixed(2)}% uptime
          </span>
          <span
            role="tooltip"
            className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-md border border-black/10 bg-white px-2.5 py-1.5 text-xs shadow-md group-hover:block group-focus-visible:block dark:border-white/10 dark:bg-[#0b0e1a]"
          >
            <span className="block font-medium">{formatDate(d.date)}</span>
            <span className="mt-0.5 block text-black/70 dark:text-white/70">
              <span className="capitalize">{d.health}</span>
              <span aria-hidden="true"> · </span>
              <span className="tabular-nums">{d.uptime.toFixed(2)}%</span>
            </span>
          </span>
        </span>
      ))}
    </div>
  );
}
