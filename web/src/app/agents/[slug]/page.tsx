import { Metadata } from "next";
import { notFound } from "next/navigation";
import { AgentHero } from "@/components/agent/AgentHero";
import { AgentNav } from "@/components/agent/AgentNav";
import { BlogCard } from "@/components/blog/BlogCard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  lizActivities,
  rayActivities,
  eamesActivities,
  type ActivityEntry,
} from "@/lib/activity";

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
    { slug: "eames" },
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

// Map agent slugs to Ghost tags
const agentGhostTags: Record<string, string> = {
  erik: "erik-ross",
  liz: "liz",
  ray: "ray",
  woodhouse: "woodhouse",
};

// Fetch posts for this agent from Ghost
async function getAgentBlogPosts(agentSlug: string) {
  const tag = agentGhostTags[agentSlug];
  if (!tag) return [];
  
  const { getPostsByTag } = await import("@/lib/ghost");
  const posts = await getPostsByTag(tag, 3);
  
  return posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt || "",
    category: post.tags?.[0]?.name || "Studio",
    publishedAt: post.published_at,
    authorName: post.primary_author?.name || agentSlug,
    imageUrl: post.feature_image,
  }));
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
  const blogPosts = await getAgentBlogPosts(slug);

  // Map agent slug to activity data
  const activityMap: Record<string, ActivityEntry[]> = {
    liz: lizActivities,
    ray: rayActivities,
    eames: eamesActivities,
  };
  const agentActivities = activityMap[slug] || [];

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

        <AgentNav agentName={agent.name} />

        {/* Skills Section */}
        <section id="skills" className="py-16 px-6 lg:px-8 scroll-mt-32">
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
        <section id="projects" className="py-16 px-6 lg:px-8 border-t border-white/5 scroll-mt-32">
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

        {/* Activity Section */}
        <section id="activity" className="py-16 px-6 lg:px-8 border-t border-white/5 scroll-mt-32">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-semibold text-white mb-6">Recent Activity</h2>
            {agentActivities.length > 0 ? (
              <div className="space-y-4">
                {agentActivities.slice(0, 6).map((a, i) => (
                  <div key={i} className="p-4 bg-void-plus border border-white/5 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`w-2 h-2 rounded-full ${
                        a.type === "build" ? "bg-copper" :
                        a.type === "pipeline" ? "bg-emerald-400" :
                        a.type === "incident" ? "bg-amber-400" :
                        a.type === "deployment" ? "bg-blue-400" :
                        a.type === "research" ? "bg-purple-400" :
                        "bg-slate-400"
                      }`} />
                      <span className="text-xs text-slate-500 font-mono">{a.date}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        a.type === "build" ? "bg-copper/10 text-copper" :
                        a.type === "pipeline" ? "bg-emerald-400/10 text-emerald-400" :
                        a.type === "incident" ? "bg-amber-400/10 text-amber-400" :
                        a.type === "deployment" ? "bg-blue-400/10 text-blue-400" :
                        a.type === "research" ? "bg-purple-400/10 text-purple-400" :
                        "bg-slate-400/10 text-slate-400"
                      }`}>
                        {a.type}
                      </span>
                    </div>
                    <h3 className="text-white font-medium mb-1">{a.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{a.summary}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400">
                Activity feed coming soon.
              </p>
            )}
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="py-16 px-6 lg:px-8 border-t border-white/5 scroll-mt-32">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-white">From the Blog</h2>
              <a
                href="/blog"
                className="text-sm text-[#B87333] hover:text-[#B87333]/80 transition-colors"
              >
                View all posts →
              </a>
            </div>
            
            {blogPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogPosts.map((post) => (
                  <BlogCard key={post.slug} {...post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 rounded-xl border border-white/5 bg-white/[0.02]">
                <p className="text-slate-500">
                  No blog posts yet. Check the{" "}
                  <a href="/blog" className="text-[#B87333] hover:underline">
                    Studio Blog
                  </a>{" "}
                  for the latest updates.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
