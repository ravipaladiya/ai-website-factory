import { randomUUID } from "crypto";

export const demoTemplates = [
  { id: "saas-landing", label: "SaaS Landing Page" },
  { id: "portfolio", label: "Portfolio" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "blog", label: "Blog" },
  { id: "docs", label: "Docs Site" },
] as const;

export type DemoTemplateId = (typeof demoTemplates)[number]["id"];
export const demoTemplateIds = demoTemplates.map((t) => t.id) as [
  DemoTemplateId,
  ...DemoTemplateId[],
];

export type DemoSession = {
  id: string;
  description: string;
  template: DemoTemplateId;
  createdAt: number;
};

const globalForStore = globalThis as unknown as {
  __demoStore?: Map<string, DemoSession>;
};
const store: Map<string, DemoSession> =
  globalForStore.__demoStore ?? new Map<string, DemoSession>();
globalForStore.__demoStore = store;

export function createDemo(
  description: string,
  template: DemoTemplateId,
): DemoSession {
  const id = randomUUID();
  const session: DemoSession = {
    id,
    description,
    template,
    createdAt: Date.now(),
  };
  store.set(id, session);
  return session;
}

export function getDemo(id: string): DemoSession | undefined {
  return store.get(id);
}

export type DemoEvent =
  | { type: "log"; message: string }
  | { type: "ready"; template: DemoTemplateId };

export function demoScript(session: DemoSession): { delayMs: number; event: DemoEvent }[] {
  const t = session.template;
  const tmpl =
    demoTemplates.find((x) => x.id === t)?.label ?? t;

  const common: { message: string; ms: number }[] = [
    { message: "Planning site architecture…", ms: 900 },
    { message: `Scoping ${tmpl.toLowerCase()} layout`, ms: 800 },
    { message: "Drafting color tokens and typography scale", ms: 900 },
    { message: "Generating Hero component…", ms: 900 },
    { message: "Generating section layouts…", ms: 900 },
    { message: "Writing meta tags…", ms: 700 },
    { message: "Emitting OpenGraph card", ms: 700 },
    { message: "Injecting JSON-LD structured data", ms: 800 },
    { message: "Wiring responsive breakpoints (sm / md / lg / xl)", ms: 900 },
    { message: "Running tsc --noEmit", ms: 700 },
    { message: "Running eslint", ms: 700 },
    { message: "Running Lighthouse audits", ms: 900 },
    { message: "Assembling preview bundle", ms: 900 },
    { message: `Preview ready · template: ${t}`, ms: 500 },
  ];

  const events: { delayMs: number; event: DemoEvent }[] = common.map(
    (step) => ({
      delayMs: step.ms,
      event: { type: "log", message: step.message },
    }),
  );
  events.push({
    delayMs: 400,
    event: { type: "ready", template: t },
  });
  return events;
}
