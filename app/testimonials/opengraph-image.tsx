import { ImageResponse } from "next/og";
import { summary } from "@/lib/testimonials";

export const runtime = "nodejs";
export const alt =
  "Testimonials — what teams say about AI Website Factory";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function Star() {
  return (
    <svg
      width={28}
      height={28}
      viewBox="0 0 20 20"
      fill="#facc15"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 1.5 12.472 7.06l6.028.618-4.5 4.083 1.25 5.937L10 14.75 4.75 17.698 6 11.761 1.5 7.678l6.028-.618z" />
    </svg>
  );
}

export default function TestimonialsOpengraphImage() {
  const rating = summary.averageRating.toFixed(1);
  const reviewCount = summary.totalReviews.toLocaleString("en-US");

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
            "linear-gradient(135deg, #06091f 0%, #102164 50%, #2742c4 100%)",
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
            Testimonials
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
            Loved by teams that ship.
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              fontSize: 30,
              fontWeight: 500,
              color: "rgba(255,255,255,0.92)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 16px",
                borderRadius: 999,
                background: "rgba(252, 211, 77, 0.18)",
                border: "1px solid rgba(252, 211, 77, 0.45)",
                color: "#fef3c7",
              }}
            >
              <div style={{ display: "flex", gap: 2 }}>
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
              </div>
              <div style={{ display: "flex", fontWeight: 700, color: "white" }}>
                {rating}
              </div>
            </div>
            <div style={{ display: "flex", color: "rgba(255,255,255,0.78)" }}>
              {`${reviewCount} verified reviews`}
            </div>
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
          <div style={{ display: "flex" }}>
            ai-website-factory.example.com/testimonials
          </div>
          <div style={{ display: "flex", gap: 18 }}>
            <span>Real teams</span>
            <span aria-hidden>·</span>
            <span>Real shipped sites</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
