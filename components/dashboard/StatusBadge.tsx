import type { ProjectStatus } from "@/lib/dashboard-data";

const styles: Record<ProjectStatus, { wrap: string; dot: string; ariaLive?: "polite" }> = {
  Live: {
    wrap: "border-emerald-500/20 bg-emerald-500/10 text-emerald-800 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-200",
    dot: "bg-emerald-500",
  },
  Building: {
    wrap: "border-amber-500/20 bg-amber-500/10 text-amber-800 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-200",
    dot: "bg-amber-500 motion-safe:animate-pulse",
    ariaLive: "polite",
  },
  Failed: {
    wrap: "border-red-500/20 bg-red-500/10 text-red-800 dark:border-red-400/20 dark:bg-red-400/10 dark:text-red-200",
    dot: "bg-red-500",
  },
};

export default function StatusBadge({ status }: { status: ProjectStatus }) {
  const s = styles[status];
  return (
    <span
      aria-live={s.ariaLive}
      className={
        s.wrap +
        " inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium"
      }
    >
      <span aria-hidden="true" className={s.dot + " h-1.5 w-1.5 rounded-full"} />
      {status}
    </span>
  );
}
