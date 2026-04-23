"use client";

import { useEffect, useRef, useState } from "react";
import type { StatsPayload } from "@/app/api/stats/route";

type Format = "integer" | "compactMillions" | "percent" | "integerAvg";

type Stat = {
  key: keyof Omit<StatsPayload, "generatedAt">;
  label: string;
  format: Format;
  placeholder: number;
};

const stats: Stat[] = [
  {
    key: "sitesBuilt",
    label: "sites built",
    format: "integer",
    placeholder: 12_847,
  },
  {
    key: "lighthousePointsScored",
    label: "Lighthouse points scored",
    format: "compactMillions",
    placeholder: 4_200_000,
  },
  {
    key: "buildSuccessRate",
    label: "build success rate",
    format: "percent",
    placeholder: 99.3,
  },
  {
    key: "avgMinutesToFirstDeploy",
    label: "min to first deploy",
    format: "integerAvg",
    placeholder: 38,
  },
];

const intFormatter = new Intl.NumberFormat("en-US");

function formatValue(value: number, format: Format): { value: string; suffix?: string; prefix?: string } {
  switch (format) {
    case "integer":
      return { value: intFormatter.format(Math.round(value)) };
    case "compactMillions": {
      const m = value / 1_000_000;
      return {
        value: m >= 10 ? m.toFixed(0) : m.toFixed(1),
        suffix: "M",
      };
    }
    case "percent":
      return { value: value.toFixed(1), suffix: "%" };
    case "integerAvg":
      return { value: intFormatter.format(Math.round(value)), prefix: "avg. " };
    default:
      return { value: String(value) };
  }
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

type CounterProps = {
  target: number;
  format: Format;
  start: boolean;
  durationMs?: number;
  reducedMotion: boolean;
};

function Counter({ target, format, start, durationMs = 1400, reducedMotion }: CounterProps) {
  const [value, setValue] = useState(reducedMotion ? target : 0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;
    if (reducedMotion) {
      setValue(target);
      return;
    }

    const startAt = performance.now();
    const from = 0;
    const to = target;

    function frame(now: number) {
      const t = Math.min(1, (now - startAt) / durationMs);
      const eased = easeOutCubic(t);
      setValue(from + (to - from) * eased);
      if (t < 1) rafRef.current = requestAnimationFrame(frame);
    }

    rafRef.current = requestAnimationFrame(frame);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [start, target, durationMs, reducedMotion]);

  const formatted = formatValue(value, format);

  return (
    <span className="tabular-nums" aria-hidden={start ? undefined : "true"}>
      {formatted.prefix}
      {formatted.value}
      {formatted.suffix}
    </span>
  );
}

export default function StatsBanner() {
  const [data, setData] = useState<StatsPayload | null>(null);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      try {
        const res = await fetch("/api/stats", { signal: ctrl.signal });
        if (!res.ok) return;
        const json = (await res.json()) as StatsPayload;
        setData(json);
      } catch {
        // Network failure leaves the placeholder values in place.
      }
    })();
    return () => ctrl.abort();
  }, []);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );

    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const values: Record<Stat["key"], number> = data
    ? {
        sitesBuilt: data.sitesBuilt,
        lighthousePointsScored: data.lighthousePointsScored,
        buildSuccessRate: data.buildSuccessRate,
        avgMinutesToFirstDeploy: data.avgMinutesToFirstDeploy,
      }
    : {
        sitesBuilt: stats[0].placeholder,
        lighthousePointsScored: stats[1].placeholder,
        buildSuccessRate: stats[2].placeholder,
        avgMinutesToFirstDeploy: stats[3].placeholder,
      };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="stats-heading"
      className="relative overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0b1130] via-[#0a1a3a] to-[#0b1130]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(59,91,255,0.18),transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />

      <h2 id="stats-heading" className="sr-only">
        Live factory stats
      </h2>

      <div className="container py-10 sm:py-12">
        <dl className="grid grid-cols-2 gap-y-8 sm:gap-x-8 lg:grid-cols-4">
          {stats.map((s) => {
            const target = values[s.key];
            return (
              <div
                key={s.key}
                className="flex flex-col items-center text-center"
              >
                <dt className="order-2 mt-2 text-[11px] font-medium uppercase tracking-[0.14em] text-white/60">
                  {s.label}
                </dt>
                <dd className="order-1 bg-gradient-to-b from-white to-white/70 bg-clip-text text-3xl font-semibold tracking-tight text-transparent sm:text-4xl lg:text-5xl">
                  <Counter
                    target={target}
                    format={s.format}
                    start={inView}
                    reducedMotion={reducedMotion}
                  />
                </dd>
              </div>
            );
          })}
        </dl>

        {data && (
          <p className="mt-6 text-center text-[10px] uppercase tracking-[0.18em] text-white/40">
            Live · updated every 60s
          </p>
        )}
      </div>
    </section>
  );
}
