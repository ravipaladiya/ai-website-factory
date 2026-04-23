"use client";

import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { DayPoint, ServiceHealth } from "@/lib/status-data";

const palette: Record<ServiceHealth, string> = {
  operational: "#10b981", // emerald-500
  degraded: "#f59e0b", // amber-500
  outage: "#ef4444", // red-500
};

function TooltipBody({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: DayPoint }[];
}) {
  if (!active || !payload || payload.length === 0) return null;
  const p = payload[0].payload;
  return (
    <div className="rounded-md border border-black/10 bg-white px-2.5 py-1.5 text-xs shadow-md dark:border-white/10 dark:bg-[#0b0e1a]">
      <p className="font-medium">
        {new Date(p.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </p>
      <p className="mt-0.5 text-black/70 dark:text-white/70">
        <span className="inline-block capitalize">{p.health}</span>
        <span aria-hidden="true"> · </span>
        <span className="tabular-nums">{p.uptime.toFixed(2)}%</span>
      </p>
    </div>
  );
}

export default function UptimeChart({ history }: { history: DayPoint[] }) {
  return (
    <div
      className="h-12 w-full"
      role="img"
      aria-label={`90-day uptime history. Most recent day on the right.`}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={history}
          margin={{ top: 2, right: 0, bottom: 0, left: 0 }}
          barCategoryGap={1}
        >
          <Tooltip
            cursor={false}
            content={<TooltipBody />}
            wrapperStyle={{ outline: "none" }}
          />
          <Bar dataKey={() => 100} isAnimationActive={false} radius={[2, 2, 0, 0]}>
            {history.map((d) => (
              <Cell key={d.date} fill={palette[d.health]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
