import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Security at AI Website Factory — encryption, access controls, vulnerability disclosure";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function SecurityOpengraphImage() {
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
            "linear-gradient(135deg, #07112e 0%, #102564 50%, #1b3aa6 100%)",
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
              background: "rgba(126, 222, 178, 0.15)",
              color: "#a7f3d0",
              border: "1px solid rgba(126, 222, 178, 0.4)",
            }}
          >
            Security
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
            Security is built into{"\n"}every commit.
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 400,
              color: "rgba(255,255,255,0.78)",
              maxWidth: 1000,
            }}
          >
            Encryption · Access controls · Vulnerability disclosure
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 20,
            color: "rgba(255,255,255,0.7)",
          }}
        >
          <div>ai-website-factory.example.com/security</div>
          <div style={{ display: "flex", gap: 18 }}>
            <span>SOC 2 in progress</span>
            <span aria-hidden>·</span>
            <span>GDPR · CCPA</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
