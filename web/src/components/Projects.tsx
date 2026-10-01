import Image from "next/image";
import { getPublicProjects } from "@/lib/db/queries";
import { ProjectsGrid } from "./ProjectsGrid";

export async function Projects() {
  const rows = await getPublicProjects();

  // Map DB rows to the shape ProjectsGrid expects
  const projects = rows.map((r) => {
    let metrics: any = {};
    try {
      metrics = r.metrics ? JSON.parse(r.metrics) : {};
    } catch {}
    let techStack: string[] = [];
    try {
      techStack = r.techStack ? JSON.parse(r.techStack) : [];
    } catch {}
    return {
      slug: r.slug,
      name: r.name,
      tagline: r.tagline || "",
      description: r.description || "",
      status: r.status,
      overview: r.overview || "",
      metrics,
      techStack,
      gradient: pickGradient(r.slug),
      tags: techStack.slice(0, 4),
      shortDescription: r.tagline || r.description || "",
    };
  });

  return (
    <section
      id="projects"
      className="py-32 bg-void relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image
          src="/project-cards.png?v=2"
          alt=""
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void via-void/98 to-void" />
      </div>

      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(184, 115, 51, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(184, 115, 51, 0.1) 1px, transparent 1px)`,
            backgroundSize: "120px 120px",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20">
          <div>
            <span className="font-mono text-sm text-copper tracking-[0.2em] uppercase">
              Portfolio
            </span>
            <div className="mt-4 w-12 h-px bg-copper/40" />
            <h2 className="text-display-2 font-medium mt-6 text-snow">
              What We&apos;re Building
            </h2>
          </div>
          <p className="text-silver max-w-md mt-8 md:mt-0 md:text-right">
            Every venture starts the same way: someone lived a problem, then decided to solve it.
            Founder-market fit — the real kind.
          </p>
        </div>

        <ProjectsGrid projects={projects} />
      </div>
    </section>
  );
}

function pickGradient(slug: string): string {
  const map: Record<string, string> = {
    hockeyops: "from-blue-500/10 to-blue-900/5",
    localzon: "from-emerald-500/10 to-emerald-900/5",
    "mesh-memory": "from-violet-500/10 to-violet-900/5",
    cleansl8: "from-amber-500/10 to-amber-900/5",
    doors: "from-rose-500/10 to-rose-900/5",
  };
  return map[slug] || "from-copper/10 to-void";
}
