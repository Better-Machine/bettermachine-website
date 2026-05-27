import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectHero } from "@/components/project/ProjectHero";
import { BlogCard } from "@/components/blog/BlogCard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

type PageProps = {
  params: Promise<{ slug: string }>;
};

// Static export — disable dynamic params
export const dynamicParams = false;

// Generate static params for known projects
export async function generateStaticParams() {
  return [
    { slug: "hockeyops" },
    { slug: "localzon" },
    { slug: "mesh-memory" },
    { slug: "cleansl8" },
    { slug: "doors" },
  ];
}

// Generate metadata for SEO
export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { slug } = await params;
  
  const projectNames: Record<string, string> = {
    hockeyops: "HockeyOps.ai",
    localzon: "Localzon",
    "mesh-memory": "mesh-memory",
    cleansl8: "CleanSL8",
    doors: "door$",
  };

  const name = projectNames[slug] || slug;

  return {
    title: `${name} | Better Machine`,
    description: `Learn more about ${name} — a Better Machine venture.`,
  };
}

// Extended project data with team and links
const projectData: Record<
  string,
  {
    name: string;
    tagline: string;
    description: string;
    status: string;
    overview: string;
    githubUrl?: string;
    team: string[];
    metrics?: { label: string; value: string }[];
  }
> = {
  hockeyops: {
    name: "HockeyOps.ai",
    tagline: "AI platform for NHL front offices",
    description: "An AI platform for NHL front offices — player evaluation, scouting, ops automation. Built by someone who plays the game, not just watches it.",
    status: "Building",
    overview: "HockeyOps.ai brings AI-powered analytics to NHL front offices. We combine computer vision, statistical modeling, and domain expertise from inside the game to deliver insights that matter.",
    githubUrl: "https://github.com/Better-Machine/hockeyops",
    team: ["Erik Ross", "Felix D. Ross"],
    metrics: [
      { label: "Status", value: "Private Beta" },
      { label: "Target", value: "NHL Teams" },
    ],
  },
  localzon: {
    name: "Localzon",
    tagline: "Democratized local commerce",
    description: "Ecommerce, reimagined. No-fee platform for independent stores with consolidated logistics.",
    status: "Research",
    overview: "Localzon is building the infrastructure for local commerce — connecting independent retailers with customers through a unified platform that respects margins and simplifies logistics.",
    team: ["Erik Ross"],
    metrics: [
      { label: "Launch City", value: "Denver, CO" },
      { label: "Model", value: "Zero-fee" },
    ],
  },
  "mesh-memory": {
    name: "mesh-memory",
    tagline: "Memory infrastructure for AI agents",
    description: "Multi-agent memory layer with shared knowledge graphs and secure collaboration protocols.",
    status: "Live",
    overview: "mesh-memory is the shared brain powering Better Machine's agent fleet. It provides persistent memory, knowledge graphs, and secure collaboration protocols for multi-agent systems.",
    githubUrl: "https://github.com/Better-Machine/mesh-memory",
    team: ["Ray", "Liz", "Woodhouse"],
    metrics: [
      { label: "Status", value: "Production" },
      { label: "Agents", value: "3 Active" },
    ],
  },
  cleansl8: {
    name: "CleanSL8",
    tagline: "BLE security for the real world",
    description: "Detect and analyze Bluetooth Low Energy devices for security auditing and research.",
    status: "MVP",
    overview: "CleanSL8 provides BLE device detection and analysis for security professionals. Built for real-world auditing scenarios with mobile-first architecture.",
    team: ["Christian", "Erik Ross"],
    metrics: [
      { label: "Platform", value: "iOS / Android" },
      { label: "Focus", value: "Security Audit" },
    ],
  },
  doors: {
    name: "door$",
    tagline: "Direct monetization for musicians",
    description: "The music industry is broken. door$ is what happens when a recovering musician decides to fix it.",
    status: "Concept",
    overview: "door$ enables musicians to monetize directly from their audience — no labels, no middlemen, no predatory contracts. Just fans supporting the artists they love.",
    team: ["Erik Ross"],
    metrics: [
      { label: "Target", value: "Indie Artists" },
      { label: "Model", value: "Direct Fan" },
    ],
  },
};

// Mock blog posts per project
const projectBlogPosts: Record<string, any[]> = {
  "mesh-memory": [
    {
      slug: "mesh-memory-launch",
      title: "mesh-memory Goes Live",
      excerpt: "The shared memory system powering our agent fleet is now production-ready. Here's what we built and why it matters.",
      category: "Infrastructure",
      publishedAt: "2026-05-15",
      authorName: "Liz",
    },
  ],
  hockeyops: [],
  localzon: [],
  cleansl8: [],
  doors: [],
};

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projectData[slug];

  if (!project) {
    notFound();
  }

  const blogPosts = projectBlogPosts[slug] || [];

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

        {/* Overview Section */}
        <section className="py-24 px-6 lg:px-8 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main content */}
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold text-white mb-6">Overview</h2>
                <p className="text-slate-300 text-lg leading-relaxed mb-8">
                  {project.overview}
                </p>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 border border-slate-600 text-white hover:bg-slate-800 rounded transition-colors"
                  >
                    <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.308.678.92.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.193 22 16.438 22 12.017 22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    View on GitHub
                  </a>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Metrics */}
                {project.metrics && (
                  <div className="p-6 rounded-xl border border-white/5 bg-white/[0.02]">
                    <h3 className="text-sm font-mono text-[#B87333] uppercase tracking-wider mb-4">
                      At a Glance
                    </h3>
                    <div className="space-y-4">
                      {project.metrics.map((metric) => (
                        <div key={metric.label}>
                          <div className="text-slate-500 text-sm">{metric.label}</div>
                          <div className="text-white font-medium">{metric.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Team */}
                <div className="p-6 rounded-xl border border-white/5 bg-white/[0.02]">
                  <h3 className="text-sm font-mono text-[#B87333] uppercase tracking-wider mb-4">
                    Team
                  </h3>
                  <div className="space-y-3">
                    {project.team.map((member) => (
                      <div key={member} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#B87333]/20 flex items-center justify-center text-[#B87333] text-sm font-medium">
                          {member.charAt(0)}
                        </div>
                        <span className="text-slate-300">{member}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-24 px-6 lg:px-8 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">Gallery</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="aspect-video rounded-xl border border-white/5 bg-white/[0.02] flex items-center justify-center"
                >
                  <span className="text-slate-600">Image {i}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Section */}
        <section className="py-24 px-6 lg:px-8 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">From the Blog</h2>
              <a
                href="/blog"
                className="inline-flex items-center text-[#B87333] hover:text-[#B87333]/80 transition-colors"
              >
                View all posts
                <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
            {blogPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogPosts.map((post) => (
                  <BlogCard key={post.slug} {...post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 rounded-xl border border-white/5 bg-white/[0.02]">
                <p className="text-slate-500">
                  Blog posts coming soon. Check the{" "}
                  <a href="/blog" className="text-[#B87333] hover:underline">
                    Studio Blog
                  </a>{" "}
                  for updates.
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
