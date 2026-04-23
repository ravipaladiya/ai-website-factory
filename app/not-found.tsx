import Link from "next/link";

const suggestions = [
  { href: "/", label: "Home" },
  { href: "/#features", label: "Features" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#cta", label: "Get started" },
];

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-medium uppercase tracking-wider text-brand-600 dark:text-brand-300">
        404
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-black/70 dark:text-white/70">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Try one of these instead:
      </p>

      <ul role="list" className="mt-8 flex flex-wrap items-center justify-center gap-2">
        {suggestions.map((s) => (
          <li key={s.href}>
            <Link
              href={s.href}
              className="inline-flex items-center rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-black/80 transition hover:border-brand-500/40 hover:text-brand-700 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:text-brand-200"
            >
              {s.label}
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href="/"
        className="mt-10 inline-flex items-center rounded-lg bg-brand-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
      >
        Back home
      </Link>
    </main>
  );
}
