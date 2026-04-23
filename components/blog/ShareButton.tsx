"use client";

export default function ShareButton({
  title,
  url,
}: {
  title: string;
  url: string;
}) {
  const text = encodeURIComponent(title);
  const u = encodeURIComponent(url);
  const href = `https://twitter.com/intent/tweet?text=${text}&url=${u}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-lg border border-black/10 bg-white px-3 py-1.5 text-xs font-medium text-black/80 shadow-sm transition hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:border-white/10 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-3.5 w-3.5">
        <path d="M18.244 2h3.308l-7.227 8.26L23 22h-6.828l-5.346-6.99L4.7 22H1.39l7.73-8.835L1 2h6.994l4.833 6.39L18.244 2zm-1.16 18h1.834L7.01 3.885H5.04L17.084 20z" />
      </svg>
      Share on X
    </a>
  );
}
