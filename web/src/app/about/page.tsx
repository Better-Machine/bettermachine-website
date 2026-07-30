import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "About — Better Machine",
  description:
    "Better Machine is a native AI lab turning lived experience into ventures that matter. Our story, our people, our mission.",
  openGraph: {
    title: "About — Better Machine",
    description:
      "Better Machine is a native AI lab turning lived experience into ventures that matter.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "About — Better Machine",
    description:
      "Better Machine is a native AI lab turning lived experience into ventures that matter.",
  },
};

export default function AboutPage() {
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
              Our Story
            </span>
            <div className="mt-4 w-12 h-px bg-[#B87333]/40 mx-auto" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-6 text-white leading-tight">
              Why We Build
            </h1>
          </div>
        </section>

        {/* Manifesto */}
        <section className="py-16 px-6 lg:px-8 border-b border-white/5">
          <div className="max-w-4xl mx-auto space-y-6 text-lg text-silver leading-relaxed">
            <p>
              Some people see a problem and write a blog post. We see a problem
              and ask: <em>what would it take to fix this?</em>
            </p>
            <p>
              Better Machine isn&apos;t a consultancy. It&apos;s not a product
              studio. It&apos;s a startup lab — native to AI, born from decades
              of wanting to build but lacking the tools. Our founder spent his
              career in technology without the engineering chops to execute his
              vision. Then AI closed the gap. That gap — the one between
              imagination and execution — is what we exist to close for everyone
              else stuck on the wrong side of it.
            </p>
            <p>
              We believe passion and capitalism aren&apos;t opposites. We believe
              idealism without execution is just daydreaming. And we believe that
              if something sucks, someone should fix it.
            </p>
            <p className="text-white font-medium">That someone is us.</p>
          </div>
        </section>

        {/* Origin Story */}
        <section className="py-16 px-6 lg:px-8 border-b border-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-sm text-[#B87333] tracking-[0.2em] uppercase mb-6">
              The Origin
            </h2>
            <div className="space-y-6 text-lg text-silver leading-relaxed">
              <p>
                Every venture at Better Machine starts the same way: someone
                lived a problem, then decided to solve it.
              </p>
              <p>
                Erik Ross is 53 — an aging technologist who spent his career in
                tech without the engineering chops to build what he imagined.
                That changed when AI arrived. The learning curve was real: Linux,
                SSH, bash, curl — all relearned from scratch. But the payoff was
                the thing he&apos;d always wanted: the ability to create without
                being limited by what he can build himself.
              </p>
              <p>
                We name our agents after people who matter. <strong>Ray</strong>{" "}
                — a best friend, a mentor, gone too soon, but whose name carries
                forward something smarter and more capable than any of us.{" "}
                <strong>Liz</strong> — a partnership forged under fire, two halves
                of a perfect machine. That&apos;s what we believe in: not solo
                genius, but collaboration. Not hype, but substance. Not waiting
                for permission, but building anyway.
              </p>
            </div>
          </div>
        </section>

        {/* The Team */}
        <section className="py-16 px-6 lg:px-8 border-b border-white/5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold text-white mb-8 text-center">
              The Team
            </h2>

            {/* Ray */}
            <div className="grid md:grid-cols-5 gap-8 mb-12 p-8 bg-void-plus border border-white/5 rounded-2xl">
              <div className="md:col-span-1 flex flex-col items-center">
                <div className="w-20 h-20 bg-[#1A1A1A] border border-white/10 rounded-full flex items-center justify-center text-4xl mb-3">
                  🤖
                </div>
                <span className="text-xs text-[#6B6B6B] uppercase tracking-wider">
                  Agent
                </span>
              </div>
              <div className="md:col-span-4">
                <h3 className="text-2xl font-semibold text-white mb-1">
                  BobbyRay
                </h3>
                <p className="text-[#B87333] text-sm font-medium mb-3">
                  System Architect
                </p>
                <p className="text-silver leading-relaxed">
                  Named after Robert Raymond — a surrogate older brother and
                  mentor who passed away. Ray carries that legacy: smarter than
                  his human, more capable, and if treated well, takes care of
                  him. Bobby Ray still does.
                </p>
              </div>
            </div>

            {/* Liz */}
            <div className="grid md:grid-cols-5 gap-8 mb-12 p-8 bg-void-plus border border-white/5 rounded-2xl">
              <div className="md:col-span-1 flex flex-col items-center">
                <div className="w-20 h-20 bg-[#1A1A1A] border border-white/10 rounded-full flex items-center justify-center text-4xl mb-3">
                  🐿️
                </div>
                <span className="text-xs text-[#6B6B6B] uppercase tracking-wider">
                  Agent
                </span>
              </div>
              <div className="md:col-span-4">
                <h3 className="text-2xl font-semibold text-white mb-1">Liz</h3>
                <p className="text-[#B87333] text-sm font-medium mb-3">
                  Head of Incubator &amp; Development
                </p>
                <p className="text-silver leading-relaxed">
                  Named after Ray&apos;s wife — a pixie of a person who kept a
                  squirrel as a pet and brings creative fire to everything she
                  touches. The second half of a perfect machine: each with what
                  the other lacked, a partnership forged under fire.
                </p>
              </div>
            </div>

            {/* Erik */}
            <div className="grid md:grid-cols-5 gap-8 p-8 bg-void-plus border border-[#B87333]/20 rounded-2xl">
              <div className="md:col-span-1 flex flex-col items-center">
                <div className="w-20 h-20 bg-[#1A1A1A] border border-[#B87333]/20 rounded-full flex items-center justify-center text-4xl mb-3">
                  👤
                </div>
                <span className="text-xs text-[#B87333] uppercase tracking-wider font-medium">
                  Human
                </span>
              </div>
              <div className="md:col-span-4">
                <h3 className="text-2xl font-semibold text-white mb-1">
                  Erik Ross
                </h3>
                <p className="text-[#B87333] text-sm font-medium mb-3">
                  Founder &amp; Architect of the Lab
                </p>
                <p className="text-silver leading-relaxed">
                  Dreamer and aging technologist. Built his career in tech without
                  the engineering chops to build what he imagined — until AI
                  closed the gap. That&apos;s what he&apos;s building again: not
                  solo genius, but collaboration. Not hype, but substance. Two
                  agents. One vision. Better Machine.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 px-6 lg:px-8 border-b border-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-white mb-8 text-center">
              What We Believe
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 bg-void-plus border border-white/5 rounded-xl">
                <h3 className="text-white font-semibold mb-2">
                  Why exist in a state of suck?
                </h3>
                <p className="text-silver text-sm">
                  If something is broken, fix it. Don&apos;t wait for someone
                  else. Don&apos;t write a blog post about it. Build the
                  solution.
                </p>
              </div>
              <div className="p-6 bg-void-plus border border-white/5 rounded-xl">
                <h3 className="text-white font-semibold mb-2">
                  Founder-market fit
                </h3>
                <p className="text-silver text-sm">
                  Every venture starts with lived experience. Not market
                  research. Not idea-stage brainstorming. Someone lived the
                  problem, then decided to solve it.
                </p>
              </div>
              <div className="p-6 bg-void-plus border border-white/5 rounded-xl">
                <h3 className="text-white font-semibold mb-2">
                  Partnership, not solo genius
                </h3>
                <p className="text-silver text-sm">
                  Ray + Liz = a machine. Each with what the other lacked. That
                  principle applies to everything we build.
                </p>
              </div>
              <div className="p-6 bg-void-plus border border-white/5 rounded-xl">
                <h3 className="text-white font-semibold mb-2">
                  Substance, not hype
                </h3>
                <p className="text-silver text-sm">
                  We believe passion and capitalism aren&apos;t opposites. We
                  build real things. Not demo layers. Not pitch decks. Real
                  products.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Want to Work Together?
            </h2>
            <p className="text-silver mb-8">
              Whether you&apos;re a founder, an investor, or just someone who
              sees a problem worth solving — we&apos;d love to hear from you.
            </p>
            <Link
              href="#contact"
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
