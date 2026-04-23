import { NextResponse } from "next/server";
import { z } from "zod";
import { createDemo, demoTemplateIds } from "@/lib/demo-store";

const bodySchema = z.object({
  description: z
    .string()
    .trim()
    .min(1, "Describe your site.")
    .max(200, "Keep it under 200 characters."),
  template: z.enum(demoTemplateIds),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validation failed.",
        issues: parsed.error.issues.map((i) => ({
          path: i.path.join("."),
          message: i.message,
        })),
      },
      { status: 400 },
    );
  }

  const session = createDemo(parsed.data.description, parsed.data.template);
  return NextResponse.json({ id: session.id }, { status: 201 });
}
