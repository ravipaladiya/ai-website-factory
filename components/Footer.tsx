import Link from "next/link";
import FooterNewsletter from "./FooterNewsletter";

type FooterLink = { label: string; href: string; external?: boolean };

const groups: { heading: string; links: FooterLink[] }[] = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Pricing", href: "/#pricing" },
      { label: "Compare", href: "/compare" },
      { label: "Changelog", href: "/changelog" },
      { label: "Status", href: "/status" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Docs", href: "/docs" },
      { label: "Templates", href: "/templates" },
      { label: "Live demo", href: "/demo" },
      { label: "Blog", href: "/blog" },
      { label: "Case studies", href: "/case-studies" },
      { label: "Examples", href: "/#testimonials" },
      {
        label: "GitHub",
        href: "https://github.com/ravipaladiya/ai-website-factory",
        external: true,
      },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Security", href: "/security" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
  {
    heading: "Community",
    links: [
      { label: "Discord", href: "https://discord.gg/", external: true },
      { label: "Twitter / X", href: "https://twitter.com/", external: true },
      { label: "Newsletter", href: "#footer-newsletter-email" },
    ],
  },
];

type SocialLink = { label: string; href: string; icon: React.ReactNode };

const socials: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/ravipaladiya/ai-website-factory",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
        <path d="M12 .5A11.5 11.5 0 0 0 .5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.01c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.07 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.6.24 2.78.12 3.07.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.41.35.77 1.04.77 2.11v3.13c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "https://twitter.com/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
        <path d="M18.244 2h3.308l-7.227 8.26L23 22h-6.828l-5.346-6.99L4.7 22H1.39l7.73-8.835L1 2h6.994l4.833 6.39L18.244 2zm-1.16 18h1.834L7.01 3.885H5.04L17.084 20z" />
      </svg>
    ),
  },
  {
    label: "Discord",
    href: "https://discord.gg/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
        <path d="M20.3 4.4A18 18 0 0 0 15.8 3l-.2.4a17 17 0 0 0-3.3-.3 17 17 0 0 0-3.3.3A18 18 0 0 0 4.5 4.4 19 19 0 0 0 1.2 17a18.3 18.3 0 0 0 5.5 2.8l1-1.5a11 11 0 0 1-1.8-.9l.4-.3a12.5 12.5 0 0 0 10.6 0l.4.3a11 11 0 0 1-1.8.9l1 1.5A18.3 18.3 0 0 0 22.8 17a19 19 0 0 0-2.5-12.6zM9 14.6c-.9 0-1.7-.9-1.7-2s.7-2 1.7-2 1.7.9 1.7 2-.8 2-1.7 2zm6 0c-.9 0-1.7-.9-1.7-2s.8-2 1.7-2 1.7.9 1.7 2-.8 2-1.7 2z" />
      </svg>
    ),
  },
  {
    label: "RSS",
    href: "/rss.xml",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-4 w-4">
        <path d="M4 11a5 5 0 0 1 5 5M4 5a11 11 0 0 1 11 11" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        <circle cx="5" cy="15" r="1.25" fill="currentColor" />
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-black/5 dark:border-white/10">
      <div className="container py-14 sm:py-16">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2">
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold tracking-tight"
              aria-label="AI Website Factory home"
            >
              <span
                aria-hidden="true"
                className="inline-block h-7 w-7 rounded-md bg-gradient-to-br from-brand-400 to-brand-700 shadow-sm"
              />
              <span>AI Website Factory</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-black/60 dark:text-white/60">
              Production-ready websites, planned, designed, and shipped by AI.
              One PR at a time.
            </p>

            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-black/60 dark:text-white/60">
                Ship notes, monthly
              </p>
              <FooterNewsletter />
            </div>

            <ul
              aria-label="Social links"
              className="mt-6 flex items-center gap-2"
            >
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    aria-label={s.label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/70 text-black/70 transition hover:border-brand-500/30 hover:bg-white hover:text-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-brand-200"
                  >
                    {s.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {groups.map((group) => (
            <nav key={group.heading} aria-labelledby={`footer-${group.heading.toLowerCase()}`}>
              <h3
                id={`footer-${group.heading.toLowerCase()}`}
                className="text-sm font-semibold tracking-tight"
              >
                {group.heading}
              </h3>
              <ul role="list" className="mt-4 space-y-2">
                {group.links.map((link) => {
                  const cls =
                    "text-sm text-black/60 transition hover:text-black dark:text-white/60 dark:hover:text-white";
                  const isInternalRoute =
                    !link.external &&
                    link.href.startsWith("/") &&
                    !link.href.startsWith("/#");
                  return (
                    <li key={link.label}>
                      {isInternalRoute ? (
                        <Link href={link.href} className={cls}>
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          rel={link.external ? "noopener noreferrer" : undefined}
                          target={link.external ? "_blank" : undefined}
                          className={cls}
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-t border-black/5 dark:border-white/10">
        <div className="container flex flex-col items-start justify-between gap-3 py-6 text-xs text-black/55 sm:flex-row sm:items-center dark:text-white/55">
          <p>© {year} AI Website Factory. All rights reserved.</p>
          <ul className="flex items-center gap-4">
            <li>
              <Link
                href="/privacy"
                className="transition hover:text-black dark:hover:text-white"
              >
                Privacy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="transition hover:text-black dark:hover:text-white"
              >
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
