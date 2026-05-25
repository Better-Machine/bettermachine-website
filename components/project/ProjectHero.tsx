import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, ExternalLink } from "lucide-react";

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
  const statusColors: Record<string, string> = {
    active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    draft: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    archived: "bg-slate-500/10 text-slate-400 border-slate-500/20",
  };

  return (
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
          <Badge
            variant="outline"
            className={`mb-6 ${statusColors[status] || statusColors.draft}`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>

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
            <Button
              className="bg-[#B87333] hover:bg-[#B87333]/90 text-black"
            >
              Get Involved
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="border-slate-600 text-white hover:bg-slate-800"
            >
              <Github className="mr-2 h-4 w-4" />
              View Code
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
