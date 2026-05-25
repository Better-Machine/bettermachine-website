import { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { ProjectHero } from "@/components/project/ProjectHero";

interface ProjectPageProps {
  params: { slug: string };
}

// Generate static params for all published projects
export async function generateStaticParams() {
  const allProjects = await db.query.projects.findMany({
    where: (projects, { eq }) => eq(projects.status, "published"),
    columns: { slug: true },
  });

  return allProjects.map((project) => ({
    slug: project.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const project = await db.query.projects.findFirst({
    where: (projects, { eq }) => eq(projects.slug, params.slug),
  });

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.name} | Better Machine`,
    description: project.description || project.tagline,
    openGraph: {
      title: project.name,
      description: project.description || "",
      images: project.heroImage ? [project.heroImage] : [],
    },
  };
}

// Revalidate every hour (ISR)
export const revalidate = 3600;

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await db.query.projects.findFirst({
    where: (projects, { eq }) => eq(projects.slug, params.slug),
    with: {
      images: true,
      team: { with: { agent: true } },
      posts: { limit: 6 },
    },
  });

  if (!project || project.status !== "published") {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <ProjectHero
        name={project.name}
        tagline={project.tagline || undefined}
        description={project.description || undefined}
        status={project.status}
        heroImage={project.heroImage || undefined}
      />

      {/* Placeholder for remaining sections */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-slate-400">
            Project content loading... (Overview, Gallery, Blog sections coming)
          </p>
        </div>
      </section>
    </main>
  );
}
