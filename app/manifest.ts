import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AI Website Factory",
    short_name: "AI Factory",
    description:
      "Production-ready, SEO-optimized websites built automatically by AI.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2640e6",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
