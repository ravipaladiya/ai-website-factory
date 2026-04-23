const faqs = [
  {
    q: "What is AI Website Factory?",
    a: "AI Website Factory is an autonomous engineering agent that plans, designs, builds, tests, and ships production-ready websites end-to-end. It iterates on its own output until builds, lint, and quality gates pass.",
  },
  {
    q: "What tech stack does the generated site use?",
    a: "Every site uses Next.js (App Router), TypeScript, and Tailwind CSS. Pages are statically rendered by default for best performance and SEO, with server components where dynamic data is needed.",
  },
  {
    q: "Is the output SEO-friendly out of the box?",
    a: "Yes. Every site ships with semantic HTML, Open Graph and Twitter metadata, a generated sitemap.xml and robots.txt, canonical URLs, and responsive viewport configuration from the first commit.",
  },
  {
    q: "Is it responsive?",
    a: "All layouts are designed mobile-first and tested across phone, tablet, and desktop breakpoints. Interactive elements meet WCAG touch-target guidance and provide visible focus states.",
  },
  {
    q: "Do I own the code?",
    a: "Yes. Every project is a normal Git repository you fully own. You can inspect every line, run it locally, deploy it anywhere, and continue editing manually at any time.",
  },
  {
    q: "Can I deploy it anywhere?",
    a: "Yes. The generated Next.js app runs on Vercel, Netlify, Cloudflare, AWS, and any Node-compatible host. No vendor lock-in.",
  },
];

export default function FAQ() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="border-t border-black/5 py-20 sm:py-28 dark:border-white/10"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-brand-600 dark:text-brand-300">
            FAQ
          </p>
          <h2
            id="faq-heading"
            className="text-balance mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Frequently asked questions
          </h2>
          <p className="mt-4 text-black/70 dark:text-white/70">
            Everything you need to know before shipping your first site.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-black/5 rounded-2xl border border-black/5 bg-white/70 dark:divide-white/10 dark:border-white/10 dark:bg-white/5">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group px-5 py-4 sm:px-6 sm:py-5 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-base font-medium tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 rounded-md">
                <span>{f.q}</span>
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                  className="h-5 w-5 flex-none text-black/50 transition-transform duration-200 group-open:rotate-180 dark:text-white/50"
                >
                  <path
                    d="m5 7 5 5 5-5"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-black/70 dark:text-white/70">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
