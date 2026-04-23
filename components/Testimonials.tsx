import Link from "next/link";
import { reviews, summary } from "@/lib/testimonials";

type Brand = { name: string; mark: React.ReactNode };

const brands: Brand[] = [
  {
    name: "Vercel",
    mark: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-3.5 w-3.5">
        <path d="M12 3l11 19H1z" />
      </svg>
    ),
  },
  {
    name: "Linear",
    mark: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-3.5 w-3.5">
        <path d="M4 20a14 14 0 0 1 0-16zM4 4a20 20 0 0 1 16 16h-3A17 17 0 0 0 4 7zm0 4a16 16 0 0 1 12 12h-3A13 13 0 0 0 4 11zm0 5a11 11 0 0 1 7 7H8a8 8 0 0 0-4-4z" />
      </svg>
    ),
  },
  {
    name: "Raycast",
    mark: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className="h-3.5 w-3.5">
        <path d="M7 14v-3l3 3H7zM14 10v3l-3-3h3zM3 14v-7l14 14h-7L3 14zm7 0 4 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Supabase",
    mark: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-3.5 w-3.5">
        <path d="M13 2v10h8L11 22V12H3z" />
      </svg>
    ),
  },
  {
    name: "Stripe",
    mark: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-3.5 w-3.5">
        <path d="M11 6c-2.5 0-4 1.3-4 3.3 0 3.7 5 2.8 5 4.9 0 .8-.7 1.1-1.6 1.1-1.5 0-3.2-.7-4.4-1.5v3.3c1.3.6 2.8 1 4.4 1 2.6 0 4.4-1.2 4.4-3.3 0-3.9-5.1-2.9-5.1-4.8 0-.8.6-1.1 1.5-1.1 1.3 0 2.8.4 3.9 1V7.1C13.9 6.4 12.5 6 11 6z" />
      </svg>
    ),
  },
  {
    name: "Plaid",
    mark: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className="h-3.5 w-3.5">
        <rect x="4" y="4" width="7" height="7" rx="1" />
        <rect x="13" y="4" width="7" height="7" rx="1" />
        <rect x="4" y="13" width="7" height="7" rx="1" />
        <rect x="13" y="13" width="7" height="7" rx="1" />
      </svg>
    ),
  },
];

function avatarUrl(seed: string) {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}&backgroundColor=eef4ff,d9e5ff,b8cdff`;
}

function Stars({
  value,
  size = "md",
}: {
  value: number;
  size?: "md" | "lg";
}) {
  const filled = Math.round(value);
  const cls = size === "lg" ? "h-5 w-5" : "h-4 w-4";
  return (
    <div
      className="flex items-center gap-0.5 text-brand-500"
      aria-label={`${value.toFixed(1)} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          fill={i < filled ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={i < filled ? 0 : 1.5}
          className={cls}
          aria-hidden="true"
        >
          <path d="M10 1.5 12.472 7.06l6.028.618-4.5 4.083 1.25 5.937L10 14.75 4.75 17.698 6 11.761 1.5 7.678l6.028-.618z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const featured = reviews.filter((r) => r.caseStudySlug).slice(0, 3);

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="border-t border-black/5 py-20 sm:py-28 dark:border-white/10"
    >
      <div className="container">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-black/50 dark:text-white/50">
          Trusted by teams building on
        </p>
        <ul
          role="list"
          className="mt-6 grid grid-cols-2 items-center justify-items-center gap-x-10 gap-y-4 text-black/60 sm:grid-cols-3 lg:grid-cols-6 dark:text-white/60"
        >
          {brands.map((b) => (
            <li
              key={b.name}
              className="inline-flex items-center gap-2 text-sm font-semibold tracking-tight transition hover:text-black/90 dark:hover:text-white/90"
            >
              <span>{b.mark}</span>
              <span>{b.name}</span>
            </li>
          ))}
        </ul>

        <div className="mt-20 text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-brand-600 dark:text-brand-300">
            Loved by builders
          </p>
          <h2
            id="testimonials-heading"
            className="text-balance mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Teams that ship faster, together.
          </h2>

          <div className="mt-6 inline-flex items-center gap-3">
            <Stars value={summary.averageRating} size="lg" />
            <p className="text-sm text-black/70 dark:text-white/70">
              <span className="font-semibold text-black dark:text-white">
                {summary.averageRating.toFixed(1)}/5
              </span>{" "}
              from {summary.totalReviews.toLocaleString("en-US")} reviews ·{" "}
              <Link
                href="/testimonials"
                className="font-medium text-brand-700 hover:text-brand-800 dark:text-brand-300 dark:hover:text-brand-200"
              >
                Read all →
              </Link>
            </p>
          </div>
        </div>

        <ul role="list" className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {featured.map((r) => (
            <li
              key={r.id}
              className="flex flex-col rounded-2xl border border-black/5 bg-white/70 p-6 shadow-sm dark:border-white/10 dark:bg-white/5"
            >
              <Stars value={r.rating} />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-black/80 dark:text-white/80">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={avatarUrl(r.avatarSeed)}
                  alt=""
                  width={36}
                  height={36}
                  loading="lazy"
                  className="h-9 w-9 rounded-full border border-black/10 bg-brand-50 dark:border-white/10"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{r.name}</p>
                  <p className="truncate text-xs text-black/60 dark:text-white/60">
                    {r.title}
                  </p>
                </div>
              </figcaption>
              {r.caseStudySlug && (
                <Link
                  href={`/case-studies/${r.caseStudySlug}`}
                  className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand-700 transition hover:text-brand-800 dark:text-brand-300 dark:hover:text-brand-200"
                >
                  View case study <span aria-hidden="true">→</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
