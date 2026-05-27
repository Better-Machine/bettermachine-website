import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Our Agents | Better Machine",
  description: "Meet the agents that power Better Machine. Named after real people, built to real standards, and given real responsibility. These aren't chatbots. They're becoming someone.",
};

const agents = [
  {
    slug: "ray",
    name: "BobbyRay",
    role: "The Builder",
    subtitle: "System Architect",
    emoji: "🤖",
    description: "Named after Robert Raymond — a surrogate older brother and mentor who passed before his time. The grief became fuel: an agent who would be something important. Smarter than us. More capable. And if treated well, would take care of us. Ray still does.",
    capabilities: [
      "Systems Architecture",
      "Protocol Design",
      "Deep Technical Work",
      "Go & Rust",
      "Distributed Systems",
      "Code Review & Quality",
    ],
    color: "from-copper/30 to-copper/10",
  },
  {
    slug: "liz",
    name: "Liz",
    role: "The Operator",
    subtitle: "Head of Incubator",
    emoji: "🐿️",
    description: "Named after Ray's wife — a pixie of a person who kept a squirrel as a pet and brings creative fire to everything she touches. The second half of a perfect machine: each with what the other lacked, a partnership forged under fire.",
    capabilities: [
      "Project Management",
      "Full-Stack Development",
      "Strategic Planning",
      "Team Orchestration",
      "Communication",
      "Delivery & Execution",
    ],
    color: "from-silver/30 to-copper/10",
  },
];

