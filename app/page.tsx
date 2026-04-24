import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StatsBanner from "@/components/StatsBanner";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Integrations from "@/components/Integrations";
import Pricing from "@/components/Pricing";
import RoiCalculator from "@/components/RoiCalculator";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { summary as reviewSummary } from "@/lib/testimonials";

const siteUrl = "https://ai-website-factory.example.com";

const softwareApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AI Website Factory",
  url: siteUrl,
  description:
    "Autonomous engineering agent that plans, designs, builds, tests, and ships production-ready websites.",
  applicationCategory: "WebApplication",
  operatingSystem: "Any (browser-based)",
  offers: [
    {
      "@type": "Offer",
      name: "Starter",
      price: "0",
      priceCurrency: "USD",
    },
    {
      "@type": "Offer",
      name: "Studio",
      price: "29",
      priceCurrency: "USD",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: reviewSummary.averageRating.toFixed(1),
    reviewCount: reviewSummary.totalReviews,
    bestRating: 5,
    worstRating: 1,
  },
  publisher: {
    "@type": "Organization",
    name: "AI Website Factory",
    url: siteUrl,
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationJsonLd),
        }}
      />
      <Header />
      <main id="main">
        <Hero />
        <StatsBanner />
        <Features />
        <HowItWorks />
        <Integrations />
        <Pricing />
        <RoiCalculator />
        <Testimonials />
        <FAQ />
        <CTA />
        <Newsletter />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
