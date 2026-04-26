"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

type Provider = "github" | "google";

const providerLabel: Record<Provider, string> = {
  github: "Continue with GitHub",
  google: "Continue with Google",
};

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.01c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.07 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.6.24 2.78.12 3.07.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.41.35.77 1.04.77 2.11v3.13c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        d="M21.35 11.1h-9.17v2.92h5.28c-.23 1.34-.94 2.47-2 3.23v2.68h3.23c1.89-1.74 2.97-4.3 2.97-7.35 0-.57-.05-1.13-.14-1.68z"
        fill="#4285f4"
      />
      <path
        d="M12.18 21c2.7 0 4.96-.9 6.61-2.44l-3.23-2.68c-.9.6-2.05.96-3.38.96-2.6 0-4.8-1.75-5.59-4.11H3.27v2.76A9 9 0 0 0 12.18 21z"
        fill="#34a853"
      />
      <path
        d="M6.59 12.73c-.2-.6-.32-1.25-.32-1.93s.12-1.33.32-1.93V6.11H3.27A9 9 0 0 0 3 10.8c0 1.44.35 2.8.97 4l2.62-2.07z"
        fill="#fbbc05"
      />
      <path
        d="M12.18 5.77c1.47 0 2.78.5 3.82 1.5l2.86-2.86C17.14 2.87 14.88 2 12.18 2A9 9 0 0 0 3.27 6.11l3.32 2.76c.79-2.36 2.99-4.1 5.59-4.1z"
        fill="#ea4335"
      />
    </svg>
  );
}

export default function LoginForm({ providers }: { providers: Provider[] }) {
  const searchParams = useSearchParams();
  const nextParam = searchParams.get("next");
  const errorParam = searchParams.get("error");
  const callbackUrl = nextParam && nextParam.startsWith("/") ? nextParam : "/dashboard";

  const [pending, setPending] = useState<Provider | null>(null);

  async function onSignIn(id: Provider) {
    setPending(id);
    await signIn(id, { callbackUrl });
  }

  if (providers.length === 0) {
    return (
      <div className="rounded-xl border border-amber-500/30 bg-amber-50 p-5 text-sm text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
        <p className="font-semibold">OAuth isn&apos;t configured yet.</p>
        <p className="mt-1">
          Copy <code className="rounded bg-amber-100 px-1 font-mono text-xs dark:bg-amber-500/20">.env.example</code>{" "}
          to <code className="rounded bg-amber-100 px-1 font-mono text-xs dark:bg-amber-500/20">.env.local</code>,
          add your GitHub and/or Google client credentials, then restart the dev server.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {errorParam && (
        <p
          role="alert"
          className="rounded-lg border border-red-500/30 bg-red-50 p-3 text-sm text-red-800 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200"
        >
          Something went wrong while signing in. Please try again.
        </p>
      )}

      {providers.includes("github") && (
        <button
          type="button"
          onClick={() => onSignIn("github")}
          disabled={pending !== null}
          className="inline-flex w-full items-center justify-center gap-3 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-neutral-100"
        >
          <GitHubIcon />
          {pending === "github" ? "Redirecting…" : providerLabel.github}
        </button>
      )}

      {providers.includes("google") && (
        <button
          type="button"
          onClick={() => onSignIn("google")}
          disabled={pending !== null}
          className="inline-flex w-full items-center justify-center gap-3 rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm font-medium text-black/80 shadow-sm transition hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10"
        >
          <GoogleIcon />
          {pending === "google" ? "Redirecting…" : providerLabel.google}
        </button>
      )}

      <p className="pt-2 text-center text-xs text-black/60 dark:text-white/60">
        By continuing, you agree to our{" "}
        <Link href="/terms" className="underline underline-offset-2">
          Terms
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline underline-offset-2">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
