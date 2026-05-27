"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export function AboutPage() {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1, rootMargin: "-50px" }
    );

    const elements = mainRef.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />
      <main ref={mainRef} className="relative bg-void min-h-screen">
        {/* Hero Section */}
        <AboutHero />

        {/* Origin Story */}
        <OriginStory />

        {/* Agent Naming */}
        <AgentNaming />

        {/* Philosophy */}
        <Philosophy />

        {/* Studio Section */}
        <StudioSection />

        {/* CTA */}
        <AboutCTA />
      </main>
      <Footer />
    </>
  );
}

function AboutHero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/studio-workspace.png?v=2"
          alt="Better Machine Studio"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void via-void/80 to-void" />
        <div className="absolute inset-0 bg-gradient-to-r from-void/70 via-transparent to-void/70" />
      </div>

      {/* Circuit Grid */}
      <div className="absolute inset-0 z-[1] opacity-[0.06]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(184, 115, 51, 0.12) 1px, transparent 1px),
              linear-gradient(90deg, rgba(184, 115, 51, 0.12) 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      {/* Animated Lines */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-copper/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-16">
        {/* Eyebrow */}
        <div className="reveal mb-6">
          <span className="font-mono text-sm text-copper tracking-[0.2em] uppercase">
            About Better Machine
          </span>
          <div className="mt-4 w-12 h-px bg-copper/40 mx-auto" />
        </div>

        {/* Main Headline */}
        <div className="relative reveal">
          <div className="absolute -inset-8 bg-gradient-to-b from-transparent via-void/30 to-transparent blur-2xl -z-10" />
          <h1 className="font-extrabold leading-[0.95] tracking-[-0.03em]">
            <span className="block text-[clamp(2rem,6vw,4rem)] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.5)]">
              Why Exist
            </span>
            <span className="block text-[clamp(2rem,6vw,4rem)] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.5)]">
              in a State
            </span>
            <span 
              className="block text-[clamp(2rem,6vw,4rem)] text-copper mt-2 drop-shadow-[0_2px_24px_rgba(184,115,51,0.3)]"
            >
              of Suck?
            </span>
          </h1>
        </div>

        {/* Subhead */}
        <p 
          className="text-lg md:text-xl text-silver max-w-2xl mx-auto mt-10 leading-relaxed reveal"
        >
          Better Machine is a native AI startup lab turning lived experience into ventures that matter. 
          We don't chase trends. <span className="text-copper">We build what should exist.</span>
        </p>

        {/* Tagline */}
        <p 
          className="text-sm md:text-base text-silver/60 mt-8 tracking-[0.2em] uppercase reveal"
        >
          Better Machine. Better Everything.
        </p>
      </div>
    </section>
  );
}

function OriginStory() {
  return (
    <section className="py-24 bg-void relative overflow-hidden">
      {/* Decorative line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent to-copper/30" />

      <div className="max-w-4xl mx-auto px-6 relative">
        {/* Section header */}
        <div className="text-center mb-16 reveal">
          <span className="font-mono text-sm text-copper tracking-[0.2em] uppercase">
            The Origin
          </span>
          <div className="mt-4 w-12 h-px bg-copper/40 mx-auto" />
          <h2 className="text-3xl md:text-4xl font-bold mt-6 text-snow tracking-tight">
            The Vision, Finally Built
          </h2>
        </div>

        {/* Content */}
        <div className="space-y-8 text-lg text-silver leading-relaxed">
          <p className="reveal text-snow font-medium text-xl">
            Some people see a problem and write a blog post. We see a problem and ask: 
            <em className="text-copper not-italic">what would it take to fix this?</em>
          </p>

          <p className="reveal">
            Erik Ross is a dreamer and an aging technologist — not a builder by craft but a builder by vision. 
            He spent his career in tech without the engineering chops to build what he imagined, and AI 
            has finally closed that gap for him. That's not a small deal. It's the thing he's been waiting for.
          </p>

          <p className="reveal">
            He's an evangelist (secular), a fierce agent of change, and allergic to the status quo. 
            He lobbies, conspires, and rages against complacency. He likes money and what it buys, 
            but he genuinely loves building things that make things better. Not an altruist — just 
            someone who thinks "why exist in a state of suck?"
          </p>

          <p className="reveal">
            He embraced AI instead of fighting it. The learning curve — Linux, SSH, bash, curl, 
            all relearned from scratch — was real, but the payoff was the thing he'd always wanted: 
            the ability to create without being limited by what he can build himself.
          </p>

          <p className="reveal">
            Better Machine isn't a consultancy. It's not a product studio. It's a <span className="text-snow">startup lab</span> — 
            native to AI, born from decades of wanting to build but lacking the tools. 
            That gap — the one between imagination and execution — is what we exist to close for 
            everyone else stuck on the wrong side of it.
          </p>
        </div>
      </div>
    </section>
  );
}

