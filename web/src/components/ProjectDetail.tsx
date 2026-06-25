"use client";

import { Project } from "@/data/projects";
import { BlogCard } from "@/components/blog/BlogCard";

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <div className="mt-16 border-t border-white/5 pt-16 reveal animate-in">
      {/* Overview */}
      <section className="py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2">
            <span className="font-mono text-sm text-copper tracking-[0.2em] uppercase">
              Overview
            </span>
            <div className="mt-4 w-12 h-px bg-copper/40" />
            <h3 className="text-3xl font-bold text-snow mt-6 mb-6">
              {project.name} — in depth
            </h3>
            <p className="text-silver/90 text-lg leading-relaxed mb-8">
              {project.overview}
            </p>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border border-copper/40 text-copper 
                         hover:bg-copper hover:text-void rounded-lg transition-all duration-300
                         hover:shadow-glow"
              >
                <svg
                  className="mr-2 h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.308.678.92.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.193 22 16.438 22 12.017 22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
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
                <h4 className="text-sm font-mono text-copper uppercase tracking-wider mb-4">
                  At a Glance
                </h4>
                <div className="space-y-4">
                  {project.metrics.map((metric) => (
                    <div key={metric.label}>
                      <div className="text-silver/60 text-sm">{metric.label}</div>
                      <div className="text-snow font-medium">{metric.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Team */}
            <div className="p-6 rounded-xl border border-white/5 bg-white/[0.02]">
              <h4 className="text-sm font-mono text-copper uppercase tracking-wider mb-4">
                Team
              </h4>
              <div className="space-y-3">
                {project.team.map((member) => (
                  <div key={member} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-copper/20 flex items-center justify-center text-copper text-sm font-medium">
                      {member.charAt(0)}
                    </div>
                    <span className="text-silver/90">{member}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="p-6 rounded-xl border border-white/5 bg-white/[0.02]">
              <h4 className="text-sm font-mono text-copper uppercase tracking-wider mb-4">
                Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1.5 rounded-full border border-white/10 
                             text-silver/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts (if any) */}
      {project.blogPosts && project.blogPosts.length > 0 && (
        <section className="py-12 border-t border-white/5">
          <h4 className="text-2xl font-bold text-snow mb-8">From the Blog</h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.blogPosts.map((post) => (
              <BlogCard key={post.slug} {...post} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
