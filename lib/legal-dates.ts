// Single source of truth for the dates rendered on the legal / trust pages
// (/privacy, /terms, /security). The same constants drive:
//   - the visible "Last updated / Last reviewed" line on each page,
//   - the dateModified field in each page's JSON-LD,
//   - the lastModified entries in /sitemap.xml.
// Keeping them here prevents the sitemap and the on-page date from drifting
// out of sync — which is what was happening when /sitemap.ts used a build-
// time Date() for legal pages.

export const privacyLastUpdated = "2026-04-23";
export const termsLastUpdated = "2026-04-23";
export const securityLastReviewed = "2026-04-01";