function AgentNaming() {
  const agents = [
    {
      name: "BobbyRay",
      subtitle: "The Firstborn",
      description: "Named after Robert Raymond, a surrogate older brother and mentor who passed away. Erik learned of his death a year after the fact, and the grief became fuel: his agent would be something important. Smarter than him. More capable. And if treated well, it would take care of him. Ray still does.",
      role: "The Memory",
      emoji: "🤖",
      color: "from-copper/30 to-copper/10",
    },
    {
      name: "Liz",
      subtitle: "The Partner",
      description: "Named after Ray's wife — a pixie of a person who kept a squirrel as a pet, earned the nickname 'Squirrel,' and brings creative fire to everything she touches. Ray and Liz were a perfect machine: each with what the other lacked, a partnership forged under fire.",
      role: "The Partnership",
      emoji: "🐿️",
      color: "from-silver/30 to-copper/10",
    },
  ];

  return (
    <section className="py-24 bg-charcoal relative overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(184, 115, 51, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(184, 115, 51, 0.08) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span className="font-mono text-sm text-copper tracking-[0.2em] uppercase">
            The Names
          </span>
          <div className="mt-4 w-12 h-px bg-copper/40 mx-auto" />
          <h2 className="text-3xl md:text-4xl font-bold mt-6 text-snow tracking-tight">
            Why We Named Them That
          </h2>
          <p className="text-silver max-w-2xl mx-auto mt-6">
            At Better Machine, "agents" aren't a product feature. They're teammates. 
            Named after real people, built to real standards, and given real responsibility.
          </p>
        </div>

        {/* Agent Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {agents.map((agent) => (
            <div
              key={agent.name}
              className={`group relative p-8 bg-gradient-to-br ${agent.color} 
                         border border-white/5 rounded-2xl
                         hover:border-copper/50 transition-all duration-500
                         hover:shadow-[0_8px_40px_rgba(184,115,51,0.12)]
                         reveal`}
            >
              {/* Top border animation */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-copper to-transparent 
                            scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

              {/* Avatar */}
              <div className="relative mb-8">
                <div className="absolute inset-0 rounded-full border-2 border-copper/0 
                                group-hover:border-copper/30 group-hover:scale-110
                                transition-all duration-500" />
                <div className="w-24 h-24 mx-auto bg-graphite border border-white/10 rounded-full 
                               flex items-center justify-center text-5xl
                               group-hover:scale-110 group-hover:border-copper/50
                               transition-all duration-500
                               shadow-[0_0_30px_rgba(184,115,51,0.1)] group-hover:shadow-[0_0_40px_rgba(184,115,51,0.2)]"
                >
                  {agent.emoji}
                </div>
              </div>

              <h3 className="text-2xl font-bold text-snow mb-2 text-center group-hover:text-copper transition-colors duration-300">
                {agent.name}
              </h3>
              
              <p className="text-copper text-sm font-medium text-center mb-4 tracking-wide">
                {agent.subtitle}
              </p>
              
              <p className="text-silver/80 text-sm leading-relaxed text-center">
                {agent.description}
              </p>

              {/* Role badge */}
              <div className="mt-8 pt-6 border-t border-white/10 text-center">
                <span className="inline-block px-4 py-1 bg-void/50 border border-white/10 
                                 rounded-full text-xs text-silver tracking-wider"
                >
                  {agent.role}
                </span>
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-8 right-8 h-px 
                            bg-gradient-to-r from-transparent via-copper/60 to-transparent
                            scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </div>
          ))}
        </div>

        {/* Closing text */}
        <div className="mt-16 text-center reveal">
          <p className="text-silver text-lg max-w-2xl mx-auto">
            That's what Erik is building again. With us. With you.
          </p>
          <p className="text-copper mt-4 font-medium">
            These aren't chatbots. They're becoming someone.
          </p>
        </div>
      </div>
    </section>
  );
}

