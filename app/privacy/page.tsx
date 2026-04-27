import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How AI Website Factory collects, uses, and protects your information.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy | AI Website Factory",
    description:
      "How AI Website Factory collects, uses, and protects your information.",
    type: "article",
    url: "/privacy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const lastUpdated = "2026-04-23";

const sections = [
  {
    id: "information-we-collect",
    heading: "Information we collect",
    body: [
      "We collect information you provide directly, including your name, email address, and any messages you send via our contact or newsletter forms.",
      "We also collect technical information automatically, including your IP address, browser type, and pages visited. This information is used to operate and improve the service.",
    ],
  },
  {
    id: "how-we-use-information",
    heading: "How we use information",
    body: [
      "We use collected information to operate the service, respond to your requests, send transactional email, and improve product quality. We do not sell personal information.",
    ],
  },
  {
    id: "cookies",
    heading: "Cookies and local storage",
    body: [
      "We use essential cookies and browser local storage to remember your theme preference and to operate session state. We do not use tracking or advertising cookies.",
    ],
  },
  {
    id: "data-sharing",
    heading: "Sharing with service providers",
    body: [
      "We may share information with trusted processors (hosting, email, analytics) acting under contractual data-protection obligations. Each processor only receives what is necessary to deliver their service.",
    ],
  },
  {
    id: "your-rights",
    heading: "Your rights",
    body: [
      "Depending on your jurisdiction, you may have rights to access, correct, or delete your personal information, or to object to processing. Contact us at privacy@ai-website-factory.example.com to exercise these rights.",
    ],
  },
  {
    id: "retention",
    heading: "Retention",
    body: [
      "We retain personal information for as long as necessary to provide the service and comply with legal obligations. You may request earlier deletion at any time.",
    ],
  },
  {
    id: "contact",
    heading: "Contact",
    body: [
      "Questions about this policy? Email privacy@ai-website-factory.example.com.",
    ],
  },
];

const siteUrl = "https://ai-website-factory.example.com";

export default function PrivacyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PrivacyPolicy",
    "@id": `${siteUrl}/privacy#privacypolicy`,
    name: "Privacy Policy",
    description:
      "How AI Website Factory collects, uses, and protects your information.",
    url: `${siteUrl}/privacy`,
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
                Privacy Policy
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
                This page summarises how AI Website Factory collects, uses,
                and protects information. It is provided as a template for
                reference — review with counsel before using in production.
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
