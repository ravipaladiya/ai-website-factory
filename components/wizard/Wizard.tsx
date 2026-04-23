"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  defaultProjectInput,
  estimateBuildSeconds,
  featureChecklist,
  pageIds,
  pageLabels,
  projectInputSchema,
  siteTypes,
  tones,
  type ProjectInput,
  type SiteTypeId,
  type Tone,
  type PageId,
} from "@/lib/project-schema";
import WizardStepper from "./WizardStepper";

const STEP_FIELDS: (keyof ProjectInput | (keyof ProjectInput)[])[] = [
  "siteType",
  ["brandName", "primaryColor", "tone"],
  "pages",
  [],
];

function formatDuration(seconds: number) {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s === 0 ? `${m}m` : `${m}m ${s}s`;
}

export default function Wizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    setValue,
    watch,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectInput>({
    mode: "onTouched",
    resolver: zodResolver(projectInputSchema),
    defaultValues: defaultProjectInput,
  });

  const values = watch();

  const estSeconds = useMemo(() => estimateBuildSeconds(values), [values]);
  const checklist = useMemo(() => featureChecklist(values), [values]);
  const siteTypeLabel = useMemo(
    () => siteTypes.find((t) => t.id === values.siteType)?.label,
    [values.siteType],
  );

  async function next() {
    const field = STEP_FIELDS[step];
    const needsValidation =
      !(Array.isArray(field) && field.length === 0);
    const ok = !needsValidation
      ? true
      : await trigger(field as Parameters<typeof trigger>[0], {
          shouldFocus: true,
        });
    if (ok) setStep((s) => Math.min(3, s + 1));
  }

  function back() {
    setStep((s) => Math.max(0, s - 1));
  }

  async function onSubmit(data: ProjectInput) {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const payload = (await res.json().catch(() => ({}))) as {
        id?: string;
        error?: string;
      };
      if (!res.ok || !payload.id) {
        throw new Error(payload.error ?? "Could not create project.");
      }
      router.push(`/projects/${payload.id}/build`);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Unknown error");
      setSubmitting(false);
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex w-full max-w-3xl flex-col gap-8"
    >
        <WizardStepper step={step} />

        {step === 0 && (
          <fieldset className="flex flex-col gap-4">
            <legend className="text-2xl font-semibold tracking-tight">
              What are we building?
            </legend>
            <p className="text-sm text-black/70 dark:text-white/70">
              Pick the site type closest to your goal. You can change it later.
            </p>
            <div
              role="radiogroup"
              aria-invalid={Boolean(errors.siteType)}
              aria-describedby={errors.siteType ? "siteType-error" : undefined}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
            >
              {siteTypes.map((t) => {
                const selected = values.siteType === t.id;
                return (
                  <label
                    key={t.id}
                    className={
                      (selected
                        ? "border-brand-500 ring-2 ring-brand-500/30"
                        : "border-black/10 hover:border-brand-500/40 dark:border-white/10") +
                      " cursor-pointer rounded-2xl border bg-white/70 p-4 text-left shadow-sm transition focus-within:ring-2 focus-within:ring-brand-500 dark:bg-white/5"
                    }
                  >
                    <input
                      type="radio"
                      value={t.id}
                      {...register("siteType")}
                      checked={selected}
                      onChange={() =>
                        setValue("siteType", t.id as SiteTypeId, {
                          shouldValidate: true,
                        })
                      }
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold tracking-tight">
                        {t.label}
                      </h3>
                      {selected && (
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-white">
                          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-3 w-3">
                            <path d="m4 8 3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      )}
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-black/60 dark:text-white/60">
                      {t.description}
                    </p>
                  </label>
                );
              })}
            </div>
            {errors.siteType && (
              <p id="siteType-error" className="text-xs text-red-600 dark:text-red-400">
                {errors.siteType.message}
              </p>
            )}
          </fieldset>
        )}

        {step === 1 && (
          <fieldset className="flex flex-col gap-5">
            <legend className="text-2xl font-semibold tracking-tight">
              Brand basics
            </legend>
            <p className="text-sm text-black/70 dark:text-white/70">
              These shape copy, color, and tone across every page we emit.
            </p>

            <div>
              <label htmlFor="brandName" className="block text-sm font-medium">
                Brand name
              </label>
              <input
                id="brandName"
                type="text"
                autoComplete="organization"
                aria-invalid={Boolean(errors.brandName)}
                aria-describedby={errors.brandName ? "brandName-error" : undefined}
                {...register("brandName")}
                className="mt-1 block w-full rounded-lg border border-black/10 bg-white px-3 py-2.5 text-sm shadow-sm transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-white/10 dark:bg-white/5"
                placeholder="e.g. Verdant"
              />
              {errors.brandName && (
                <p id="brandName-error" className="mt-1 text-xs text-red-600 dark:text-red-400">
                  {errors.brandName.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="primaryColor" className="block text-sm font-medium">
                Primary color
              </label>
              <div className="mt-1 flex items-center gap-3">
                <input
                  id="primaryColor"
                  type="color"
                  aria-describedby="primaryColor-preview"
                  {...register("primaryColor")}
                  className="h-10 w-14 cursor-pointer rounded-lg border border-black/10 bg-white p-1 dark:border-white/10 dark:bg-white/5"
                />
                <input
                  type="text"
                  aria-label="Primary color hex"
                  value={values.primaryColor}
                  onChange={(e) =>
                    setValue("primaryColor", e.target.value, { shouldValidate: true })
                  }
                  className="w-32 rounded-lg border border-black/10 bg-white px-3 py-2 font-mono text-sm shadow-sm transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-white/10 dark:bg-white/5"
                />
                <span
                  id="primaryColor-preview"
                  aria-hidden="true"
                  className="inline-flex h-10 flex-1 items-center justify-center rounded-lg text-xs font-semibold text-white shadow-inner"
                  style={{ backgroundColor: values.primaryColor }}
                >
                  Preview
                </span>
              </div>
              {errors.primaryColor && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                  {errors.primaryColor.message}
                </p>
              )}
            </div>

            <div>
              <span className="block text-sm font-medium">Tone of voice</span>
              <div
                role="radiogroup"
                aria-label="Tone of voice"
                aria-invalid={Boolean(errors.tone)}
                className="mt-2 flex flex-wrap gap-2"
              >
                {tones.map((t) => {
                  const selected = values.tone === t;
                  return (
                    <label
                      key={t}
                      className={
                        (selected
                          ? "border-brand-500 bg-brand-50 text-brand-800 dark:border-brand-400 dark:bg-brand-500/15 dark:text-brand-100"
                          : "border-black/10 bg-white text-black/80 hover:border-brand-500/40 dark:border-white/10 dark:bg-white/5 dark:text-white/80") +
                        " inline-flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-medium transition focus-within:ring-2 focus-within:ring-brand-500"
                      }
                    >
                      <input
                        type="radio"
                        value={t}
                        {...register("tone")}
                        checked={selected}
                        onChange={() =>
                          setValue("tone", t as Tone, { shouldValidate: true })
                        }
                        className="sr-only"
                      />
                      {t}
                    </label>
                  );
                })}
              </div>
              {errors.tone && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                  {errors.tone.message}
                </p>
              )}
            </div>
          </fieldset>
        )}

        {step === 2 && (
          <fieldset className="flex flex-col gap-4">
            <legend className="text-2xl font-semibold tracking-tight">
              Pages to generate
            </legend>
            <p className="text-sm text-black/70 dark:text-white/70">
              Pick the pages you want on launch. We&apos;ll ship them with
              semantic HTML, SEO metadata, and responsive layouts.
            </p>

            <ul
              role="list"
              aria-describedby={errors.pages ? "pages-error" : undefined}
              className="grid grid-cols-1 gap-2 sm:grid-cols-2"
            >
              {pageIds.map((id) => {
                const checked = values.pages.includes(id);
                return (
                  <li key={id}>
                    <label
                      className={
                        (checked
                          ? "border-brand-500 bg-brand-50/60 dark:border-brand-400 dark:bg-brand-500/10"
                          : "border-black/10 bg-white hover:border-brand-500/40 dark:border-white/10 dark:bg-white/5") +
                        " flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition focus-within:ring-2 focus-within:ring-brand-500"
                      }
                    >
                      <input
                        type="checkbox"
                        value={id}
                        {...register("pages")}
                        onChange={(e) => {
                          const nextPages: PageId[] = e.target.checked
                            ? Array.from(new Set([...(values.pages ?? []), id]))
                            : (values.pages ?? []).filter((p) => p !== id);
                          setValue("pages", nextPages, { shouldValidate: true });
                        }}
                        checked={checked}
                        className="h-4 w-4 rounded border-black/20 text-brand-600 focus:ring-brand-500 dark:border-white/20"
                      />
                      <span className="font-medium">{pageLabels[id]}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
            {errors.pages && (
              <p id="pages-error" className="text-xs text-red-600 dark:text-red-400">
                {errors.pages.message}
              </p>
            )}
          </fieldset>
        )}

        {step === 3 && (
          <section className="flex flex-col gap-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Review &amp; launch
              </h2>
              <p className="mt-2 text-sm text-black/70 dark:text-white/70">
                Estimated build time: <strong>{formatDuration(estSeconds)}</strong>.
                Submit to start the pipeline.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
                <h3 className="text-sm font-semibold tracking-tight">Summary</h3>
                <dl className="mt-3 space-y-2 text-sm">
                  <div className="flex items-center justify-between gap-2">
                    <dt className="text-black/60 dark:text-white/60">Site type</dt>
                    <dd className="font-medium">{siteTypeLabel}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <dt className="text-black/60 dark:text-white/60">Brand</dt>
                    <dd className="truncate font-medium">{values.brandName}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <dt className="text-black/60 dark:text-white/60">Primary color</dt>
                    <dd className="flex items-center gap-2 font-mono text-xs">
                      <span
                        aria-hidden="true"
                        className="inline-block h-4 w-4 rounded border border-black/10 dark:border-white/10"
                        style={{ backgroundColor: values.primaryColor }}
                      />
                      {values.primaryColor}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <dt className="text-black/60 dark:text-white/60">Tone</dt>
                    <dd className="font-medium">{values.tone}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <dt className="text-black/60 dark:text-white/60">Pages</dt>
                    <dd className="font-medium">
                      {values.pages.map((p) => pageLabels[p]).join(" · ")}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
                <h3 className="text-sm font-semibold tracking-tight">
                  You&apos;ll ship with
                </h3>
                <ul role="list" className="mt-3 space-y-2 text-sm">
                  {checklist.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden="true"
                        className="mt-0.5 h-3.5 w-3.5 flex-none text-emerald-600 dark:text-emerald-400"
                      >
                        <path d="m4 8 3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-black/80 dark:text-white/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {submitError && (
              <p
                role="alert"
                className="rounded-lg border border-red-500/30 bg-red-50 p-3 text-sm text-red-800 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200"
              >
                {submitError}
              </p>
            )}
          </section>
        )}

        <div className="flex items-center justify-between border-t border-black/5 pt-5 dark:border-white/10">
          <button
            type="button"
            onClick={back}
            disabled={step === 0 || submitting}
            className="inline-flex items-center justify-center rounded-lg border border-black/10 bg-white px-4 py-2 text-sm font-medium text-black/80 shadow-sm transition hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10"
          >
            Back
          </button>

          {step < 3 ? (
            <button
              type="button"
              onClick={next}
              className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
            >
              Continue →
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Starting build…" : "Start building →"}
            </button>
          )}
      </div>
    </form>
  );
}
