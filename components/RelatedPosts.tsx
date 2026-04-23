import Link from "next/link";
import { getRelatedPosts } from "@/lib/posts";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function RelatedPosts({ currentSlug }: { currentSlug: string }) {
  const related = getRelatedPosts(currentSlug);
  if (related.length === 0) return null;

  return (
    <aside
      aria-labelledby="related-heading"
      className="mt-16 border-t border-black/5 pt-10 dark:border-white/10"
    >
      <h2
        id="related-heading"
        className="text-xl font-semibold tracking-tight"
      >
        Keep reading
      </h2>

      <ul
        role="list"
        className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
      >
        {related.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group block rounded-2xl border border-black/5 bg-white/70 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-500/30 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:border-white/10 dark:bg-white/5 dark:hover:border-brand-500/30"
            >
              <p className="flex items-center gap-2 text-xs text-black/60 dark:text-white/60">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span aria-hidden="true">·</span>
                <span>{post.readingTime}</span>
              </p>
              <h3 className="mt-2 text-base font-semibold tracking-tight text-black/90 transition group-hover:text-brand-700 dark:text-white/90 dark:group-hover:text-brand-300">
                {post.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-black/70 dark:text-white/70">
                {post.description}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-600 dark:text-brand-300">
                Read <span aria-hidden="true">→</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
