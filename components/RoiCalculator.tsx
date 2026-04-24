"use client";

import { useMemo, useState } from "react";

const DEV_DAYS_PER_SITE = 28;
const AGENT_DAYS_PER_SITE = 1;

function formatMoney(n: number): string {
  const rounded = Math.round(n);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(rounded);
}

function formatDays(n: number): string {
  if (n >= 365) {
    const years = n / 365;
    return `${years.toFixed(1)} yr`;
  }
  if (n >= 30) {
    const months = n / 30;
    return `${months.toFixed(1)} mo`;
  }
  return `${Math.round(n)} d`;
}

export default function RoiCalculator() {
  const [sites, setSites] = useState(6);
  const [rate, setRate] = useState(950);

  const { savedDays, savedCost, traditionalCost, agentCost, multiplier } =
    useMemo(() => {
      const traditionalDays = sites * DEV_DAYS_PER_SITE;
      const agentDays = sites * AGENT_DAYS_PER_SITE;
      const savedDays = traditionalDays - agentDays;
      const traditionalCost = traditionalDays * rate;
      const agentCost = agentDays * rate + sites * 29;
      const savedCost = traditionalCost - agentCost;
      const multiplier = traditionalDays / Math.max(agentDays, 1);
      return {
        savedDays,
        savedCost,
        traditionalCost,
        agentCost,
        multiplier,
      };
    }, [sites, rate]);

  return (
    <section
      id="roi"
      aria-labelledby="roi-heading"
      className="border-t border-black/5 py-20 sm:py-24 dark:border-white/10"
    >
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-brand-600 dark:text-brand-300">
            ROI
          </p>
          <h2
            id="roi-heading"
            className="text-balance mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            See what you save by shipping on autopilot.
          </h2>
          <p className="text-balance mt-4 text-black/70 dark:text-white/70">
            Drag the sliders to model your pipeline. The agent builds each site
            in roughly <strong>1 day</strong> versus{" "}
            <strong>~{DEV_DAYS_PER_SITE} days</strong> for a typical hand-rolled
            Next.js build.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-stretch">
          <div className="rounded-2xl border border-black/5 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 sm:p-8">
            <fieldset className="space-y-8">
              <legend className="sr-only">ROI inputs</legend>

              <div>
                <div className="flex items-baseline justify-between">
                  <label
                    htmlFor="roi-sites"
                    className="text-sm font-medium"
                  >
                    Sites shipped per year
                  </label>
                  <output
                    htmlFor="roi-sites"
                    className="text-lg font-semibold tabular-nums text-brand-700 dark:text-brand-300"
                  >
                    {sites}
                  </output>
                </div>
                <input
                  id="roi-sites"
                  type="range"
                  min={1}
                  max={50}
                  step={1}
                  value={sites}
                  onChange={(e) => setSites(Number(e.target.value))}
                  className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-black/10 accent-brand-600 dark:bg-white/10"
                  aria-valuemin={1}
                  aria-valuemax={50}
                  aria-valuenow={sites}
                />
                <div className="mt-1 flex justify-between text-[11px] uppercase tracking-wider text-black/45 dark:text-white/45">
                  <span>1</span>
                  <span>50</span>
                </div>
              </div>

              <div>
                <div className="flex items-baseline justify-between">
                  <label
                    htmlFor="roi-rate"
                    className="text-sm font-medium"
                  >
                    Blended dev day rate
                  </label>
                  <output
                    htmlFor="roi-rate"
                    className="text-lg font-semibold tabular-nums text-brand-700 dark:text-brand-300"
                  >
                    {formatMoney(rate)}
                  </output>
                </div>
                <input
                  id="roi-rate"
                  type="range"
                  min={300}
                  max={2000}
                  step={50}
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-black/10 accent-brand-600 dark:bg-white/10"
                  aria-valuemin={300}
                  aria-valuemax={2000}
                  aria-valuenow={rate}
                />
                <div className="mt-1 flex justify-between text-[11px] uppercase tracking-wider text-black/45 dark:text-white/45">
                  <span>$300</span>
                  <span>$2,000</span>
                </div>
              </div>
            </fieldset>

            <dl className="mt-8 grid grid-cols-2 gap-3 border-t border-black/5 pt-6 dark:border-white/10">
              <div className="rounded-lg bg-black/5 px-4 py-3 dark:bg-white/5">
                <dt className="text-[11px] uppercase tracking-wider text-black/50 dark:text-white/50">
                  Traditional
                </dt>
                <dd className="mt-1 text-lg font-semibold tabular-nums">
                  {formatMoney(traditionalCost)}
                </dd>
              </div>
              <div className="rounded-lg bg-black/5 px-4 py-3 dark:bg-white/5">
                <dt className="text-[11px] uppercase tracking-wider text-black/50 dark:text-white/50">
                  With agent
                </dt>
                <dd className="mt-1 text-lg font-semibold tabular-nums">
                  {formatMoney(agentCost)}
                </dd>
              </div>
            </dl>
          </div>

          <div
            aria-live="polite"
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-6 text-white shadow-xl sm:p-8"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-grid opacity-20"
            />
            <div className="relative flex h-full flex-col">
              <p className="text-xs uppercase tracking-[0.18em] text-white/70">
                Projected savings
              </p>
              <p className="mt-3 text-4xl font-semibold tabular-nums sm:text-5xl">
                {formatMoney(savedCost)}
              </p>
              <p className="mt-1 text-sm text-white/80">
                per year on {sites} {sites === 1 ? "site" : "sites"}
              </p>

              <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-white/70">Time reclaimed</dt>
                  <dd className="mt-1 text-xl font-semibold tabular-nums">
                    {formatDays(savedDays)}
                  </dd>
                </div>
                <div>
                  <dt className="text-white/70">Speed multiplier</dt>
                  <dd className="mt-1 text-xl font-semibold tabular-nums">
                    {multiplier.toFixed(0)}×
                  </dd>
                </div>
              </dl>

              <div className="mt-auto pt-8">
                <a
                  href="#cta"
                  className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-brand-700 shadow-sm transition hover:bg-brand-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-700"
                >
                  Start saving today →
                </a>
                <p className="mt-3 text-[11px] text-white/60">
                  Estimates assume a typical marketing site; actual savings
                  depend on scope and team setup.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
