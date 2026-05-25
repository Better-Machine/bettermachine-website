import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { projects, projectImages, projectTeam, agents, blogPosts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// GET /api/projects/[slug] - Get single project with related data
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const project = await db.query.projects.findFirst({
      where: eq(projects.slug, params.slug),
      with: {
        images: {
          orderBy: (projectImages, { asc }) => [asc(projectImages.order)],
        },
        team: {
          with: {
            agent: true,
          },
        },
        posts: {
          where: eq(blogPosts.status, "published"),
          orderBy: (blogPosts, { desc }) => [desc(blogPosts.publishedAt)],
          limit: 6,
        },
      },
    });
    
    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ project });
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

// PATCH /api/projects/[slug] - Update project (CMS only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await request.json();
    
    const updatedProject = await db.update(projects)
      .set({
        ...body,
        metrics: body.metrics ? JSON.stringify(body.metrics) : undefined,
        techStack: body.techStack ? JSON.stringify(body.techStack) : undefined,
        updatedAt: new Date(),
      })
      .where(eq(projects.slug, params.slug))
      .returning();
    
    if (updatedProject.length === 0) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ project: updatedProject[0] });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}
