import { ImageResponse } from "next/og";
import { caseStudies, getCaseStudy } from "@/lib/testimonials";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export function generateImageMetadata({ params }: { params: Params }) {
  const cs = getCaseStudy(params.slug);
  return [
    {
      contentType,
      size,
      alt: cs
        ? `${cs.company} — AI Website Factory case study`
        : "AI Website Factory case study",
    },
  ];
}

export default function CaseStudySlugOpengraphImage({
  params,
}: {
  params: Params;
}) {
  const cs = getCaseStudy(params.slug);

  const company = cs?.company ?? "Case study";
  const headline = cs?.tagline ?? "An AI Website Factory case study.";
  const timeToLaunch = cs?.metrics.timeToLaunch ?? "Days, not weeks";
  const lighthouseBefore = cs?.metrics.lighthouseBefore ?? null;
  const lighthouseAfter = cs?.metrics.lighthouseAfter ?? null;
  const lighthouseLine =
    lighthouseBefore !== null && lighthouseAfter !== null
      ? `Lighthouse ${lighthouseBefore} → ${lighthouseAfter}`
      : "Lighthouse 95+";
  const siteHost = cs?.siteUrl ?? "ai-website-factory.example.com";

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
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
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
            <div style={{ display: "flex", fontSize: 28, fontWeight: 600, letterSpacing: -0.3 }}>
              AI Website Factory
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 18,
              fontWeight: 500,
              padding: "6px 14px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.10)",
              color: "rgba(255,255,255,0.85)",
              border: "1px solid rgba(255,255,255,0.22)",
            }}
          >
            Case study
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              fontSize: 22,
              fontWeight: 700,
              padding: "6px 14px",
              borderRadius: 999,
              background: "rgba(167, 243, 208, 0.18)",
              color: "#bbf7d0",
              border: "1px solid rgba(167, 243, 208, 0.45)",
              letterSpacing: 0.4,
            }}
          >
            {company}
          </div>
          <div
            style={{
              fontSize: 60,
              fontWeight: 600,
              letterSpacing: -1.2,
              lineHeight: 1.08,
              maxWidth: 1050,
            }}
          >
            {headline}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", gap: 14 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: 260,
                height: 110,
                borderRadius: 16,
                padding: 16,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.18)",
                boxShadow: "0 12px 32px rgba(0,0,0,0.25)",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: 1.4,
                  color: "rgba(167, 243, 208, 0.85)",
                  textTransform: "uppercase",
                }}
              >
                Time to launch
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 28,
                  fontWeight: 600,
                  letterSpacing: -0.3,
                  color: "white",
                }}
              >
                {timeToLaunch}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: 320,
                height: 110,
                borderRadius: 16,
                padding: 16,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.18)",
                boxShadow: "0 12px 32px rgba(0,0,0,0.25)",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: 1.4,
                  color: "rgba(167, 243, 208, 0.85)",
                  textTransform: "uppercase",
                }}
              >
                Lighthouse lift
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 28,
                  fontWeight: 600,
                  letterSpacing: -0.3,
                  color: "white",
                }}
              >
                {lighthouseLine}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 20, color: "rgba(255,255,255,0.7)" }}>
            {siteHost}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
