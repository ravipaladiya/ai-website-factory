import { ImageResponse } from "next/og";
import { caseStudies } from "@/lib/testimonials";

export const runtime = "nodejs";
export const alt =
  "Case studies — real teams shipped real sites with AI Website Factory";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function CaseStudiesOpengraphImage() {
  const featured = caseStudies.slice(0, 3);

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
            "linear-gradient(135deg, #060c24 0%, #102560 50%, #2944c2 100%)",
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
            Case studies
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
            Real teams. Real sites.
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 400,
              color: "rgba(255,255,255,0.78)",
              maxWidth: 1000,
            }}
          >
            Time to launch · Lighthouse lift · what they kept after.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", gap: 14 }}>
            {featured.map((cs) => (
              <div
                key={cs.slug}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: 230,
                  height: 142,
                  borderRadius: 16,
                  padding: 16,
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  boxShadow: "0 12px 32px rgba(0,0,0,0.25)",
                }}
              >
                <div
                  style={{
                    fontSize: 19,
                    fontWeight: 600,
                    letterSpacing: -0.2,
                  }}
                >
                  {cs.company}
                </div>
                <div
                  style={{
                    marginTop: 6,
                    fontSize: 13,
                    color: "rgba(255,255,255,0.7)",
                    lineHeight: 1.3,
                  }}
                >
                  {`Shipped in ${cs.metrics.timeToLaunch}`}
                </div>
                <div
                  style={{
                    marginTop: "auto",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 13,
                    color: "rgba(167, 243, 208, 0.95)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "2px 8px",
                      borderRadius: 999,
                      background: "rgba(126, 222, 178, 0.15)",
                      border: "1px solid rgba(126, 222, 178, 0.4)",
                      fontWeight: 600,
                    }}
                  >
                    {`Lighthouse ${cs.metrics.lighthouseBefore} → ${cs.metrics.lighthouseAfter}`}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 20, color: "rgba(255,255,255,0.7)" }}>
            ai-website-factory.example.com/case-studies
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
