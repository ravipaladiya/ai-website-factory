import { NextResponse } from "next/server";
import { getStatus } from "@/lib/status-data";

export const revalidate = 60; // Next.js ISR

export async function GET() {
  return NextResponse.json(getStatus(), {
    headers: {
      "cache-control":
        "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
