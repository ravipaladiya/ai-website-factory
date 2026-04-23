export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[500px] w-[900px] max-w-none -translate-x-1/2 rounded-full bg-brand-500/20 blur-3xl"
      />

      <div className="container flex flex-col items-center py-20 text-center sm:py-28 lg:py-36">
        <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-medium text-black/70 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-white/70">
          <span className="h-2 w-2 rounded-full bg-brand-500" aria-hidden="true" />
          Autonomous · Production-ready · SEO-first
        </span>

        <h1
          id="hero-heading"
          className="text-balance mt-6 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
        >
          Ship modern websites,{" "}
          <span className="bg-gradient-to-br from-brand-500 to-brand-800 bg-clip-text text-transparent">
            built entirely by AI
          </span>
          .
        </h1>

        <p className="text-balance mt-6 max-w-2xl text-base text-black/70 sm:text-lg dark:text-white/70">
          AI Website Factory plans, designs, codes, tests, and deploys a
          complete Next.js site — responsive on every device, SEO-optimized,
          and ready for production on day one.
        </p>

        <div className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#cta"
            className="inline-flex w-full items-center justify-center rounded-lg bg-brand-600 px-6 py-3 text-base font-medium text-white shadow-sm transition hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 sm:w-auto"
          >
            Start building free
          </a>
          <a
            href="#how-it-works"
            className="inline-flex w-full items-center justify-center rounded-lg border border-black/10 bg-white px-6 py-3 text-base font-medium text-black/80 shadow-sm transition hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 sm:w-auto dark:border-white/10 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10"
          >
            See how it works →
          </a>
        </div>

        <dl className="mt-14 grid w-full max-w-3xl grid-cols-2 gap-6 border-t border-black/5 pt-8 sm:grid-cols-4 dark:border-white/10">
          {[
            { k: "99", label: "Lighthouse score" },
            { k: "<2s", label: "Time to interactive" },
            { k: "100%", label: "Responsive by default" },
            { k: "24/7", label: "Autonomous shipping" },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <dt className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {item.k}
              </dt>
              <dd className="mt-1 text-xs text-black/60 sm:text-sm dark:text-white/60">
                {item.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
