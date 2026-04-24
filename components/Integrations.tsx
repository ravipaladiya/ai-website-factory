type Logo = {
  name: string;
  category: string;
  svg: React.ReactNode;
};

const logos: Logo[] = [
  {
    name: "Next.js",
    category: "Framework",
    svg: (
      <svg viewBox="0 0 180 180" fill="none" aria-hidden="true" className="h-6 w-6">
        <mask id="int-next" width="180" height="180" x="0" y="0" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }}>
          <circle cx="90" cy="90" r="90" fill="currentColor" />
        </mask>
        <g mask="url(#int-next)">
          <circle cx="90" cy="90" r="90" fill="currentColor" />
          <path d="M149.5 157.5 62.9 45h-17v90h13.6V62.2l75.5 102.6z" fill="var(--int-bg, #fff)" />
          <rect x="115" y="45" width="14" height="90" fill="var(--int-bg, #fff)" />
        </g>
      </svg>
    ),
  },
  {
    name: "Vercel",
    category: "Hosting",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
        <path d="M12 2l11 20H1z" />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    category: "Language",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-6 w-6">
        <rect x="2" y="2" width="20" height="20" rx="2" fill="#3178C6" />
        <path
          d="M9.6 11.7H7.4v6.1H5.9v-6.1H3.7v-1.4h5.9v1.4zm6.2-.4c.7.2 1.2.5 1.6 1l-1 1a2.2 2.2 0 0 0-1.7-.7c-.8 0-1.2.3-1.2.8 0 .4.3.7 1.1.9l.8.2c1.6.4 2.4 1.1 2.4 2.4 0 1.5-1.2 2.5-3 2.5-1.2 0-2.2-.4-2.9-1.1l1-1.2c.6.5 1.2.8 2 .8.8 0 1.3-.3 1.3-.8 0-.4-.3-.7-1.1-.9l-.8-.2c-1.5-.4-2.3-1.1-2.3-2.4 0-1.4 1.2-2.3 2.9-2.3.9 0 1.6.2 2.2.6"
          fill="#fff"
        />
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    category: "Styling",
    svg: (
      <svg viewBox="0 0 24 14" fill="none" aria-hidden="true" className="h-5 w-8">
        <path
          d="M6.5 0C4 0 2.4 1.2 1.8 3.7c1-1.3 2-1.7 3.3-1.5.7.2 1.2.8 1.8 1.4 1 1 2.2 2.3 4.6 2.3 2.5 0 4-1.2 4.7-3.7-1 1.3-2 1.7-3.3 1.5-.8-.2-1.3-.8-1.8-1.4C10 1.2 8.8 0 6.5 0zM1.8 5.6C-.7 5.6-2.3 6.9-3 9.3c1-1.3 2-1.7 3.3-1.5.8.2 1.3.8 1.8 1.4 1 1 2.2 2.3 4.6 2.3 2.5 0 4-1.2 4.7-3.7-1 1.3-2 1.7-3.3 1.5-.7-.2-1.3-.8-1.8-1.4C6.4 6.9 5.2 5.6 1.8 5.6z"
          transform="translate(6 1.2)"
          fill="#06B6D4"
        />
      </svg>
    ),
  },
  {
    name: "Stripe",
    category: "Payments",
    svg: (
      <svg viewBox="0 0 60 25" fill="#635BFF" aria-hidden="true" className="h-5 w-12">
        <path d="M59.6 14.1c0-4.3-2.1-7.6-6-7.6-4 0-6.4 3.4-6.4 7.6 0 5 2.8 7.5 6.8 7.5 2 0 3.5-.4 4.6-1.1v-3.4c-1.1.6-2.4 1-4 1-1.5 0-2.9-.6-3.1-2.5H59.6l.1-1.5zm-8.1-1.6c0-1.8 1.1-2.6 2.1-2.6 1 0 2 .8 2 2.6h-4.1zM42.8 6.5c-1.7 0-2.7.8-3.3 1.3l-.2-1h-3.7v19.4l4.2-.9v-4.7c.6.5 1.6 1.1 3 1.1 3 0 5.8-2.5 5.8-7.7 0-4.8-2.9-7.5-5.8-7.5zm-1 11.3c-1 0-1.6-.3-2-.8V10c.5-.5 1.1-.9 2-.9 1.6 0 2.7 1.8 2.7 4.4 0 2.6-1.1 4.3-2.7 4.3zM29.5 5.7l4.3-.9V1.4l-4.3.9v3.4zm0 1.1h4.3v14.1h-4.3V6.8zM25 8.1l-.3-1.3H21v14.1h4.3V11.4c1-1.3 2.8-1.1 3.3-.9V6.8c-.6-.2-2.6-.5-3.6 1.3zM16.4 3.3l-4.2.9v13.5c0 2.5 1.9 4.3 4.4 4.3 1.4 0 2.4-.3 3-.6V18c-.5.2-3.2 1-3.2-1.5V10.3h3.2V6.8h-3.2v-3.5zM4.4 10.8c0-.7.5-1 1.4-1 1.3 0 2.9.4 4.2 1v-4c-1.4-.5-2.8-.8-4.2-.8-3.4 0-5.7 1.8-5.7 4.8 0 4.6 6.4 3.9 6.4 5.9 0 .7-.7 1-1.7 1-1.4 0-3.2-.6-4.6-1.4v4c1.6.7 3.2.9 4.6.9 3.5 0 5.9-1.7 5.9-4.7 0-5-6.4-4.2-6.4-5.7z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    category: "Source",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-6 w-6">
        <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 3 1.4 3.7 1 .1-.8.4-1.4.8-1.7-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.3 1.3-3.2-.1-.3-.6-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.7.2 3 .1 3.2a4.6 4.6 0 0 1 1.3 3.2c0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3" />
      </svg>
    ),
  },
  {
    name: "Resend",
    category: "Email",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
        <path
          d="M3 3h9.3c3.6 0 5.8 1.9 5.8 5 0 2.2-1.2 3.8-3.3 4.5L21 21h-4.6l-5.5-7.8H7V21H3V3zm4 3.3v3.7h4.6c1.7 0 2.6-.6 2.6-1.9s-.9-1.9-2.6-1.9H7z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    name: "Sentry",
    category: "Monitoring",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-6 w-6">
        <path d="M12.6 2.4a1.8 1.8 0 0 0-2.6.6L6.7 8.3a11 11 0 0 1 6.2 9h-2a9 9 0 0 0-5.2-7.3l-2.4 4.2a4.3 4.3 0 0 1 2.5 3.1H3.1a.4.4 0 0 1-.3-.5l1-1.8a3 3 0 0 0-1-.6l-1 1.7a1.5 1.5 0 0 0 1.3 2.3h4.5a6.3 6.3 0 0 0-3.4-5.6l1.2-2a8 8 0 0 1 4.3 7.6h4.8a12 12 0 0 0-6-10.9l1.6-2.8a.3.3 0 0 1 .4-.1c.3.1 6.6 11.4 6.9 12a.3.3 0 0 1-.3.5H16a16.3 16.3 0 0 1 .1 2h1.9a2 2 0 0 0 1.8-3L13.2 3z" />
      </svg>
    ),
  },
];

