import { ImageResponse } from "next/og";
import { getAllPosts } from "@/lib/posts";

export const runtime = "nodejs";
export const alt =
  "Build notes, post-mortems, and product updates from the AI Website Factory team";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function BlogIndexOpengraphImage() {
  const latest = getAllPosts().slice(0, 3);

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
            "linear-gradient(135deg, #04081d 0%, #102263 50%, #2944c4 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "linear-gradient(135deg, #8ba9ff 0%, #1f33b4 100%)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
            }}
          />
          <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: -0.3 }}>
            AI Website Factory
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              alignSelf: "flex-start",
              fontSize: 22,
              fontWeight: 600,
              padding: "6px 14px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.12)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.25)",
            }}
          >
            Blog
          </div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 600,
              letterSpacing: -1.5,
              lineHeight: 1.05,
              maxWidth: 1050,
            }}
          >
            Build notes, in public.
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 400,
              color: "rgba(255,255,255,0.78)",
              maxWidth: 1000,
            }}
          >
            Post-mortems · product updates · what we shipped this week.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 880 }}>
            {latest.map((p) => (
              <div
                key={p.slug}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  fontSize: 18,
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                    color: "rgba(186, 230, 253, 0.9)",
                    fontWeight: 600,
                    width: 110,
                  }}
                >
                  {p.date}
                </div>
                <div
                  style={{
                    display: "flex",
                    flex: 1,
                    color: "rgba(255,255,255,0.92)",
                  }}
                >
                  {p.title}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", fontSize: 20, color: "rgba(255,255,255,0.7)" }}>
            ai-website-factory.example.com/blog
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
