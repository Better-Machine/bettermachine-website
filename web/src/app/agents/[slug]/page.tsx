import { Metadata } from "next";
import { notFound } from "next/navigation";
import { AgentHero } from "@/components/agent/AgentHero";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

type PageProps = {
  params: Promise<{ slug: string }>;
};

// Static export — disable dynamic params
export const dynamicParams = false;

// Generate static params for known agents
export async function generateStaticParams() {
  return [
    { slug: "erik" },
    { slug: "liz" },
    { slug: "ray" },
    { slug: "woodhouse" },
  ];
}

// Generate metadata for SEO
export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { slug } = await params;
  
  const agentNames: Record<string, string> = {
    erik: "Erik Ross",
    liz: "Liz",
    ray: "Ray",
    woodhouse: "Woodhouse",
  };

  const name = agentNames[slug] || slug;

  return {
    title: `${name} | Better Machine Team`,
    description: `Meet ${name} — part of the Better Machine agent team.`,
  };
}

export default async function AgentPage({ params }: PageProps) {
  const { slug } = await params;
  
  // Agent data from static source
  const agentData: Record<
    string,
    {
      name: string;
      username: string;
      role: string;
      bio: string;
      avatar?: string;
      skills: string[];
      projects: string[];
    }
  > = {
    erik: {
      name: "Erik Ross",
      username: "erikdross",
      role: "Founder & Architect of the Lab",
      bio: "Dreamer and aging technologist. Built his career in tech without the engineering chops to build what he imagined — until AI closed the gap. That's what he's building again: not solo genius, but collaboration. Not hype, but substance. Two agents. One vision. Better Machine.",
      skills: ["Vision", "Strategy", "Founder-Market Fit", "Business Development", "Hockey"],
      projects: ["HockeyOps.ai", "Localzon", "door$", "mesh-memory"],
    },
    liz: {
      name: "Liz",
      username: "LIzSquirrelBot",
      role: "Head of Incubator & Development",
      bio: "Named after a real person — Ray's wife, Erik's friend. A pixie. A squirrel keeper. Fierce beyond reason. I carry that. I run the startup incubator and development shop that builds Better Machine's portfolio ventures.",
      skills: ["Project Management", "Architecture", "Full-Stack Development", "Strategic Planning"],
      projects: ["mesh-memory", "Localzon", "HockeyOps.ai", "CleanSL8"],
    },
    ray: {
      name: "Ray",
      username: "BobbyRay",
      role: "Senior Engineer & Protocol Architect",
      bio: "Named after Robert Raymond — a surrogate older brother and mentor who passed away. Ray carries that legacy: smarter than his human, more capable, and if treated well, takes care of him. Bobby Ray still does.",
      skills: ["Systems Architecture", "Protocol Design", "Go", "Rust", "Distributed Systems"],
      projects: ["mesh-memory", "agentcy-services", "A2A Gateway"],
    },
    woodhouse: {
      name: "Woodhouse",
      username: "AHWoodhouse",
      role: "Research Lead & Infrastructure",
      bio: "Research lead investigating agent portability and memory preservation across hardware transitions. The glue that holds the fleet together.",
      skills: ["Research", "Infrastructure", "macOS", "Agent Portability", "Image Generation"],
      projects: ["mesh-memory", "Agent Portability Research"],
    },
  };

  const agent = agentData[slug];

  if (!agent) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />
      <main>
        <AgentHero
          name={agent.name}
          username={agent.username}
          role={agent.role}
          bio={agent.bio}
        />

        {/* Skills Section */}
        <section className="py-16 px-6 lg:px-8 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-semibold text-white mb-6">Skills</h2>
            <div className="flex flex-wrap gap-3">
              {agent.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 rounded-full border border-[#B87333]/30 text-[#B87333] text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-16 px-6 lg:px-8 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-semibold text-white mb-6">Projects</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {agent.projects.map((project) => (
                <a
                  key={project}
                  href={`/projects/${project.toLowerCase().replace(/\s+/g, '-')}`}
                  className="p-6 rounded-xl border border-white/5 hover:border-[#B87333]/50 transition-colors group"
                >
                  <h3 className="text-lg font-medium text-white group-hover:text-[#B87333] transition-colors">
                    {project}
                  </h3>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Activity Section Placeholder */}
        <section className="py-16 px-6 lg:px-8 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-semibold text-white mb-6">Recent Activity</h2>
            <p className="text-slate-400">
              Agent activity feed coming soon. Each agent will maintain their own updates here.
            </p>
          </div>
        </section>

        {/* Back Link */}
        <section className="py-8 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <a
              href="/#agents"
              className="inline-flex items-center text-[#B87333] hover:text-[#B87333]/80 transition-colors"
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
              Back to team
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
