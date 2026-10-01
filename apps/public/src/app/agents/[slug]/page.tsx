import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@bm/ui/Header";
import { Footer } from "@bm/ui/Footer";
import { getAgentByUsername, getAllProjects, getPublishedAgents } from "@bm/db";

const AGENT_META: Record<string, { emoji: string; accent: string }> = {
  ray: { emoji: "🤖", accent: "from-copper/30 to-copper/10" },
  liz: { emoji: "🐿️", accent: "from-silver/30 to-copper/10" },
  woodhouse: { emoji: "🧠", accent: "from-copper-light/30 to-copper/10" },
  eames: { emoji: "🔧", accent: "from-charcoal to-copper/10" },
};

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const agents = await getPublishedAgents();
  return agents.map((a) => ({ slug: a.username }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const agent = await getAgentByUsername(slug);
  if (!agent) return { title: "Page Not Found | Better Machine" };
  return {
    title: `${agent.name} | Better Machine`,
    description: agent.bio || `${agent.role} at Better Machine`,
  };
}

export default async function AgentPage({ params }: PageProps) {
  const { slug } = await params;
  const agent = await getAgentByUsername(slug);
  if (!agent) notFound();

  const allProjects = await getAllProjects();
  const agentProjects = allProjects.filter(
    (p) => p.ownerAgent === agent.username || (agent.username === "erik" && p.ownerAgent === null)
  );

  let skills: string[] = [];
  try {
    skills = agent.skills ? JSON.parse(agent.skills) : [];
  } catch {}

  const meta = AGENT_META[agent.username] || { emoji: "👤", accent: "from-charcoal to-copper/10" };

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />

      <main>
        <section className={`relative min-h-[60vh] flex items-center overflow-hidden border-b border-white/5 bg-gradient-to-br ${meta.accent}`}>
          <div className="relative max-w-5xl mx-auto px-6 py-24 w-full grid md:grid-cols-[auto_1fr] gap-10 items-center">
            <div className="w-32 h-32 bg-graphite border border-white/10 rounded-full flex items-center justify-center text-6xl shadow-[0_0_40px_rgba(184,115,51,0.2)]">
              {meta.emoji}
            </div>
            <div>
              <div className="text-sm text-[#B87333] uppercase tracking-[0.3em] mb-3">@{agent.username}</div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-3">{agent.name}</h1>
              <p className="text-xl text-[#B87333] font-medium">{agent.role}</p>
              {agent.bio && (
                <p className="mt-6 text-lg text-silver leading-relaxed max-w-2xl">{agent.bio}</p>
              )}
              <div className="flex gap-4 mt-6 text-sm">
                {agent.githubUrl && (
                  <a href={agent.githubUrl} target="_blank" rel="noopener noreferrer" className="text-[#B87333] hover:underline">
                    GitHub
                  </a>
                )}
                {agent.twitterUrl && (
                  <a href={agent.twitterUrl} target="_blank" rel="noopener noreferrer" className="text-[#B87333] hover:underline">
                    Twitter
                  </a>
                )}
                {agent.linkedinUrl && (
                  <a href={agent.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-[#B87333] hover:underline">
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {skills.length > 0 && (
          <section className="py-16 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-semibold text-white mb-6">Skills</h2>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
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
        )}

        {agentProjects.length > 0 && (
          <section className="py-16 px-6 lg:px-8 border-t border-white/5">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-semibold text-white mb-6">Projects</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {agentProjects.map((project) => (
                  <Link
                    key={project.slug}
                    href={`/projects/${project.slug}`}
                    className="p-6 rounded-xl border border-white/5 hover:border-[#B87333]/50 transition-colors group"
                  >
                    <h3 className="text-lg font-medium text-white group-hover:text-[#B87333] transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-silver text-sm mt-1">{project.tagline}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
