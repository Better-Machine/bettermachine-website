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
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/70 via-[#0A0A0A]/50 to-[#0A0A0A]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/60 via-transparent to-[#0A0A0A]/60" />
      </div>

      {/* Circuit Grid Overlay */}
      <div className="absolute inset-0 z-[1] opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(184, 115, 51, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(184, 115, 51, 0.15) 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      {/* Animated Lines */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#B87333]/40 to-transparent" />
        <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#B87333]/30 to-transparent" />
        <div className="absolute left-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-[#B87333]/20 to-transparent" />
        <div className="absolute right-1/3 top-0 w-px h-full bg-gradient-to-b from-transparent via-[#B87333]/15 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="mb-8 animate-fade-in">
          <div className="w-20 h-20 mx-auto mb-8 opacity-80">
            <Image 
              src="/logo-dark-alt.png" 
              alt="Better Machine" 
              width={80} 
              height={80}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* New Headline from Brand Guardian */}
        <h1 className="font-bold leading-[0.95] tracking-tighter">
          <span className="block text-[clamp(2rem,7vw,5rem)] text-white">
            The Machine Is Learning.
          </span>
          <span className="block text-[clamp(2rem,7vw,5rem)] text-[#B87333] mt-2">
            So Are We.
          </span>
        </h1>

        {/* New Subhead */}
        <p className="text-lg md:text-xl text-[#A0A0A0] max-w-2xl mx-auto mt-10 leading-relaxed">
          Better Machine is a native AI lab turning lived experience into ventures that matter.
          <span className="text-[#B87333]"> We don't chase trends. We build what should exist.</span>
        </p>

        {/* Tagline */}
        <p className="text-sm md:text-base text-[#6B6B6B] mt-6 tracking-[0.2em] uppercase">
          Better Machine. Better Everything.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
          <a 
            href="#projects" 
            className="group relative px-8 py-4 bg-[#B87333] text-[#0A0A0A] font-semibold tracking-wider overflow-hidden"
          >
            <span className="relative z-10">SEE OUR WORK</span>
            <div className="absolute inset-0 bg-[#C48A4E] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </a>
          <a 
            href="#studio" 
            className="px-8 py-4 border border-[#B87333]/50 text-[#B87333] font-semibold tracking-wider hover:bg-[#B87333]/10 hover:border-[#B87333] transition-all"
          >
            MEET THE STUDIO
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 pt-12 border-t border-[#B87333]/20 grid grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-white">5+</div>
            <div className="text-sm text-[#A0A0A0] mt-2 tracking-widest uppercase">Active Ventures</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-white">3</div>
            <div className="text-sm text-[#A0A0A0] mt-2 tracking-widest uppercase">AI Agents</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-white">1</div>
            <div className="text-sm text-[#A0A0A0] mt-2 tracking-widest uppercase">Human Founder</div>
          </div>
        </div>
      </div>

      {/* Corner Details */}
      <div className="absolute top-8 left-8 z-10 text-[#B87333]/50 text-xs tracking-[0.3em] uppercase">
        Est. 2026
      </div>
      <div className="absolute top-8 right-8 z-10 text-[#B87333]/50 text-xs tracking-[0.3em] uppercase">
        Pittsburgh, PA
      </div>
    </section>
  );
}
