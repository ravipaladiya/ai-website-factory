import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Compare — AI Website Factory vs hand-rolled Next.js vs no-code builders";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const columns = [
  {
    tag: "Us",
    name: "AI Website Factory",
    time: "~1 day",
    accent: "linear-gradient(135deg, #6f8aff 0%, #1f33b4 100%)",
    border: "1px solid rgba(255,255,255,0.55)",
    text: "white",
    badgeBg: "rgba(255,255,255,0.18)",
    badgeText: "white",
  },
  {
    tag: "DIY",
    name: "Hand-rolled Next.js",
    time: "2–6 weeks",
    accent: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.18)",
    text: "rgba(255,255,255,0.85)",
    badgeBg: "rgba(255,255,255,0.10)",
    badgeText: "rgba(255,255,255,0.75)",
  },
  {
    tag: "Other",
    name: "No-code builders",
    time: "Hours, not yours",
    accent: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.18)",
    text: "rgba(255,255,255,0.85)",
    badgeBg: "rgba(255,255,255,0.10)",
    badgeText: "rgba(255,255,255,0.75)",
  },
];

export default function CompareOpengraphImage() {
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
            "linear-gradient(135deg, #06091f 0%, #15226a 50%, #2f49d4 100%)",
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
            Compare
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 600,
              letterSpacing: -1.5,
              lineHeight: 1.05,
              maxWidth: 1050,
            }}
          >
            One day, not six weeks.
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 400,
              color: "rgba(255,255,255,0.78)",
              maxWidth: 1000,
            }}
          >
            Time, cost, SEO, ownership — side by side.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", gap: 14 }}>
            {columns.map((c) => (
              <div
                key={c.tag}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: 230,
                  height: 132,
                  borderRadius: 16,
                  padding: 16,
                  background: c.accent,
                  border: c.border,
                  color: c.text,
                  boxShadow: "0 12px 32px rgba(0,0,0,0.25)",
                }}
              >
                <div
                  style={{
                    alignSelf: "flex-start",
                    fontSize: 14,
                    fontWeight: 700,
                    letterSpacing: 1.2,
                    padding: "3px 10px",
                    borderRadius: 999,
                    background: c.badgeBg,
                    color: c.badgeText,
                    textTransform: "uppercase",
                  }}
                >
                  {c.tag}
                </div>
                <div
                  style={{
                    marginTop: "auto",
                    fontSize: 18,
                    fontWeight: 600,
                    letterSpacing: -0.2,
                  }}
                >
                  {c.name}
                </div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>
                  Time to deploy: {c.time}
                </div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 20, color: "rgba(255,255,255,0.7)" }}>
            ai-website-factory.example.com/compare
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
