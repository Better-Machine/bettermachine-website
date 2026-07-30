import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getVenture, getAllVentures, type Venture } from "@/lib/ventures";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const { getAllVentures } = await import("@/lib/ventures");
  return getAllVentures().map((v) => ({ slug: v.slug }));
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { slug } = await params;
  const venture = getVenture(slug);
  if (!venture) return { title: "Page Not Found | Better Machine" };

  return {
    title: `${venture.name} | Better Machine`,
    description: venture.description,
    openGraph: {
      title: `${venture.name} — Better Machine`,
      description: venture.description,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `${venture.name} — Better Machine`,
      description: venture.description,
    },
  };
}

function VentureLink({ venture }: { venture: Venture }) {
  return (
    <a
      href={`/projects/${venture.slug}`}
      className="p-6 rounded-xl border border-white/5 hover:border-copper/50 transition-colors group bg-void-plus"
    >
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">{venture.github ? "💻" : "🔒"}</span>
        <h3 className="text-lg font-medium text-white group-hover:text-copper transition-colors">
          {venture.name}
        </h3>
      </div>
      <p className="text-silver text-sm">{venture.tagline}</p>
    </a>
  );
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const venture = getVenture(slug);

  if (!venture) notFound();

  const allVentures = getAllVentures();
  const otherVentures = allVentures.filter(
    (v) => v.slug !== venture.slug
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />

      <main>
        {/* Hero */}
        <section className="relative min-h-[50vh] flex items-center overflow-hidden border-b border-white/5">
          <div
            className="absolute inset-0 opacity-[0.1]"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 30% 20%, rgba(184, 115, 51, 0.15) 0%, transparent 50%)",
            }}
          />
          <div className="absolute inset-0 opacity-[0.03]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(184, 115, 51, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(184, 115, 51, 0.08) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />
          </div>

          <div className="relative max-w-5xl mx-auto px-6 py-24">
            <Link
              href="/ventures"
              className="text-sm text-[#B87333] hover:text-[#B87333]/80 transition-colors inline-block mb-6"
            >
              ← Back to Ventures
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{venture.github ? "💻" : "🔒"}</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                {venture.name}
              </h1>
            </div>
            <p className="text-xl text-[#B87333] font-medium mb-4">
              {venture.tagline}
            </p>
            <span className="inline-block px-3 py-1 bg-[#B87333]/10 text-[#B87333] text-xs font-medium rounded-full border border-[#B87333]/20">
              {venture.status}
            </span>
          </div>
        </section>

        {/* Description */}
        <section className="py-16 px-6 lg:px-8 border-b border-white/5">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-silver leading-relaxed">
              {venture.description}
            </p>
          </div>
        </section>

        {/* Problem / Solution */}
        <section className="py-16 px-6 lg:px-8 border-b border-white/5">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-sm text-[#B87333] tracking-[0.2em] uppercase mb-4">
                The Problem
              </h2>
              <p className="text-lg text-silver leading-relaxed">
                {venture.problem}
              </p>
            </div>
            <div>
              <h2 className="text-sm text-[#B87333] tracking-[0.2em] uppercase mb-4">
                The Solution
              </h2>
              <p className="text-lg text-silver leading-relaxed">
                {venture.solution}
              </p>
            </div>
          </div>
        </section>

        {/* Market & Founder */}
        <section className="py-16 px-6 lg:px-8 border-b border-white/5">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-sm text-[#B87333] tracking-[0.2em] uppercase mb-4">
                Market
              </h2>
              <p className="text-silver">{venture.market}</p>
            </div>
            <div>
              <h2 className="text-sm text-[#B87333] tracking-[0.2em] uppercase mb-4">
                Founder
              </h2>
              <p className="text-silver">{venture.founder}</p>
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section className="py-16 px-6 lg:px-8 border-b border-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Key Highlights
            </h2>
            <ul className="space-y-3">
              {venture.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3">
                  <span className="text-[#B87333] mt-1">▹</span>
                  <span className="text-silver">{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-16 px-6 lg:px-8 border-b border-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Technology
            </h2>
            <div className="flex flex-wrap gap-3">
              {venture.tech.map((t) => (
                <span
                  key={t}
                  className="px-4 py-2 rounded-full border border-[#B87333]/30 text-[#B87333] text-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Links */}
        {(venture.github || venture.website) && (
          <section className="py-16 px-6 lg:px-8 border-b border-white/5">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-semibold text-white mb-6">
                Links
              </h2>
              <div className="flex flex-wrap gap-4">
                {venture.github && (
                  <a
                    href={venture.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#B87333] text-void font-semibold rounded-lg hover:bg-[#D4945A] transition-colors"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    View Source
                  </a>
                )}
                {venture.website && (
                  <a
                    href={venture.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-[#B87333] text-[#B87333] font-semibold rounded-lg hover:bg-[#B87333]/10 transition-colors"
                  >
                    Visit Website
                  </a>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Other Ventures */}
        <section className="py-16 px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold text-white mb-8">
              Other Ventures
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {otherVentures.map((v) => (
                <VentureLink key={v.slug} venture={v} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
