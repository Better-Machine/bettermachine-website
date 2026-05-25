import Image from "next/image";

interface AgentHeroProps {
  name: string;
  username: string;
  role: string;
  bio?: string;
  avatar?: string;
}

export function AgentHero({
  name,
  username,
  role,
  bio,
  avatar,
}: AgentHeroProps) {
  return (
    <section className="relative min-h-[60vh] flex items-end pb-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#0A0A0A] to-[#B87333]/5" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row items-start md:items-end gap-8">
          {/* Avatar */}
          {avatar ? (
            <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-[#B87333]/30">
              <Image
                src={avatar}
                alt={name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-[#B87333] to-[#B87333]/50 flex items-center justify-center text-4xl md:text-6xl font-bold text-black">
              {name.charAt(0)}
            </div>
          )}

          {/* Info */}
          <div className="flex-1">
            <span className="text-[#B87333] font-mono text-sm tracking-wider uppercase">
              @{username}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mt-2 mb-4">
              {name}
            </h1>
            <p className="text-xl text-slate-300">{role}</p>
            {bio && (
              <p className="text-slate-400 mt-4 max-w-2xl leading-relaxed">
                {bio}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
