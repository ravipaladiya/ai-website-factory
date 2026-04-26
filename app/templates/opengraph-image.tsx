import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Templates — production-ready Next.js starting points: SaaS landing, portfolio, e-commerce, blog, docs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const cards = [
  { label: "SaaS Landing", swatch: "linear-gradient(135deg, #818cf8, #1d4ed8)" },
  { label: "Portfolio", swatch: "linear-gradient(135deg, #fbbf24, #f43f5e)" },
  { label: "E-commerce", swatch: "linear-gradient(135deg, #6ee7b7, #0d9488)" },
  { label: "Blog", swatch: "linear-gradient(135deg, #cbd5e1, #475569)" },
  { label: "Docs", swatch: "linear-gradient(135deg, #7dd3fc, #4338ca)" },
];

export default function TemplatesOpengraphImage() {
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
            Templates
          </div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 600,
              letterSpacing: -1.5,
              lineHeight: 1.05,
              maxWidth: 1000,
            }}
          >
            Pick a starting point.{"\n"}Ship the same day.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", gap: 12 }}>
            {cards.map((c) => (
              <div
                key={c.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: 168,
                  height: 96,
                  borderRadius: 14,
                  padding: 12,
                  background: c.swatch,
                  color: "white",
                  fontSize: 18,
                  fontWeight: 600,
                  justifyContent: "flex-end",
                  boxShadow: "0 12px 32px rgba(0,0,0,0.25)",
                }}
              >
                {c.label}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 20, color: "rgba(255,255,255,0.7)" }}>
            ai-website-factory.example.com/templates
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
