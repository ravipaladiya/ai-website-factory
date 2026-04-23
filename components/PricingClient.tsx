"use client";

import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import {
  ANNUAL_DISCOUNT,
  comparisonRows,
  pricingTiers,
  type BillingInterval,
  type ComparisonRow,
  type FeatureValue,
  type PlanId,
} from "@/lib/pricing";

function Check() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-4 w-4 flex-none">
      <path
        d="m5 10 3.5 3.5L15 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Cross() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-3.5 w-3.5 flex-none">
      <path
        d="m6 6 8 8M14 6l-8 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function formatPrice(value: number | null): string {
  if (value === null) return "Custom";
  if (value === 0) return "$0";
  return `$${value}`;
}

export default function PricingClient() {
  const { data: session } = useSession();
  const currentPlan = useMemo<PlanId | null>(() => {
    const name = session?.user?.plan;
    if (!name) return null;
    return pricingTiers.find((t) => t.name === name)?.id ?? null;
  }, [session]);

  const [interval, setInterval] = useState<BillingInterval>("monthly");
  const [busy, setBusy] = useState<PlanId | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSelect(planId: PlanId) {
    setError(null);
    const tier = pricingTiers.find((t) => t.id === planId);
    if (!tier) return;

    if (!tier.billable) {
      window.location.href =
        planId === "enterprise" ? "/contact" : "/#cta";
      return;
    }

    setBusy(planId);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ plan: planId, interval }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        url?: string;
        error?: string;
      };

      if (res.status === 401) {
        window.location.href = `/login?next=${encodeURIComponent("/#pricing")}`;
        return;
      }

      if (!res.ok) {
        setError(data.error ?? "Could not start checkout. Try again.");
        return;
      }
      if (!data.url) {
        setError("Checkout session missing.");
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Network error. Try again.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <>
      <div className="mt-8 flex flex-col items-center gap-2">
        <div
          role="radiogroup"
          aria-label="Billing interval"
          className="inline-flex items-center rounded-full border border-black/10 bg-white/80 p-1 shadow-sm dark:border-white/10 dark:bg-white/5"
        >
          {(["monthly", "annual"] as BillingInterval[]).map((v) => {
            const selected = interval === v;
            return (
              <button
                key={v}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setInterval(v)}
                className={
                  (selected
                    ? "bg-brand-600 text-white shadow"
                    : "text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white") +
                  " inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
                }
              >
                {v === "monthly" ? "Monthly" : "Annual"}
                {v === "annual" && (
                  <span
                    className={
                      (selected
                        ? "bg-white/20 text-white"
                        : "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300") +
                      " inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                    }
                  >
                    Save {Math.round(ANNUAL_DISCOUNT * 100)}%
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div role="list" className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {pricingTiers.map((tier) => {
          const isCurrent = currentPlan === tier.id;
          const price =
            interval === "annual" ? tier.annual : tier.monthly;
          const cadence =
            tier.monthly === null
              ? ""
              : interval === "annual"
                ? "per month, billed annually"
                : "per month";
          const buttonLabel = busy === tier.id ? "Redirecting…" : tier.cta;

          return (
            <div
              role="listitem"
              key={tier.id}
              className={
                tier.featured
                  ? "relative flex flex-col rounded-2xl border border-brand-500/30 bg-gradient-to-b from-brand-50 to-white p-6 shadow-lg ring-1 ring-brand-500/20 dark:from-brand-500/10 dark:to-transparent"
                  : "relative flex flex-col rounded-2xl border border-black/5 bg-white/70 p-6 shadow-sm dark:border-white/10 dark:bg-white/5"
              }
            >
              {tier.featured && !isCurrent && (
                <span className="absolute -top-3 left-6 inline-flex rounded-full bg-brand-600 px-3 py-1 text-xs font-medium text-white shadow">
                  Most popular
                </span>
              )}
              {isCurrent && (
                <span className="absolute -top-3 left-6 inline-flex rounded-full bg-emerald-600 px-3 py-1 text-xs font-medium text-white shadow">
                  Current plan
                </span>
              )}

              <h3 className="text-lg font-semibold tracking-tight">{tier.name}</h3>
              <p className="mt-2 text-sm text-black/70 dark:text-white/70">
                {tier.description}
              </p>

              <div className="mt-6 flex items-baseline gap-1.5">
                <span className="text-4xl font-semibold tracking-tight tabular-nums">
                  {formatPrice(price)}
                </span>
                {cadence && (
                  <span className="text-sm text-black/60 dark:text-white/60">
                    {cadence}
                  </span>
                )}
              </div>

              <ul role="list" className="mt-6 flex-1 space-y-3 text-sm">
                {comparisonRows.slice(0, 5).map((row) => {
                  const v = row.values[tier.id];
                  if (v === false) return null;
                  return (
                    <li
                      key={row.label}
                      className="flex items-start gap-2 text-black/80 dark:text-white/80"
                    >
                      <span className="mt-0.5 text-brand-600 dark:text-brand-300">
                        <Check />
                      </span>
                      <span>
                        {typeof v === "string" ? `${v} ${row.label.toLowerCase()}` : row.label}
                      </span>
                    </li>
                  );
                })}
              </ul>

              {isCurrent ? (
                <div
                  aria-label="Current plan"
                  className="mt-8 inline-flex items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-sm font-medium text-emerald-800 dark:text-emerald-200"
                >
                  Current plan
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => onSelect(tier.id)}
                  disabled={busy === tier.id}
                  className={
                    (tier.featured
                      ? "bg-brand-600 text-white shadow-sm hover:bg-brand-700"
                      : "border border-black/10 bg-white text-black/80 shadow-sm hover:bg-black/5 dark:border-white/10 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10") +
                    " mt-8 inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                  }
                >
                  {buttonLabel}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {error && (
        <p
          role="alert"
          className="mx-auto mt-6 max-w-xl rounded-lg border border-red-500/30 bg-red-50 p-3 text-center text-sm text-red-800 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200"
        >
          {error}
        </p>
      )}

      <p className="mt-10 text-center text-xs text-black/50 dark:text-white/50">
        Prices shown in USD. Taxes may apply. Cancel anytime.
      </p>

      <div className="mt-16">
        <h3 className="text-center text-2xl font-semibold tracking-tight">
          Compare plans
        </h3>
        <p className="mt-2 text-center text-sm text-black/60 dark:text-white/60">
          Every feature, side by side.
        </p>

        <div className="mt-8 overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
            <caption className="sr-only">Plan comparison table</caption>
            <thead>
              <tr>
                <th
                  scope="col"
                  className="sticky left-0 z-10 bg-[rgb(var(--background))] px-4 py-3 text-xs font-semibold uppercase tracking-wider text-black/60 dark:text-white/60"
                >
                  Feature
                </th>
                {pricingTiers.map((tier) => (
                  <th
                    key={tier.id}
                    scope="col"
                    className={
                      (tier.featured
                        ? "text-brand-700 dark:text-brand-200"
                        : "text-black/80 dark:text-white/80") +
                      " px-4 py-3 text-sm font-semibold tracking-tight"
                    }
                  >
                    {tier.name}
                  </th>
                ))}
              </tr>
            </thead>
            <ComparisonBody />
          </table>
        </div>
      </div>
    </>
  );
}

function ComparisonBody() {
  const groups = Array.from(
    new Set(comparisonRows.map((r) => r.group)),
  ) as ComparisonRow["group"][];

  return (
    <tbody>
      {groups.map((group) => {
        const rows = comparisonRows.filter((r) => r.group === group);
        return (
          <GroupRows key={group} group={group} rows={rows} />
        );
      })}
    </tbody>
  );
}

function GroupRows({
  group,
  rows,
}: {
  group: ComparisonRow["group"];
  rows: ComparisonRow[];
}) {
  return (
    <>
      <tr>
        <th
          scope="rowgroup"
          colSpan={pricingTiers.length + 1}
          className="sticky left-0 bg-black/[0.02] px-4 pb-2 pt-6 text-xs font-semibold uppercase tracking-wider text-black/60 dark:bg-white/[0.03] dark:text-white/60"
        >
          {group}
        </th>
      </tr>
      {rows.map((row) => (
        <tr key={row.label} className="border-t border-black/5 dark:border-white/10">
          <th
            scope="row"
            className="sticky left-0 bg-[rgb(var(--background))] px-4 py-3 font-medium text-black/80 dark:text-white/80"
          >
            {row.label}
          </th>
          {pricingTiers.map((tier) => (
            <td key={tier.id} className="px-4 py-3">
              <FeatureCell value={row.values[tier.id]} />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

function FeatureCell({ value }: { value: FeatureValue }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center text-emerald-600 dark:text-emerald-400">
        <Check />
        <span className="sr-only">Included</span>
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center text-black/30 dark:text-white/30">
        <Cross />
        <span className="sr-only">Not included</span>
      </span>
    );
  }
  return <span className="text-black/80 dark:text-white/80">{value}</span>;
}
