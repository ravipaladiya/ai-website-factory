import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Docs — get started, deploy, and extend sites built by AI Website Factory";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const sections = [
  { tag: "01", label: "Quickstart" },
  { tag: "02", label: "Deploy" },
  { tag: "03", label: "Extend" },
  { tag: "04", label: "Agent API" },
];

export default function DocsOpengraphImage() {
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
            "linear-gradient(135deg, #04081d 0%, #0d2058 50%, #2643c4 100%)",
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
              background: "rgba(125, 211, 252, 0.18)",
              color: "#bae6fd",
              border: "1px solid rgba(125, 211, 252, 0.45)",
            }}
          >
            Docs
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
            From `npm i` to live{"\n"}in five minutes.
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 400,
              color: "rgba(255,255,255,0.78)",
              maxWidth: 1000,
            }}
          >
            Install · Deploy · Extend · Agent API
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div
            style={{
              display: "flex",
              gap: 14,
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            }}
          >
            {sections.map((s) => (
              <div
                key={s.tag}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: 200,
                  height: 100,
                  borderRadius: 14,
                  padding: 14,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  boxShadow: "0 12px 32px rgba(0,0,0,0.25)",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: 1.4,
                    color: "rgba(125, 211, 252, 0.85)",
                  }}
                >
                  {s.tag}
                </div>
                <div
                  style={{
                    display: "flex",
                    fontSize: 19,
                    fontWeight: 600,
                    letterSpacing: -0.2,
                    color: "white",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 20, color: "rgba(255,255,255,0.7)" }}>
            ai-website-factory.example.com/docs
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
