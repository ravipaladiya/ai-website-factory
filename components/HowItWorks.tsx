const steps = [
  {
    n: "01",
    title: "Plan",
    description:
      "The agent scopes the site, drafts information architecture, and picks a design direction.",
  },
  {
    n: "02",
    title: "Design",
    description:
      "Mobile-first layouts, typography, and color systems are generated and refined for brand fit.",
  },
  {
    n: "03",
    title: "Build",
    description:
      "Components are authored in TypeScript, styled with Tailwind, and wired into Next.js.",
  },
  {
    n: "04",
    title: "Ship",
    description:
      "Builds, lints, and tests run on every change. The site only ships when all gates pass.",
  },
];

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How AI Website Factory ships a production-ready site",
  description:
    "Four-step autonomous pipeline that plans, designs, builds, and ships a modern Next.js website.",
  totalTime: "PT1D",
  step: steps.map((s, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: s.title,
    text: s.description,
  })),
};

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-heading"
      className="border-t border-black/5 py-20 sm:py-28 dark:border-white/10"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-brand-600 dark:text-brand-300">
            How it works
          </p>
          <h2
            id="how-heading"
            className="text-balance mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            A four-step autonomous pipeline.
          </h2>
        </div>

        <ol
          role="list"
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map((step) => (
            <li
              key={step.n}
              className="relative rounded-2xl border border-black/5 bg-white/70 p-6 shadow-sm dark:border-white/10 dark:bg-white/5"
            >
              <span className="text-sm font-mono font-medium text-brand-600 dark:text-brand-300">
                {step.n}
              </span>
              <h3 className="mt-3 text-lg font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-black/70 dark:text-white/70">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
