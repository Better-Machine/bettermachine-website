// Project detail page — reads from web/data.sqlite via Drizzle.
// Legacy `ventures.ts` provided rich detail pages for 5 projects
// (hockeyops, localzon, doors, mesh-memory, gtc-tech). For now the DB
// has the new slug names; the rich-detail pages stay in a separate
// route group at /ventures/[slug]/ for the 5 with hand-written copy.

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { db } from "@/lib/db";
import { projects, agents, projectTeam } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic"; // Read fresh; rebuilds would be too slow

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const rows = await db.select().from(projects).where(eq(projects.slug, slug)).limit(1);
  const p = rows[0];
  if (!p) return { title: "Project Not Found | Better Machine" };
  return {
    title: `${p.name} | Better Machine`,
    description: p.tagline ?? p.description ?? undefined,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const rows = await db.select().from(projects).where(eq(projects.slug, slug)).limit(1);
  const project = rows[0];
  if (!project) notFound();

  const owner = project.ownerAgent
    ? (await db.select().from(agents).where(eq(agents.username, project.ownerAgent)).limit(1))[0]
    : null;

  const team = await db
    .select({ username: agents.username, name: agents.name, role: projectTeam.role })
    .from(projectTeam)
    .innerJoin(agents, eq(projectTeam.agentId, agents.id))
    .where(eq(projectTeam.projectId, project.id));

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />
      <main>
        <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden border-b border-white/5 pt-24 pb-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-copper/20 text-copper mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-copper" />
              {project.status}
            </div>
            <h1 className="text-5xl md:text-6xl font-semibold text-snow">{project.name}</h1>
            {project.tagline && (
              <p className="text-copper text-xl mt-4">{project.tagline}</p>
            )}
            {project.description && (
              <p className="text-silver/80 mt-6 max-w-2xl mx-auto">{project.description}</p>
            )}
            {owner && (
              <p className="text-silver/60 text-sm mt-6 font-mono">
                Owner: {owner.name} · {owner.role}
              </p>
            )}
          </div>
        </section>

        {project.overview && (
          <section className="py-16 px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-semibold text-snow mb-4">Overview</h2>
              <p className="text-silver leading-relaxed whitespace-pre-line">{project.overview}</p>
            </div>
          </section>
        )}

        {team.length > 0 && (
          <section className="py-16 px-6 border-t border-white/5">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-semibold text-snow mb-4">Team</h2>
              <ul className="space-y-2">
                {team.map((t) => (
                  <li key={t.username} className="text-silver">
                    <span className="text-snow font-medium">{t.name}</span>
                    {t.role && <span className="text-silver/60 text-sm"> · {t.role}</span>}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section className="py-16 px-6 border-t border-white/5">
          <div className="max-w-3xl mx-auto text-center">
            <a href="/" className="text-copper hover:text-copper-light transition-colors">
              ← Back to portfolio
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
