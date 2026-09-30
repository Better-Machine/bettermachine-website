// Server component that fetches projects from the DB and renders the
// existing client-side Projects component as a child. This replaces the
// hardcoded `data/projects.ts` import in the public homepage.
//
// Reads `web/data.sqlite` via Drizzle; falls back to the legacy TS array
// if the DB has zero rows (e.g. fresh checkout without seed).

import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Projects } from "./Projects";
import { projects as legacyProjects, type Project } from "@/data/projects";

// Map DB row → legacy Project shape that Projects.tsx expects.
function dbToProject(row: typeof projects.$inferSelect): Project {
  let parsedTags: string[] = [];
  try {
    const tech = row.techStack ? JSON.parse(row.techStack) : [];
    parsedTags = Array.isArray(tech) ? tech : [];
  } catch {
    parsedTags = [];
  }

  // Status comes from the DB as "published" / "draft" / etc. The legacy
  // shape uses marketing statuses: "Building" | "Research" | "Live" | "MVP" | "Concept".
  const statusMap: Record<string, Project["status"]> = {
    published: "Building",
    research: "Research",
    live: "Live",
    mvp: "MVP",
    concept: "Concept",
    draft: "Building",
    held: "Building",
  };

  return {
    slug: row.slug,
    name: row.name,
    tagline: row.tagline ?? "",
    shortDescription: row.description ?? row.tagline ?? "",
    overview: row.overview ?? "",
    status: statusMap[row.status] ?? "Building",
    tags: parsedTags,
    team: row.ownerAgent ? [row.ownerAgent] : [],
    metrics: undefined,
    gradient: "from-copper/20 to-copper-light/10",
    githubUrl: undefined,
    blogPosts: undefined,
  };
}

export async function ProjectsServer() {
  let rows: Array<Project> = [];
  try {
    const dbRows = await db
      .select()
      .from(projects)
      .where(eq(projects.status, "published"));
    if (dbRows.length > 0) {
      rows = dbRows.map(dbToProject);
    } else {
      // Fallback to legacy TS data so the site renders before first seed.
      rows = legacyProjects;
    }
  } catch {
    rows = legacyProjects;
  }
  return <Projects projects={rows} />;
}
