import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export const metadata = {
  title: "Billing",
  robots: { index: false, follow: false },
};

export default async function BillingPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login?next=/dashboard/billing");

  const plan = session.user.plan ?? "Starter";

  return (
    <div>
      <p className="text-sm text-black/60 dark:text-white/60">
        Manage your plan and download invoices.
      </p>

      <section
        aria-labelledby="plan-heading"
        className="mt-8 flex flex-col gap-4 rounded-2xl border border-black/5 bg-white/70 p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-white/10 dark:bg-white/5"
      >
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-brand-600 dark:text-brand-300">
            Current plan
          </p>
          <h3
            id="plan-heading"
            className="mt-1 text-2xl font-semibold tracking-tight"
          >
            {plan}
          </h3>
          <p className="mt-1 text-sm text-black/65 dark:text-white/65">
            {plan === "Starter"
              ? "You're on the free plan. Upgrade to ship unlimited projects."
              : plan === "Studio"
                ? "$29/mo · billed monthly · cancel anytime."
                : "Custom enterprise terms managed by your account team."}
          </p>
        </div>
        <Link
          href="/#pricing"
          className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
        >
          {plan === "Starter" ? "Upgrade plan" : "Manage plan"}
        </Link>
      </section>

      <section
        aria-labelledby="invoices-heading"
        className="mt-6 rounded-2xl border border-dashed border-black/10 bg-white/50 p-6 dark:border-white/10 dark:bg-white/5"
      >
        <h3
          id="invoices-heading"
          className="text-base font-semibold tracking-tight"
        >
          Invoices
        </h3>
        <p className="mt-2 text-sm text-black/65 dark:text-white/65">
          Downloadable PDF invoices and billing history will appear here once
          your first paid charge clears.
        </p>
        <p className="mt-3 inline-flex items-center rounded-full bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium text-amber-800 ring-1 ring-inset ring-amber-500/20 dark:text-amber-200 dark:ring-amber-400/20">
          Coming soon
        </p>
      </section>
    </div>
  );
}
