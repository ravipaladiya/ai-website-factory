import type { Plan } from "@/lib/auth";
import UserMenu from "./UserMenu";

type Props = {
  title: string;
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    plan: Plan;
  };
};

export default function Topbar({ title, user }: Props) {
  return (
    <header className="sticky top-0 z-30 border-b border-black/5 bg-white/70 backdrop-blur-md dark:border-white/10 dark:bg-black/40">
      <div className="flex h-14 items-center gap-3 px-4 sm:px-6">
        <h1 className="flex-1 truncate text-base font-semibold tracking-tight">
          {title}
        </h1>

        <span
          aria-label={`Current plan: ${user.plan}`}
          className="hidden items-center gap-1.5 rounded-full border border-brand-500/20 bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-800 sm:inline-flex dark:border-brand-400/20 dark:bg-brand-500/10 dark:text-brand-100"
        >
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-brand-500"
          />
          {user.plan}
        </span>

        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm transition hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
        >
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-4 w-4">
            <path
              d="M10 4v12M4 10h12"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          </svg>
          <span className="hidden sm:inline">New Project</span>
          <span className="sm:hidden">New</span>
        </button>

        <UserMenu
          name={user.name}
          email={user.email}
          image={user.image}
          plan={user.plan}
        />
      </div>
    </header>
  );
}
