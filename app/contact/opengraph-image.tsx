import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Contact AI Website Factory — sales, support, security; reply within one business day";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const channels = [
  {
    label: "Sales",
    detail: "sales@ai-website-factory.example.com",
  },
  {
    label: "Support",
    detail: "support@ai-website-factory.example.com",
  },
  {
    label: "Security",
    detail: "security@ai-website-factory.example.com",
  },
];

export default function ContactOpengraphImage() {
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
              background: "rgba(255,255,255,0.12)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.25)",
            }}
          >
            Contact
          </div>
          <div
            style={{
              fontSize: 78,
              fontWeight: 600,
              letterSpacing: -1.5,
              lineHeight: 1.05,
              maxWidth: 1050,
            }}
          >
            Let&rsquo;s talk.
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 400,
              color: "rgba(255,255,255,0.78)",
              maxWidth: 1000,
            }}
          >
            We reply within one business day, Mon&ndash;Fri.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", gap: 12 }}>
            {channels.map((c) => (
              <div
                key={c.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: 240,
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
                    color: "rgba(186, 230, 253, 0.9)",
                    textTransform: "uppercase",
                  }}
                >
                  {c.label}
                </div>
                <div
                  style={{
                    display: "flex",
                    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                    fontSize: 13,
                    color: "rgba(255,255,255,0.85)",
                    wordBreak: "break-all",
                  }}
                >
                  {c.detail}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", fontSize: 20, color: "rgba(255,255,255,0.7)" }}>
            ai-website-factory.example.com/contact
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
