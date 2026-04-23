import Link from "next/link";

const footerLinks = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "How it works", href: "#how-it-works" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/5 py-14 dark:border-white/10">
      <div className="container grid grid-cols-2 gap-10 sm:grid-cols-4">
        <div className="col-span-2 sm:col-span-1">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold tracking-tight"
          >
            <span
              aria-hidden="true"
              className="inline-block h-7 w-7 rounded-md bg-gradient-to-br from-brand-400 to-brand-700"
            />
            <span>AI Website Factory</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm text-black/60 dark:text-white/60">
            Production-ready websites, planned, designed, and shipped by AI.
          </p>
        </div>

        {footerLinks.map((group) => (
          <div key={group.heading}>
            <h3 className="text-sm font-semibold tracking-tight">
              {group.heading}
            </h3>
            <ul className="mt-4 space-y-2">
              {group.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-black/60 transition hover:text-black dark:text-white/60 dark:hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="container mt-10 flex flex-col items-start justify-between gap-4 border-t border-black/5 pt-6 text-xs text-black/50 sm:flex-row sm:items-center dark:border-white/10 dark:text-white/50">
        <p>© {year} AI Website Factory. All rights reserved.</p>
        <p>Built autonomously with Next.js, TypeScript, and Tailwind CSS.</p>
      </div>
    </footer>
  );
}
