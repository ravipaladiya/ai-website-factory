import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type PostFrontmatter = {
  title: string;
  date: string;
  author: string;
  tags: string[];
  excerpt: string;
  og_image?: string;
};

export type Post = PostFrontmatter & {
  slug: string;
  readingTime: string;
  wordCount: number;
  raw: string; // raw MDX source
};

export type Heading = { depth: 2 | 3; text: string; id: string };

const blogDir = path.join(process.cwd(), "content", "blog");

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function readingTimeFor(raw: string): { text: string; words: number } {
  const words = raw.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 220));
  return { text: `${minutes} min read`, words };
}

function parsePost(slug: string, file: string): Post {
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const fm = data as Partial<PostFrontmatter>;
  const rt = readingTimeFor(content);

  if (!fm.title || !fm.date || !fm.author || !fm.excerpt) {
    throw new Error(
      `Post ${slug} is missing required frontmatter (title, date, author, excerpt).`,
    );
  }

  return {
    slug,
    title: fm.title,
    date: fm.date,
    author: fm.author,
    tags: Array.isArray(fm.tags) ? fm.tags : [],
    excerpt: fm.excerpt,
    og_image: fm.og_image,
    readingTime: rt.text,
    wordCount: rt.words,
    raw: content,
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(blogDir)) return [];
  return fs
    .readdirSync(blogDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => parsePost(f.replace(/\.mdx$/, ""), path.join(blogDir, f)))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

export function getRelatedPosts(slug: string, limit = 3): Post[] {
  const current = getPost(slug);
  if (!current) return [];
  const others = getAllPosts().filter((p) => p.slug !== slug);
  const byTagOverlap = others
    .map((p) => ({
      post: p,
      score: p.tags.filter((t) => current.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score || (a.post.date < b.post.date ? 1 : -1));
  return byTagOverlap.slice(0, limit).map((x) => x.post);
}

export function getAllTags(): string[] {
  return Array.from(
    new Set(getAllPosts().flatMap((p) => p.tags)),
  ).sort();
}

export function extractHeadings(raw: string): Heading[] {
  const headings: Heading[] = [];
  const lines = raw.split("\n");
  let inFence = false;
  for (const line of lines) {
    if (line.startsWith("```")) inFence = !inFence;
    if (inFence) continue;
    const m = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!m) continue;
    const depth = m[1].length as 2 | 3;
    const text = m[2].replace(/[*_`]/g, "");
    headings.push({ depth, text, id: slugify(text) });
  }
  return headings;
}

export function getPrevNext(slug: string): { prev?: Post; next?: Post } {
  const posts = getAllPosts(); // already sorted newest-first
  const idx = posts.findIndex((p) => p.slug === slug);
  if (idx === -1) return {};
  return {
    next: idx > 0 ? posts[idx - 1] : undefined,
    prev: idx < posts.length - 1 ? posts[idx + 1] : undefined,
  };
}
