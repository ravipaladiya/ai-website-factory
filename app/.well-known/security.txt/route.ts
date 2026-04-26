// RFC 9116 -- machine-readable security disclosure metadata.
// Researchers and scanners look here before any HTML page.
// Keep `Expires` rolling 1 year out from build time.

const siteUrl = "https://ai-website-factory.example.com";
const securityEmail = "security@ai-website-factory.example.com";

function isoYearFromNow(): string {
  const d = new Date();
  d.setUTCFullYear(d.getUTCFullYear() + 1);
  return d.toISOString();
}

export async function GET() {
  const body = [
    `Contact: mailto:${securityEmail}`,
    `Expires: ${isoYearFromNow()}`,
    "Preferred-Languages: en",
    `Canonical: ${siteUrl}/.well-known/security.txt`,
    `Policy: ${siteUrl}/security`,
    `Acknowledgments: ${siteUrl}/changelog`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
