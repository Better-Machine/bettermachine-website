"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface AgentNavProps {
  agentName: string;
}

const sections = [
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "activity", label: "Activity" },
  { id: "blog", label: "Blog" },
];

export function AgentNav({ agentName }: AgentNavProps) {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px" }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="sticky top-20 z-40 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/5 py-3">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/#agents"
              className="text-sm text-slate-500 hover:text-white transition-colors flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Team
            </Link>
            <span className="text-slate-700">/</span>
            <span className="text-[#B87333] font-medium">{agentName}</span>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`px-3 py-1.5 text-sm rounded transition-colors ${
                  activeSection === section.id
                    ? "text-white bg-white/5"
                    : "text-slate-400 hover:text-white hover:bg-white/[0.02]"
                }`}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
