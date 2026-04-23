import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type ChangelogEntryFrontmatter = {
  title: string;
  date: string;
  summary: string;
  tags?: string[];
};

export type ChangelogEntry = ChangelogEntryFrontmatter & {
  slug: string;
  raw: string;
};

const changelogDir = path.join(process.cwd(), "content", "changelog");

export function getAllChangelogEntries(): ChangelogEntry[] {
  if (!fs.existsSync(changelogDir)) return [];
  return fs
    .readdirSync(changelogDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const slug = f.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(changelogDir, f), "utf8");
      const { data, content } = matter(raw);
      const fm = data as Partial<ChangelogEntryFrontmatter>;
      if (!fm.title || !fm.date || !fm.summary) {
        throw new Error(
          `Changelog ${slug} is missing required frontmatter (title, date, summary).`,
        );
      }
      return {
        slug,
        title: fm.title,
        date: fm.date,
        summary: fm.summary,
        tags: Array.isArray(fm.tags) ? fm.tags : [],
        raw: content,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
