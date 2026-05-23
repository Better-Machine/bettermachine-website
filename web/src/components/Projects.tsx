import Image from "next/image";

const projects = [
  {
    name: "HockeyOps.ai",
    tagline: "AI platform for NHL front offices",
    status: "Building",
    description: "An AI platform for NHL front offices — player evaluation, scouting, ops automation. Built by someone who plays the game, not just watches it. Co-founded with Felix D. Ross, because the best teams are built by people who know the ice.",
    tags: ["Sports", "AI", "Analytics"],
    gradient: "from-[#B87333]/20 to-[#C48A4E]/10",
  },
  {
    name: "Localzon",
    tagline: "Democratized local commerce",
    status: "Research",
    description: "Ecommerce, reimagined. Built by someone who got his start in online retail and knows where the bodies are buried. No-fee platform for independent stores with consolidated logistics.",
    tags: ["Commerce", "Logistics", "Local"],
    gradient: "from-[#B87333]/10 to-[#A0A0A0]/10",
  },
  {
    name: "mesh-memory",
    tagline: "Memory infrastructure for AI agents",
    status: "Live",
    description: "Multi-agent memory layer with shared knowledge graphs and secure collaboration protocols. The memory system powering Ray, Liz, and Woodhouse.",
    tags: ["AI", "Infrastructure", "Open Source"],
    gradient: "from-[#141414] to-[#0A0A0A]",
  },
  {
    name: "CleanSL8",
    tagline: "BLE security for the real world",
    status: "MVP",
    description: "Detect and analyze Bluetooth Low Energy devices for security auditing and research.",
    tags: ["Security", "IoT", "Hardware"],
    gradient: "from-[#B87333]/30 to-[#0A0A0A]",
  },
  {
    name: "door$",
    tagline: "Direct monetization for musicians",
    status: "Concept",
    description: "The music industry is broken. We know because we've been in it. door$ is what happens when a recovering musician decides to fix the thing that nearly broke him.",
    tags: ["Music", "Creator Economy", "Direct"],
    gradient: "from-[#C48A4E]/20 to-[#B87333]/10",
  },
];

const statusColors: Record<string, string> = {
  Building: "bg-[#B87333]/20 text-[#B87333]",
  Research: "bg-[#A0A0A0]/20 text-[#A0A0A0]",
  Live: "bg-green-500/20 text-green-400",
  MVP: "bg-yellow-500/20 text-yellow-400",
  Concept: "bg-purple-500/20 text-purple-400",
};

export function Projects() {
  return (
    <section id="projects" className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background texture with image */}
      <div className="absolute inset-0">
        <Image
          src="/project-cards.png?v=2"
          alt=""
          fill
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/95 to-[#0A0A0A]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <span className="text-[#B87333] text-sm font-mono tracking-wider">Portfolio</span>
            <h2 className="text-display-2 font-medium mt-4 text-[#FAFAFA]">
              What We're Building
            </h2>
          </div>
          <p className="text-[#A0A0A0] max-w-md mt-6 md:mt-0 md:text-right">
            Every venture starts the same way: someone lived a problem, then decided to solve it.
            Founder-market fit — the real kind.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.name}
              className={`group relative p-8 bg-gradient-to-br ${project.gradient} backdrop-blur-sm border border-white/5 hover:border-[#B87333]/30 transition-all duration-300 overflow-hidden`}
            >
              {/* Card number */}
              <div className="absolute top-4 right-4 text-[#B87333]/20 font-mono text-6xl font-bold">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className={`inline-block px-2 py-1 text-xs rounded mb-3 ${statusColors[project.status]}`}>
                      {project.status}
                    </span>
                    <h3 className="text-2xl font-medium text-[#FAFAFA] group-hover:text-[#B87333] transition-colors">
                      {project.name}
                    </h3>
                  </div>
                </div>

                {/* Tagline */}
                <p className="text-[#B87333] font-medium mb-3">{project.tagline}</p>

                {/* Description */}
                <p className="text-[#A0A0A0] text-sm mb-6 leading-relaxed">{project.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 border border-white/10 text-[#A0A0A0] hover:border-[#B87333]/50 hover:text-[#B87333] transition-colors cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Hover indicator */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#B87333] group-hover:w-full transition-all duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-[#A0A0A0] mb-4">Want to collaborate on a venture?</p>
          <a
            href="#contact"
            className="inline-block px-8 py-4 border border-[#B87333]/50 text-[#B87333] hover:bg-[#B87333] hover:text-[#0A0A0A] transition-all"
          >
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}
