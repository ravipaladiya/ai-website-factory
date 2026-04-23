import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import ScrollToTop from "@/components/ScrollToTop";
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
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "AI Website Factory",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white focus:shadow-lg focus:outline-none"
        >
          Skip to content
        </a>
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
