"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const nav: NavItem[] = [
  {
    href: "/dashboard",
    label: "Projects",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
        <path d="M4 7h16v12H4zM4 7l2-3h4l2 3" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: "/dashboard/builds",
    label: "Builds",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
        <path d="M4 7l4 4-4 4M10 17h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
        <path d="M19.4 15a1.8 1.8 0 0 0 .36 2l.06.06a2 2 0 1 1-2.84 2.84l-.06-.06a1.8 1.8 0 0 0-2-.36 1.8 1.8 0 0 0-1.08 1.66V21a2 2 0 1 1-4 0v-.06a1.8 1.8 0 0 0-1.08-1.66 1.8 1.8 0 0 0-2 .36l-.06.06a2 2 0 1 1-2.84-2.84l.06-.06a1.8 1.8 0 0 0 .36-2 1.8 1.8 0 0 0-1.66-1.08H3a2 2 0 1 1 0-4h.06A1.8 1.8 0 0 0 4.72 8.5a1.8 1.8 0 0 0-.36-2l-.06-.06a2 2 0 1 1 2.84-2.84l.06.06a1.8 1.8 0 0 0 2 .36H9.3A1.8 1.8 0 0 0 10.38 2.78V3a2 2 0 1 1 4 0v.06A1.8 1.8 0 0 0 15.46 4.72a1.8 1.8 0 0 0 2-.36l.06-.06a2 2 0 1 1 2.84 2.84l-.06.06a1.8 1.8 0 0 0-.36 2v.14A1.8 1.8 0 0 0 21.22 10.5H21a2 2 0 1 1 0 4h-.06a1.8 1.8 0 0 0-1.66 1.08z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: "/dashboard/billing",
    label: "Billing",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
        <rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3 10h18" stroke="currentColor" strokeWidth="1.6" />
        <path d="M7 15h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-black/5 bg-white/60 px-3 py-5 backdrop-blur dark:border-white/10 dark:bg-black/40 md:flex">
      <Link
        href="/"
        className="flex items-center gap-2 px-2 font-semibold tracking-tight"
        aria-label="AI Website Factory home"
      >
        <span
          aria-hidden="true"
          className="inline-block h-6 w-6 rounded-md bg-gradient-to-br from-brand-400 to-brand-700 shadow-sm"
        />
        <span className="text-sm">AI Website Factory</span>
      </Link>

      <nav aria-label="Dashboard" className="mt-8">
        <ul role="list" className="flex flex-col gap-0.5">
          {nav.map((item) => {
            const active =
              item.href === "/dashboard"
                ? pathname === item.href
                : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={
                    (active
                      ? "bg-brand-50 text-brand-800 dark:bg-brand-500/15 dark:text-brand-100"
                      : "text-black/70 hover:bg-black/5 hover:text-black dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white") +
                    " flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                  }
                >
                  <span
                    className={
                      active
                        ? "text-brand-700 dark:text-brand-200"
                        : "text-black/50 dark:text-white/50"
                    }
                  >
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto rounded-xl border border-black/5 bg-white p-3 text-xs text-black/70 dark:border-white/10 dark:bg-white/5 dark:text-white/70">
        <p className="font-semibold text-black/80 dark:text-white/80">Need a hand?</p>
        <p className="mt-1 leading-snug">
          The agent ships a PR every iteration. Review diffs, merge, repeat.
        </p>
        <Link
          href="/contact"
          className="mt-2 inline-flex text-xs font-medium text-brand-600 hover:text-brand-700 dark:text-brand-300 dark:hover:text-brand-200"
        >
          Talk to us →
        </Link>
      </div>
    </aside>
  );
}
