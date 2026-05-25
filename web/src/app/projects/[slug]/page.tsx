import { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { ProjectHero } from "@/components/project/ProjectHero";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

interface ProjectPageProps {
  params: { slug: string };
}

// Static export — use dynamic routes with generateStaticParams
export const dynamicParams = false;

// Generate static params for known projects
export async function generateStaticParams() {
  // Return static slugs for export
  return [
    { slug: "hockeyops" },
    { slug: "localzon" },
    { slug: "mesh-memory" },
    { slug: "cleansl8" },
    { slug: "doors" },
  ];
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  // Map slugs to project names
  const projectNames: Record<string, string> = {
    hockeyops: "HockeyOps.ai",
    localzon: "Localzon",
    "mesh-memory": "mesh-memory",
    cleansl8: "CleanSL8",
    doors: "door$",
  };

  const name = projectNames[params.slug] || params.slug;

  return {
    title: `${name} | Better Machine`,
    description: `Learn more about ${name} — a Better Machine venture.`,
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  // Project data from static source (matching Projects.tsx)
  const projectData: Record<
    string,
    {
      name: string;
      tagline: string;
      description: string;
      status: string;
    }
  > = {
    hockeyops: {
      name: "HockeyOps.ai",
      tagline: "AI platform for NHL front offices",
      description:
        "An AI platform for NHL front offices — player evaluation, scouting, ops automation. Built by someone who plays the game, not just watches it. Co-founded with Felix D. Ross, because the best teams are built by people who know the ice.",
      status: "Building",
    },
    localzon: {
      name: "Localzon",
      tagline: "Democratized local commerce",
      description:
        "Ecommerce, reimagined. Built by someone who got his start in online retail and knows where the bodies are buried. No-fee platform for independent stores with consolidated logistics.",
      status: "Research",
    },
    "mesh-memory": {
      name: "mesh-memory",
      tagline: "Memory infrastructure for AI agents",
      description:
        "Multi-agent memory layer with shared knowledge graphs and secure collaboration protocols. The memory system powering Ray, Liz, and Woodhouse.",
      status: "Live",
    },
    cleansl8: {
      name: "CleanSL8",
      tagline: "BLE security for the real world",
      description:
        "Detect and analyze Bluetooth Low Energy devices for security auditing and research.",
      status: "MVP",
    },
    doors: {
      name: "door$",
      tagline: "Direct monetization for musicians",
      description:
        "The music industry is broken. We know because we've been in it. door$ is what happens when a recovering musician decides to fix the thing that nearly broke him.",
      status: "Concept",
    },
  };

  const project = projectData[params.slug];

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />
      <main>
        <ProjectHero
          name={project.name}
          tagline={project.tagline}
          description={project.description}
          status={project.status.toLowerCase()}
        />

        <section className="py-24 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <p className="text-slate-400 text-lg">
                Full project page with overview, gallery, and blog posts coming
                soon.
              </p>
              <a
                href="/"
                className="inline-flex items-center mt-8 text-[#B87333] hover:text-[#B87333]/80 transition-colors"
              >
                <svg
                  className="mr-2 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to home
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