const extras = [
  "Prisma",
  "Postgres",
  "Supabase",
  "Cloudflare",
  "PostHog",
  "Figma",
  "Linear",
  "Slack",
];

export default function Integrations() {
  return (
    <section
      id="integrations"
      aria-labelledby="integrations-heading"
      className="border-t border-black/5 py-20 sm:py-24 dark:border-white/10"
    >
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-brand-600 dark:text-brand-300">
            Integrations
          </p>
          <h2
            id="integrations-heading"
            className="text-balance mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Ships with the tools your team already uses.
          </h2>
          <p className="text-balance mt-4 text-black/70 dark:text-white/70">
            Every site the agent builds is wired into a modern, production-proven
            stack — so your team can extend, deploy, and monitor on day one.
          </p>
        </div>

        <ul
          role="list"
          aria-label="Supported integrations"
          className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
        >
          {logos.map((logo) => (
            <li key={logo.name}>
              <div className="group flex h-full items-center gap-3 rounded-xl border border-black/5 bg-white/70 px-4 py-4 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-brand-500/30 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:[--int-bg:#0f1220]">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-black/5 text-black/80 dark:bg-white/10 dark:text-white/90">
                  {logo.svg}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold leading-tight">
                    {logo.name}
                  </span>
                  <span className="block truncate text-[11px] uppercase tracking-wider text-black/50 dark:text-white/50">
                    {logo.category}
                  </span>
                </span>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs uppercase tracking-wider text-black/45 dark:text-white/45">
            Plus
          </span>
          {extras.map((name) => (
            <span
              key={name}
              className="rounded-full border border-black/10 bg-white/60 px-2.5 py-0.5 text-xs font-medium text-black/70 dark:border-white/10 dark:bg-white/5 dark:text-white/70"
            >
              {name}
            </span>
          ))}
          <span className="text-xs text-black/45 dark:text-white/45">
            + bring your own via API.
          </span>
        </div>
      </div>
    </section>
  );
}
