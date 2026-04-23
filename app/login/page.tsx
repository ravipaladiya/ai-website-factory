import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions, providerIds } from "@/lib/auth";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to AI Website Factory.",
  alternates: { canonical: "/login" },
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: { next?: string };
}) {
  const session = await getServerSession(authOptions);

  if (session) {
    const next =
      searchParams?.next && searchParams.next.startsWith("/")
        ? searchParams.next
        : "/dashboard";
    redirect(next);
  }

  const providers = providerIds();

  return (
    <main
      id="main"
      className="flex min-h-screen items-center justify-center px-6 py-12"
    >
      <div className="w-full max-w-sm">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-semibold tracking-tight"
          aria-label="AI Website Factory home"
        >
          <span
            aria-hidden="true"
            className="inline-block h-7 w-7 rounded-md bg-gradient-to-br from-brand-400 to-brand-700 shadow-sm"
          />
          <span>AI Website Factory</span>
        </Link>

        <h1 className="mt-10 text-2xl font-semibold tracking-tight sm:text-3xl">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-black/70 dark:text-white/70">
          Sign in to continue to your dashboard.
        </p>

        <div className="mt-8">
          <Suspense fallback={<div className="h-12" />}>
            <LoginForm providers={providers} />
          </Suspense>
        </div>

        <p className="mt-10 text-center text-xs text-black/50 dark:text-white/50">
          <Link href="/" className="hover:text-black/80 dark:hover:text-white/80">
            ← Back to home
          </Link>
        </p>
      </div>
    </main>
  );
}
