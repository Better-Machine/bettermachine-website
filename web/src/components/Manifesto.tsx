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
            <span className="text-[#B87333] text-sm font-mono tracking-wider">Why We Build</span>
          </div>

          {/* Content */}
          <div className="md:col-span-9 space-y-8">
            <h2 className="text-display-2 font-medium text-[#FAFAFA] text-balance">
              Why Exist in a State of Suck?
            </h2>

            <div className="space-y-6 text-lg text-[#A0A0A0] leading-relaxed">
              <p>
                Some people see a problem and write a blog post. We see a problem and ask: <em>what would it take to fix this?</em>
              </p>

              <p>
                Better Machine isn't a consultancy. It's not a product studio. It's a startup lab — native to AI, born from decades of wanting to build but lacking the tools. Our founder spent his career in technology without the engineering chops to execute his vision. Then AI closed the gap. That gap — the one between imagination and execution — is what we exist to close for everyone else stuck on the wrong side of it.
              </p>

              <p>
                We name our agents after people who matter. Ray — a best friend, a mentor, gone too soon, but whose name carries forward something smarter and more capable than any of us. Liz — a partnership forged under fire, two halves of a perfect machine. That's what we believe in: not solo genius, but collaboration. Not hype, but substance. Not waiting for permission, but building anyway.
              </p>

              <p>
                We believe passion and capitalism aren't opposites. We believe idealism without execution is just daydreaming. And we believe that if something sucks, someone should fix it.
              </p>

              <p className="text-[#FAFAFA]">
                That someone is us.
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
