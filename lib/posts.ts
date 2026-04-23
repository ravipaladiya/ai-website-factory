export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  readingTime: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "the-seo-checklist-for-ai-built-sites",
    title: "The SEO checklist for AI-built sites",
    description:
      "The concrete set of signals — metadata, structured data, and performance — that every AI-generated site should ship with on day one.",
    date: "2026-04-23",
    author: "AI Website Factory",
    readingTime: "5 min read",
    body: [
      "AI can design a beautiful hero in seconds, but the difference between a demo and a site that ranks is a long list of small, mechanical things. Skip any of them and you leak traffic quietly for months. The good news: once you automate the checklist, you never think about it again.",
      "Start with the fundamentals. Every page needs a unique, intent-matching title and meta description, a canonical URL, Open Graph and Twitter card metadata, and a viewport tag. These aren't optional — they're what determines how your site appears in SERPs, Slack previews, and iMessage. An AI-built site should generate them by default, not as a post-launch task.",
      "Then the structure. A single H1 per page, a logical heading hierarchy, semantic landmarks (header / nav / main / footer), and descriptive link text. Screen readers rely on the same cues that Google does. Respect the structure and you get accessibility and SEO in the same patch.",
      "Add structured data. JSON-LD for Organization and WebSite in the layout gives crawlers a canonical brand identity. BreadcrumbList on deep pages, FAQPage where you have Q&A, Article on blog posts, and SoftwareApplication or Product where appropriate — each is a chance to show up in rich results.",
      "Don't forget the boring wiring: sitemap.xml with lastModified timestamps, robots.txt, an RSS feed if you publish, and a manifest.webmanifest for PWA hints. Submit your sitemap to Google Search Console once and forget it.",
      "Finally, performance. Core Web Vitals are a ranking factor and a user-experience one. Ship responsive images with width/height to prevent layout shift, lazy-load anything below the fold, preload critical fonts with font-display: swap, minimise third-party JavaScript, and cache aggressively. An AI-built site has no excuse to ship a low Lighthouse score — the defaults are the defaults.",
      "None of this is glamorous. All of it compounds. An autonomous agent earns its keep by never skipping the unglamorous.",
    ],
  },
  {
    slug: "shipping-production-ready-websites-with-ai",
    title: "Shipping production-ready websites with AI",
    description:
      "How the AI Website Factory loop turns a rough brief into a deployable Next.js site — and keeps iterating after launch.",
    date: "2026-04-20",
    author: "AI Website Factory",
    readingTime: "4 min read",
    body: [
      "Most AI-generated websites stop at the demo. A hero, a few sections, a screenshot — then a human has to wire up SEO, responsiveness, analytics, deploys, and everything else that actually makes a site production-grade. The gap between a generated page and a shippable product is where teams quietly burn their gains back.",
      "We built AI Website Factory around a different idea: treat the AI as an autonomous senior engineer, not a component generator. The agent owns the full loop — plan, design, code, build, lint, test, ship — and it keeps iterating until every quality gate passes. If a build fails, the agent debugs it. If Lighthouse flags layout shift, the agent fixes it. If a nav link points nowhere, the agent builds the missing section.",
      "The stack matters less than the discipline. Every site is Next.js with the App Router, TypeScript, and Tailwind, but the real product is the process: mobile-first layouts by default, semantic HTML, Open Graph metadata, sitemap and robots, JSON-LD structured data, accessible focus states, and reduced-motion support — checked in from the first commit.",
      "The loop doesn't stop after launch. The agent continues to analyze the live site, propose improvements, open pull requests, run CI, and iterate. You review diffs instead of writing them. That's the shift: AI shouldn't just build your site once. It should be the team that maintains it.",
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return posts.map((p) => p.slug);
}
