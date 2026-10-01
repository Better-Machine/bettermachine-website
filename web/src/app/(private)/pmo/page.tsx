export const dynamic = "force-dynamic";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getPmoView } from "@/lib/db/queries";
import Link from "next/link";

export const metadata = {
  title: "PMO — Better Machine",
  description: "Internal portfolio view. Private hostname only.",
};

const STATUS_COLORS: Record<string, string> = {
  draft: "bg-white/10 text-white/60",
  published: "bg-emerald-500/20 text-emerald-300",
  building: "bg-amber-500/20 text-amber-300",
  research: "bg-blue-500/20 text-blue-300",
  live: "bg-emerald-500/20 text-emerald-300",
  mvp: "bg-violet-500/20 text-violet-300",
  concept: "bg-white/10 text-white/60",
  held: "bg-red-500/20 text-red-300",
};

const STATUS_LABELS: Record<string, string> = {
  draft: "Draft",
  published: "Published",
  building: "Building",
  research: "Research",
  live: "Live",
  mvp: "MVP",
  concept: "Concept",
  held: "Held",
};

export default async function PmoPage() {
  const { byOwner, agents } = await getPmoView();
  const agentsByUsername = new Map(agents.map((a) => [a.username, a]));

  const owners = Object.keys(byOwner).sort();

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FAFAFA]">
      <Header />

      <main className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24">
        <div className="mb-12">
          <div className="text-xs uppercase tracking-[0.3em] text-[#B87333] mb-3">Internal</div>
          <h1 className="text-5xl font-light tracking-tight mb-4">Project Management Office</h1>
          <p className="text-[#A0A0A0] text-lg max-w-2xl">
            Live portfolio view. Grouped by owner agent. Edits go through{" "}
            <Link href="/internal/admin" className="text-[#B87333] hover:underline">
              /internal/admin
            </Link>
            .
          </p>
        </div>

        <div className="space-y-12">
          {owners.map((owner) => {
            const ownerAgent = agentsByUsername.get(owner);
            const projects = byOwner[owner];
            return (
              <section key={owner}>
                <div className="flex items-baseline gap-4 mb-6 pb-3 border-b border-white/10">
                  <h2 className="text-2xl font-medium">
                    {ownerAgent ? ownerAgent.name : owner === "unassigned" ? "Unassigned" : owner}
                  </h2>
                  <span className="text-xs text-[#A0A0A0] uppercase tracking-widest">
                    {ownerAgent?.role || "—"} · {projects.length} {projects.length === 1 ? "project" : "projects"}
                  </span>
                </div>

                <div className="grid gap-4">
                  {projects.map((p) => {
                    const parent = p.parentProjectId
                      ? Object.values(byOwner).flat().find((x) => x.id === p.parentProjectId)
                      : null;
                    return (
                      <div
                        key={p.id}
                        className="bg-white/[0.03] border border-white/10 rounded-lg p-5 hover:border-[#B87333]/40 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-6">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                              {p.isPublic && p.slug ? (
                                <Link
                                  href={`/projects/${p.slug}`}
                                  className="text-lg font-medium text-[#FAFAFA] hover:text-[#B87333] transition-colors"
                                >
                                  {p.name}
                                </Link>
                              ) : (
                                <span className="text-lg font-medium text-[#FAFAFA]">{p.name}</span>
                              )}
                              <span
                                className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded ${
                                  STATUS_COLORS[p.status] || STATUS_COLORS.draft
                                }`}
                              >
                                {STATUS_LABELS[p.status] || p.status}
                              </span>
                              {parent && (
                                <span className="text-xs text-[#A0A0A0]">
                                  ↳ spark under{" "}
                                  <span className="text-[#FAFAFA]">{parent.name}</span>
                                </span>
                              )}
                            </div>
                            {p.tagline && (
                              <p className="text-sm text-[#A0A0A0]">{p.tagline}</p>
                            )}
                          </div>
                          <div className="text-right text-xs text-[#A0A0A0] whitespace-nowrap">
                            {p.lastActivityAt && (
                              <div>
                                last activity{" "}
                                {new Date(p.lastActivityAt).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                })}
                              </div>
                            )}
                            {!p.isPublic && (
                              <div className="text-amber-400/70 mt-1">private</div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
