import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const siteUrl = "https://ai-website-factory.example.com";
const securityEmail = "security@ai-website-factory.example.com";
const lastReviewed = "2026-04-01";

export const metadata: Metadata = {
  title: "Security",
  description:
    "How AI Website Factory protects customer data: encryption in transit and at rest, least-privilege access, audit logging, vulnerability disclosure, and our SOC 2 roadmap.",
  alternates: { canonical: "/security" },
  openGraph: {
    title: "Security | AI Website Factory",
    description:
      "How AI Website Factory protects customer data: encryption, access controls, vulnerability disclosure, and the SOC 2 roadmap.",
    type: "website",
    url: "/security",
  },
};

type Pillar = {
  title: string;
  body: string;
  bullets: string[];
};

const pillars: Pillar[] = [
  {
    title: "Encryption",
    body: "Data is encrypted everywhere it lives and everywhere it moves.",
    bullets: [
      "TLS 1.2+ for all traffic; HSTS preloaded with a 2-year max-age",
      "AES-256 at rest for databases, object storage, and managed backups",
      "Per-tenant encryption keys for generated source code and build artifacts",
    ],
  },
  {
    title: "Access controls",
    body: "Production access is least-privilege, audited, and time-bound.",
    bullets: [
      "SSO + hardware-key MFA required for every employee",
      "Role-based access via short-lived, just-in-time credentials",
      "Every administrative action is logged to an append-only audit trail",
    ],
  },
  {
    title: "Application security",
    body: "Security is part of the build, not bolted on at release.",
    bullets: [
      "Strict CSP, HSTS, X-Frame-Options DENY, X-Content-Type-Options nosniff",
      "Dependency scanning + automated CVE alerts on every PR",
      "Secrets isolated to per-environment vaults — never committed to Git",
    ],
  },
  {
    title: "Resilience",
    body: "We assume failure and design for graceful recovery.",
    bullets: [
      "Multi-AZ database with point-in-time recovery (35-day window)",
      "Daily encrypted backups with quarterly restore drills",
      "Documented RTO of 4h and RPO of 1h for the production tier",
    ],
  },
];

type Standard = {
  name: string;
  status: "live" | "in-progress" | "planned";
  detail: string;
};

const standards: Standard[] = [
  {
    name: "SOC 2 Type I",
    status: "in-progress",
    detail: "Audit window opened Q1 2026 — report targeted Q3 2026.",
  },
  {
    name: "SOC 2 Type II",
    status: "planned",
    detail: "Following Type I, targeting H1 2027.",
  },
  {
    name: "GDPR",
    status: "live",
    detail: "EU + UK Data Processing Addendum available on request.",
  },
  {
    name: "CCPA / CPRA",
    status: "live",
    detail: "California consumer requests honored within 45 days.",
  },
  {
    name: "Pen test",
    status: "live",
    detail: "Annual third-party penetration test; summary letter on request.",
  },
];

const statusStyles: Record<Standard["status"], { label: string; cls: string }> = {
  live: {
    label: "Live",
    cls: "bg-emerald-500/10 text-emerald-700 ring-emerald-500/20 dark:text-emerald-200 dark:ring-emerald-400/20",
  },
  "in-progress": {
    label: "In progress",
    cls: "bg-amber-500/10 text-amber-800 ring-amber-500/20 dark:text-amber-200 dark:ring-amber-400/20",
  },
  planned: {
    label: "Planned",
    cls: "bg-black/5 text-black/60 ring-black/10 dark:bg-white/5 dark:text-white/60 dark:ring-white/10",
  },
};

const subprocessors = [
  { name: "Vercel", purpose: "Hosting + edge runtime", region: "Global" },
  { name: "AWS (RDS, S3, KMS)", purpose: "Primary data store + backups", region: "us-east-1" },
  { name: "Stripe", purpose: "Billing + payment processing", region: "Global" },
  { name: "Resend", purpose: "Transactional + product email", region: "Global" },
  { name: "Sentry", purpose: "Error tracking", region: "EU" },
];

