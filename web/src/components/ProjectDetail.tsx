"use client";

import { BlogCard } from "@/components/blog/BlogCard";
import type { ProjectsGridItem } from "./ProjectsGrid";

interface ProjectDetailProps {
  project: ProjectsGridItem & { githubUrl?: string; team?: string[]; blogPosts?: any[] };
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  // metrics is a Record<string, string> from the DB; flatten to { label, value }[]
  const metricsArray: { label: string; value: string }[] = project.metrics
    ? Object.entries(project.metrics).map(([label, value]) => ({ label, value: String(value) }))
    : [];
  const team = project.team || [];

  return (
    <div className="mt-16 border-t border-white/5 pt-16">
      <section className="py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <span className="font-mono text-sm text-copper tracking-[0.2em] uppercase">
              Overview
            </span>
            <div className="mt-4 w-12 h-px bg-copper/40" />
            <h3 className="text-3xl font-bold text-snow mt-6 mb-6">
              {project.name} — in depth
            </h3>
            <p className="text-silver/90 text-lg leading-relaxed mb-8 whitespace-pre-line">
              {project.overview || project.description}
            </p>
          </div>

          <div className="space-y-6">
            {metricsArray.length > 0 && (
              <div className="p-6 rounded-xl border border-white/5 bg-white/[0.02]">
                <h4 className="text-sm font-mono text-copper uppercase tracking-wider mb-4">
                  At a Glance
                </h4>
                <div className="space-y-4">
                  {metricsArray.map((metric) => (
                    <div key={metric.label}>
                      <div className="text-silver/60 text-sm">{metric.label}</div>
                      <div className="text-snow font-medium">{metric.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {team.length > 0 && (
              <div className="p-6 rounded-xl border border-white/5 bg-white/[0.02]">
                <h4 className="text-sm font-mono text-copper uppercase tracking-wider mb-4">
                  Team
                </h4>
                <div className="space-y-3">
                  {team.map((member) => (
                    <div key={member} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-copper/20 flex items-center justify-center text-copper text-sm font-medium">
                        {member.charAt(0)}
                      </div>
                      <span className="text-silver/90">{member}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="p-6 rounded-xl border border-white/5 bg-white/[0.02]">
              <h4 className="text-sm font-mono text-copper uppercase tracking-wider mb-4">
                Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-silver/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {project.blogPosts && project.blogPosts.length > 0 && (
        <section className="py-12 border-t border-white/5">
          <h4 className="text-2xl font-bold text-snow mb-8">From the Blog</h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.blogPosts.map((post: any) => (
              <BlogCard key={post.slug} {...post} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
