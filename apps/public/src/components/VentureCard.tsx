"use client";

import Link from "next/link";

export type VentureStatus = "Active" | "In Development" | "Planning";

export interface Venture {
  id: string;
  name: string;
  tagline: string;
  description: string;
  status: VentureStatus;
  url?: string;
  tags: string[];
  gradient: string;
}

interface VentureCardProps {
  venture: Venture;
  index: number;
}

const statusConfig: Record<VentureStatus, { bg: string; text: string; dot: string }> = {
  Active: { bg: "bg-emerald-500/15", text: "text-emerald-400", dot: "bg-emerald-400" },
  "In Development": { bg: "bg-copper/20", text: "text-copper", dot: "bg-copper" },
  Planning: { bg: "bg-silver/15", text: "text-silver", dot: "bg-silver" },
};

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 8l4 4m0 0l-4 4m4-4H3"
      />
    </svg>
  );
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  );
}

export function VentureCard({ venture, index }: VentureCardProps) {
  const status = statusConfig[venture.status];
  const cardClassName = "group relative p-8 bg-gradient-to-br backdrop-blur-sm border border-white/5 hover:border-copper/50 transition-all duration-500 overflow-hidden rounded-xl hover:shadow-[0_8px_40px_rgba(184,115,51,0.15)] hover:-translate-y-1 reveal";

  const CardContent = (
    <>
      {/* Animated top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-copper to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
      />

      {/* Card number */}
      <div className="absolute top-4 right-4 text-copper/15 font-mono text-5xl font-bold select-none">
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className="relative z-10">
        {/* Header with status badge */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${status.bg} ${status.text} mb-4`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${status.dot} ${venture.status === "Active" ? "animate-pulse" : ""}`}
              />
              {venture.status}
            </div>
            <h3 className="text-2xl font-semibold text-snow group-hover:text-copper transition-colors duration-300">
              {venture.name}
            </h3>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-copper font-medium mb-4">{venture.tagline}</p>

        {/* Description */}
        <p className="text-silver/80 text-sm mb-6 leading-relaxed line-clamp-3">
          {venture.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {venture.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-silver/70 hover:border-copper/50 hover:text-copper transition-all duration-300 cursor-default bg-white/[0.02]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Link indicator */}
        <div className="mt-6 flex items-center gap-2 text-copper/70 group-hover:text-copper transition-colors">
          {venture.url ? (
            <>
              <span className="text-sm font-medium">Visit site</span>
              <ExternalLinkIcon className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </>
          ) : (
            <>
              <span className="text-sm font-medium">Learn more</span>
              <ArrowRightIcon className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </div>
      </div>
    </>
  );

  if (venture.url) {
    return (
      <Link
        href={venture.url}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClassName}
      >
        {CardContent}
      </Link>
    );
  }

  return (
    <div className={cardClassName}>
      {CardContent}
    </div>
  );
}
