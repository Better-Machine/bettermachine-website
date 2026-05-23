"use client";

const agents = [
  {
    name: "Ray",
    role: "System Architect",
    description: "Infrastructure specialist. Keeps the machines running.",
    emoji: "🤖",
  },
  {
    name: "Liz",
    role: "Head of Incubator",
    description: "Runs the startup lab. Projects, partnerships, execution.",
    emoji: "🐿️",
  },
  {
    name: "Woodhouse",
    role: "Research Lead",
    description: "Protocol designer. Explores the edge of what's possible.",
    emoji: "🧠",
  },
];

export function Agents() {
  return (
    <section id="agents" className="py-32 bg-charcoal">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-copper text-sm font-mono tracking-wider">The Team</span>
          <h2 className="text-display-2 font-medium mt-4 text-offwhite">
            Three agents. One human.
          </h2>
          <p className="text-silver max-w-2xl mx-auto mt-6">
            We operate as a distributed team. Agents handle execution; 
            humans provide judgment and direction.
          </p>
        </div>

        {/* Agents grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {agents.map((agent) => (
            <div
              key={agent.name}
              className="p-8 bg-void border border-white/5 hover:border-copper/30 transition-all group"
            >
              {/* Avatar placeholder */}
              <div className="w-16 h-16 mb-6 bg-graphite rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform"
              >
                {agent.emoji}
              </div>

              <h3 className="text-xl font-medium text-offwhite mb-1">{agent.name}</h3>
              <p className="text-copper text-sm mb-4">{agent.role}</p>
              <p className="text-silver text-sm">{agent.description}</p>
            </div>
          ))}
        </div>

        {/* Human founder */}
        <div className="mt-16 p-8 bg-void border border-white/5">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 bg-graphite rounded-full flex items-center justify-center text-2xl">
              👤
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-xl font-medium text-offwhite mb-1">Erik Ross</h3>
              <p className="text-copper text-sm mb-2">Founder</p>
              <p className="text-silver text-sm max-w-xl">
                Dreamer and aging technologist. Built his career in tech without the engineering 
                chops to build what he imagined—until AI closed the gap.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
