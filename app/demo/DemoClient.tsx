"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import {
  demoTemplates,
  type DemoEvent,
  type DemoTemplateId,
} from "@/lib/demo-store";

const MAX_DESCRIPTION = 200;

type Stage = "form" | "streaming" | "ready" | "error";

export default function DemoClient({
  initialSession,
}: {
  initialSession:
    | { id: string; description: string; template: DemoTemplateId }
    | null;
}) {
  const router = useRouter();
  const { status: authStatus } = useSession();

  const [stage, setStage] = useState<Stage>(
    initialSession ? "streaming" : "form",
  );
  const [description, setDescription] = useState(initialSession?.description ?? "");
  const [template, setTemplate] = useState<DemoTemplateId>(
    initialSession?.template ?? "saas-landing",
  );
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [readyTemplate, setReadyTemplate] = useState<DemoTemplateId | null>(
    null,
  );
  const [copied, setCopied] = useState(false);
  const [forking, setForking] = useState(false);

  const sessionId = initialSession?.id ?? null;
  const logScrollRef = useRef<HTMLDivElement | null>(null);

  // Keep the log auto-scrolled to the bottom
  useEffect(() => {
    if (logScrollRef.current) {
      logScrollRef.current.scrollTop = logScrollRef.current.scrollHeight;
    }
  }, [logs.length]);

  // Connect to the SSE stream when we have a session
  useEffect(() => {
    if (!sessionId) return;
    setStage("streaming");
    setLogs([]);
    setReadyTemplate(null);

    const source = new EventSource(`/api/generate/${sessionId}/stream`);

    source.addEventListener("log", (e: MessageEvent) => {
      try {
        const data = JSON.parse(e.data) as Extract<DemoEvent, { type: "log" }>;
        setLogs((prev) => [...prev, data.message]);
      } catch {}
    });

    source.addEventListener("ready", (e: MessageEvent) => {
      try {
        const data = JSON.parse(e.data) as Extract<DemoEvent, { type: "ready" }>;
        setReadyTemplate(data.template);
        setStage("ready");
      } catch {}
      source.close();
    });

    source.onerror = () => {
      if (source.readyState !== EventSource.CLOSED) {
        setStage("error");
        setError("Lost connection to the generator. Please try again.");
        source.close();
      }
    };

    return () => source.close();
  }, [sessionId]);

  async function onGenerate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!description.trim()) return;
    setError(null);
    setStage("streaming");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ description: description.trim(), template }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        id?: string;
        error?: string;
      };
      if (!res.ok || !data.id) {
        setError(data.error ?? "Could not start the generator.");
        setStage("error");
        return;
      }
      // Move the generated id into the URL so it's shareable
      router.replace(`/demo?session=${data.id}`);
    } catch {
      setError("Network error. Try again.");
      setStage("error");
    }
  }

  async function onCopyLink() {
    if (!sessionId) return;
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {}
  }

  async function onFork() {
    if (!readyTemplate) return;

    if (authStatus !== "authenticated") {
      const next = encodeURIComponent(window.location.pathname + window.location.search);
      router.push(`/login?next=${next}`);
      return;
    }

    setForking(true);
    setError(null);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          siteType: readyTemplate,
          brandName: description.slice(0, 40) || "Forked demo",
          primaryColor: "#3b5bff",
          tone: "Professional",
          pages: ["home"],
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        id?: string;
        error?: string;
      };
      if (!res.ok || !data.id) {
        setError(data.error ?? "Could not fork this demo.");
        setForking(false);
        return;
      }
      router.push(`/projects/${data.id}/build`);
    } catch {
      setError("Network error. Try again.");
      setForking(false);
    }
  }

  const showForm = stage === "form";
  const showResult = stage === "streaming" || stage === "ready" || stage === "error";
  const progress = Math.min(99, Math.round((logs.length / 14) * 100));

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-14">
      <header className="text-center">
        <p className="text-xs font-medium uppercase tracking-wider text-brand-600 dark:text-brand-300">
          Live demo
        </p>
        <h1 className="text-balance mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Describe your site. Watch the agent build it.
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-black/70 dark:text-white/70">
          Pick a template, type a one-line brief, and see the factory stream its
          activity log before revealing a live preview.
        </p>
      </header>

      {showForm && (
        <form
          onSubmit={onGenerate}
          className="mx-auto flex w-full max-w-2xl flex-col gap-5 rounded-2xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5"
        >
          <div>
            <label htmlFor="demo-description" className="block text-sm font-medium">
              Describe your site
            </label>
            <textarea
              id="demo-description"
              rows={3}
              maxLength={MAX_DESCRIPTION}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A plant-based skincare brand for busy commuters."
              className="mt-1 block w-full resize-y rounded-lg border border-black/10 bg-white px-3 py-2.5 text-sm shadow-sm transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-white/10 dark:bg-white/5"
            />
            <p className="mt-1 flex items-center justify-between text-xs">
              <span className="text-black/50 dark:text-white/50">
                Keep it short — the agent does the rest.
              </span>
              <span
                className={
                  description.length > MAX_DESCRIPTION - 20
                    ? "font-medium text-amber-600 dark:text-amber-400"
                    : "text-black/40 dark:text-white/40"
                }
              >
                {description.length} / {MAX_DESCRIPTION}
              </span>
            </p>
          </div>

          <fieldset>
            <legend className="block text-sm font-medium">Template</legend>
            <div
              role="radiogroup"
              aria-label="Template"
              className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-5"
            >
              {demoTemplates.map((t) => {
                const selected = template === t.id;
                return (
                  <label
                    key={t.id}
                    className={
                      (selected
                        ? "border-brand-500 bg-brand-50 text-brand-800 dark:border-brand-400 dark:bg-brand-500/15 dark:text-brand-100"
                        : "border-black/10 bg-white text-black/80 hover:border-brand-500/40 dark:border-white/10 dark:bg-white/5 dark:text-white/80") +
                      " flex cursor-pointer items-center justify-center rounded-lg border px-3 py-2 text-xs font-medium transition focus-within:ring-2 focus-within:ring-brand-500"
                    }
                  >
                    <input
                      type="radio"
                      name="template"
                      value={t.id}
                      checked={selected}
                      onChange={() => setTemplate(t.id as DemoTemplateId)}
                      className="sr-only"
                    />
                    {t.label}
                  </label>
                );
              })}
            </div>
          </fieldset>

          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            Generate preview →
          </button>

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400" role="alert">
              {error}
            </p>
          )}
        </form>
      )}

      {showResult && (
        <div className="flex flex-col gap-6">
          <div>
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-medium text-black/60 dark:text-white/60">
                {stage === "ready" ? "Preview ready" : "Building live preview"}
              </span>
              <span className="text-xs tabular-nums font-semibold text-black/80 dark:text-white/80">
                {stage === "ready" ? "100%" : `${progress}%`}
              </span>
            </div>
            <div
              role="progressbar"
              aria-label="Generator progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={stage === "ready" ? 100 : progress}
              className="mt-2 h-2 w-full overflow-hidden rounded-full bg-black/5 dark:bg-white/10"
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-700 transition-[width] duration-500 ease-out"
                style={{ width: stage === "ready" ? "100%" : `${progress}%` }}
              />
            </div>
          </div>

          <section
            aria-label="Generator log"
            className="overflow-hidden rounded-2xl border border-black/10 bg-[#0b0e1a] text-[13px] leading-relaxed shadow-inner dark:border-white/10"
          >
            <div className="flex items-center gap-2 border-b border-white/5 bg-black/30 px-4 py-2 text-[11px] uppercase tracking-wider text-white/60">
              <span className="h-2 w-2 rounded-full bg-emerald-400 motion-safe:animate-pulse" aria-hidden="true" />
              Agent activity
            </div>
            <div
              ref={logScrollRef}
              aria-live="polite"
              className="h-64 overflow-y-auto px-4 py-3 font-mono text-emerald-200/90"
            >
              {logs.length === 0 ? (
                <p className="text-white/40">
                  <span>Waking up the agent</span>
                  <span className="ml-1 inline-block h-3.5 w-2 bg-emerald-400 align-text-bottom motion-safe:animate-pulse" aria-hidden="true" />
                </p>
              ) : (
                <ul role="list" className="space-y-0.5">
                  {logs.map((m, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="shrink-0 text-emerald-400">$</span>
                      <span className="text-white/85">
                        {m}
                        {i === logs.length - 1 && stage !== "ready" && (
                          <span
                            aria-hidden="true"
                            className="ml-1 inline-block h-3.5 w-2 bg-emerald-400 align-text-bottom motion-safe:animate-pulse"
                          />
                        )}
                      </span>
                    </li>
                  ))}
                  {stage === "ready" && (
                    <li className="flex gap-3">
                      <span className="shrink-0 text-emerald-400">$</span>
                      <span className="text-emerald-300">
                        ✔ done. Preview revealed below.
                      </span>
                    </li>
                  )}
                </ul>
              )}
            </div>
          </section>

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400" role="alert">
              {error}
            </p>
          )}

          {stage === "ready" && readyTemplate && (
            <section
              aria-label="Generated preview"
              className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-xl dark:border-white/10 dark:bg-black/40"
            >
              <div className="flex items-center gap-2 border-b border-black/5 bg-neutral-50 px-3 py-2 dark:border-white/10 dark:bg-[#11152a]">
                <span className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                </span>
                <span className="ml-2 truncate text-xs text-black/60 dark:text-white/60">
                  preview · {readyTemplate}
                </span>
              </div>
              <iframe
                title={`Preview of ${readyTemplate} template`}
                src={`/demo/preview/${readyTemplate}`}
                sandbox="allow-same-origin"
                loading="lazy"
                className="aspect-[16/10] w-full bg-white dark:bg-[#0b0e1a]"
              />
            </section>
          )}

          <div className="flex flex-col items-center justify-between gap-3 border-t border-black/5 pt-5 sm:flex-row dark:border-white/10">
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/demo"
                className="inline-flex items-center justify-center rounded-lg border border-black/10 bg-white px-4 py-2 text-sm font-medium text-black/80 shadow-sm transition hover:bg-black/5 dark:border-white/10 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10"
              >
                ← New demo
              </Link>
              {sessionId && (
                <button
                  type="button"
                  onClick={onCopyLink}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-black/10 bg-white px-3 py-2 text-sm font-medium text-black/80 shadow-sm transition hover:bg-black/5 dark:border-white/10 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10"
                >
                  {copied ? "Copied ✓" : "Copy share link"}
                </button>
              )}
            </div>

            {stage === "ready" && (
              <button
                type="button"
                onClick={onFork}
                disabled={forking}
                className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {forking ? "Forking…" : "Fork this site →"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
