import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to the AI Website Factory team about sales, partnerships, or support.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | AI Website Factory",
    description:
      "Talk to the AI Website Factory team about sales, partnerships, or support.",
    type: "website",
    url: "/contact",
  },
};

const siteUrl = "https://ai-website-factory.example.com";

const contactPoints = [
  {
    contactType: "sales",
    email: "sales@ai-website-factory.example.com",
  },
  {
    contactType: "customer support",
    email: "support@ai-website-factory.example.com",
  },
  {
    contactType: "security",
    email: "security@ai-website-factory.example.com",
  },
];

export default function ContactPage() {
  const contactPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${siteUrl}/contact#contactpage`,
    name: "Contact AI Website Factory",
    description:
      "Talk to the AI Website Factory team about sales, partnerships, or support. We reply within one business day.",
    url: `${siteUrl}/contact`,
    inLanguage: "en-US",
    isAccessibleForFree: true,
    mainEntity: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "AI Website Factory",
      url: siteUrl,
      contactPoint: contactPoints.map((cp) => ({
        "@type": "ContactPoint",
        contactType: cp.contactType,
        email: cp.email,
        availableLanguage: "English",
        areaServed: "Worldwide",
      })),
    },
  };

  return (
    <>
      <Header />
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
        />
        <section className="border-b border-black/5 py-16 sm:py-20 dark:border-white/10">
          <div className="container max-w-3xl">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Contact" },
              ]}
            />
            <p className="mt-6 text-sm font-medium uppercase tracking-wider text-brand-600 dark:text-brand-300">
              Contact
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              Let&apos;s talk.
            </h1>
            <p className="mt-4 max-w-2xl text-black/70 dark:text-white/70">
              Questions about pricing, partnerships, or getting started on a
              larger project? Send us a note — we reply within one business
              day.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="container grid max-w-5xl gap-12 md:grid-cols-[1fr_1.5fr]">
            <aside aria-labelledby="contact-aside-heading">
              <h2
                id="contact-aside-heading"
                className="text-lg font-semibold tracking-tight"
              >
                Other ways to reach us
              </h2>
              <dl className="mt-6 space-y-5 text-sm">
                <div>
                  <dt className="font-medium">Sales</dt>
                  <dd className="mt-1 text-black/70 dark:text-white/70">
                    <a
                      href="mailto:sales@ai-website-factory.example.com"
                      className="hover:text-brand-600 dark:hover:text-brand-300"
                    >
                      sales@ai-website-factory.example.com
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-medium">Support</dt>
                  <dd className="mt-1 text-black/70 dark:text-white/70">
                    <a
                      href="mailto:support@ai-website-factory.example.com"
                      className="hover:text-brand-600 dark:hover:text-brand-300"
                    >
                      support@ai-website-factory.example.com
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-medium">Response time</dt>
                  <dd className="mt-1 text-black/70 dark:text-white/70">
                    Within one business day, Mon–Fri.
                  </dd>
                </div>
              </dl>
            </aside>

            <div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
