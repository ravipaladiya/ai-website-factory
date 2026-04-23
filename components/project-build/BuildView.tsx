"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { BuildEvent, BuildPhase } from "@/lib/project-store";
import StepIndicator from "./StepIndicator";

type LogEntry = { phase: BuildPhase; message: string; ts: number };

function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export default function BuildView({
  projectId,
  brandName,
}: {
  projectId: string;
  brandName: string;
}) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<BuildPhase>("Planning");
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const logRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const source = new EventSource(`/api/projects/${projectId}/stream`);

    function append(message: string, p: BuildPhase) {
      setLogs((prev) => [...prev, { phase: p, message, ts: Date.now() }]);
    }

    source.addEventListener("log", (e: MessageEvent) => {
      try {
        const data = JSON.parse(e.data) as Extract<BuildEvent, { type: "log" }>;
        setProgress(data.progress);
        setPhase(data.phase);
        append(data.message, data.phase);
      } catch {}
    });

    source.addEventListener("phase", (e: MessageEvent) => {
      try {
        const data = JSON.parse(e.data) as Extract<BuildEvent, { type: "phase" }>;
        setPhase(data.phase);
        setProgress(data.progress);
      } catch {}
    });

    source.addEventListener("done", () => {
      setProgress(100);
      setDone(true);
      source.close();
    });

    source.onerror = () => {
      // EventSource closes naturally at end of stream; only treat as error if
      // we haven't received the done signal.
      if (source.readyState === EventSource.CLOSED) {
        setError(null);
      } else {
        setError("Lost connection to the build server.");
      }
    };

    return () => source.close();
  }, [projectId]);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logs.length]);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <header>
        <p className="text-xs font-medium uppercase tracking-wider text-brand-600 dark:text-brand-300">
          Build {projectId.slice(0, 8)}
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          {done ? `${brandName} is live` : `Building ${brandName}`}
        </h1>
        <p className="mt-2 text-sm text-black/70 dark:text-white/70">
          {done
            ? "All quality gates passed. Open your dashboard to deploy."
            : "Streaming live from the agent. Each phase runs in order."}
        </p>
      </header>

      <div>
        <div className="flex items-baseline justify-between">
          <span className="text-xs font-medium text-black/60 dark:text-white/60">
            Progress
          </span>
          <span className="text-xs tabular-nums font-semibold text-black/80 dark:text-white/80">
            {progress}%
          </span>
        </div>
        <div
          role="progressbar"
          aria-label="Build progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          className="mt-2 h-2 w-full overflow-hidden rounded-full bg-black/5 dark:bg-white/10"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-700 transition-[width] duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <StepIndicator current={phase} done={done} />

      <section
        aria-label="Build log"
        className="overflow-hidden rounded-2xl border border-black/10 bg-[#0b0e1a] text-[13px] leading-relaxed text-emerald-200/90 shadow-inner dark:border-white/10"
      >
        <div className="flex items-center gap-2 border-b border-white/5 bg-black/30 px-4 py-2 text-[11px] uppercase tracking-wider text-white/60">
          <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
          Live log
        </div>
        <div
          ref={logRef}
          aria-live="polite"
          className="h-72 overflow-y-auto px-4 py-3 font-mono"
        >
          {logs.length === 0 ? (
            <p className="text-white/40">Waiting for first event…</p>
          ) : (
            <ul role="list" className="space-y-0.5">
              {logs.map((entry, i) => (
                <li key={i} className="flex gap-3">
                  <span className="shrink-0 text-white/35">
                    {formatTime(entry.ts)}
                  </span>
                  <span className="shrink-0 text-brand-300">[{entry.phase}]</span>
                  <span className="text-white/85">{entry.message}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {error && (
        <p
          role="alert"
          className="rounded-lg border border-red-500/30 bg-red-50 p-3 text-sm text-red-800 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200"
        >
          {error}
        </p>
      )}

      <div className="flex items-center justify-between border-t border-black/5 pt-4 dark:border-white/10">
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center rounded-lg border border-black/10 bg-white px-4 py-2 text-sm font-medium text-black/80 shadow-sm transition hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:border-white/10 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10"
        >
          ← Back to dashboard
        </Link>

        {done && (
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            View project →
          </Link>
        )}
      </div>
    </div>
  );
}
