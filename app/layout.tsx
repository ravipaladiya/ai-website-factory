import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers";
import ScrollToTop from "@/components/ScrollToTop";
import SkipToContent from "@/components/SkipToContent";
import ThemeScript from "@/components/ThemeScript";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const siteUrl = "https://ai-website-factory.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AI Website Factory — Production-Ready Sites, Built by AI",
    template: "%s | AI Website Factory",
  },
  description:
    "AI Website Factory designs, builds, and ships production-ready, SEO-optimized websites automatically. Modern stack, responsive by default.",
  keywords: [
    "AI website builder",
    "Next.js",
    "autonomous agent",
    "production-ready",
    "SEO",
    "responsive design",
  ],
  authors: [{ name: "AI Website Factory" }],
  creator: "AI Website Factory",
  publisher: "AI Website Factory",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "AI Website Factory",
    title: "AI Website Factory — Production-Ready Sites, Built by AI",
    description:
      "Autonomous senior engineering agent that plans, designs, codes, tests, and ships modern websites.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Website Factory",
    description:
      "Production-ready, SEO-optimized websites built automatically by AI.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
  },
  manifest: "/manifest.webmanifest",
  category: "technology",
  applicationName: "AI Website Factory",
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "AI Website Factory",
      url: siteUrl,
      logo: `${siteUrl}/favicon.svg`,
      // Same description used by the AboutPage's mainEntity Organization
      // node (app/about/page.tsx) so any consumer that ingests the
      // canonical Organization @id sees the same brand pitch.
      description:
        "Autonomous engineering agent that plans, designs, codes, tests, and ships modern websites.",
      slogan:
        "Production-ready websites, planned, designed, and shipped by AI. One PR at a time.",
      // sameAs ties this Organization entity to its external profiles so
      // search engines can build a Knowledge Graph node for the brand.
      // Discord/Twitter URLs in the footer are still placeholders, so only
      // the canonical GitHub repo is listed here for now.
      sameAs: ["https://github.com/ravipaladiya/ai-website-factory"],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "AI Website Factory",
      // Match the <meta name="description"> on the home page so the
      // WebSite entity carries the same one-line pitch the rest of the
      // SEO surface advertises.
      description:
        "AI Website Factory designs, builds, and ships production-ready, SEO-optimized websites automatically. Modern stack, responsive by default.",
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "en-US",
    },
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#08090f" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <ThemeScript />
        {/* Pre-warm the connection used by testimonial avatars on the home
            page Testimonials section and the /testimonials masonry. dicebear
            is a third-party SVG host, so a TLS+TCP handshake before the
            <img> requests fire shaves real time off the visible avatar grid.
            preconnect + dns-prefetch is the standard fallback pair. */}
        <link
          rel="preconnect"
          href="https://api.dicebear.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://api.dicebear.com" />
        {/* Site-wide RSS discovery: kept as raw <link> tags so per-page
            metadata.alternates (which replaces the parent's alternates
            wholesale in Next.js) doesn't clobber feed discovery. */}
        <link
          rel="alternate"
          type="application/rss+xml"
          href="/rss.xml"
          title="AI Website Factory — Blog"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          href="/changelog/feed.xml"
          title="AI Website Factory — Changelog"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen font-sans">
        <SkipToContent />
        <Providers>
          {children}
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}
