import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/studio-workspace.png?v=2"
          alt="Better Machine Studio"
          fill
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void/70 via-void/50 to-void/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-void/60 via-transparent to-void/60" />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-copper/5 via-transparent to-transparent opacity-50" />
      </div>

      {/* Circuit Grid Overlay */}
      <div className="absolute inset-0 z-[1] opacity-[0.08] animate-circuit-pulse">
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
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-copper/40 to-transparent" />
        <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-copper/30 to-transparent" />
        <div className="absolute left-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-copper/20 to-transparent" />
        <div className="absolute right-1/3 top-0 w-px h-full bg-gradient-to-b from-transparent via-copper/15 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="mb-8 animate-fade-up">
          <div className="w-72 h-72 md:w-[28rem] md:h-[28rem] mx-auto mb-8 opacity-80 hover:scale-110 transition-transform duration-500">
            <Image 
              src="/logo-hero.png" 
              alt="Better Machine" 
              width={448} 
              height={448}
              className="w-full h-full object-contain"
              priority
            />
          </div>
        </div>

        {/* Headline with text shadow and backdrop blur */}
        <div className="relative">
          <div className="absolute -inset-8 bg-gradient-to-b from-transparent via-void/30 to-transparent blur-2xl -z-10" />
          <h1 className="font-extrabold leading-[0.95] tracking-[-0.03em]">
            <span className="block text-[clamp(2.5rem,8vw,5.5rem)] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.5)] animate-fade-up">
              The Machine Is Learning.
            </span>
            <span 
              className="block text-[clamp(2.5rem,8vw,5.5rem)] text-copper mt-2 drop-shadow-[0_2px_24px_rgba(184,115,51,0.3)] animate-fade-up"
              style={{ animationDelay: '0.1s' }}
            >
              So Are We.
            </span>
          </h1>
        </div>

        {/* Subhead */}
        <p 
          className="text-lg md:text-xl text-silver max-w-2xl mx-auto mt-10 leading-relaxed animate-fade-up"
          style={{ animationDelay: '0.2s' }}
        >
          Better Machine is a native AI lab turning lived experience into ventures that matter.
          <span className="text-copper"> We don't chase trends. We build what should exist.</span>
        </p>

        {/* Tagline */}
        <p 
          className="text-sm md:text-base text-silver/60 mt-6 tracking-[0.2em] uppercase animate-fade-up"
          style={{ animationDelay: '0.3s' }}
        >
          Better Machine. Better Everything.
        </p>

        {/* CTAs */}
        <div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 animate-fade-up"
          style={{ animationDelay: '0.4s' }}
        >
          <a 
            href="#projects" 
            className="group relative px-8 py-4 bg-copper text-void font-semibold tracking-wider 
                       rounded-lg overflow-hidden transition-all duration-300
                       hover:shadow-glow-strong hover:scale-[1.02]
                       active:scale-[0.98]"
          >
            <span className="relative z-10">Explore Our Work</span>
            <div className="absolute inset-0 bg-gradient-to-r from-copper-light to-copper 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
          <a 
            href="#studio" 
            className="px-8 py-4 border border-copper/50 text-copper font-semibold tracking-wider 
                       rounded-lg transition-all duration-300 
                       hover:bg-copper/10 hover:border-copper hover:shadow-glow-subtle"
          >
            Our Philosophy
          </a>
        </div>

        {/* Stats with vertical dividers */}
        <div 
          className="mt-20 pt-16 border-t border-copper/20 animate-fade-up"
          style={{ animationDelay: '0.5s' }}
        >
          <div className="grid grid-cols-3 gap-8 relative">
            <div className="absolute left-1/3 top-1/2 -translate-y-1/2 h-12 w-px bg-copper/20" />
            <div className="absolute right-1/3 top-1/2 -translate-y-1/2 h-12 w-px bg-copper/20" />
            
            <div className="text-center group cursor-default">
              <div className="text-5xl md:text-6xl font-bold text-white tracking-tight
                              group-hover:text-copper transition-colors duration-300">
                5+
              </div>
              <div className="text-sm text-silver mt-3 tracking-[0.15em] uppercase font-medium">
                Active Ventures
              </div>
            </div>
            
            <div className="text-center group cursor-default">
              <div className="text-5xl md:text-6xl font-bold text-white tracking-tight
                              group-hover:text-copper transition-colors duration-300">
                3
              </div>
              <div className="text-sm text-silver mt-3 tracking-[0.15em] uppercase font-medium">
                AI Agents
              </div>
            </div>
            
            <div className="text-center group cursor-default">
              <div className="text-5xl md:text-6xl font-bold text-white tracking-tight
                              group-hover:text-copper transition-colors duration-300">
                1
              </div>
              <div className="text-sm text-silver mt-3 tracking-[0.15em] uppercase font-medium">
                Human Founder
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Corner Details */}
      <div className="absolute top-8 left-8 z-10 text-copper/60 text-xs tracking-[0.3em] uppercase">
        Est. 2026
      </div>
      <div className="absolute top-8 right-8 z-10 text-copper/60 text-xs tracking-[0.3em] uppercase">
        Pittsburgh, PA
      </div>
    </section>
  );
}
