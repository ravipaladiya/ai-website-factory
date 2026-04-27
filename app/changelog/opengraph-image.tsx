import { ImageResponse } from "next/og";
import { getAllChangelogEntries } from "@/lib/changelog";

export const runtime = "nodejs";
export const alt =
  "Changelog — weekly product updates from the AI Website Factory agent";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function ChangelogOpengraphImage() {
  const latest = getAllChangelogEntries().slice(0, 3);

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
            "linear-gradient(135deg, #06091f 0%, #102263 50%, #2944c4 100%)",
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
            Changelog
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
            Shipping every week.
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 400,
              color: "rgba(255,255,255,0.78)",
              maxWidth: 1000,
            }}
          >
            What the agent shipped — direct from the merge log.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 880 }}>
            {latest.map((entry) => (
              <div
                key={entry.slug}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  fontSize: 18,
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                    color: "rgba(167, 243, 208, 0.95)",
                    fontWeight: 600,
                    width: 110,
                  }}
                >
                  {entry.date}
                </div>
                <div
                  style={{
                    display: "flex",
                    flex: 1,
                    color: "rgba(255,255,255,0.92)",
                  }}
                >
                  {entry.title}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", fontSize: 20, color: "rgba(255,255,255,0.7)" }}>
            ai-website-factory.example.com/changelog
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
