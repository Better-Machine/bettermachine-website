import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@bm/ui/Header";
import { Footer } from "@bm/ui/Footer";
import { getPublicProjects } from "@bm/db";

export const metadata: Metadata = {
  title: "Ventures — Better Machine",
  description: "Every venture at Better Machine starts the same way: someone lived a problem, then decided to solve it.",
};

export default async function VenturesPage() {
  const projects = await getPublicProjects();

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />
      <main>
        <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden border-b border-white/5">
          <div className="relative max-w-4xl mx-auto px-6 py-24 text-center">
            <span className="font-mono text-sm text-[#B87333] tracking-[0.2em] uppercase">
              Our Portfolio
            </span>
            <div className="mt-4 w-12 h-px bg-[#B87333]/40 mx-auto" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-6 text-white leading-tight">
              What We&apos;re Building
            </h1>
            <p className="text-lg text-silver mt-6 max-w-2xl mx-auto">
              Every venture starts the same way: someone lived a problem, then
              decided to solve it.
            </p>
          </div>
        </section>

        <section className="py-16 px-6 lg:px-8 border-b border-white/5">
          <div className="max-w-6xl mx-auto space-y-24">
            {projects.map((p) => {
              let tech: string[] = [];
              try {
                tech = p.techStack ? JSON.parse(p.techStack) : [];
              } catch {}
              return (
                <div key={p.slug} className="grid md:grid-cols-2 gap-12">
                  <div>
                    <Link href={`/projects/${p.slug}`} className="group block">
                      <h2 className="text-3xl font-bold text-white group-hover:text-copper transition-colors mb-2">
                        {p.name}
                      </h2>
                      <p className="text-copper font-medium mb-4">{p.tagline}</p>
                    </Link>
                    <span className="inline-block px-3 py-1 bg-[#B87333]/10 text-[#B87333] text-xs font-medium rounded-full border border-[#B87333]/20 mb-4 uppercase tracking-widest">
                      {p.status}
                    </span>
                    <p className="text-silver leading-relaxed mb-4">{p.description}</p>
                    <Link
                      href={`/projects/${p.slug}`}
                      className="text-sm text-copper hover:text-copper-light transition-colors inline-flex items-center gap-1"
                    >
                      Learn more →
                    </Link>
                  </div>
                  <div className="bg-void-plus border border-white/5 rounded-2xl p-8">
                    <h3 className="text-sm text-[#B87333] tracking-[0.2em] uppercase mb-4">
                      Technology
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {tech.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 rounded-full border border-white/10 text-silver text-xs"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-16 px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              See Something Worth Building?
            </h2>
            <p className="text-silver mb-8">
              We&apos;re always looking for problems worth solving.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center px-6 py-3 bg-[#B87333] text-void font-semibold rounded-lg hover:bg-[#D4945A] transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
