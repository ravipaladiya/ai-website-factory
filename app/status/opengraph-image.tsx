import { ImageResponse } from "next/og";
import { getStatus } from "@/lib/status-data";

export const runtime = "nodejs";
export const alt =
  "Live health of AI Website Factory services with 90-day uptime";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const overallCopy: Record<
  "operational" | "degraded" | "outage",
  { label: string; tag: string; pillBg: string; pillBorder: string; pillColor: string; dot: string }
> = {
  operational: {
    label: "All systems operational",
    tag: "Operational",
    pillBg: "rgba(167, 243, 208, 0.18)",
    pillBorder: "rgba(167, 243, 208, 0.45)",
    pillColor: "#bbf7d0",
    dot: "#34d399",
  },
  degraded: {
    label: "Some systems degraded",
    tag: "Degraded",
    pillBg: "rgba(252, 211, 77, 0.18)",
    pillBorder: "rgba(252, 211, 77, 0.45)",
    pillColor: "#fde68a",
    dot: "#facc15",
  },
  outage: {
    label: "Major outage reported",
    tag: "Outage",
    pillBg: "rgba(252, 165, 165, 0.18)",
    pillBorder: "rgba(252, 165, 165, 0.45)",
    pillColor: "#fecaca",
    dot: "#f87171",
  },
};

export default function StatusOpengraphImage() {
  const { overall, services } = getStatus();
  const banner = overallCopy[overall];

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

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
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
              background: banner.pillBg,
              color: banner.pillColor,
              border: `1px solid ${banner.pillBorder}`,
            }}
          >
            <div
              style={{
                display: "flex",
                width: 10,
                height: 10,
                borderRadius: 999,
                background: banner.dot,
                boxShadow: `0 0 0 4px ${banner.pillBg}`,
              }}
            />
            Status
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
            {`${banner.label}.`}
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 400,
              color: "rgba(255,255,255,0.78)",
              maxWidth: 1000,
            }}
          >
            90-day uptime · API · Builder · CDN · Auth.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", gap: 12 }}>
            {services.map((s) => {
              const tone = overallCopy[s.status];
              return (
                <div
                  key={s.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: 220,
                    height: 110,
                    borderRadius: 16,
                    padding: 14,
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    boxShadow: "0 12px 32px rgba(0,0,0,0.25)",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div
                      style={{
                        display: "flex",
                        fontSize: 18,
                        fontWeight: 600,
                        letterSpacing: -0.2,
                      }}
                    >
                      {s.name}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        width: 8,
                        height: 8,
                        borderRadius: 999,
                        background: tone.dot,
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      fontSize: 13,
                      fontWeight: 500,
                      color: "rgba(255,255,255,0.7)",
                      letterSpacing: 0.4,
                    }}
                  >
                    {`90-day: ${s.uptime90.toFixed(2)}%`}
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", fontSize: 20, color: "rgba(255,255,255,0.7)" }}>
            ai-website-factory.example.com/status
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
