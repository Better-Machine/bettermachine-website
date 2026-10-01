export const dynamic = "force-dynamic";

import { getProjectById, getAllAgents, getAllProjects } from "@/lib/db/queries";
import { notFound } from "next/navigation";
import { ProjectEditForm } from "@/components/admin/ProjectEditForm";

export default async function AdminProjectEdit({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [project, agents, allProjects] = await Promise.all([
    getProjectById(parseInt(id)),
    getAllAgents(),
    getAllProjects(),
  ]);
  if (!project) notFound();

  const parentCandidates = allProjects.filter((p) => p.id !== project.id);

  return (
    <div className="space-y-6">
      <div className="flex items-baseline justify-between">
        <h2 className="text-2xl font-light">Edit · {project.name}</h2>
        <span className="text-xs text-[#A0A0A0] font-mono">{project.slug}</span>
      </div>
      <ProjectEditForm project={project} agents={agents} parentCandidates={parentCandidates} />
    </div>
  );
}
