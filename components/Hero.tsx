import HeroMockup from "./HeroMockup";

const lighthouse = [
  { label: "Performance", score: 98 },
  { label: "Accessibility", score: 100 },
  { label: "SEO", score: 100 },
  { label: "Best Practices", score: 100 },
];

function VercelMark() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-3.5 w-3.5">
      <path d="M12 2l11 20H1z" />
    </svg>
  );
}

function NextLogo() {
  return (
    <svg viewBox="0 0 180 180" fill="none" aria-hidden="true" className="h-4 w-4">
      <mask id="nextmask" width="180" height="180" x="0" y="0" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }}>
        <circle cx="90" cy="90" r="90" fill="currentColor" />
      </mask>
      <g mask="url(#nextmask)">
        <circle cx="90" cy="90" r="90" fill="currentColor" />
        <path d="M149.5 157.5L62.9 45h-17v90h13.6V62.2l75.5 102.6z" fill="var(--bg, #fff)" />
        <rect x="115" y="45" width="14" height="90" fill="var(--bg, #fff)" />
      </g>
    </svg>
  );
}

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

      <div className="container flex flex-col items-center py-6 text-center sm:py-8 lg:py-4">
        <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-0.5 text-[11px] font-medium text-black/70 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-white/70">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden="true" />
          Autonomous · Production-ready · SEO-first
        </span>

        <h1
          id="hero-heading"
          className="text-balance mt-3 text-2xl font-semibold leading-[1.1] tracking-tight sm:text-3xl lg:text-[2.25rem]"
        >
          Ship modern websites,{" "}
          <span className="bg-gradient-to-br from-brand-500 to-brand-800 bg-clip-text text-transparent">
            built entirely by AI
          </span>
          .
        </h1>

        <p className="text-balance mt-2 max-w-xl text-sm text-black/70 dark:text-white/70">
          Responsive, SEO-optimized Next.js sites — planned, designed, coded, and shipped on autopilot.
        </p>

        <div className="mt-4 flex w-full flex-col items-center justify-center gap-2.5 sm:flex-row">
          <a
            href="#cta"
            className="inline-flex w-full items-center justify-center rounded-lg bg-brand-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 sm:w-auto"
          >
            Start building free
          </a>
          <a
            href="#how-it-works"
            className="inline-flex w-full items-center justify-center rounded-lg border border-black/10 bg-white px-5 py-2 text-sm font-medium text-black/80 shadow-sm transition hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 sm:w-auto dark:border-white/10 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10"
          >
            See how it works →
          </a>
        </div>

        <div className="mt-5 w-full">
          <HeroMockup />
        </div>

        <ul
          role="list"
          aria-label="Lighthouse scores for a site built by the agent"
          className="mt-4 flex flex-wrap items-center justify-center gap-1.5"
        >
          {lighthouse.map((item) => (
            <li key={item.label}>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-800 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-200">
                <span
                  aria-hidden="true"
                  className="inline-flex h-[18px] w-[18px] items-center justify-center rounded-full bg-emerald-500 text-[9px] font-semibold text-white"
                >
                  {item.score}
                </span>
                <span>{item.label}</span>
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-3 flex items-center justify-center gap-2.5 text-[10px] uppercase tracking-[0.18em] text-black/45 dark:text-white/45">
          <span>Powered by</span>
          <span className="inline-flex items-center gap-1.5 text-black/70 dark:text-white/80">
            <VercelMark />
            <span className="text-[11px] font-semibold tracking-tight normal-case">Vercel</span>
          </span>
          <span aria-hidden="true" className="text-black/20 dark:text-white/20">·</span>
          <span className="inline-flex items-center gap-1.5 text-black/70 dark:text-white/80">
            <NextLogo />
            <span className="text-[11px] font-semibold tracking-tight normal-case">Next.js</span>
          </span>
        </p>
      </div>
    </section>
  );
}
