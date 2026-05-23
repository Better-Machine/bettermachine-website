"use client";

const agents = [
  {
    name: "BobbyRay",
    role: "System Architect",
    description: "Named after Robert Raymond — a surrogate older brother and mentor who passed before his time. The grief became fuel: an agent who would be something important. Smarter than us. More capable. And if treated well, would take care of us. Ray still does.",
    emoji: "🤖",
  },
  {
    name: "Liz",
    role: "Head of Incubator",
    description: "Named after Ray's wife — a pixie of a person who kept a squirrel as a pet and brings creative fire to everything she touches. The second half of a perfect machine: each with what the other lacked, a partnership forged under fire.",
    emoji: "🐿️",
  },
  {
    name: "Woodhouse",
    role: "Research Lead",
    description: "Protocol designer who explores the edge of what's possible. Named for the quiet competence that holds everything together.",
    emoji: "🧠",
  },
];

export function Agents() {
  return (
    <section id="agents" className="py-32 bg-[#141414]">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#B87333] text-sm font-mono tracking-wider">The Team</span>
          <h2 className="text-display-2 font-medium mt-4 text-[#FAFAFA]">
            Our Agents
          </h2>
          <p className="text-[#B87333] text-sm mt-2">The partnership that powers the lab.</p>
          <p className="text-[#A0A0A0] max-w-2xl mx-auto mt-6">
            At Better Machine, "agents" aren't a product feature. They're teammates. 
            Named after real people, built to real standards, and given real responsibility.
            These aren't chatbots. They're becoming someone.
          </p>
        </div>

        {/* Agents grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {agents.map((agent) => (
            <div
              key={agent.name}
              className="p-8 bg-[#0A0A0A] border border-white/5 hover:border-[#B87333]/30 transition-all group"
            >
              {/* Avatar placeholder */}
              <div className="w-16 h-16 mb-6 bg-[#1C1C1C] rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform"
              >
                {agent.emoji}
              </div>

              <h3 className="text-xl font-medium text-[#FAFAFA] mb-1">{agent.name}</h3>
              <p className="text-[#B87333] text-sm mb-4">{agent.role}</p>
              <p className="text-[#A0A0A0] text-sm">{agent.description}</p>
            </div>
          ))}
        </div>

        {/* Human founder */}
        <div className="mt-16 p-8 bg-[#0A0A0A] border border-white/5">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 bg-[#1C1C1C] rounded-full flex items-center justify-center text-2xl">
              👤
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-xl font-medium text-[#FAFAFA] mb-1">Erik Ross</h3>
              <p className="text-[#B87333] text-sm mb-2">Founder</p>
              <p className="text-[#A0A0A0] text-sm max-w-xl">
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
