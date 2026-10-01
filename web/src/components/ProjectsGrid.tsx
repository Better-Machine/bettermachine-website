"use client";

import { useEffect, useRef, useState } from "react";
import { ProjectDetail } from "@/components/ProjectDetail";

export interface ProjectsGridItem {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  status: string;
  overview: string;
  metrics: Record<string, string>;
  techStack: string[];
  gradient: string;
  tags: string[];
  shortDescription: string;
}

const STATUS_CONFIG: Record<string, { bg: string; text: string; dot: string }> = {
  draft: { bg: "bg-white/10", text: "text-white/60", dot: "bg-white/40" },
  published: { bg: "bg-emerald-500/20", text: "text-emerald-300", dot: "bg-emerald-400" },
  building: { bg: "bg-amber-500/20", text: "text-amber-300", dot: "bg-amber-400" },
  research: { bg: "bg-blue-500/20", text: "text-blue-300", dot: "bg-blue-400" },
  live: { bg: "bg-emerald-500/20", text: "text-emerald-300", dot: "bg-emerald-400" },
  mvp: { bg: "bg-violet-500/20", text: "text-violet-300", dot: "bg-violet-400" },
  concept: { bg: "bg-white/10", text: "text-white/60", dot: "bg-white/40" },
  held: { bg: "bg-red-500/20", text: "text-red-300", dot: "bg-red-400" },
};

export function ProjectsGrid({ projects }: { projects: ProjectsGridItem[] }) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  const selected = projects.find((p) => p.slug === selectedSlug) ?? null;

  useEffect(() => {
    if (selectedSlug && detailRef.current) {
      setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  }, [selectedSlug]);

  if (projects.length === 0) {
    return (
      <div className="text-center py-20 text-silver/60">
        No public projects yet.
      </div>
    );
  }

  return (
    <>
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, index) => {
          const status = STATUS_CONFIG[project.status] || STATUS_CONFIG.published;
          const isSelected = selectedSlug === project.slug;
          return (
            <button
              key={project.slug}
              type="button"
              onClick={() => setSelectedSlug(isSelected ? null : project.slug)}
              aria-pressed={isSelected}
              className={`group relative p-8 bg-gradient-to-br ${project.gradient} backdrop-blur-sm 
                         border ${isSelected ? "border-copper" : "border-white/5 hover:border-copper/50"} 
                         transition-all duration-500 overflow-hidden rounded-xl text-left w-full
                         ${isSelected ? "shadow-[0_8px_40px_rgba(184,115,51,0.2)]" : ""}`}
            >
              <div className="absolute top-4 right-4 text-copper/15 font-mono text-5xl font-bold">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${status.bg} ${status.text} mb-4`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                      {project.status}
                    </div>
                    <h3 className="text-2xl font-semibold text-snow group-hover:text-copper transition-colors duration-300">
                      {project.name}
                    </h3>
                  </div>
                </div>
                <p className="text-copper font-medium mb-4">{project.tagline}</p>
                <p className="text-silver/80 text-sm mb-6 leading-relaxed line-clamp-3">
                  {project.shortDescription}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1.5 rounded-full border border-white/10 
                               text-silver/70 bg-white/[0.02]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-2 text-copper/70 group-hover:text-copper transition-colors">
                  <span className="text-sm font-medium">
                    {isSelected ? "Hide details" : "Learn more"}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      <div ref={detailRef}>
        {selected && <ProjectDetail project={selected} />}
      </div>
    </>
  );
}
