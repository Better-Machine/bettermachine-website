"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { projects, statusConfig, type Project } from "@/data/projects";
import { ProjectDetail } from "@/components/ProjectDetail";

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const selected: Project | null =
    projects.find((p) => p.slug === selectedSlug) ?? null;

  // Scroll detail panel into view when a card is selected
  useEffect(() => {
    if (selectedSlug && detailRef.current) {
      // small delay so the panel renders before we scroll
      setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  }, [selectedSlug]);

  // Reveal-on-scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1, rootMargin: "-50px" }
    );

    const elements = sectionRef.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-32 bg-void relative overflow-hidden"
    >
      {/* Background texture */}
      <div className="absolute inset-0">
        <Image
          src="/project-cards.png?v=2"
          alt=""
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void via-void/98 to-void" />
      </div>

      {/* Circuit lines */}
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
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20 reveal">
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

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => {
            const status = statusConfig[project.status];
            const isSelected = selectedSlug === project.slug;
            return (
              <button
                key={project.name}
                type="button"
                onClick={() =>
                  setSelectedSlug(isSelected ? null : project.slug)
                }
                aria-pressed={isSelected}
                className={`group relative p-8 bg-gradient-to-br ${project.gradient} backdrop-blur-sm 
                           border ${isSelected ? "border-copper" : "border-white/5 hover:border-copper/50"} 
                           transition-all duration-500 
                           overflow-hidden rounded-xl hover:shadow-[0_8px_40px_rgba(184,115,51,0.15)]
                           reveal text-left w-full
                           ${isSelected ? "shadow-[0_8px_40px_rgba(184,115,51,0.2)]" : ""}`}
              >
                {/* Animated top border */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-copper to-transparent 
                              scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                {/* Card number */}
                <div className="absolute top-4 right-4 text-copper/15 font-mono text-5xl font-bold">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${status.bg} ${status.text} mb-4`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${status.dot} ${
                            project.status === "Live" ? "animate-pulse" : ""
                          }`}
                        />
                        {project.status}
                      </div>
                      <h3 className="text-2xl font-semibold text-snow group-hover:text-copper transition-colors duration-300">
                        {project.name}
                      </h3>
                    </div>
                  </div>

                  {/* Tagline */}
                  <p className="text-copper font-medium mb-4">{project.tagline}</p>

                  {/* Description */}
                  <p className="text-silver/80 text-sm mb-6 leading-relaxed line-clamp-3">
                    {project.shortDescription}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1.5 rounded-full border border-white/10 
                                 text-silver/70 hover:border-copper/50 hover:text-copper 
                                 transition-all duration-300 cursor-default bg-white/[0.02]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Toggle hint */}
                  <div className="mt-6 flex items-center gap-2 text-copper/70 group-hover:text-copper transition-colors">
                    <span className="text-sm font-medium">
                      {isSelected ? "Hide details" : "Learn more"}
                    </span>
                    <svg
                      className={`w-4 h-4 transform transition-transform ${
                        isSelected ? "rotate-180" : "group-hover:translate-x-1"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Inline detail panel */}
        <div ref={detailRef}>
          {selected && <ProjectDetail project={selected} />}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center reveal opacity-0 translate-y-8 transition-all duration-700 ease-dramatic delay-700">
          <p className="text-silver mb-6">Want to collaborate on a venture?</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 border border-copper/50 text-copper 
                     rounded-lg hover:bg-copper hover:text-void transition-all duration-300
                     hover:shadow-glow"
          >
            <span>Get in touch</span>
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
