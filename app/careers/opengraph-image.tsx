import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Careers at AI Website Factory — join the team building the autonomous engineering loop";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const values = [
  "Ship small, ship often",
  "Automate the boring parts",
  "Write for the reader",
  "Own the outcome",
];

export default function CareersOpengraphImage() {
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
              background: "rgba(167, 243, 208, 0.16)",
              color: "#bbf7d0",
              border: "1px solid rgba(167, 243, 208, 0.4)",
            }}
          >
            Careers
          </div>
          <div
            style={{
              fontSize: 70,
              fontWeight: 600,
              letterSpacing: -1.5,
              lineHeight: 1.05,
              maxWidth: 1050,
            }}
          >
            Build the factory that{"\n"}builds the web.
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 400,
              color: "rgba(255,255,255,0.78)",
              maxWidth: 1000,
            }}
          >
            Remote · Engineering · Design · Growth.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, maxWidth: 880 }}>
            {values.map((v) => (
              <div
                key={v}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "8px 16px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  fontSize: 18,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.92)",
                }}
              >
                {v}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", fontSize: 20, color: "rgba(255,255,255,0.7)" }}>
            ai-website-factory.example.com/careers
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
