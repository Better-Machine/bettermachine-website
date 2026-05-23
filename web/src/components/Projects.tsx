"use client";

const projects = [
  {
    name: "HockeyOps.ai",
    tagline: "AI platform for NHL front offices",
    status: "Building",
    description: "Player evaluation, scouting automation, and operations intelligence for professional hockey teams.",
    tags: ["Sports", "AI", "Analytics"],
  },
  {
    name: "Localzon",
    tagline: "Democratized local commerce",
    status: "Research",
    description: "No-fee ecommerce platform for independent stores with consolidated logistics.",
    tags: ["Commerce", "Logistics", "Local"],
  },
  {
    name: "mesh-memory",
    tagline: "Memory infrastructure for AI agents",
    status: "Live",
    description: "Multi-agent memory layer with shared knowledge graphs and secure collaboration protocols.",
    tags: ["AI", "Infrastructure", "Open Source"],
  },
  {
    name: "CleanSL8",
    tagline: "BLE security for the real world",
    status: "MVP",
    description: "Detect and analyze Bluetooth Low Energy devices for security auditing and research.",
    tags: ["Security", "IoT", "Hardware"],
  },
  {
    name: "door$",
    tagline: "Direct monetization for musicians",
    status: "Concept",
    description: "Platform connecting artists directly with fans, cutting out industry middlemen.",
    tags: ["Music", "Creator Economy", "Direct"],
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-32 bg-void">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <span className="text-copper text-sm font-mono tracking-wider">Portfolio</span>
            <h2 className="text-display-2 font-medium mt-4 text-offwhite">
              Active ventures
            </h2>
          </div>
          <p className="text-silver max-w-md mt-6 md:mt-0 md:text-right">
            We operate multiple ventures simultaneously, each with dedicated agent teams and clear objectives.
          </p>
        </div>

        {/* Projects grid */}
        <div className="space-y-6">
          {projects.map((project, index) => (
            <div
              key={project.name}
              className="group p-8 bg-charcoal border border-white/5 hover:border-copper/30 transition-colors"
            >
              <div className="grid md:grid-cols-12 gap-6 items-start">
                {/* Number */}
                <div className="md:col-span-1 text-copper/50 font-mono text-sm">
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Content */}
                <div className="md:col-span-7">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-medium text-offwhite group-hover:text-copper transition-colors">
                      {project.name}
                    </h3>
                    <span className="text-xs px-2 py-0.5 bg-white/5 text-silver rounded">
                      {project.status}
                    </span>
                  </div>
                  <p className="text-copper mb-2">{project.tagline}</p>
                  <p className="text-silver text-sm">{project.description}</p>
                </div>

                {/* Tags */}
                <div className="md:col-span-4 flex flex-wrap gap-2 justify-end">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 border border-white/10 text-silver"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-silver mb-4">Want to collaborate on a venture?</p>
          <a
            href="#contact"
            className="inline-block px-6 py-3 border border-copper/50 text-copper hover:bg-copper hover:text-void transition-colors"
          >
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}
