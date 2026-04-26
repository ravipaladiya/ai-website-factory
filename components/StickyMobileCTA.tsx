"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hero = document.getElementById("hero-heading");
    const ctaBlock = document.getElementById("cta");

    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    let heroPassed = false;
    let ctaInView = false;

    const update = () => setVisible(heroPassed && !ctaInView);

    const heroObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          heroPassed = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        }
        update();
      },
      { threshold: 0 },
    );

    const ctaObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ctaInView = entry.isIntersecting;
        }
        update();
      },
      { threshold: 0.1 },
    );

    if (hero) heroObserver.observe(hero);
    if (ctaBlock) ctaObserver.observe(ctaBlock);

    return () => {
      heroObserver.disconnect();
      ctaObserver.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={
        (visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-full opacity-0") +
        " fixed inset-x-0 bottom-0 z-40 transition-all duration-200 motion-reduce:transition-none sm:hidden"
      }
    >
      <div
        className="mx-3 flex items-center gap-3 rounded-2xl border border-black/10 bg-white/95 p-3 shadow-xl backdrop-blur dark:border-white/10 dark:bg-[#0b0e1a]/95"
        style={{
          marginBottom: "calc(env(safe-area-inset-bottom, 0px) + 0.75rem)",
        }}
        role="region"
        aria-label="Start building"
      >
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">Ship a site in 1 day</p>
          <p className="truncate text-xs text-black/60 dark:text-white/60">
            Production-ready, SEO-first. Free to start.
          </p>
        </div>
        <Link
          href="/new"
          className="shrink-0 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
        >
          Start free
        </Link>
      </div>
    </div>
  );
}
