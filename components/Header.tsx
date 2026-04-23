import Link from "next/link";
import MobileMenu from "./MobileMenu";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-white/70 backdrop-blur-md dark:border-white/10 dark:bg-black/40">
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight"
          aria-label="AI Website Factory home"
        >
          <span
            aria-hidden="true"
            className="inline-block h-7 w-7 rounded-md bg-gradient-to-br from-brand-400 to-brand-700 shadow-sm"
          />
          <span className="text-base sm:text-lg">AI Website Factory</span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 md:flex"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-black/70 transition hover:text-black dark:text-white/70 dark:hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#cta"
            className="hidden rounded-lg px-3 py-2 text-sm font-medium text-black/80 transition hover:text-black sm:inline-block dark:text-white/80 dark:hover:text-white"
          >
            Sign in
          </a>
          <a
            href="#cta"
            className="hidden items-center rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 md:inline-flex"
          >
            Get started
          </a>
          <MobileMenu links={navLinks} />
        </div>
      </div>
    </header>
  );
}