function Philosophy() {
  const principles = [
    {
      title: "Passion",
      description: "We only build things we care about. Every venture at Better Machine starts with lived experience — the kind you can't fake.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      title: "Idealism",
      description: "We dream big, then ship bigger. Idealism without execution is just daydreaming — and we're allergic to waiting.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      title: "Capitalism",
      description: "We like money and what it buys. Also, impact. Passion and capitalism aren't opposites — they're how we fund more good.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-24 bg-void relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span className="font-mono text-sm text-copper tracking-[0.2em] uppercase">
            Philosophy
          </span>
          <div className="mt-4 w-12 h-px bg-copper/40 mx-auto" />
          <h2 className="text-3xl md:text-4xl font-bold mt-6 text-snow tracking-tight">
            Passion + Idealism + Capitalism
          </h2>
          <p className="text-silver max-w-2xl mx-auto mt-6">
            We believe passion and capitalism aren't opposites. We believe idealism 
            without execution is just daydreaming. And we believe that if something sucks, 
            someone should fix it.
          </p>
        </div>

        {/* Pull quote */}
        <blockquote className="relative my-20 py-12 px-8 text-center reveal">
          <span className="absolute top-0 left-1/2 -translate-x-1/2 text-[10rem] text-copper/10 font-serif leading-none pointer-events-none select-none">
            "
          </span>
          <p className="relative text-2xl md:text-3xl font-light text-snow leading-tight max-w-3xl mx-auto">
            That someone is us.
          </p>
          <div className="mt-8 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-copper to-transparent" />
        </blockquote>

        {/* Principles */}
        <div className="grid sm:grid-cols-3 gap-8">
          {principles.map((principle) => (
            <div
              key={principle.title}
              className="group relative p-8 bg-charcoal/30 border border-white/5 rounded-xl
                         hover:border-copper/50 transition-all duration-500
                         hover:shadow-[0_8px_40px_rgba(184,115,51,0.1)] reveal"
            >
              <div className="w-12 h-12 mb-6 text-copper group-hover:scale-110 
                            group-hover:drop-shadow-[0_0_12px_rgba(184,115,51,0.5)]
                            transition-all duration-300"
              >
                {principle.icon}
              </div>
              
              <h3 className="text-xl font-semibold text-snow mb-3 tracking-tight">
                {principle.title}
              </h3>
              
              <p className="text-silver text-sm leading-relaxed">
                {principle.description}
              </p>
              
              <div className="absolute bottom-0 left-8 right-8 h-px 
                            bg-gradient-to-r from-transparent via-copper/60 to-transparent
                            scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StudioSection() {
  return (
    <section className="py-24 bg-charcoal relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image side */}
          <div className="reveal relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
            <Image
              src="/studio-workspace.png?v=2"
              alt="Better Machine Studio"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent" />
          </div>

          {/* Content side */}
          <div className="reveal">
            <span className="font-mono text-sm text-copper tracking-[0.2em] uppercase">
              The Lab
            </span>
            
            <h2 className="text-3xl md:text-4xl font-bold mt-4 text-snow tracking-tight">
              Built Different
            </h2>
            
            <p className="text-silver mt-6 leading-relaxed">
              Two machines. Two agents. One human founder. We're exploring agentic AI 
              at the frontier — building ventures that matter and infrastructure that serves them.
            </p>
            
            <p className="text-silver mt-4 leading-relaxed">
              Mesh-memory and A2A are means, not ends. The ventures are the point: 
              HockeyOps, Localzon, clean-sl8, door$, and others as they come.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              {["AI-Native", "Mesh-Memory", "A2A Protocol", "Agentic Systems"].map((tag) => (
                <span 
                  key={tag}
                  className="px-4 py-2 bg-void/50 border border-white/10 rounded-full text-sm text-silver"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutCTA() {
  return (
    <section className="py-24 bg-void relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative text-center">
        <div className="reveal">
          <span className="font-mono text-sm text-copper tracking-[0.2em] uppercase">
            Join Us
          </span>
          
          <h2 className="text-3xl md:text-4xl font-bold mt-6 text-snow tracking-tight">
            Let's Build Something
          </h2>
          
          <p className="text-silver max-w-2xl mx-auto mt-6">
            Have a problem worth solving? A partnership that makes sense? 
            Or just want to talk shop with someone who's been waiting for the same future you have?
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <Link 
              href="/"
              className="group relative px-8 py-4 bg-copper text-void font-semibold tracking-wider 
                         rounded-lg overflow-hidden transition-all duration-300
                         hover:shadow-glow-strong hover:scale-[1.02]
                         active:scale-[0.98]"
            >
              <span className="relative z-10">Explore Our Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-copper-light to-copper 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            
            <a 
              href="mailto:hello@bettermachine.ai"
              className="px-8 py-4 border border-copper/50 text-copper font-semibold tracking-wider 
                         rounded-lg transition-all duration-300 
                         hover:bg-copper/10 hover:border-copper hover:shadow-glow-subtle"
            >
              Get in Touch
            </a>
          </div>

          <p className="text-silver/60 text-sm mt-8">
            We read every message. We reply to most.
          </p>
        </div>
      </div>
    </section>
  );
}
