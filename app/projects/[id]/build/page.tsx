import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BuildView from "@/components/project-build/BuildView";
import { getProject } from "@/lib/project-store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Build",
  robots: { index: false, follow: false },
};

export default function BuildPage({
  params,
}: {
  params: { id: string };
}) {
  const project = getProject(params.id);
  if (!project) notFound();

  return (
    <main id="main" className="min-h-screen px-4 py-10 sm:px-6 sm:py-14">
      <BuildView projectId={project.id} brandName={project.input.brandName} />
    </main>
  );
}
