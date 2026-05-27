import type { Metadata } from "next";
import { VentureCard, type Venture } from "@/components/VentureCard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Ventures | Better Machine",
  description: "What we're building. Native ventures applying leading-edge AI to deliver creative business solutions.",
};

const ventures: Venture[] = [
  {
    id: "hockeyops",
    name: "HockeyOps.ai",
    tagline: "AI platform for NHL front offices",
    description: "Player evaluation, scouting, and operations automation for NHL teams. Built by someone who plays the game, not just watches it. Co-founded with Felix D. Ross.",
    status: "Active",
    url: "https://hockeyops.ai",
    tags: ["Sports", "AI", "Analytics", "NHL"],
    gradient: "from-copper/20 to-copper-light/10",
  },
  {
    id: "localzon",
    name: "Localzon",
    tagline: "Democratized ecommerce + logistics",
    description: "Ecommerce reimagined. No-fee platform for independent stores with consolidated logistics. Built by someone who got his start in online retail and knows where the bodies are buried.",
    status: "In Development",
    tags: ["Commerce", "Logistics", "Local", "Marketplace"],
    gradient: "from-copper/10 to-silver/10",
  },
  {
    id: "doors",
    name: "door$",
    tagline: "Music industry transparency",
    description: "The music industry is broken. We know because we've been in it. door$ is what happens when a recovering musician decides to fix the thing that nearly broke him.",
    status: "In Development",
    tags: ["Music", "Creator Economy", "Direct"],
    gradient: "from-copper-light/20 to-copper/10",
  },
];

export default function VenturesPage() {
  return (
    <main className="relative min-h-screen bg-void">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0">
          <Image
            src="/project-cards.png?v=2"
            alt=""
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-void via-void/98 to-void" />
        </div>

        {/* Circuit lines */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(184, 115, 51, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(184, 115, 51, 0.1) 1px, transparent 1px)`,
              backgroundSize: "120px 120px",
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-6 relative">
          {/* Eyebrow */}
          <span className="font-mono text-sm text-copper tracking-[0.2em] uppercase">
            Portfolio
          </span>
          <div className="mt-4 w-12 h-px bg-copper/40" />

          {/* Hero Headline */}
          <h1 className="mt-8 text-display-1 font-medium text-snow max-w-4xl">
            What We&apos;re Building
          </h1>

          {/* Subhead */}
          <p className="mt-6 text-xl text-silver max-w-2xl leading-relaxed">
            Every venture starts the same way: someone lived a problem, then decided to solve it. 
            Founder-market fit — the real kind.
          </p>
        </div>
      </section>

      {/* Ventures Grid Section */}
      <section className="py-16 pb-32">
        <div className="max-w-6xl mx-auto px-6">
          {/* Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {ventures.map((venture, index) => (
              <VentureCard key={venture.id} venture={venture} index={index} />
            ))}
          </div>

          {/* Future placeholder */}
          <div className="mt-12 p-8 border border-dashed border-white/10 rounded-xl text-center">
            <p className="text-silver/60 text-sm">
              More ventures in stealth. Stay tuned.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-20 text-center">
            <p className="text-silver mb-6">Want to collaborate on a venture?</p>
            <a
              href="/about#contact"
              className="inline-flex items-center gap-3 px-8 py-4 border border-copper/50 text-copper 
                       rounded-lg hover:bg-copper hover:text-void transition-all duration-300
                       hover:shadow-glow"
            >
              <span>Get in touch</span>
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
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
