import { z } from "zod";

export const siteTypes = [
  {
    id: "saas-landing",
    label: "SaaS Landing Page",
    description: "Hero, features, pricing, social proof, CTA.",
  },
  {
    id: "portfolio",
    label: "Portfolio",
    description: "Editorial layout for individual work or a studio.",
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    description: "Product grid, detail pages, and checkout.",
  },
  {
    id: "blog",
    label: "Blog",
    description: "Long-form content with sitemap, RSS, and SEO metadata.",
  },
  {
    id: "docs",
    label: "Docs Site",
    description: "MDX-powered docs with versioned sidebars and search.",
  },
] as const;

export type SiteTypeId = (typeof siteTypes)[number]["id"];

export const siteTypeIds = siteTypes.map((t) => t.id) as [
  SiteTypeId,
  ...SiteTypeId[],
];

export const tones = ["Professional", "Friendly", "Bold"] as const;
export type Tone = (typeof tones)[number];

export const pageIds = ["home", "about", "pricing", "blog", "contact"] as const;
export type PageId = (typeof pageIds)[number];

export const pageLabels: Record<PageId, string> = {
  home: "Home",
  about: "About",
  pricing: "Pricing",
  blog: "Blog",
  contact: "Contact",
};

const hexColor = z
  .string()
  .regex(/^#[0-9a-fA-F]{6}$/, "Pick a 6-digit hex color (e.g. #3b5bff)");

export const siteTypeStepSchema = z.object({
  siteType: z.enum(siteTypeIds, {
    message: "Choose a site type",
  }),
});

export const brandStepSchema = z.object({
  brandName: z
    .string()
    .trim()
    .min(2, "Brand name must be at least 2 characters")
    .max(60, "Keep it under 60 characters"),
  primaryColor: hexColor,
  tone: z.enum(tones, { message: "Pick a tone of voice" }),
});

export const pagesStepSchema = z.object({
  pages: z.array(z.enum(pageIds)).min(1, "Pick at least one page to generate"),
});

export const projectInputSchema = siteTypeStepSchema
  .and(brandStepSchema)
  .and(pagesStepSchema);

export type ProjectInput = z.infer<typeof projectInputSchema>;

export const defaultProjectInput: ProjectInput = {
  siteType: "saas-landing",
  brandName: "",
  primaryColor: "#3b5bff",
  tone: "Professional",
  pages: ["home"],
};

export function estimateBuildSeconds(input: ProjectInput): number {
  const base = 10;
  const perPage = 3;
  const typeBonus =
    input.siteType === "ecommerce" || input.siteType === "docs" ? 6 : 0;
  return base + input.pages.length * perPage + typeBonus;
}

export function featureChecklist(input: ProjectInput): string[] {
  const items = [
    "Responsive Next.js 14 scaffold",
    "Tailwind design tokens seeded with your primary color",
    "Semantic HTML with landmark regions",
    "Open Graph & Twitter metadata",
    "Sitemap.xml and robots.txt",
    "Lighthouse-passing defaults",
  ];
  if (input.pages.includes("blog")) {
    items.push("Blog index + post route with Article JSON-LD + RSS feed");
  }
  if (input.pages.includes("contact")) {
    items.push("Validated contact form with accessible error states");
  }
  if (input.pages.includes("pricing")) {
    items.push("Pricing tiers with SoftwareApplication JSON-LD");
  }
  if (input.siteType === "ecommerce") {
    items.push("Product catalog schema and cart scaffolding");
  }
  if (input.siteType === "docs") {
    items.push("MDX routing with versioned sidebar");
  }
  return items;
}
