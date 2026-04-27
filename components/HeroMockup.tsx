"use client";

import Link from "next/link";
import { useEffect, useReducer } from "react";

type Slide = {
  label: string;
  host: string;
  render: () => JSX.Element;
};

function EcommerceSlide() {
  return (
    <div className="flex h-full flex-col bg-white dark:bg-[#0f1222]">
      <div className="flex items-center justify-between border-b border-black/5 px-4 py-2 dark:border-white/10">
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded bg-emerald-500" />
          <span className="text-[11px] font-semibold tracking-tight text-black/80 dark:text-white/80">
            Verdant
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[9px] text-black/50 dark:text-white/50">Shop</span>
          <span className="text-[9px] text-black/50 dark:text-white/50">About</span>
          <span className="h-4 w-4 rounded-full bg-black/10 dark:bg-white/10" />
        </div>
      </div>
      <div className="grid flex-1 grid-cols-3 gap-2 p-3">
        {[
          { c: "from-emerald-300 to-emerald-500", p: "$29" },
          { c: "from-amber-300 to-amber-500", p: "$48" },
          { c: "from-rose-300 to-rose-500", p: "$65" },
          { c: "from-sky-300 to-sky-500", p: "$32" },
          { c: "from-violet-300 to-violet-500", p: "$52" },
          { c: "from-teal-300 to-teal-500", p: "$74" },
        ].map((item, i) => (
          <div key={i} className="flex flex-col">
            <div className={`aspect-square rounded-md bg-gradient-to-br ${item.c}`} />
            <div className="mt-1.5 h-1.5 w-3/4 rounded-full bg-black/10 dark:bg-white/10" />
            <div className="mt-1 text-[9px] font-medium text-black/70 dark:text-white/70">
              {item.p}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SaasSlide() {
  return (
    <div className="flex h-full flex-col bg-gradient-to-br from-slate-50 to-white dark:from-[#0b1340] dark:to-[#0f1222]">
      <div className="flex items-center justify-between border-b border-black/5 px-4 py-2 dark:border-white/10">
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded bg-gradient-to-br from-indigo-400 to-indigo-700" />
          <span className="text-[11px] font-semibold tracking-tight text-black/80 dark:text-white/80">
            Pulseboard
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-md bg-black/5 px-2 py-0.5 text-[9px] font-medium text-black/70 dark:bg-white/10 dark:text-white/70">
            Sign in
          </span>
          <span className="inline-flex items-center rounded-md bg-indigo-600 px-2 py-0.5 text-[9px] font-medium text-white">
            Start free
          </span>
        </div>
      </div>
      <div className="flex-1 px-6 py-4">
        <div className="mx-auto max-w-[240px] text-center">
          <div className="mx-auto h-2 w-32 rounded-full bg-indigo-600/20" />
          <div className="mx-auto mt-2 h-3 w-full rounded-full bg-black/80 dark:bg-white/80" />
          <div className="mx-auto mt-1.5 h-3 w-5/6 rounded-full bg-black/80 dark:bg-white/80" />
          <div className="mx-auto mt-3 h-1.5 w-5/6 rounded-full bg-black/20 dark:bg-white/20" />
          <div className="mx-auto mt-1 h-1.5 w-3/4 rounded-full bg-black/20 dark:bg-white/20" />
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="h-4 w-14 rounded bg-indigo-600" />
            <span className="h-4 w-14 rounded border border-black/15 dark:border-white/15" />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-md border border-black/5 bg-white p-2 shadow-sm dark:border-white/10 dark:bg-white/5"
            >
              <div className="h-3 w-3 rounded bg-gradient-to-br from-indigo-400 to-indigo-700" />
              <div className="mt-1.5 h-1 w-3/4 rounded-full bg-black/70 dark:bg-white/70" />
              <div className="mt-1 h-1 w-full rounded-full bg-black/15 dark:bg-white/15" />
              <div className="mt-0.5 h-1 w-2/3 rounded-full bg-black/15 dark:bg-white/15" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PortfolioSlide() {
  return (
    <div className="flex h-full flex-col bg-neutral-50 dark:bg-[#0f1222]">
      <div className="flex items-center justify-between border-b border-black/5 px-4 py-2 dark:border-white/10">
        <span className="text-[11px] font-semibold italic tracking-tight text-black/80 dark:text-white/80">
          Maya Takahashi
        </span>
        <div className="flex items-center gap-3">
          <span className="text-[9px] text-black/50 dark:text-white/50">Work</span>
          <span className="text-[9px] text-black/50 dark:text-white/50">About</span>
          <span className="text-[9px] text-black/50 dark:text-white/50">Contact</span>
        </div>
      </div>
      <div className="flex-1 px-4 py-3">
        <div className="max-w-[260px]">
          <div className="h-2 w-28 rounded-full bg-black/70 dark:bg-white/80" />
          <div className="mt-1.5 h-2 w-36 rounded-full bg-black/70 dark:bg-white/80" />
          <div className="mt-2 h-1.5 w-40 rounded-full bg-black/30 dark:bg-white/30" />
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          <div className="col-span-2 aspect-[5/3] rounded-md bg-gradient-to-br from-zinc-300 to-zinc-500 dark:from-zinc-600 dark:to-zinc-800" />
          <div className="aspect-[5/3] rounded-md bg-gradient-to-br from-amber-300 to-orange-500" />
          <div className="aspect-[5/3] rounded-md bg-gradient-to-br from-sky-300 to-blue-600" />
          <div className="col-span-2 aspect-[5/3] rounded-md bg-gradient-to-br from-rose-300 to-fuchsia-600" />
        </div>
      </div>
    </div>
  );
}

const slides: Slide[] = [
  { label: "E-commerce", host: "verdant-shop.vercel.app", render: EcommerceSlide },
  { label: "SaaS Landing Page", host: "pulseboard.vercel.app", render: SaasSlide },
  { label: "Portfolio", host: "maya.vercel.app", render: PortfolioSlide },
];

const INTERVAL_MS = 4000;

function reducer(state: number) {
  return (state + 1) % slides.length;
}

export default function HeroMockup() {
  const [index, tick] = useReducer(reducer, 0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const id = window.setInterval(tick, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  const active = slides[index];

  return (
    <div className="mx-auto w-full max-w-xl sm:max-w-2xl">
      <div className="relative overflow-hidden rounded-xl border border-black/10 bg-white shadow-2xl shadow-brand-900/10 ring-1 ring-black/5 dark:border-white/10 dark:bg-[#0b0e1a] dark:ring-white/10">
        <div className="flex items-center gap-3 border-b border-black/5 bg-gradient-to-b from-neutral-50 to-neutral-100 px-3 py-2 dark:border-white/10 dark:from-[#1a1f35] dark:to-[#11152a]">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>

          <div className="ml-1 flex items-center gap-1 text-black/40 dark:text-white/40" aria-hidden="true">
            <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
              <path d="M12 5l-5 5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
              <path d="M8 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div
            className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-black/5 bg-white/80 px-2.5 py-1 text-[11px] text-black/60 shadow-inner dark:border-white/10 dark:bg-black/30 dark:text-white/60"
            role="status"
            aria-live="polite"
          >
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-3 w-3 text-emerald-500">
              <path d="M7 10l-2 2-2-2m4-3V5a3 3 0 0 1 6 0v2m-6 0h6a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="truncate font-medium">{active.host}</span>
          </div>

          <div className="w-8" aria-hidden="true" />
        </div>

        <div className="relative aspect-[2/1] w-full">
          {slides.map((slide, i) => {
            const Slide = slide.render;
            return (
              <div
                key={slide.label}
                aria-hidden={i !== index}
                className={
                  (i === index ? "opacity-100" : "opacity-0") +
                  " absolute inset-0 transition-opacity duration-700 ease-out motion-reduce:transition-none"
                }
              >
                <Slide />
              </div>
            );
          })}
        </div>

        <div className="pointer-events-none absolute left-1/2 top-10 z-10 -translate-x-1/2">
          <span
            key={active.label}
            className="inline-flex items-center gap-1.5 rounded-full bg-black/80 px-3 py-1 text-[11px] font-medium text-white shadow-lg backdrop-blur motion-safe:animate-[fadein_400ms_ease-out]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
            {active.label}
          </span>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-center gap-3">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          {slides.map((s, i) => (
            <span
              key={s.label}
              className={
                (i === index ? "w-5 bg-brand-500" : "w-1.5 bg-black/20 dark:bg-white/20") +
                " h-1.5 rounded-full transition-all duration-500"
              }
            />
          ))}
        </div>
        <span aria-hidden="true" className="text-black/20 dark:text-white/20">·</span>
        <Link
          href="/templates"
          prefetch
          className="rounded text-[11px] font-medium text-brand-700 transition hover:text-brand-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:text-brand-300 dark:hover:text-brand-200"
        >
          Browse all templates <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
