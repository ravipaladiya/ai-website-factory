import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export const metadata = {
  title: "Settings",
  robots: { index: false, follow: false },
};

const sections = [
  {
    title: "Profile",
    summary: "Display name, email, and avatar.",
  },
  {
    title: "Preferences",
    summary: "Theme, default framework, and editor.",
  },
  {
    title: "Notifications",
    summary: "Build status, weekly digest, security alerts.",
  },
  {
    title: "API tokens",
    summary: "Create + revoke tokens for the agent CLI.",
  },
];

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login?next=/dashboard/settings");

  return (
    <div>
      <p className="text-sm text-black/60 dark:text-white/60">
        Account and workspace preferences.
      </p>

      <section
        aria-labelledby="account-heading"
        className="mt-8 rounded-2xl border border-black/5 bg-white/70 p-6 shadow-sm dark:border-white/10 dark:bg-white/5"
      >
        <h3 id="account-heading" className="text-base font-semibold tracking-tight">
          Account
        </h3>
        <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <dt className="text-xs uppercase tracking-wider text-black/55 dark:text-white/55">
              Name
            </dt>
            <dd className="mt-1 text-sm font-medium">
              {session.user.name ?? "—"}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-black/55 dark:text-white/55">
              Email
            </dt>
            <dd className="mt-1 truncate text-sm font-medium">
              {session.user.email ?? "—"}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-black/55 dark:text-white/55">
              Plan
            </dt>
            <dd className="mt-1 text-sm font-medium">
              {session.user.plan ?? "Starter"}
            </dd>
          </div>
        </dl>
      </section>

      <ul role="list" className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {sections.map((s) => (
          <li
            key={s.title}
            className="rounded-2xl border border-dashed border-black/10 bg-white/50 p-5 text-sm dark:border-white/10 dark:bg-white/5"
          >
            <p className="font-semibold tracking-tight">{s.title}</p>
            <p className="mt-1 text-black/65 dark:text-white/65">{s.summary}</p>
            <p className="mt-3 inline-flex items-center rounded-full bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium text-amber-800 ring-1 ring-inset ring-amber-500/20 dark:text-amber-200 dark:ring-amber-400/20">
              Coming soon
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
