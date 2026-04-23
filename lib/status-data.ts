export type ServiceHealth = "operational" | "degraded" | "outage";

export type DayPoint = {
  date: string; // ISO date (YYYY-MM-DD)
  uptime: number; // 0–100
  health: ServiceHealth;
};

export type ServiceStatus = {
  id: string;
  name: string;
  description: string;
  status: ServiceHealth;
  uptime90: number; // average over 90 days
  history: DayPoint[];
};

export type StatusPayload = {
  overall: ServiceHealth;
  services: ServiceStatus[];
  generatedAt: string;
};

type ServiceSeed = {
  id: string;
  name: string;
  description: string;
  baseline: number; // uptime baseline %
  degradedDays: number[]; // day offsets from today that are degraded
  outageDays: number[]; // outage day offsets
};

const services: ServiceSeed[] = [
  {
    id: "api",
    name: "API",
    description: "REST + JSON API powering the dashboard and agent.",
    baseline: 99.99,
    degradedDays: [7, 34],
    outageDays: [],
  },
  {
    id: "builder",
    name: "Builder",
    description: "Autonomous build pipeline: plan → design → code → ship.",
    baseline: 99.8,
    degradedDays: [3, 18, 41, 62],
    outageDays: [56],
  },
  {
    id: "cdn",
    name: "CDN",
    description: "Edge network serving production site assets.",
    baseline: 99.998,
    degradedDays: [],
    outageDays: [],
  },
  {
    id: "auth",
    name: "Auth",
    description: "OAuth sign-in and session management.",
    baseline: 99.95,
    degradedDays: [12],
    outageDays: [],
  },
];

function classifyUptime(uptime: number): ServiceHealth {
  if (uptime < 95) return "outage";
  if (uptime < 99.9) return "degraded";
  return "operational";
}

function seededNoise(seed: number, offset: number) {
  const h = Math.sin(seed * 131 + offset * 7919) * 10000;
  return h - Math.floor(h); // 0..1
}

function computeServiceStatus(
  service: ServiceSeed,
  now: Date,
): ServiceStatus {
  const history: DayPoint[] = [];
  const baseSeed = service.id
    .split("")
    .reduce((acc, c) => acc + c.charCodeAt(0), 0);

  // Build oldest-first so Recharts renders left-to-right chronologically.
  for (let i = 89; i >= 0; i--) {
    const date = new Date(now);
    date.setUTCDate(date.getUTCDate() - i);
    const iso = date.toISOString().slice(0, 10);

    let uptime: number;
    if (service.outageDays.includes(i)) {
      uptime = 82 + seededNoise(baseSeed, i) * 8; // 82–90
    } else if (service.degradedDays.includes(i)) {
      uptime = 98 + seededNoise(baseSeed, i) * 1.5; // 98–99.5
    } else {
      // Baseline with tiny jitter
      uptime =
        Math.min(100, service.baseline + (seededNoise(baseSeed, i) - 0.5) * 0.05);
    }

    history.push({
      date: iso,
      uptime: Math.round(uptime * 100) / 100,
      health: classifyUptime(uptime),
    });
  }

  const avg =
    history.reduce((s, d) => s + d.uptime, 0) / history.length;

  const todayHealth = history[history.length - 1].health;

  return {
    id: service.id,
    name: service.name,
    description: service.description,
    status: todayHealth,
    uptime90: Math.round(avg * 1000) / 1000,
    history,
  };
}

export function getStatus(): StatusPayload {
  const now = new Date();
  const svc = services.map((s) => computeServiceStatus(s, now));
  const overall: ServiceHealth = svc.some((s) => s.status === "outage")
    ? "outage"
    : svc.some((s) => s.status === "degraded")
      ? "degraded"
      : "operational";

  return {
    overall,
    services: svc,
    generatedAt: now.toISOString(),
  };
}
