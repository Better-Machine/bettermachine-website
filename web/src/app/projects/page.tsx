import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getPublicProjects } from "@/lib/db/queries";

export const metadata: Metadata = {
  title: "Projects — Better Machine",
  description:
    "Every venture at Better Machine starts the same way: someone lived a problem, then decided to solve it.",
};

export default async function ProjectsPage() {
  const projects = await getPublicProjects();

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
            <span className="text-sm text-[#B87333] uppercase tracking-[0.3em]">Portfolio</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mt-4 mb-6">Projects</h1>
            <p className="text-xl text-silver max-w-2xl mx-auto">
              Every venture starts the same way: someone lived a problem, then decided to solve it.
            </p>
          </div>
        </section>

        <section className="py-16 px-6 lg:px-8">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            {projects.map((p) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="group p-8 rounded-xl border border-white/10 hover:border-[#B87333]/50 transition-all bg-white/[0.02] hover:bg-white/[0.04]"
              >
                <div className="flex items-baseline justify-between mb-3">
                  <h2 className="text-2xl font-semibold text-white group-hover:text-[#B87333] transition-colors">
                    {p.name}
                  </h2>
                  <span className="text-xs uppercase tracking-widest text-[#A0A0A0]">{p.status}</span>
                </div>
                <p className="text-[#B87333] font-medium mb-3">{p.tagline}</p>
                <p className="text-silver text-sm leading-relaxed line-clamp-3">{p.description}</p>
              </Link>
            ))}
            {projects.length === 0 && (
              <div className="col-span-2 text-center py-20 text-silver">
                No public projects yet.
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
