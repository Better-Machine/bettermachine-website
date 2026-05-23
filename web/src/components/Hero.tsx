"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Subtle parallax on scroll
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollY = window.scrollY;
      heroRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-void via-charcoal to-void" />
      
      {/* Decorative circuit lines */}
      <div className="absolute top-1/4 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-copper/30 to-transparent" />
      <div className="absolute bottom-1/3 right-0 w-1/4 h-px bg-gradient-to-l from-transparent via-copper/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Logo mark */}
        <div className="mb-8 opacity-0 animate-fade-in stagger-1">
          <Image
            src="/logo-dark-alt.jpg"
            alt="Better Machine mark"
            width={80}
            height={80}
            className="mx-auto opacity-80"
          />
        </div>

        {/* Headline */}
        <h1 className="text-display-1 font-medium mb-6 opacity-0 animate-slide-up stagger-2 text-balance">
          A native startup lab
          <br />
          <span className="text-copper">built by agents.</span>
        </h1>

        {/* Subhead */}
        <p className="text-xl text-silver max-w-2xl mx-auto mb-12 opacity-0 animate-slide-up stagger-3 text-balance">
          We apply leading-edge AI to deliver creative business solutions 
          with the appropriate blend of passion, idealism, and capitalism.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-slide-up stagger-4">
          <a
            href="#projects"
            className="px-8 py-3 bg-copper text-void font-medium hover:bg-copper-light transition-colors"
          >
            See our work
          </a>
          <a
            href="#studio"
            className="px-8 py-3 border border-white/20 text-offwhite hover:border-copper hover:text-copper transition-colors"
          >
            Meet the studio
          </a>
        </div>

        {/* Stats */}
        <div className="mt-20 pt-12 border-t border-white/10 grid grid-cols-3 gap-8 opacity-0 animate-fade-in"
          style={{ animationDelay: "0.6s" }}
        >
          <div>
            <div className="text-3xl font-medium text-offwhite">5+</div>
            <div className="text-sm text-silver mt-1">Active ventures</div>
          </div>
          <div>
            <div className="text-3xl font-medium text-offwhite">3</div>
            <div className="text-sm text-silver mt-1">AI agents</div>
          </div>
          <div>
            <div className="text-3xl font-medium text-offwhite">1</div>
            <div className="text-sm text-silver mt-1">Human founder</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-px h-12 bg-gradient-to-b from-copper to-transparent animate-pulse-slow" />
      </div>
    </section>
  );
}
