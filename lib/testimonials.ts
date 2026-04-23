export type PreviewTemplateId =
  | "saas-landing"
  | "portfolio"
  | "ecommerce"
  | "blog"
  | "docs";

export type Review = {
  id: string;
  name: string;
  title: string;
  avatarSeed: string;
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
  caseStudySlug?: string;
};

export type CaseStudy = {
  slug: string;
  company: string;
  reviewId: string;
  tagline: string;
  summary: string;
  siteUrl: string;
  metrics: {
    timeToLaunch: string;
    lighthouseBefore: number;
    lighthouseAfter: number;
    extra: { label: string; value: string }[];
  };
  body: string[];
  previewTemplate: PreviewTemplateId;
};

export const summary = {
  averageRating: 4.9,
  totalReviews: 320,
};

export const reviews: Review[] = [
  {
    id: "r1",
    name: "Amelia Chen",
    title: "Head of Growth, Northwind",
    avatarSeed: "amelia-chen",
    quote:
      "We shipped our marketing site in an afternoon. The agent handled layout, copy, and SEO — we just reviewed the PR.",
    rating: 5,
    caseStudySlug: "northwind",
  },
  {
    id: "r2",
    name: "Rafael Ortiz",
    title: "Staff Engineer, Helix Labs",
    avatarSeed: "rafael-ortiz",
    quote:
      "The output looked like it came from a senior front-end engineer. Clean Tailwind, accessible markup, perfect Lighthouse scores.",
    rating: 5,
    caseStudySlug: "helix-labs",
  },
  {
    id: "r3",
    name: "Priya Natarajan",
    title: "Founder, Studiolane",
    avatarSeed: "priya-natarajan",
    quote:
      "What sold me was the continuous loop. It keeps iterating — a day later the site was noticeably tighter than when I left it.",
    rating: 5,
    caseStudySlug: "studiolane",
  },
  {
    id: "r4",
    name: "Omar Haddad",
    title: "Product, Orbital",
    avatarSeed: "omar-haddad",
    quote:
      "Swap our designer? No. But it writes the first pass I actually want to review — which is more than I can say for the last three tools we tried.",
    rating: 5,
  },
  {
    id: "r5",
    name: "Sophie Laurent",
    title: "Founder, Meridian Journal",
    avatarSeed: "sophie-laurent",
    quote:
      "We moved our newsletter and archive over in a weekend. The MDX pipeline just worked.",
    rating: 5,
  },
  {
    id: "r6",
    name: "Takumi Saito",
    title: "Engineering Manager, Kestrel",
    avatarSeed: "takumi-saito",
    quote:
      "The part I didn't expect: reading the PRs actually teaches the team something. It writes better comments than we do.",
    rating: 4,
  },
  {
    id: "r7",
    name: "Mara Kovač",
    title: "Design Lead, Telos",
    avatarSeed: "mara-kovac",
    quote:
      "The defaults are opinionated in the right places. Accessibility is handled, focus rings are on, dark mode works on day one.",
    rating: 5,
  },
  {
    id: "r8",
    name: "Nikolai Petrov",
    title: "Solo founder",
    avatarSeed: "nikolai-petrov",
    quote:
      "I'm not a designer. The sites I get out of this are unironically better than what I was paying for before.",
    rating: 5,
  },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "northwind",
    company: "Northwind",
    reviewId: "r1",
    tagline: "How Northwind launched their SaaS landing page in 4 hours.",
    summary:
      "A five-person growth team replaced two weeks of design back-and-forth with a single review cycle.",
    siteUrl: "northwind.example.com",
    metrics: {
      timeToLaunch: "4 hours",
      lighthouseBefore: 72,
      lighthouseAfter: 99,
      extra: [
        { label: "Pages shipped", value: "6" },
        { label: "Design rounds", value: "1" },
        { label: "Engineering hours saved", value: "~40" },
      ],
    },
    body: [
      "Northwind's marketing site was overdue for a rebuild. The existing page carried years of accumulated drift — inconsistent spacing, missing metadata, a weak mobile story. The team had a two-week rebuild quote from an agency and a single week of engineering capacity before a launch window.",
      "Instead, they shipped a brief — three sentences and a logo — and let the agent take the first pass. The generated site came back with a hero, features, pricing, testimonials, FAQ, and a contact form, all wired with Open Graph metadata, JSON-LD, and mobile-first layouts.",
      "The only thing the team had to do was review the PR: swap two words in the hero, drop one feature card, and approve. Lighthouse went from 72 to 99 overnight. They shipped in four hours.",
    ],
    previewTemplate: "saas-landing",
  },
  {
    slug: "helix-labs",
    company: "Helix Labs",
    reviewId: "r2",
    tagline: "Helix Labs replaced their static docs portal with an MDX site.",
    summary:
      "A docs site built and deployed in a morning, with versioned sidebars and search out of the box.",
    siteUrl: "docs.helixlabs.example.com",
    metrics: {
      timeToLaunch: "1 morning",
      lighthouseBefore: 81,
      lighthouseAfter: 100,
      extra: [
        { label: "MDX pages migrated", value: "34" },
        { label: "Build time", value: "48s" },
        { label: "Bundle reduction", value: "−62%" },
      ],
    },
    body: [
      "Helix Labs had a docs portal that was good enough at launch and gradually became a maintenance drag. The search never worked, the sidebar drifted out of sync, and the sitemap hadn't been regenerated in months.",
      "The agent scaffolded a new docs site in Next.js, wired the full MDX pipeline, pulled the thirty-four existing pages into frontmatter, and regenerated the sitemap and RSS on every commit. The new site ships with versioned sidebars, code-block typography, and a sticky table of contents.",
      "Perfect Lighthouse across the board, a 62% smaller bundle, and — crucially — the team no longer edits two copies of the navigation.",
    ],
    previewTemplate: "docs",
  },
  {
    slug: "studiolane",
    company: "Studiolane",
    reviewId: "r3",
    tagline: "Studiolane's portfolio runs the autonomous loop day and night.",
    summary:
      "A solo design studio using continuous iteration to keep the site tighter than any quarterly refresh.",
    siteUrl: "studiolane.example.com",
    metrics: {
      timeToLaunch: "2 hours",
      lighthouseBefore: 88,
      lighthouseAfter: 100,
      extra: [
        { label: "PRs merged", value: "24 / mo" },
        { label: "Time-to-first-update", value: "< 1 day" },
        { label: "Image CLS", value: "0.00" },
      ],
    },
    body: [
      "Studiolane is a one-person operation. Priya doesn't have time to babysit a site — she has client work to ship. The agent handles the between-client polish: adding new case studies as MDX files, rotating the hero, tightening copy, updating the OG cards.",
      "Reviewing the PRs takes her about ten minutes a day. The site ends up cleaner at the end of the week than it started. No quarterly rebuild, no frozen backlog.",
      "Lighthouse at 100 across every page, zero image layout shift, and a portfolio that actually feels alive.",
    ],
    previewTemplate: "portfolio",
  },
];

export function getReview(id: string): Review | undefined {
  return reviews.find((r) => r.id === id);
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
