import Link from "next/link";
import { getPublishedAgents } from "@bm/db";

const AGENT_META: Record<string, { emoji: string; color: string }> = {
  ray: { emoji: "🤖", color: "from-copper/30 to-copper/10" },
  liz: { emoji: "🐿️", color: "from-silver/30 to-copper/10" },
  woodhouse: { emoji: "🧠", color: "from-copper-light/30 to-copper/10" },
  eames: { emoji: "🔧", color: "from-charcoal to-copper/10" },
};

export async function Agents() {
  const rows = await getPublishedAgents();

  const agents = rows.map((a) => ({
    username: a.username,
    name: a.name,
    role: a.role,
    bio: a.bio || "",
    ...(AGENT_META[a.username] || { emoji: "👤", color: "from-charcoal to-copper/10" }),
  }));

  return (
    <section id="agents" className="py-32 bg-charcoal relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(184, 115, 51, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(184, 115, 51, 0.08) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative">
        <div className="text-center mb-16">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {agents.map((agent) => (
            <Link
              key={agent.username}
              href={`/agents/${agent.username}`}
              className={`group relative p-8 bg-gradient-to-br ${agent.color}
                         border border-white/5 rounded-xl
                         hover:border-copper/50 transition-all duration-500
                         hover:shadow-[0_8px_40px_rgba(184,115,51,0.12)]`}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-copper to-transparent 
                            scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
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
              <p className="text-silver/80 text-sm leading-relaxed line-clamp-4">{agent.bio}</p>
              <div className="absolute bottom-0 left-8 right-8 h-px 
                            bg-gradient-to-r from-transparent via-copper/60 to-transparent
                            scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </Link>
          ))}
        </div>

        <div className="mt-16 p-8 bg-void/50 border border-white/5 rounded-2xl">
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
