const testimonials = [
  {
    quote:
      "We shipped our marketing site in an afternoon. The agent handled layout, copy, and SEO — we just reviewed the PR.",
    name: "Amelia Chen",
    title: "Head of Growth, Northwind",
  },
  {
    quote:
      "The output looked like it came from a senior front-end engineer. Clean Tailwind, accessible markup, perfect Lighthouse scores.",
    name: "Rafael Ortiz",
    title: "Staff Engineer, Helix Labs",
  },
  {
    quote:
      "What sold me was the continuous loop. It keeps iterating — a day later the site was noticeably tighter than when I left it.",
    name: "Priya Natarajan",
    title: "Founder, Studiolane",
  },
];

const logos = ["Northwind", "Helix", "Studiolane", "Orbital", "Meridian", "Kestrel"];

function Stars() {
  return (
    <div className="flex items-center gap-0.5 text-brand-500" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
          <path d="M10 1.5 12.472 7.06l6.028.618-4.5 4.083 1.25 5.937L10 14.75 4.75 17.698 6 11.761 1.5 7.678l6.028-.618z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="border-t border-black/5 py-20 sm:py-28 dark:border-white/10"
    >
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-brand-600 dark:text-brand-300">
            Loved by builders
          </p>
          <h2
            id="testimonials-heading"
            className="text-balance mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Teams that ship faster, together.
          </h2>
        </div>

        <ul
          role="list"
          className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {testimonials.map((t) => (
            <li
              key={t.name}
              className="flex flex-col rounded-2xl border border-black/5 bg-white/70 p-6 shadow-sm dark:border-white/10 dark:bg-white/5"
            >
              <Stars />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-black/80 dark:text-white/80">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700 text-xs font-semibold text-white"
                >
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-black/60 dark:text-white/60">
                    {t.title}
                  </p>
                </div>
              </figcaption>
            </li>
          ))}
        </ul>

        <div className="mt-16">
          <p className="text-center text-xs font-medium uppercase tracking-wider text-black/50 dark:text-white/50">
            Trusted by product teams at
          </p>
          <ul
            role="list"
            className="mt-6 grid grid-cols-2 items-center justify-items-center gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-6"
          >
            {logos.map((name) => (
              <li
                key={name}
                className="text-base font-semibold tracking-tight text-black/40 transition hover:text-black/70 dark:text-white/40 dark:hover:text-white/70"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
