export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-screen items-center justify-center"
    >
      <span className="sr-only">Loading…</span>
      <div
        aria-hidden="true"
        className="h-10 w-10 animate-spin rounded-full border-2 border-black/10 border-t-brand-600 dark:border-white/10 dark:border-t-brand-300"
      />
    </div>
  );
}
