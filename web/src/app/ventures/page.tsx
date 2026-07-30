import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getAllVentures } from "@/lib/ventures";

export const metadata: Metadata = {
  title: "Ventures — Better Machine",
  description:
    "Every venture at Better Machine starts the same way: someone lived a problem, then decided to solve it.",
  openGraph: {
    title: "Ventures — Better Machine",
    description:
      "Every venture at Better Machine starts the same way: someone lived a problem, then decided to solve it.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Ventures — Better Machine",
    description:
      "Every venture at Better Machine starts the same way: someone lived a problem, then decided to solve it.",
  },
};

export default function VenturesPage() {
  const ventures = getAllVentures();

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

        {/* Venture Cards */}
        <section className="py-16 px-6 lg:px-8 border-b border-white/5">
          <div className="max-w-6xl mx-auto space-y-24">
            {ventures.map((v, i) => (
              <div key={v.slug} className="grid md:grid-cols-2 gap-12">
                {/* Left: Name + Status + Description */}
                <div>
                  <Link
                    href={`/projects/${v.slug}`}
                    className="group block"
                  >
                    <h2 className="text-3xl font-bold text-white group-hover:text-copper transition-colors mb-2">
                      {v.name}
                    </h2>
                    <p className="text-copper font-medium mb-4">{v.tagline}</p>
                  </Link>
                  <span className="inline-block px-3 py-1 bg-[#B87333]/10 text-[#B87333] text-xs font-medium rounded-full border border-[#B87333]/20 mb-4">
                    {v.status}
                  </span>
                  <p className="text-silver leading-relaxed mb-4">
                    {v.description}
                  </p>
                  <Link
                    href={`/projects/${v.slug}`}
                    className="text-sm text-copper hover:text-copper-light transition-colors inline-flex items-center gap-1"
                  >
                    Learn more
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </div>

                {/* Right: Highlights + Tech */}
                <div className="bg-void-plus border border-white/5 rounded-2xl p-8">
                  <h3 className="text-sm text-[#B87333] tracking-[0.2em] uppercase mb-4">
                    Why It Matters
                  </h3>
                  <ul className="space-y-3 mb-8">
                    {v.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2">
                        <span className="text-copper mt-1">▹</span>
                        <span className="text-silver text-sm leading-relaxed">
                          {h}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <h3 className="text-sm text-[#B87333] tracking-[0.2em] uppercase mb-4">
                    Technology
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {v.tech.map((t) => (
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
