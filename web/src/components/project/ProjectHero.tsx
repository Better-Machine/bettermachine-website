import Image from "next/image";

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
            <a
              href="#get-involved"
              className="inline-flex items-center px-6 py-3 bg-[#B87333] hover:bg-[#B87333]/90 text-black font-medium rounded transition-colors"
            >
              Get Involved
              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#code"
              className="inline-flex items-center px-6 py-3 border border-slate-600 text-white hover:bg-slate-800 font-medium rounded transition-colors"
            >
              <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.308.678.92.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.193 22 16.438 22 12.017 22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              View Code
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
