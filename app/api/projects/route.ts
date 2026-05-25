import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// GET /api/projects - List all published projects
export async function GET() {
  try {
    const allProjects = await db.query.projects.findMany({
      where: eq(projects.status, "published"),
      orderBy: (projects, { desc }) => [desc(projects.publishedAt)],
    });
    
    return NextResponse.json({ projects: allProjects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST /api/projects - Create new project (CMS only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const newProject = await db.insert(projects).values({
      slug: body.slug,
      name: body.name,
      tagline: body.tagline,
      description: body.description,
      status: body.status || "draft",
      heroImage: body.heroImage,
      overview: body.overview,
      metrics: JSON.stringify(body.metrics || {}),
      techStack: JSON.stringify(body.techStack || []),
    }).returning();
    
    return NextResponse.json({ project: newProject[0] }, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
