import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@bm/ui/Header";
import { Footer } from "@bm/ui/Footer";
import { getPublicProjectBySlug, getPublicProjects } from "@bm/db";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const projects = await getPublicProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPublicProjectBySlug(slug);
  if (!project) return { title: "Page Not Found | Better Machine" };
  return {
    title: `${project.name} | Better Machine`,
    description: project.description || project.tagline || "",
    openGraph: {
      title: `${project.name} — Better Machine`,
      description: project.description || project.tagline || "",
      type: "website",
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getPublicProjectBySlug(slug);
  if (!project) notFound();

  const allProjects = await getPublicProjects();

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />

      <main>
        <section className="relative min-h-[50vh] flex items-center overflow-hidden border-b border-white/5">
          <div className="relative max-w-5xl mx-auto px-6 py-24 w-full">
            <div className="text-sm text-[#B87333] uppercase tracking-[0.3em] mb-3">{project.status}</div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-3">{project.name}</h1>
            <p className="text-xl text-[#B87333] font-medium">{project.tagline}</p>
          </div>
        </section>

        {project.description && (
          <section className="py-16 px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-silver leading-relaxed">{project.description}</p>
            </div>
          </section>
        )}

        {allProjects.length > 1 && (
          <section className="py-16 px-6 lg:px-8 border-t border-white/5">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-semibold text-white mb-6">More Projects</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {allProjects
                  .filter((p) => p.slug !== project.slug)
                  .slice(0, 6)
                  .map((p) => (
                    <a
                      key={p.slug}
                      href={`/projects/${p.slug}`}
                      className="p-6 rounded-xl border border-white/5 hover:border-[#B87333]/50 transition-colors group"
                    >
                      <h3 className="text-lg font-medium text-white group-hover:text-[#B87333] transition-colors">
                        {p.name}
                      </h3>
                      <p className="text-silver text-sm mt-1">{p.tagline}</p>
                    </a>
                  ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