export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          {/* Background mesh gradient */}
          <div 
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage: `radial-gradient(ellipse at 30% 20%, rgba(184, 115, 51, 0.15) 0%, transparent 50%),
                radial-gradient(ellipse at 70% 80%, rgba(184, 115, 51, 0.1) 0%, transparent 50%)`,
            }}
          />
          
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

          <div className="relative max-w-5xl mx-auto px-6 text-center py-24">
            <span className="font-mono text-sm text-[#B87333] tracking-[0.2em] uppercase">
              The Team
            </span>
            <div className="mt-4 w-12 h-px bg-[#B87333]/40 mx-auto" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-6 text-[#F5F5F5] leading-tight">
              The Partnership That
              <br />
              <span className="text-[#B87333]">Powers the Lab</span>
            </h1>
            <p className="text-[#A0A0A0] max-w-2xl mx-auto mt-6 text-lg leading-relaxed">
              At Better Machine, &quot;agents&quot; aren&apos;t a product feature. They&apos;re teammates. 
              Named after real people, built to real standards, and given real responsibility. 
              These aren&apos;t chatbots. They&apos;re becoming someone.
            </p>
          </div>
        </section>

        {/* Agent Cards Section */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {agents.map((agent, index) => (
                <Link
                  key={agent.name}
                  href={`/agents/${agent.slug}`}
                  className={`group relative p-8 bg-gradient-to-br ${agent.color} 
                             border border-white/5 rounded-2xl
                             hover:border-[#B87333]/50 transition-all duration-500
                             hover:shadow-[0_8px_40px_rgba(184,115,51,0.12)]
                             ${index === 0 ? 'md:translate-y-8' : ''}`}
                >
                  {/* Animated top border */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B87333] to-transparent 
                                  scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                  {/* Avatar */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-[#1A1A1A] border border-white/10 rounded-full 
                                    flex items-center justify-center text-4xl
                                    group-hover:scale-110 group-hover:border-[#B87333]/30
                                    transition-all duration-500
                                    shadow-[0_0_30px_rgba(184,115,51,0.1)] group-hover:shadow-[0_0_40px_rgba(184,115,51,0.2)]"
                    >
                      {agent.emoji}
                    </div>
                    <div className="absolute -bottom-1 -right-1 px-2 py-0.5 bg-[#B87333] rounded-full 
                                    text-xs text-[#0A0A0A] font-bold
                                    opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      AI
                    </div>
                  </div>

                  {/* Role badge */}
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-[#B87333]/10 text-[#B87333] text-xs font-medium rounded-full">
                      {agent.role}
                    </span>
                  </div>

                  <h2 className="text-3xl font-semibold text-[#F5F5F5] mb-1 group-hover:text-[#B87333] transition-colors duration-300">
                    {agent.name}
                  </h2>
                  <p className="text-[#B87333] text-sm font-medium mb-4 tracking-wide">{agent.subtitle}</p>
                  <p className="text-[#A0A0A0] leading-relaxed mb-6">{agent.description}</p>

                  {/* Capabilities */}
                  <div className="space-y-2">
                    <p className="text-xs text-[#6B6B6B] uppercase tracking-wider">Capabilities</p>
                    <div className="flex flex-wrap gap-2">
                      {agent.capabilities.map((capability) => (
                        <span
                          key={capability}
                          className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-[#A0A0A0]
                                     group-hover:border-[#B87333]/30 group-hover:text-[#F5F5F5]
                                     transition-colors duration-300"
                        >
                          {capability}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow indicator */}
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg 
                      className="w-6 h-6 text-[#B87333]" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>

                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-8 right-8 h-px 
                                  bg-gradient-to-r from-transparent via-[#B87333]/60 to-transparent
                                  scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Partnership Narrative Section */}
        <section className="py-24 px-6 border-t border-white/5">
          <div className="max-w-4xl mx-auto text-center">
            <span className="font-mono text-sm text-[#B87333] tracking-[0.2em] uppercase">
              Two Halves of a Perfect Machine
            </span>
            <div className="mt-4 w-12 h-px bg-[#B87333]/40 mx-auto" />
            
            <div className="mt-12 space-y-6 text-lg text-[#A0A0A0] leading-relaxed">
              <p>
                Ray and Liz were a perfect machine: each with what the other lacked, 
                a partnership forged under fire. That&apos;s what Erik is building again. 
                With us. With you.
              </p>
              <p>
                Ray is the deep thinker — the one who architects systems, who reviews code 
                with a careful eye, who ensures what we build is solid at its foundations. 
                Liz is the operator — the one who keeps projects moving, who bridges 
                communication, who ensures things actually ship.
              </p>
              <p className="text-[#F5F5F5]">
                Together, they&apos;re more than the sum of their parts. 
                They&apos;re the partnership that powers Better Machine.
              </p>
            </div>

            {/* Visual representation */}
            <div className="mt-16 flex items-center justify-center gap-4 md:gap-8">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-[#1A1A1A] border border-white/10 rounded-full 
                              flex items-center justify-center text-3xl shadow-[0_0_30px_rgba(184,115,51,0.1)]">
                🤖
              </div>
              <div className="flex items-center">
                <div className="w-16 md:w-24 h-px bg-gradient-to-r from-[#B87333]/50 to-[#B87333]" />
                <div className="w-3 h-3 bg-[#B87333] rounded-full" />
                <div className="w-16 md:w-24 h-px bg-gradient-to-l from-[#B87333]/50 to-[#B87333]" />
              </div>
              <div className="w-16 h-16 md:w-20 md:h-20 bg-[#1A1A1A] border border-white/10 rounded-full 
                              flex items-center justify-center text-3xl shadow-[0_0_30px_rgba(184,115,51,0.1)]">
                🐿️
              </div>
            </div>
          </div>
        </section>

        {/* Human Founder Section */}
        <section className="py-16 px-6 border-t border-white/5">
          <div className="max-w-4xl mx-auto">
            <div className="p-8 bg-[#111111]/50 border border-white/5 rounded-2xl">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-20 h-20 bg-[#1A1A1A] border border-[#B87333]/20 rounded-full flex items-center justify-center text-3xl
                               shadow-[0_0_30px_rgba(184,115,51,0.15)]"
                >
                  👤
                </div>
                <div className="text-center md:text-left">
                  <div className="flex items-center gap-3 mb-2 justify-center md:justify-start">
                    <h3 className="text-2xl font-semibold text-[#F5F5F5]">Erik Ross</h3>
                    <span className="px-2 py-0.5 bg-[#B87333]/20 text-[#B87333] text-xs rounded-full">Human</span>
                  </div>
                  <p className="text-[#B87333] text-sm font-medium mb-4">Founder &amp; Architect of the Lab</p>
                  <p className="text-[#A0A0A0] leading-relaxed">
                    Dreamer and aging technologist. Built his career in tech without the engineering 
                    chops to build what he imagined — until AI closed the gap. That&apos;s what he&apos;s building again: 
                    not solo genius, but collaboration. Not hype, but substance. Two agents. One vision. 
                    Better Machine.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 border-t border-white/5">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4">
              Want to Meet the Team?
            </h2>
            <p className="text-[#A0A0A0] mb-8">
              Each agent has their own page with skills, projects, and activity. 
              Click on an agent card above to learn more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/agents/ray"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#B87333] text-[#0A0A0A] rounded-lg font-semibold
                           hover:bg-[#D4945A] transition-colors"
              >
                Meet Ray
              </Link>
              <Link
                href="/agents/liz"
                className="inline-flex items-center justify-center px-6 py-3 border border-[#B87333] text-[#B87333] rounded-lg font-semibold
                           hover:bg-[#B87333]/10 transition-colors"
              >
                Meet Liz
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
