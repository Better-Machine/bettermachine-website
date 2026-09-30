// GET /api/pmo — grouped PMO view (projects by owner, including sparks).
// PMO-only; the public homepage reads /api/projects with status=published.

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { projects, agents, projectTeam } from "@/lib/db/schema";

export async function GET() {
  const allProjects = await db.select().from(projects);
  const allAgents = await db.select().from(agents);
  const team = await db.select().from(projectTeam);

  const agentById = new Map(allAgents.map((a) => [a.id, a]));
  const projectById = new Map(allProjects.map((p) => [p.id, p]));

  const enriched = allProjects.map((p) => {
    const owner = p.ownerAgent ? allAgents.find((a) => a.username === p.ownerAgent) : null;
    const teamMembers = team
      .filter((t) => t.projectId === p.id)
      .map((t) => {
        const a = agentById.get(t.agentId);
        return a ? { username: a.username, name: a.name, role: t.role } : null;
      })
      .filter(Boolean);
    const parent = p.parentProjectId ? projectById.get(p.parentProjectId) : null;
    return {
      ...p,
      ownerName: owner?.name ?? null,
      ownerRole: owner?.role ?? null,
      parentSlug: parent?.slug ?? null,
      parentName: parent?.name ?? null,
      team: teamMembers,
    };
  });

  const grouped: Record<string, typeof enriched> = {};
  for (const e of enriched) {
    const key = e.ownerAgent ?? "unassigned";
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(e);
  }

  return NextResponse.json({
    grouped,
    agents: allAgents,
    totalProjects: allProjects.length,
    asOf: new Date().toISOString(),
  });
}
