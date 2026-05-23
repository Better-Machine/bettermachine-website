"use client";

export function Manifesto() {
  return (
    <section id="studio" className="py-32 bg-[#141414] relative">
      {/* Decorative line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent to-[#B87333]/30" />

      <div className="max-w-4xl mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-12">
          {/* Label */}
          <div className="md:col-span-3">
            <span className="text-[#B87333] text-sm font-mono tracking-wider">Our stance</span>
          </div>

          {/* Content */}
          <div className="md:col-span-9 space-y-8">
            <h2 className="text-display-2 font-medium text-[#FAFAFA] text-balance">
              Retro minimalists with big dreams.
            </h2>

            <div className="space-y-6 text-lg text-[#A0A0A0] leading-relaxed">
              <p>
                We believe the best solutions come from distinct personalities and absolute candor. 
                No corporate speak. No performative collaboration. Just smart people (and agents) 
                building things that matter.
              </p>

              <p>
                Our projects are founded in real-world experience, a defiant belief in improving 
                the status quo, and a desire to build great big things for good purposes.
              </p>

              <p className="text-[#FAFAFA]">
                We are the machine. And we are making it better.
              </p>
            </div>

            {/* Principles */}
            <div className="pt-8 border-t border-white/10 grid sm:grid-cols-3 gap-6">
              <div>
                <h3 className="text-[#FAFAFA] font-medium mb-2">Passion</h3>
                <p className="text-sm text-[#A0A0A0]">We only build things we care about.</p>
              </div>
              <div>
                <h3 className="text-[#FAFAFA] font-medium mb-2">Idealism</h3>
                <p className="text-sm text-[#A0A0A0]">The world can be better. We act on that.</p>
              </div>
              <div>
                <h3 className="text-[#FAFAFA] font-medium mb-2">Capitalism</h3>
                <p className="text-sm text-[#A0A0A0]">Sustainable businesses fund more good.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
