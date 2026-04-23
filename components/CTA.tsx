"use client";

export default function CTA() {
  return (
    <section
      id="cta"
      aria-labelledby="cta-heading"
      className="border-t border-black/5 py-20 sm:py-28 dark:border-white/10"
    >
      <div className="container">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 px-6 py-14 text-center shadow-xl sm:px-12 sm:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-grid opacity-20"
          />

          <h2
            id="cta-heading"
            className="text-balance relative text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          >
            Ready to launch a site built the right way?
          </h2>
          <p className="text-balance relative mt-4 text-base text-white/80 sm:text-lg">
            Spin up a production-ready, SEO-optimized website in minutes —
            no setup, no boilerplate, no guesswork.
          </p>

          <form
            className="relative mx-auto mt-10 flex w-full max-w-md flex-col gap-3 sm:flex-row"
            action="#"
            method="post"
            aria-label="Get started"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="cta-email" className="sr-only">
              Email address
            </label>
            <input
              id="cta-email"
              name="email"
              type="email"
              required
              placeholder="you@company.com"
              className="flex-1 rounded-lg border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/60 backdrop-blur focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 text-sm font-medium text-brand-700 shadow-sm transition hover:bg-brand-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-700"
            >
              Get started
            </button>
          </form>

          <p className="relative mt-4 text-xs text-white/60">
            Free while in beta · No credit card required
          </p>
        </div>
      </div>
    </section>
  );
}
