import type { BuildPhase } from "@/lib/project-store";
import { buildPhases } from "@/lib/project-store";

export default function StepIndicator({
  current,
  done,
}: {
  current: BuildPhase;
  done: boolean;
}) {
  const currentIndex = buildPhases.indexOf(current);

  return (
    <ol
      role="list"
      aria-label="Build phases"
      className="grid grid-cols-2 gap-3 sm:grid-cols-5"
    >
      {buildPhases.map((phase, i) => {
        let state: "done" | "active" | "upcoming";
        if (done) state = "done";
        else if (i < currentIndex) state = "done";
        else if (i === currentIndex) state = "active";
        else state = "upcoming";

        return (
          <li
            key={phase}
            aria-current={state === "active" ? "step" : undefined}
            className={
              (state === "done"
                ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-800 dark:text-emerald-200"
                : state === "active"
                  ? "border-brand-500/40 bg-brand-50 text-brand-800 dark:bg-brand-500/15 dark:text-brand-100"
                  : "border-black/10 bg-white text-black/55 dark:border-white/10 dark:bg-white/5 dark:text-white/55") +
              " flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition"
            }
          >
            <span
              aria-hidden="true"
              className={
                (state === "done"
                  ? "bg-emerald-500"
                  : state === "active"
                    ? "bg-brand-500 motion-safe:animate-pulse"
                    : "bg-black/20 dark:bg-white/20") + " h-2 w-2 rounded-full"
              }
            />
            <span className="truncate font-medium">{phase}</span>
          </li>
        );
      })}
    </ol>
  );
}
