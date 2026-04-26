import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AI Website Factory",
    short_name: "AI Factory",
    description:
      "Production-ready, SEO-optimized websites built automatically by AI.",
    start_url: "/",
    id: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    lang: "en-US",
    dir: "ltr",
    categories: ["productivity", "developer", "business"],
    background_color: "#ffffff",
    theme_color: "#2640e6",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "Start a new project",
        short_name: "New project",
        description: "Open the four-step wizard and ship a site today.",
        url: "/new",
        icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }],
      },
      {
        name: "Browse templates",
        short_name: "Templates",
        description: "SaaS landing, portfolio, e-commerce, blog, docs.",
        url: "/templates",
        icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }],
      },
      {
        name: "Open the docs",
        short_name: "Docs",
        description: "Quickstart, deploy, extend.",
        url: "/docs",
        icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }],
      },
    ],
  };
}
