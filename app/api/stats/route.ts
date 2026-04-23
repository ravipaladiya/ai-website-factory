import { NextResponse } from "next/server";

// Next.js ISR: the response payload is cached for 60s; the 61st request
// rebuilds it in the background.
export const revalidate = 60;

export type StatsPayload = {
  sitesBuilt: number;
  lighthousePointsScored: number;
  buildSuccessRate: number; // percent, 0–100
  avgMinutesToFirstDeploy: number;
  generatedAt: string;
};

// Deterministic drift so a hard refresh shows the counters moving.
// Swap for a DB/metrics source in production.
function computeStats(): StatsPayload {
  const bucket = Math.floor(Date.now() / 60_000);
  const drift = (seed: number) => {
    let h = seed ^ bucket;
    h = (h * 16807) % 2147483647;
    return (h % 1000) / 1000;
  };

  return {
    sitesBuilt: 12_847 + Math.floor(drift(1) * 24),
    lighthousePointsScored: 4_200_000 + Math.floor(drift(2) * 20_000),
    buildSuccessRate: 99.3 + drift(3) * 0.2 - 0.1,
    avgMinutesToFirstDeploy: 38 + Math.floor(drift(4) * 3) - 1,
    generatedAt: new Date().toISOString(),
  };
}

export async function GET() {
  const payload = computeStats();
  return NextResponse.json(payload, {
    headers: {
      // Match the revalidate window for any CDN / client caching, while
      // allowing stale responses to keep latency low during re-generation.
      "cache-control":
        "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
