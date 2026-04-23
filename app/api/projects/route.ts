import { NextResponse } from "next/server";
import { createProject } from "@/lib/project-store";
import { projectInputSchema } from "@/lib/project-schema";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const parsed = projectInputSchema.safeParse(body);
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

  const project = createProject(parsed.data);
  return NextResponse.json({ id: project.id }, { status: 201 });
}
