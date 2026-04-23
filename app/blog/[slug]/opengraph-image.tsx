import { ImageResponse } from "next/og";
import { getAllSlugs, getPost } from "@/lib/posts";

export const runtime = "nodejs";
export const alt = "AI Website Factory blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function PostOgImage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPost(params.slug);
  const title = post?.title ?? "AI Website Factory";
  const date = post
    ? new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";
  const reading = post?.readingTime ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background:
            "linear-gradient(135deg, #0b1340 0%, #1f33b4 45%, #3b5bff 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background:
                "linear-gradient(135deg, #8ba9ff 0%, #1f33b4 100%)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}
          />
          <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: -0.3 }}>
            AI Website Factory · Blog
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {(date || reading) && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                fontSize: 24,
                color: "rgba(255,255,255,0.75)",
              }}
            >
              {date && <span>{date}</span>}
              {date && reading && <span aria-hidden>·</span>}
              {reading && <span>{reading}</span>}
            </div>
          )}
          <div
            style={{
              fontSize: 68,
              fontWeight: 600,
              letterSpacing: -1.5,
              lineHeight: 1.05,
              maxWidth: 1020,
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 22,
            color: "rgba(255,255,255,0.7)",
          }}
        >
          <span>ai-website-factory.example.com/blog</span>
          <span>Read →</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
