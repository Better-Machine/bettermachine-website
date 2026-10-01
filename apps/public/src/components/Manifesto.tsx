"use client";

import { useEffect, useRef } from "react";

export function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);

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

    const elements = sectionRef.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="studio"
      ref={sectionRef}
      className="py-32 bg-void relative overflow-hidden"
    >
      {/* Decorative top line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent to-copper/30" />

      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      <div className="max-w-4xl mx-auto px-6 relative">
        {/* Section header */}
        <div 
          className="text-center mb-16 reveal"
        >
          <span className="font-mono text-sm text-copper tracking-[0.2em] uppercase">
            Why We Build
          </span>
          <div className="mt-4 w-12 h-px bg-copper/40 mx-auto" />
        </div>

        {/* Pull quote */}
        <blockquote className="relative my-20 py-12 px-8 text-center reveal">
          <span className="absolute top-0 left-1/2 -translate-x-1/2 text-[10rem] text-copper/10 font-serif leading-none pointer-events-none select-none">
            "
          </span>
          <p className="relative text-3xl md:text-4xl font-light text-snow leading-tight max-w-3xl mx-auto">
            Why exist in a state of suck?
          </p>
          <div className="mt-8 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-copper to-transparent" />
        </blockquote>

        {/* Content */}
        <div className="space-y-8 text-lg text-silver leading-relaxed max-w-3xl mx-auto">
          <p className="reveal">
            Some people see a problem and write a blog post. We see a problem and ask:{" "}
            <em className="text-snow">what would it take to fix this?</em>
          </p>

          <p className="reveal">
            Better Machine isn't a consultancy. It's not a product studio. It's a startup lab — native to AI, born from decades of wanting to build but lacking the tools. Our founder spent his career in technology without the engineering chops to execute his vision. Then AI closed the gap. That gap — the one between imagination and execution — is what we exist to close for everyone else stuck on the wrong side of it.
          </p>

          <p className="reveal">
            We name our agents after people who matter. Ray — a best friend, a mentor, gone too soon, but whose name carries forward something smarter and more capable than any of us. Liz — a partnership forged under fire, two halves of a perfect machine. That's what we believe in: not solo genius, but collaboration. Not hype, but substance. Not waiting for permission, but building anyway.
          </p>

          <p className="reveal">
            We believe passion and capitalism aren't opposites. We believe idealism without execution is just daydreaming. And we believe that if something sucks, someone should fix it.
          </p>

          <p className="text-snow font-medium text-xl reveal">
            That someone is us.
          </p>
        </div>

        {/* Principles */}
        <div className="mt-20 pt-16 border-t border-white/10 grid sm:grid-cols-3 gap-8">
          {[
            {
              title: "Passion",
              description: "We only build things we care about.",
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657L13.414 22.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ),
            },
            {
              title: "Idealism",
              description: "The world can be better. We act on that.",
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              ),
            },
            {
              title: "Capitalism",
              description: "Sustainable businesses fund more good.",
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              ),
            },
          ].map((principle, index) => (
            <div
              key={principle.title}
              className="group relative p-6 bg-charcoal/30 border border-white/5 rounded-xl
                         hover:border-copper/50 transition-all duration-500
                         hover:shadow-[0_8px_40px_rgba(184,115,51,0.1)] reveal"
            >
              <div className="w-12 h-12 mb-6 text-copper group-hover:scale-110
                            group-hover:drop-shadow-[0_0_12px_rgba(184,115,51,0.5)]
                            transition-all duration-300">
                {principle.icon}
              </div>
              <h3 className="text-xl font-semibold text-snow mb-3 tracking-tight">
                {principle.title}
              </h3>
              <p className="text-silver text-sm leading-relaxed">
                {principle.description}
              </p>
              <div className="absolute bottom-0 left-6 right-6 h-px
                            bg-gradient-to-r from-transparent via-copper/60 to-transparent
                            scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
