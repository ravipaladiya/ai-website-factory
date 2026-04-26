"use client";

import NextLink from "next/link";
import { useEffect, useRef, useState } from "react";

type Link = { href: string; label: string };

export default function MobileMenu({ links }: { links: Link[] }) {
  const [open, setOpen] = useState(false);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    firstLinkRef.current?.focus();

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 bg-white/80 text-black/70 transition hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10"
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-x-0 top-16 z-40 border-b border-black/5 bg-white/95 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-black/90"
        >
          <nav aria-label="Mobile primary" className="container py-4">
            <ul role="list" className="flex flex-col divide-y divide-black/5 dark:divide-white/10">
              {links.map((link, i) => {
                const isInternalRoute =
                  link.href.startsWith("/") && !link.href.startsWith("/#");
                const cls =
                  "block py-3 text-base font-medium text-black/80 transition hover:text-black focus:outline-none focus-visible:text-brand-600 dark:text-white/80 dark:hover:text-white dark:focus-visible:text-brand-300";
                return (
                  <li key={link.href}>
                    {isInternalRoute ? (
                      <NextLink
                        ref={i === 0 ? firstLinkRef : undefined}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={cls}
                      >
                        {link.label}
                      </NextLink>
                    ) : (
                      <a
                        ref={i === 0 ? firstLinkRef : undefined}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={cls}
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mt-4 flex flex-col gap-2 pt-4">
              <NextLink
                href="/new"
                onClick={() => setOpen(false)}
                className="inline-flex w-full items-center justify-center rounded-lg bg-brand-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
              >
                Get started free
              </NextLink>
              <NextLink
                href="/login"
                onClick={() => setOpen(false)}
                className="inline-flex w-full items-center justify-center rounded-lg border border-black/10 bg-white px-4 py-3 text-sm font-medium text-black/80 transition hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:border-white/10 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10"
              >
                Sign in
              </NextLink>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
