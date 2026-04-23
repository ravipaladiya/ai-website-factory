const tiers = [
  {
    name: "Starter",
    price: "$0",
    cadence: "forever",
    description:
      "Everything you need to ship your first production-ready site.",
    features: [
      "1 project",
      "Responsive landing page",
      "SEO meta & sitemap",
      "Deploy to any host",
    ],
    cta: "Start free",
    featured: false,
  },
  {
    name: "Studio",
    price: "$29",
    cadence: "per month",
    description:
      "For teams shipping multiple sites with autonomous iteration.",
    features: [
      "Unlimited projects",
      "Continuous improvement loop",
      "Automated PR workflow",
      "Performance & SEO audits",
      "Priority support",
    ],
    cta: "Start 14-day trial",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "annual",
    description:
      "Governance, SSO, and dedicated infrastructure for scaled teams.",
    features: [
      "SSO & audit logs",
      "Dedicated environments",
      "Custom integrations",
      "SLA & onboarding",
    ],
    cta: "Talk to sales",
    featured: false,
  },
];

function Check() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="h-4 w-4 flex-none"
    >
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

export default function Pricing() {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="border-t border-black/5 py-20 sm:py-28 dark:border-white/10"
    >
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-brand-600 dark:text-brand-300">
            Pricing
          </p>
          <h2
            id="pricing-heading"
            className="text-balance mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Simple plans that scale with you.
          </h2>
          <p className="mt-4 text-black/70 dark:text-white/70">
            Start free. Upgrade when you need unlimited projects, continuous
            iteration, or enterprise controls.
          </p>
        </div>

        <div
          role="list"
          className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {tiers.map((tier) => {
            const isFeatured = tier.featured;
            return (
              <div
                role="listitem"
                key={tier.name}
                className={
                  isFeatured
                    ? "relative flex flex-col rounded-2xl border border-brand-500/30 bg-gradient-to-b from-brand-50 to-white p-6 shadow-lg ring-1 ring-brand-500/20 dark:from-brand-500/10 dark:to-transparent"
                    : "relative flex flex-col rounded-2xl border border-black/5 bg-white/70 p-6 shadow-sm dark:border-white/10 dark:bg-white/5"
                }
              >
                {isFeatured && (
                  <span className="absolute -top-3 left-6 inline-flex rounded-full bg-brand-600 px-3 py-1 text-xs font-medium text-white shadow">
                    Most popular
                  </span>
                )}

                <h3 className="text-lg font-semibold tracking-tight">
                  {tier.name}
                </h3>
                <p className="mt-2 text-sm text-black/70 dark:text-white/70">
                  {tier.description}
                </p>

                <div className="mt-6 flex items-baseline gap-1.5">
                  <span className="text-4xl font-semibold tracking-tight">
                    {tier.price}
                  </span>
                  <span className="text-sm text-black/60 dark:text-white/60">
                    {tier.cadence}
                  </span>
                </div>

                <ul role="list" className="mt-6 space-y-3 text-sm">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-black/80 dark:text-white/80"
                    >
                      <span className="mt-0.5 text-brand-600 dark:text-brand-300">
                        <Check />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#cta"
                  className={
                    isFeatured
                      ? "mt-8 inline-flex items-center justify-center rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
                      : "mt-8 inline-flex items-center justify-center rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm font-medium text-black/80 shadow-sm transition hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:border-white/10 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10"
                  }
                >
                  {tier.cta}
                </a>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-xs text-black/50 dark:text-white/50">
          Prices shown in USD. Taxes may apply. Cancel anytime.
        </p>
      </div>
    </section>
  );
}
