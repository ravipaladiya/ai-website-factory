import PricingClient from "./PricingClient";

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

        <PricingClient />
      </div>
    </section>
  );
}
