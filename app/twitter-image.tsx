import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AI Website Factory — production-ready sites, built by AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
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
              width: 48,
              height: 48,
              borderRadius: 12,
              background:
                "linear-gradient(135deg, #8ba9ff 0%, #1f33b4 100%)",
            }}
          />
          <div style={{ fontSize: 28, fontWeight: 600 }}>
            AI Website Factory
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 600,
              letterSpacing: -1.5,
              lineHeight: 1.05,
              maxWidth: 980,
            }}
          >
            Production-ready websites,{"\n"}built entirely by AI.
          </div>
          <div
            style={{
              fontSize: 30,
              color: "rgba(255,255,255,0.78)",
              maxWidth: 900,
            }}
          >
            Plan · Design · Build · Ship — on autopilot.
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
          <div>ai-website-factory.example.com</div>
          <div style={{ display: "flex", gap: 20 }}>
            <span>Next.js</span>
            <span aria-hidden>·</span>
            <span>TypeScript</span>
            <span aria-hidden>·</span>
            <span>Tailwind</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
