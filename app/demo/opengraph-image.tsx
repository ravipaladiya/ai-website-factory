import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Live demo — describe a site in one line and watch the AI Website Factory agent build it";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const buildSteps = [
  { tag: "plan", body: "Scoping IA + design direction" },
  { tag: "design", body: "Mobile-first layout · color tokens" },
  { tag: "build", body: "Authoring components in TypeScript" },
  { tag: "ship", body: "All gates green · deploying preview" },
];

export default function DemoOpengraphImage() {
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

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              alignSelf: "flex-start",
              fontSize: 22,
              fontWeight: 600,
              padding: "6px 14px",
              borderRadius: 999,
              background: "rgba(167, 243, 208, 0.16)",
              color: "#bbf7d0",
              border: "1px solid rgba(167, 243, 208, 0.4)",
            }}
          >
            <div
              style={{
                display: "flex",
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "#34d399",
                boxShadow: "0 0 0 4px rgba(52, 211, 153, 0.25)",
              }}
            />
            Live demo
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
            Describe it. Watch it{"\n"}build itself.
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 400,
              color: "rgba(255,255,255,0.78)",
              maxWidth: 1000,
            }}
          >
            One line in. A streaming build log + live preview out.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              maxWidth: 880,
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            }}
          >
            {buildSteps.map((s) => (
              <div
                key={s.tag}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  fontSize: 16,
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    color: "rgba(167, 243, 208, 0.95)",
                    fontWeight: 600,
                    width: 90,
                  }}
                >
                  {`[${s.tag}]`}
                </div>
                <div style={{ display: "flex", color: "rgba(255,255,255,0.92)" }}>
                  {s.body}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", fontSize: 20, color: "rgba(255,255,255,0.7)" }}>
            ai-website-factory.example.com/demo
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
