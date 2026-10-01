import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getAllVentures } from "@/lib/ventures";

export const metadata: Metadata = {
  title: "Projects — Better Machine",
  description:
    "Every venture at Better Machine starts the same way: someone lived a problem, then decided to solve it.",
  openGraph: {
    title: "Projects — Better Machine",
    description:
      "Every venture at Better Machine starts the same way: someone lived a problem, then decided to solve it.",
    type: "website",
  },
};

export default function ProjectsPage() {
  const projects = getAllVentures();

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />

      <main>
        {/* Hero */}
        <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden border-b border-white/5">
          <div
            className="absolute inset-0 opacity-[0.1]"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 30% 20%, rgba(184, 115, 51, 0.15) 0%, transparent 50%)",
            }}
          />
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
              decided to solve it. These aren&apos;t side projects. They&apos;re
              companies. And they&apos;re all native to the AI era.
            </p>
          </div>
        </section>

        {/* Project Grid */}
        <section className="py-16 px-6 lg:px-8 border-b border-white/5">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            {projects.map((p) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="group relative p-8 bg-gradient-to-br from-copper/10 to-silver/10 backdrop-blur-sm border border-white/5 hover:border-copper/50 transition-all duration-500 overflow-hidden rounded-xl hover:shadow-[0_8px_40px_rgba(184,115,51,0.15)]"
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-copper to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-copper/20 text-copper mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-copper" />
                  {p.status}
                </span>
                <h2 className="text-2xl font-semibold text-white group-hover:text-copper transition-colors duration-300 mb-2">
                  {p.name}
                </h2>
                <p className="text-copper font-medium mb-3">{p.tagline}</p>
                <p className="text-silver/80 text-sm leading-relaxed mb-6 line-clamp-3">
                  {p.description}
                </p>
                <div className="flex items-center gap-2 text-copper/70 group-hover:text-copper transition-colors">
                  <span className="text-sm font-medium">Learn more</span>
                  <svg
                    className="w-4 h-4 transform transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              See Something Worth Building?
            </h2>
            <p className="text-silver mb-8">
              We&apos;re always looking for problems worth solving. If you&apos;ve
              lived a problem that needs a solution, let&apos;s talk.
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
