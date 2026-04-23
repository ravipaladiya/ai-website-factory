import { randomUUID } from "crypto";
import type { ProjectInput } from "./project-schema";

export type BuildPhase = "Planning" | "Designing" | "Building" | "Testing" | "Done";

export const buildPhases: BuildPhase[] = [
  "Planning",
  "Designing",
  "Building",
  "Testing",
  "Done",
];

export type BuildEvent =
  | { type: "log"; phase: BuildPhase; message: string; progress: number }
  | { type: "phase"; phase: BuildPhase; progress: number }
  | { type: "done"; progress: 100 };

export type Project = {
  id: string;
  input: ProjectInput;
  createdAt: number;
};

// In-memory store. Fine for a single-node demo; swap for a DB in production.
// Pinned to globalThis so Next.js dev-mode module re-compilation doesn't wipe
// state between the POST /api/projects and subsequent GET /stream call.
const globalForStore = globalThis as unknown as {
  __projectStore?: Map<string, Project>;
};
const store: Map<string, Project> =
  globalForStore.__projectStore ?? new Map<string, Project>();
globalForStore.__projectStore = store;

export function createProject(input: ProjectInput): Project {
  const id = randomUUID();
  const project: Project = { id, input, createdAt: Date.now() };
  store.set(id, project);
  return project;
}

export function getProject(id: string): Project | undefined {
  return store.get(id);
}

export function buildScript(project: Project): { delayMs: number; event: BuildEvent }[] {
  const { input } = project;
  const brand = input.brandName || "Your brand";
  const pageCount = input.pages.length;

  const steps: { phase: BuildPhase; message: string; ms: number }[] = [
    { phase: "Planning", message: `Analyzing brief for "${brand}"...`, ms: 600 },
    { phase: "Planning", message: `Scoping ${input.siteType} site with ${pageCount} page(s)`, ms: 700 },
    { phase: "Planning", message: "Drafting information architecture", ms: 600 },

    { phase: "Designing", message: `Seeding Tailwind tokens from ${input.primaryColor}`, ms: 600 },
    { phase: "Designing", message: `Composing ${input.tone.toLowerCase()} tone voice system`, ms: 650 },
    { phase: "Designing", message: "Generating mobile-first layouts", ms: 700 },

    { phase: "Building", message: "Scaffolding Next.js App Router project", ms: 700 },
    { phase: "Building", message: "Emitting React + TypeScript components", ms: 800 },
    ...input.pages.map((p) => ({
      phase: "Building" as const,
      message: `Building /${p === "home" ? "" : p}`,
      ms: 550,
    })),
    { phase: "Building", message: "Wiring SEO metadata and JSON-LD", ms: 600 },

    { phase: "Testing", message: "Running tsc --noEmit", ms: 600 },
    { phase: "Testing", message: "Running eslint", ms: 550 },
    { phase: "Testing", message: "Running Lighthouse audits", ms: 700 },
    { phase: "Testing", message: "Checking responsive breakpoints", ms: 600 },

    { phase: "Done", message: `Site ready — ${pageCount} page(s) shipped`, ms: 500 },
  ];

  const total = steps.length;
  const events: { delayMs: number; event: BuildEvent }[] = [];
  let lastPhase: BuildPhase | null = null;

  steps.forEach((step, i) => {
    const progress = Math.round(((i + 1) / total) * 100);

    if (step.phase !== lastPhase) {
      events.push({
        delayMs: step.ms / 2,
        event: { type: "phase", phase: step.phase, progress },
      });
      lastPhase = step.phase;
    }

    events.push({
      delayMs: step.ms,
      event: {
        type: "log",
        phase: step.phase,
        message: step.message,
        progress,
      },
    });
  });

  events.push({ delayMs: 400, event: { type: "done", progress: 100 } });
  return events;
}
