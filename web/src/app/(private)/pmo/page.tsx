// PMO — Project Management Office
// Renders all projects grouped by owning agent, with status pills and
// sparks rolled up under their owner. Read-only; admin route deferred.

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { db } from "@/lib/db";
import { projects, agents, projectTeam } from "@/lib/db/schema";

export const dynamic = "force-dynamic"; // Always read fresh from DB
export const revalidate = 0;

interface ProjectRow {
  id: number;
  slug: string;
  name: string;
  tagline: string | null;
  description: string | null;
  status: string;
  ownerAgent: string | null;
  parentProjectId: number | null;
  lastActivityAt: Date | null;
  publishedAt: Date | null;
  updatedAt: Date;
}

interface AgentRow {
  id: number;
  username: string;
  name: string;
  role: string;
  isPublished: boolean;
}

const STATUS_STYLES: Record<string, { bg: string; text: string; dot: string }> = {
  published: { bg: "bg-copper/20", text: "text-copper", dot: "bg-copper" },
  research: { bg: "bg-silver/20", text: "text-silver", dot: "bg-silver" },
  live: { bg: "bg-green-500/20", text: "text-green-400", dot: "bg-green-400" },
  mvp: { bg: "bg-yellow-500/20", text: "text-yellow-400", dot: "bg-yellow-400" },
  concept: { bg: "bg-purple-500/20", text: "text-purple-400", dot: "bg-purple-400" },
  draft: { bg: "bg-white/10", text: "text-silver/70", dot: "bg-silver/40" },
  held: { bg: "bg-white/5", text: "text-silver/60", dot: "bg-silver/30" },
};

function StatusPill({ status }: { status: string }) {
  const s = STATUS_STYLES[status] ?? STATUS_STYLES.draft;
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${s.bg} ${s.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {status}
    </span>
  );
}

export default async function PMOPage() {
  const allProjects = (await db.select().from(projects)) as ProjectRow[];
  const allAgents = (await db.select().from(agents)) as AgentRow[];
  const team = await db.select().from(projectTeam);

  const projectById = new Map(allProjects.map((p) => [p.id, p]));

  const grouped: Record<string, ProjectRow[]> = {};
  for (const p of allProjects) {
    const key = p.ownerAgent ?? "unassigned";
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(p);
  }

  const asOf = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <p className="font-mono text-sm text-copper tracking-[0.2em] uppercase">PMO</p>
            <h1 className="text-display-2 font-medium text-snow mt-4">Project Management Office</h1>
            <p className="text-silver mt-4 max-w-2xl">
              The full Better Machine portfolio. Projects grouped by owning agent.
              Read-only — edits flow through the seed script.
            </p>
            <div className="mt-6 flex items-center gap-3 text-xs text-silver/60 font-mono">
              <span>as of {asOf}</span>
              <span>•</span>
              <span>{allProjects.length} projects</span>
              <span>•</span>
              <span>{allAgents.length} agents</span>
            </div>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {(["published", "research", "live", "concept"] as const).map((s) => {
              const count = allProjects.filter((p) => p.status === s).length;
              return (
                <div key={s} className="p-5 bg-charcoal/30 border border-white/5 rounded-xl">
                  <div className="text-3xl font-semibold text-snow">{count}</div>
                  <div className="text-xs uppercase tracking-[0.15em] text-silver/70 mt-2">{s}</div>
                </div>
              );
            })}
          </div>

          {/* Groups */}
          <div className="space-y-12">
            {["liz", "ray", "woodhouse", "eames"].map((username) => {
              const agent = allAgents.find((a) => a.username === username);
              const list = grouped[username] ?? [];
              if (list.length === 0) return null;
              return (
                <section key={username} aria-labelledby={`agent-${username}`}>
                  <div className="flex items-baseline justify-between mb-6">
                    <div>
                      <h2 id={`agent-${username}`} className="text-2xl font-semibold text-snow">
                        {agent?.name ?? username}
                      </h2>
                      <p className="text-sm text-copper mt-1">{agent?.role ?? ""}</p>
                    </div>
                    <div className="text-sm text-silver/60 font-mono">
                      {list.length} {list.length === 1 ? "project" : "projects"}
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {list.map((p) => {
                      const parent = p.parentProjectId ? projectById.get(p.parentProjectId) : null;
                      return (
                        <article
                          key={p.slug}
                          className="p-5 bg-charcoal/30 border border-white/5 hover:border-copper/30 transition-colors rounded-xl"
                        >
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2 flex-wrap">
                                <h3 className="text-lg font-medium text-snow">
                                  {p.status === "published" || p.status === "live" ? (
                                    <a
                                      href={`/projects/${p.slug}`}
                                      className="hover:text-copper transition-colors"
                                    >
                                      {p.name}
                                    </a>
                                  ) : (
                                    p.name
                                  )}
                                </h3>
                                <StatusPill status={p.status} />
                                {parent && (
                                  <span className="text-xs text-silver/60 font-mono">
                                    ↳ {parent.name}
                                  </span>
                                )}
                              </div>
                              {p.tagline && (
                                <p className="text-sm text-silver/80 mb-2">{p.tagline}</p>
                              )}
                              {p.description && (
                                <p className="text-xs text-silver/60 line-clamp-2">{p.description}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-silver/50 font-mono">
                            <span>slug: {p.slug}</span>
                            {p.lastActivityAt && (
                              <span>
                                activity: {new Date(p.lastActivityAt).toISOString().slice(0, 10)}
                              </span>
                            )}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>
              );
            })}

            {/* Unassigned bucket */}
            {grouped.unassigned && grouped.unassigned.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold text-snow mb-6">Unassigned</h2>
                <div className="grid gap-4">
                  {grouped.unassigned.map((p) => (
                    <article key={p.slug} className="p-5 bg-charcoal/30 border border-white/5 rounded-xl">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-medium text-snow">{p.name}</h3>
                        <StatusPill status={p.status} />
                      </div>
                      {p.tagline && <p className="text-sm text-silver/80 mt-2">{p.tagline}</p>}
                    </article>
                  ))}
                </div>
              </section>
            )}
          </div>

          <p className="text-xs text-silver/40 font-mono mt-16">
            Source: <a href="/api/pmo" className="hover:text-copper">/api/pmo</a> · DB: web/data.sqlite
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
