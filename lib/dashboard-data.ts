export type ProjectStatus = "Building" | "Live" | "Failed";

export type Project = {
  id: string;
  name: string;
  domain: string;
  description: string;
  status: ProjectStatus;
  updatedAt: string;
  framework: "Next.js" | "Astro" | "Remix";
};

export const projects: Project[] = [
  {
    id: "proj_01",
    name: "Verdant Shop",
    domain: "verdant-shop.vercel.app",
    description: "Boutique e-commerce for a plant-based skincare line.",
    status: "Live",
    updatedAt: "2026-04-22T10:12:00Z",
    framework: "Next.js",
  },
  {
    id: "proj_02",
    name: "Pulseboard",
    domain: "pulseboard.vercel.app",
    description: "SaaS landing page with pricing and product tour.",
    status: "Live",
    updatedAt: "2026-04-21T15:47:00Z",
    framework: "Next.js",
  },
  {
    id: "proj_03",
    name: "Maya Portfolio",
    domain: "maya-portfolio.vercel.app",
    description: "Editorial portfolio for a visual designer.",
    status: "Building",
    updatedAt: "2026-04-23T09:03:00Z",
    framework: "Astro",
  },
  {
    id: "proj_04",
    name: "Orbital Docs",
    domain: "orbital-docs.vercel.app",
    description: "Documentation portal with MDX and versioned sidebars.",
    status: "Building",
    updatedAt: "2026-04-23T11:50:00Z",
    framework: "Next.js",
  },
  {
    id: "proj_05",
    name: "Kestrel Events",
    domain: "kestrel.vercel.app",
    description: "Ticketed events micro-site with a stripe checkout flow.",
    status: "Failed",
    updatedAt: "2026-04-22T22:19:00Z",
    framework: "Remix",
  },
  {
    id: "proj_06",
    name: "Meridian Journal",
    domain: "meridian-journal.vercel.app",
    description: "Long-form publication with newsletter integration.",
    status: "Live",
    updatedAt: "2026-04-20T08:35:00Z",
    framework: "Next.js",
  },
];
