const labels = ["Site type", "Brand", "Pages", "Confirm"];

export default function WizardStepper({ step }: { step: number }) {
  return (
    <ol
      role="list"
      aria-label="Wizard progress"
      className="flex items-center gap-2 text-xs font-medium text-black/60 dark:text-white/60"
    >
      {labels.map((label, i) => {
        const state =
          i < step ? "done" : i === step ? "active" : "upcoming";
        return (
          <li key={label} className="flex items-center gap-2">
            <span
              aria-current={state === "active" ? "step" : undefined}
              className={
                (state === "done"
                  ? "border-brand-500 bg-brand-500 text-white"
                  : state === "active"
                    ? "border-brand-500 text-brand-700 dark:text-brand-200"
                    : "border-black/10 text-black/40 dark:border-white/10 dark:text-white/40") +
                " inline-flex h-6 w-6 items-center justify-center rounded-full border text-[11px] font-semibold"
              }
            >
              {state === "done" ? (
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-3 w-3">
                  <path d="m4 8 3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                i + 1
              )}
            </span>
            <span
              className={
                state === "upcoming"
                  ? "hidden sm:inline"
                  : "inline text-black/80 dark:text-white/80"
              }
            >
              {label}
            </span>
            {i < labels.length - 1 && (
              <span
                aria-hidden="true"
                className={
                  (state === "done" ? "bg-brand-500" : "bg-black/10 dark:bg-white/10") +
                  " mx-1 hidden h-px w-6 sm:inline-block"
                }
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
