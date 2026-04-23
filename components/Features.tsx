const features = [
  {
    title: "SEO on autopilot",
    description:
      "Semantic HTML, Open Graph, Twitter cards, sitemaps, and robots.txt — configured from the first commit.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
        <path d="M12 2a10 10 0 1 0 10 10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        <path d="m21 3-9 9" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        <path d="M15 3h6v6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Responsive by default",
    description:
      "Every layout is designed mobile-first and tested across phone, tablet, and desktop breakpoints.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
        <rect x="3" y="4" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.75" />
        <rect x="14" y="9" width="7" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.75" />
      </svg>
    ),
  },
  {
    title: "Production-ready stack",
    description:
      "Next.js App Router, TypeScript, and Tailwind CSS — compiled, linted, and type-checked on every build.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
        <path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Accessible UI",
    description:
      "Landmarks, ARIA labels, visible focus states, and color contrast baked into every component.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
        <circle cx="12" cy="6" r="2" stroke="currentColor" strokeWidth="1.75" />
        <path d="M5 10h14M9 20l3-7 3 7M10 13h4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Performance-first",
    description:
      "Font optimization, image optimization, and minimal JS shipping mean fast loads everywhere.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
        <path d="m13 2-9 12h7l-1 8 9-12h-7z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Continuous improvement",
    description:
      "The agent iterates: plan, design, code, build, fix — until every definition of done is met.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
        <path d="M4 12a8 8 0 0 1 14-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        <path d="M20 12a8 8 0 0 1-14 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        <path d="M18 3v4h-4M6 21v-4h4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Features() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="border-t border-black/5 py-20 sm:py-28 dark:border-white/10"
    >
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-brand-600 dark:text-brand-300">
            Features
          </p>
          <h2
            id="features-heading"
            className="text-balance mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Everything a modern website needs — handled for you.
          </h2>
          <p className="mt-4 text-black/70 dark:text-white/70">
            No boilerplate. No checklist fatigue. Just a fast, polished site
            that follows best practices from the first render.
          </p>
        </div>

        <ul
          role="list"
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <li
              key={feature.title}
              className="group rounded-2xl border border-black/5 bg-white/70 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-200">
                {feature.icon}
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-black/70 dark:text-white/70">
                {feature.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
