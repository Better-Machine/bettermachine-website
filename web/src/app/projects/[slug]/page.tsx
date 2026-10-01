import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getPublicProjectBySlug, getPublicProjects } from "@/lib/db/queries";

type PageProps = { params: Promise<{ slug: string }> };

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
  const otherProjects = allProjects.filter((p) => p.slug !== project.slug);

  let metrics: Record<string, string> = {};
  try {
    metrics = project.metrics ? JSON.parse(project.metrics) : {};
  } catch {}
  let techStack: string[] = [];
  try {
    techStack = project.techStack ? JSON.parse(project.techStack) : [];
  } catch {}

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />

      <main>
        <section className="relative min-h-[50vh] flex items-center overflow-hidden border-b border-white/5">
          <div
            className="absolute inset-0 opacity-[0.1]"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 30% 20%, rgba(184, 115, 51, 0.15) 0%, transparent 50%)",
            }}
          />
          <div className="relative max-w-5xl mx-auto px-6 py-24 w-full">
            <Link
              href="/#projects"
              className="text-sm text-[#B87333] hover:text-[#B87333]/80 transition-colors inline-block mb-6"
            >
              ← Back to Projects
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {project.name}
            </h1>
            <p className="text-xl text-[#B87333] font-medium mb-4">
              {project.tagline}
            </p>
            <span className="inline-block px-3 py-1 bg-[#B87333]/10 text-[#B87333] text-xs font-medium rounded-full border border-[#B87333]/20 uppercase tracking-widest">
              {project.status}
            </span>
          </div>
        </section>

        <section className="py-16 px-6 lg:px-8 border-b border-white/5">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-silver leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </div>
        </section>

        {project.overview && (
          <section className="py-16 px-6 lg:px-8 border-b border-white/5">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-sm text-[#B87333] tracking-[0.2em] uppercase mb-6">
                Overview
              </h2>
              <p className="text-lg text-silver leading-relaxed whitespace-pre-line">
                {project.overview}
              </p>
            </div>
          </section>
        )}

        {Object.keys(metrics).length > 0 && (
          <section className="py-16 px-6 lg:px-8 border-b border-white/5">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-sm text-[#B87333] tracking-[0.2em] uppercase mb-6">
                At a Glance
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {Object.entries(metrics).map(([label, value]) => (
                  <div key={label} className="p-6 border border-white/10 rounded-xl bg-white/[0.02]">
                    <div className="text-xs uppercase tracking-widest text-[#A0A0A0] mb-2">{label}</div>
                    <div className="text-snow font-medium">{String(value)}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {techStack.length > 0 && (
          <section className="py-16 px-6 lg:px-8 border-b border-white/5">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-sm text-[#B87333] tracking-[0.2em] uppercase mb-6">
                Tech
              </h2>
              <div className="flex flex-wrap gap-3">
                {techStack.map((t) => (
                  <span
                    key={t}
                    className="px-4 py-2 border border-white/10 text-silver text-sm rounded-full bg-white/[0.02]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {otherProjects.length > 0 && (
          <section className="py-16 px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-sm text-[#B87333] tracking-[0.2em] uppercase mb-6">
                Other Ventures
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {otherProjects.slice(0, 6).map((p) => (
                  <Link
                    key={p.slug}
                    href={`/projects/${p.slug}`}
                    className="p-6 rounded-xl border border-white/5 hover:border-copper/50 transition-colors bg-void-plus"
                  >
                    <h3 className="text-lg font-medium text-white mb-2">{p.name}</h3>
                    <p className="text-silver text-sm">{p.tagline}</p>
                  </Link>
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