export default function SecurityPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Security at AI Website Factory",
    description:
      "Security practices at AI Website Factory: encryption, access controls, application security, resilience, compliance, and vulnerability disclosure.",
    url: `${siteUrl}/security`,
    dateModified: lastReviewed,
    inLanguage: "en-US",
    isPartOf: { "@id": `${siteUrl}/#website` },
  };

  return (
    <>
      <Header />
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <section className="border-b border-black/5 py-16 sm:py-20 dark:border-white/10">
          <div className="container max-w-3xl">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Security" },
              ]}
            />
            <p className="mt-6 text-sm font-medium uppercase tracking-wider text-brand-600 dark:text-brand-300">
              Security
            </p>
            <h1 className="text-balance mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              Security is built into every commit.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-black/70 dark:text-white/70">
              We treat the websites we generate — and the platform that
              generates them — as production software. Here is how we protect
              your data, your code, and your customers.
            </p>
            <p className="mt-3 text-sm text-black/55 dark:text-white/55">
              Last reviewed{" "}
              <time dateTime={lastReviewed}>
                {new Date(lastReviewed).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              .
            </p>
          </div>
        </section>

        <section
          aria-labelledby="pillars-heading"
          className="py-16 sm:py-20"
        >
          <div className="container max-w-5xl">
            <h2
              id="pillars-heading"
              className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              The four pillars.
            </h2>
            <ul
              role="list"
              className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2"
            >
              {pillars.map((p) => (
                <li
                  key={p.title}
                  className="flex flex-col rounded-2xl border border-black/5 bg-white/70 p-6 shadow-sm dark:border-white/10 dark:bg-white/5"
                >
                  <h3 className="text-lg font-semibold tracking-tight">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-black/70 dark:text-white/70">
                    {p.body}
                  </p>
                  <ul
                    role="list"
                    className="mt-4 space-y-2 text-sm leading-relaxed text-black/75 dark:text-white/75"
                  >
                    {p.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span
                          aria-hidden="true"
                          className="mt-2 inline-block h-1.5 w-1.5 flex-none rounded-full bg-brand-500"
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          aria-labelledby="standards-heading"
          className="border-t border-black/5 py-16 sm:py-20 dark:border-white/10"
        >
          <div className="container max-w-4xl">
            <h2
              id="standards-heading"
              className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              Standards & compliance.
            </h2>
            <p className="mt-4 max-w-2xl text-black/70 dark:text-white/70">
              We publish progress, not promises. Reach out for the latest audit
              letters and policy documents under NDA.
            </p>

            <ul
              role="list"
              className="mt-8 divide-y divide-black/5 overflow-hidden rounded-2xl border border-black/5 bg-white/70 dark:divide-white/10 dark:border-white/10 dark:bg-white/5"
            >
              {standards.map((s) => {
                const tone = statusStyles[s.status];
                return (
                  <li
                    key={s.name}
                    className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:gap-6 sm:px-6"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-base font-semibold tracking-tight">
                        {s.name}
                      </p>
                      <p className="mt-0.5 text-sm text-black/65 dark:text-white/65">
                        {s.detail}
                      </p>
                    </div>
                    <span
                      className={
                        "inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset " +
                        tone.cls
                      }
                    >
                      {tone.label}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section
          aria-labelledby="subprocessors-heading"
          className="border-t border-black/5 py-16 sm:py-20 dark:border-white/10"
        >
          <div className="container max-w-4xl">
            <h2
              id="subprocessors-heading"
              className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              Subprocessors.
            </h2>
            <p className="mt-4 max-w-2xl text-black/70 dark:text-white/70">
              We rely on a small, audited set of vendors to deliver the
              service. Customers are notified before adding a new
              subprocessor.
            </p>

            <div className="mt-8 overflow-x-auto rounded-2xl border border-black/5 dark:border-white/10">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-black/[0.03] text-xs uppercase tracking-wider text-black/60 dark:bg-white/[0.03] dark:text-white/60">
                  <tr>
                    <th scope="col" className="px-5 py-3 font-semibold">Vendor</th>
                    <th scope="col" className="px-5 py-3 font-semibold">Purpose</th>
                    <th scope="col" className="px-5 py-3 font-semibold">Region</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 dark:divide-white/10">
                  {subprocessors.map((s) => (
                    <tr key={s.name}>
                      <td className="px-5 py-3 font-medium">{s.name}</td>
                      <td className="px-5 py-3 text-black/70 dark:text-white/70">
                        {s.purpose}
                      </td>
                      <td className="px-5 py-3 text-black/70 dark:text-white/70">
                        {s.region}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="report-heading"
          className="border-t border-black/5 py-16 sm:py-20 dark:border-white/10"
        >
          <div className="container max-w-3xl">
            <h2
              id="report-heading"
              className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              Report a vulnerability.
            </h2>
            <p className="mt-4 text-black/70 dark:text-white/70">
              We welcome reports from the security community. Please email{" "}
              <a
                href={`mailto:${securityEmail}`}
                className="font-medium text-brand-700 underline-offset-4 hover:underline dark:text-brand-300"
              >
                {securityEmail}
              </a>{" "}
              with reproduction steps. We acknowledge receipt within one
              business day and aim to triage within three. Do not disclose
              publicly until a fix is shipped — we credit reporters in our
              changelog.
            </p>

            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
              <a
                href={`mailto:${securityEmail}`}
                className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
              >
                Email security team
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-black/10 bg-white px-5 py-3 text-sm font-medium text-black/80 shadow-sm transition hover:bg-black/5 dark:border-white/10 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10"
              >
                Request a DPA / NDA
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
