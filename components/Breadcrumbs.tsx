import Link from "next/link";

export type Crumb = {
  label: string;
  href?: string;
};

const siteUrl = "https://ai-website-factory.example.com";

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${siteUrl}${item.href}` } : {}),
    })),
  };

  return (
    <nav aria-label="Breadcrumb">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ol
        role="list"
        className="flex flex-wrap items-center gap-1 text-sm text-black/60 dark:text-white/60"
      >
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-1">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="rounded transition hover:text-black focus:outline-none focus-visible:text-brand-700 dark:hover:text-white dark:focus-visible:text-brand-300"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={
                    isLast
                      ? "text-black/90 dark:text-white/90"
                      : undefined
                  }
                >
                  {item.label}
                </span>
              )}

              {!isLast && (
                <span aria-hidden="true" className="text-black/30 dark:text-white/30">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
