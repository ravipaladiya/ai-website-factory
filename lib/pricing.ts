import type { Plan } from "./auth";

export type BillingInterval = "monthly" | "annual";

export type PlanId = "starter" | "studio" | "enterprise";

export type PricingTier = {
  id: PlanId;
  name: Plan; // aligned with NextAuth session plan
  description: string;
  monthly: number | null; // USD; null → custom
  annual: number | null; // USD per month when billed annually
  cta: string;
  featured: boolean;
  billable: boolean;
};

export const ANNUAL_DISCOUNT = 0.2; // "Save 20%" on annual

export const pricingTiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Everything you need to ship your first production-ready site.",
    monthly: 0,
    annual: 0,
    cta: "Start free",
    featured: false,
    billable: false,
  },
  {
    id: "studio",
    name: "Studio",
    description: "For teams shipping multiple sites with autonomous iteration.",
    monthly: 29,
    annual: 23, // 29 * 0.8 ≈ 23.2
    cta: "Start 14-day trial",
    featured: true,
    billable: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Governance, SSO, and dedicated infrastructure for scaled teams.",
    monthly: null,
    annual: null,
    cta: "Talk to sales",
    featured: false,
    billable: false,
  },
];

export type FeatureValue = boolean | string;

export type ComparisonRow = {
  label: string;
  group: "Projects" | "Team & access" | "Security" | "Support";
  values: Record<PlanId, FeatureValue>;
};

export const comparisonRows: ComparisonRow[] = [
  {
    group: "Projects",
    label: "Projects",
    values: { starter: "1", studio: "Unlimited", enterprise: "Unlimited" },
  },
  {
    group: "Projects",
    label: "Builds / month",
    values: { starter: "50", studio: "5,000", enterprise: "Custom" },
  },
  {
    group: "Projects",
    label: "Custom domains",
    values: { starter: "1", studio: "Unlimited", enterprise: "Unlimited" },
  },
  {
    group: "Projects",
    label: "Preview deployments",
    values: { starter: true, studio: true, enterprise: true },
  },
  {
    group: "Projects",
    label: "Continuous improvement loop",
    values: { starter: false, studio: true, enterprise: true },
  },
  {
    group: "Projects",
    label: "Automated PR workflow",
    values: { starter: false, studio: true, enterprise: true },
  },
  {
    group: "Team & access",
    label: "Team seats",
    values: { starter: "1", studio: "10", enterprise: "Unlimited" },
  },
  {
    group: "Team & access",
    label: "Role-based access",
    values: { starter: false, studio: true, enterprise: true },
  },
  {
    group: "Team & access",
    label: "SSO (SAML / OIDC)",
    values: { starter: false, studio: false, enterprise: true },
  },
  {
    group: "Security",
    label: "Audit logs",
    values: { starter: false, studio: "30 days", enterprise: "Unlimited" },
  },
  {
    group: "Security",
    label: "Dedicated environments",
    values: { starter: false, studio: false, enterprise: true },
  },
  {
    group: "Security",
    label: "Data residency",
    values: { starter: false, studio: false, enterprise: true },
  },
  {
    group: "Support",
    label: "Community support",
    values: { starter: true, studio: true, enterprise: true },
  },
  {
    group: "Support",
    label: "Priority support",
    values: { starter: false, studio: true, enterprise: true },
  },
  {
    group: "Support",
    label: "SLA & onboarding",
    values: { starter: false, studio: false, enterprise: true },
  },
];
