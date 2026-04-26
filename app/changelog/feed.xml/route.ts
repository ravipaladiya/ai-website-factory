import { getAllChangelogEntries } from "@/lib/changelog";

const siteUrl = "https://ai-website-factory.example.com";

function escape(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const entries = getAllChangelogEntries();
  const lastBuild = entries[0]?.date
    ? new Date(entries[0].date).toUTCString()
    : new Date().toUTCString();

  const items = entries
    .map((entry) => {
      const url = `${siteUrl}/changelog#${entry.slug}`;
      return `
    <item>
      <title>${escape(entry.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="false">${escape(entry.slug)}</guid>
      <pubDate>${new Date(entry.date).toUTCString()}</pubDate>
      <description>${escape(entry.summary)}</description>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>AI Website Factory — Changelog</title>
    <link>${siteUrl}/changelog</link>
    <description>Weekly product updates from the AI Website Factory agent.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${siteUrl}/changelog/feed.xml" rel="self" type="application/rss+xml" />${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
      "cache-control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
