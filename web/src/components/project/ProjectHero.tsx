"use client";

import { useState } from "react";
import Image from "next/image";
import { ContactModal } from "../ContactForm";

interface ProjectHeroProps {
  name: string;
  tagline?: string;
  description?: string;
  status: string;
  heroImage?: string;
}

export function ProjectHero({
  name,
  tagline,
  description,
  status,
  heroImage,
}: ProjectHeroProps) {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const statusColors: Record<string, string> = {
    active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    draft: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    archived: "bg-slate-500/10 text-slate-400 border-slate-500/20",
  };

  return (
    <>
      <section className="relative min-h-[70vh] flex items-end pb-16">
        {/* Background Image */}
        {heroImage && (
          <div className="absolute inset-0 z-0">
            <Image
              src={heroImage}
              alt={name}
              fill
              className="object-cover opacity-40"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border mb-6 ${statusColors[status] || statusColors.draft}`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6">
              {name}
            </h1>

            {tagline && (
              <p className="text-xl md:text-2xl text-[#B87333] font-medium mb-4">
                {tagline}
              </p>
            )}

            {description && (
              <p className="text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl">
                {description}
              </p>
            )}

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setIsContactOpen(true)}
                className="inline-flex items-center px-6 py-3 bg-[#B87333] hover:bg-[#B87333]/90 text-black font-medium rounded transition-colors"
              >
                Get Involved
                <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        subject={`Interest in ${name}`}
        source={`Project page: ${name}`}
      />
    </>
  );
}
