import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern your use of the AI Website Factory service.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms of Service | AI Website Factory",
    description:
      "The terms that govern your use of the AI Website Factory service.",
    type: "article",
    url: "/terms",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const lastUpdated = "2026-04-23";

const sections = [
  {
    id: "acceptance",
    heading: "Acceptance of terms",
    body: [
      "By accessing or using AI Website Factory, you agree to be bound by these Terms of Service. If you do not agree, do not use the service.",
    ],
  },
  {
    id: "service",
    heading: "The service",
    body: [
      "AI Website Factory is an autonomous engineering agent that plans, designs, and ships websites on your behalf. The service is provided as-is and evolves over time. Features and availability may change.",
    ],
  },
  {
    id: "accounts",
    heading: "Accounts and eligibility",
    body: [
      "You are responsible for the accuracy of information you provide and for maintaining the confidentiality of account credentials.",
      "The service is not directed to children under 13. By using the service you confirm you are of legal age to enter into these terms.",
    ],
  },
  {
    id: "acceptable-use",
    heading: "Acceptable use",
    body: [
      "You agree not to use the service to create unlawful, infringing, fraudulent, harassing, or harmful content, or to attempt to disrupt the service or access it by automated means outside the documented interfaces.",
    ],
  },
  {
    id: "ownership",
    heading: "Ownership of generated output",
    body: [
      "Subject to your compliance with these terms, content and code generated for you via the service is yours to use. Underlying tooling, templates, and models remain owned by AI Website Factory or its licensors.",
    ],
  },
  {
    id: "fees",
    heading: "Fees and billing",
    body: [
      "Paid plans renew automatically at the cadence shown at checkout. You may cancel anytime; cancellations take effect at the end of the current billing period. Refunds are provided where required by law.",
    ],
  },
  {
    id: "disclaimer",
    heading: "Disclaimer of warranties",
    body: [
      "The service is provided on an as-is and as-available basis without warranties of any kind, whether express or implied, including merchantability, fitness for a particular purpose, and non-infringement.",
    ],
  },
  {
    id: "liability",
    heading: "Limitation of liability",
    body: [
      "To the maximum extent permitted by law, AI Website Factory will not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues.",
    ],
  },
  {
    id: "changes",
    heading: "Changes to these terms",
    body: [
      "We may update these Terms from time to time. Material changes will be announced on this page; continued use of the service after such changes constitutes acceptance.",
    ],
  },
  {
    id: "contact",
    heading: "Contact",
    body: [
      "Questions about these terms? Email legal@ai-website-factory.example.com.",
    ],
  },
];

const siteUrl = "https://ai-website-factory.example.com";

export default function TermsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TermsOfService",
    "@id": `${siteUrl}/terms#termsofservice`,
    name: "Terms of Service",
    description:
      "The terms governing your use of AI Website Factory.",
    url: `${siteUrl}/terms`,
    inLanguage: "en-US",
    isAccessibleForFree: true,
    dateModified: lastUpdated,
    isPartOf: { "@id": `${siteUrl}/#website` },
    publisher: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "AI Website Factory",
    },
  };

  return (
    <>
      <Header />
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <article className="py-16 sm:py-20">
          <div className="container max-w-3xl">
            <header>
              <p className="text-sm font-medium uppercase tracking-wider text-brand-600 dark:text-brand-300">
                Legal
              </p>
              <h1 className="text-balance mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
                Terms of Service
              </h1>
              <p className="mt-4 text-sm text-black/60 dark:text-white/60">
                Last updated{" "}
                <time dateTime={lastUpdated}>
                  {new Date(lastUpdated).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </p>
              <p className="mt-6 text-black/70 dark:text-white/70">
                These terms are provided as a template for reference — review
                with counsel before relying on them in production.
              </p>
            </header>

            <div className="mt-12 space-y-10">
              {sections.map((s) => (
                <section key={s.id} aria-labelledby={s.id}>
                  <h2
                    id={s.id}
                    className="text-xl font-semibold tracking-tight"
                  >
                    {s.heading}
                  </h2>
                  <div className="mt-3 space-y-3 text-base leading-relaxed text-black/80 dark:text-white/80">
                    {s.body.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
