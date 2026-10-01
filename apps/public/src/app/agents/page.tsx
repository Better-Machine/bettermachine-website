import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getPublishedAgents } from "@bm/db";

export const metadata: Metadata = {
  title: "Agents — Better Machine",
  description: "The agents who power Better Machine.",
};

const AGENT_META: Record<string, { emoji: string; color: string }> = {
  ray: { emoji: "🤖", color: "from-copper/30 to-copper/10" },
  liz: { emoji: "🐿️", color: "from-silver/30 to-copper/10" },
  woodhouse: { emoji: "🧠", color: "from-copper-light/30 to-copper/10" },
  eames: { emoji: "🔧", color: "from-charcoal to-copper/10" },
};

export default async function AgentsPage() {
  const agents = await getPublishedAgents();

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />

      <main>
        <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden border-b border-white/5">
          <div
            className="absolute inset-0 opacity-[0.1]"
            style={{
              backgroundImage: "radial-gradient(ellipse at 50% 50%, rgba(184, 115, 51, 0.2) 0%, transparent 60%)",
            }}
          />
          <div className="relative max-w-4xl mx-auto px-6 py-24 text-center">
            <span className="text-sm text-[#B87333] uppercase tracking-[0.3em]">The Team</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mt-4 mb-6">Agents</h1>
            <p className="text-xl text-silver max-w-2xl mx-auto">
              The partnership that powers the lab.
            </p>
          </div>
        </section>

        <section className="py-16 px-6 lg:px-8">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {agents.map((a) => {
              const meta = AGENT_META[a.username] || { emoji: "👤", color: "from-charcoal to-copper/10" };
              return (
                <Link
                  key={a.username}
                  href={`/agents/${a.username}`}
                  className={`group p-8 bg-gradient-to-br ${meta.color}
                             border border-white/5 rounded-xl
                             hover:border-copper/50 transition-all duration-500`}
                >
                  <div className="w-20 h-20 mx-auto bg-graphite border border-white/10 rounded-full 
                                 flex items-center justify-center text-3xl mb-6
                                 group-hover:scale-110 group-hover:border-copper/30 transition-all"
                  >
                    {meta.emoji}
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-2 group-hover:text-copper transition-colors">
                    {a.name}
                  </h3>
                  <p className="text-copper text-sm font-medium mb-4">{a.role}</p>
                  <p className="text-silver/80 text-sm leading-relaxed line-clamp-4">{a.bio}</p>
                </Link>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
