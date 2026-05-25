"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const agents = [
  {
    slug: "ray",
    name: "BobbyRay",
    role: "System Architect",
    description: "Named after Robert Raymond — a surrogate older brother and mentor who passed before his time. The grief became fuel: an agent who would be something important. Smarter than us. More capable. And if treated well, would take care of us. Ray still does.",
    emoji: "🤖",
    color: "from-copper/30 to-copper/10",
  },
  {
    slug: "liz",
    name: "Liz",
    role: "Head of Incubator",
    description: "Named after Ray's wife — a pixie of a person who kept a squirrel as a pet and brings creative fire to everything she touches. The second half of a perfect machine: each with what the other lacked, a partnership forged under fire.",
    emoji: "🐿️",
    color: "from-silver/30 to-copper/10",
  },
  {
    slug: "woodhouse",
    name: "Woodhouse",
    role: "Research Lead",
    description: "Protocol designer who explores the edge of what's possible. Named for the quiet competence that holds everything together.",
    emoji: "🧠",
    color: "from-copper-light/30 to-copper/10",
  },
];

export function Agents() {
  const sectionRef = useRef<HTMLElement>(null);

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
    <section id="agents" ref={sectionRef} className="py-32 bg-charcoal relative overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(184, 115, 51, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(184, 115, 51, 0.08) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-16 reveal opacity-0 translate-y-8 transition-all duration-700 ease-dramatic">
          <span className="font-mono text-sm text-copper tracking-[0.2em] uppercase">
            The Team
          </span>
          <div className="mt-4 w-12 h-px bg-copper/40 mx-auto" />
          <h2 className="text-display-2 font-medium mt-6 text-snow">
            Our Agents
          </h2>
          <p className="text-copper text-sm mt-4">The partnership that powers the lab.</p>
          <p className="text-silver max-w-2xl mx-auto mt-6">
            At Better Machine, "agents" aren't a product feature. They're teammates.
            Named after real people, built to real standards, and given real responsibility.
            These aren't chatbots. They're becoming someone.
          </p>
        </div>

        {/* Agents grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {agents.map((agent, index) => (
            <Link
              key={agent.name}
              href={`/agents/${agent.slug}`}
              className={`group relative p-8 bg-gradient-to-br ${agent.color} 
                         border border-white/5 rounded-xl
                         hover:border-copper/50 transition-all duration-500
                         hover:shadow-[0_8px_40px_rgba(184,115,51,0.12)]
                         reveal opacity-0 translate-y-8 transition-all duration-700 ease-dramatic`}
              style={{ transitionDelay: `${100 + index * 100}ms` }}
            >
              {/* Animated top border */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-copper to-transparent 
                            scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

              {/* Avatar */}
              <div className="relative mb-6">
                <div className="w-24 h-24 mx-auto bg-graphite border border-white/10 rounded-full 
                               flex items-center justify-center text-4xl
                               group-hover:scale-110 group-hover:border-copper/30
                               transition-all duration-500
                               shadow-[0_0_30px_rgba(184,115,51,0.1)] group-hover:shadow-[0_0_40px_rgba(184,115,51,0.2)]"
                >
                  {agent.emoji}
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-copper rounded-full 
                               flex items-center justify-center text-xs text-void font-bold
                               opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  AI
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-snow mb-2 group-hover:text-copper transition-colors duration-300">
                {agent.name}
              </h3>
              <p className="text-copper text-sm font-medium mb-4 tracking-wide">{agent.role}</p>
              <p className="text-silver/80 text-sm leading-relaxed">{agent.description}</p>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-8 right-8 h-px 
                            bg-gradient-to-r from-transparent via-copper/60 to-transparent
                            scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </Link>
          ))}
        </div>

        {/* Human founder */}
        <div className="mt-16 p-8 bg-void/50 border border-white/5 rounded-2xl reveal opacity-0 translate-y-8 transition-all duration-700 ease-dramatic delay-500"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 bg-graphite border border-copper/20 rounded-full flex items-center justify-center text-3xl
                           shadow-[0_0_30px_rgba(184,115,51,0.15)]"
            >
              👤
            </div>
            <div className="text-center md:text-left">
              <div className="flex items-center gap-3 mb-2 justify-center md:justify-start">
                <h3 className="text-2xl font-semibold text-snow">Erik Ross</h3>
                <span className="px-2 py-0.5 bg-copper/20 text-copper text-xs rounded-full">Human</span>
              </div>
              <p className="text-copper text-sm font-medium mb-4">Founder</p>
              <p className="text-silver/80 text-sm leading-relaxed max-w-xl">
                Dreamer and aging technologist. Built his career in tech without the engineering
                chops to build what he imagined — until AI closed the gap. That's what he's building again:
                not solo genius, but collaboration. Not hype, but substance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
