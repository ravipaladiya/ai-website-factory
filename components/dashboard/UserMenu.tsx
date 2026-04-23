"use client";

import { signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Plan } from "@/lib/auth";

type Props = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  plan: Plan;
};

function Avatar({ name, image }: { name?: string | null; image?: string | null }) {
  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image}
        alt=""
        className="h-8 w-8 rounded-full border border-black/10 object-cover dark:border-white/10"
        referrerPolicy="no-referrer"
      />
    );
  }

  const initials = (name ?? "AI")
    .split(" ")
    .map((s) => s[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700 text-[11px] font-semibold text-white">
      {initials}
    </span>
  );
}

export default function UserMenu({ name, email, image, plan }: Props) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    function onDocClick(e: MouseEvent) {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) setOpen(false);
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Open account menu"
        className="flex items-center gap-2 rounded-full border border-transparent p-0.5 transition hover:border-black/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:hover:border-white/10"
      >
        <Avatar name={name} image={image} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-60 overflow-hidden rounded-xl border border-black/10 bg-white shadow-lg ring-1 ring-black/5 dark:border-white/10 dark:bg-[#0b0e1a] dark:ring-white/10"
        >
          <div className="border-b border-black/5 p-3 dark:border-white/10">
            <p className="truncate text-sm font-medium">{name ?? "Signed in"}</p>
            {email && (
              <p className="mt-0.5 truncate text-xs text-black/60 dark:text-white/60">
                {email}
              </p>
            )}
            <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-brand-500/20 bg-brand-50 px-2 py-0.5 text-[11px] font-medium text-brand-800 dark:border-brand-400/20 dark:bg-brand-500/10 dark:text-brand-100">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden="true" />
              {plan} plan
            </span>
          </div>
          <div className="py-1" role="none">
            <Link
              href="/dashboard/settings"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="block px-3 py-2 text-sm text-black/80 hover:bg-black/5 dark:text-white/80 dark:hover:bg-white/5"
            >
              Settings
            </Link>
            <Link
              href="/dashboard/billing"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="block px-3 py-2 text-sm text-black/80 hover:bg-black/5 dark:text-white/80 dark:hover:bg-white/5"
            >
              Billing
            </Link>
            <button
              type="button"
              role="menuitem"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="block w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
