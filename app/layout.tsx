import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
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
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}
