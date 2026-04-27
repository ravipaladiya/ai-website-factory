import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UptimeChart from "@/components/status/UptimeChart";
import { getStatus, type ServiceHealth } from "@/lib/status-data";

export const revalidate = 60; // ISR aligned with /api/status

export const metadata: Metadata = {
  title: "Status",
  description:
    "Live health of the AI Website Factory services: API, Builder, CDN, and Auth. 90-day uptime history.",
  alternates: { canonical: "/status" },
  openGraph: {
    title: "Status | AI Website Factory",
    description:
      "Live health of AI Website Factory services, with 90-day uptime history.",
    type: "website",
    url: "/status",
  },
};

const banner: Record<
  ServiceHealth,
  { label: string; wrap: string; dot: string }
> = {
  operational: {
    label: "All systems operational",
    wrap:
      "border-emerald-500/30 bg-emerald-50 text-emerald-900 dark:border-emerald-400/30 dark:bg-emerald-500/10 dark:text-emerald-100",
    dot: "bg-emerald-500",
  },
  degraded: {
    label: "Some systems degraded",
    wrap:
      "border-amber-500/30 bg-amber-50 text-amber-900 dark:border-amber-400/30 dark:bg-amber-500/10 dark:text-amber-100",
    dot: "bg-amber-500 motion-safe:animate-pulse",
  },
  outage: {
    label: "Major outage reported",
    wrap:
      "border-red-500/30 bg-red-50 text-red-900 dark:border-red-400/30 dark:bg-red-500/10 dark:text-red-100",
    dot: "bg-red-500 motion-safe:animate-pulse",
  },
};

const serviceBadge: Record<ServiceHealth, { label: string; dot: string; text: string }> = {
  operational: {
    label: "Operational",
    dot: "bg-emerald-500",
    text: "text-emerald-700 dark:text-emerald-300",
  },
  degraded: {
    label: "Degraded",
    dot: "bg-amber-500 motion-safe:animate-pulse",
    text: "text-amber-700 dark:text-amber-300",
  },
  outage: {
    label: "Outage",
    dot: "bg-red-500 motion-safe:animate-pulse",
    text: "text-red-700 dark:text-red-300",
  },
};

function formatPercent(value: number) {
  const rounded = Math.round(value * 1000) / 1000;
  return `${rounded.toFixed(rounded >= 99.99 ? 3 : 2)}%`;
}

export default function StatusPage() {
  const { overall, services, generatedAt } = getStatus();
  const bannerStyle = banner[overall];

  return (
    <>
      <Header />
      <main id="main">
        <section className="border-b border-black/5 py-14 sm:py-16 dark:border-white/10">
          <div className="container max-w-4xl">
            <Breadcrumbs
              items={[{ label: "Home", href: "/" }, { label: "Status" }]}
            />
            <p className="mt-6 text-sm font-medium uppercase tracking-wider text-brand-600 dark:text-brand-300">
              Status
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              System health
            </h1>
            <p className="mt-3 text-black/70 dark:text-white/70">
              Real-time status for every surface of the factory. Updated every
              minute.
            </p>

            <div
              role="status"
              aria-live="polite"
              className={
                bannerStyle.wrap +
                " mt-8 flex items-center gap-3 rounded-xl border px-4 py-3"
              }
            >
              <span
                aria-hidden="true"
                className={bannerStyle.dot + " h-2.5 w-2.5 rounded-full"}
              />
              <p className="text-sm font-medium">{bannerStyle.label}</p>
              <p className="ml-auto text-xs opacity-70">
                Last checked{" "}
                <time dateTime={generatedAt}>
                  {new Date(generatedAt).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </time>
              </p>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="services-heading"
          className="py-14 sm:py-16"
        >
          <div className="container max-w-4xl">
            <h2
              id="services-heading"
              className="text-xl font-semibold tracking-tight"
            >
              Services
            </h2>

            <ul role="list" className="mt-6 space-y-6">
              {services.map((svc) => {
                const badge = serviceBadge[svc.status];
                return (
                  <li
                    key={svc.id}
                    className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="text-base font-semibold tracking-tight">
                          {svc.name}
                        </h3>
                        <p className="mt-0.5 text-xs text-black/55 dark:text-white/55">
                          {svc.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span
                          className={
                            badge.text +
                            " inline-flex items-center gap-2 font-medium"
                          }
                        >
                          <span
                            aria-hidden="true"
                            className={badge.dot + " h-2 w-2 rounded-full"}
                          />
                          {badge.label}
                        </span>
                        <span className="tabular-nums text-xs text-black/55 dark:text-white/55">
                          {formatPercent(svc.uptime90)} · 90d
                        </span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <UptimeChart history={svc.history} />
                      <div className="mt-1 flex items-center justify-between text-[10px] uppercase tracking-wider text-black/40 dark:text-white/40">
                        <span>90 days ago</span>
                        <span>Today</span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <p className="mt-10 text-center text-xs text-black/50 dark:text-white/50">
              Numbers on this page are generated by a mock monitor. Swap{" "}
              <code className="font-mono">/api/status</code> for a real uptime
              provider before launch.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
