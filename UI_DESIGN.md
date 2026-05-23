# Better Machine Website — UI Design Specifications

**Prepared by:** UI Designer Agent  
**Date:** 2026-05-23  
**For:** bettermachine.ai Next.js + Tailwind Implementation

---

## Executive Summary

The current Hero implementation is functional but template-like. This design spec transforms it into a premium, editorial experience with refined typography, intentional motion, and sophisticated visual hierarchy. The goal: make it feel like a high-end AI lab, not a SaaS startup.

---

## Section 1: Hero Section

### Visual Mockup Description

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │  EST. 2026                                  PITTSBURGH, PA              │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│                                    [LOGO]                                   │
│                                 64px height                                 │
│                                                                             │
│  ═══════════════════════════════════════════════════════════════════════  │
│                                                                             │
│          ┌─────────────────────────────────────────────────────┐           │
│          │                                                     │           │
│          │    The Machine Is Learning.                         │           │
│          │                   So Are We.                        │           │
│          │                                                     │           │
│          │         ↳ "So Are We." in Copper (#B87333)          │           │
│          │         ↳ Both lines in Display size                │           │
│          │                                                     │           │
│          └─────────────────────────────────────────────────────┘           │
│                                                                             │
│          Better Machine is a native AI lab turning lived experience         │
│          into ventures that matter. We don't chase trends.                  │
│          We build what should exist.                                        │
│                                                                             │
│          ────── Better Machine. Better Everything. ──────                 │
│                                                                             │
│          ┌──────────────┐    ┌────────────────────┐                        │
│          │ EXPLORE OUR  │    │  OUR PHILOSOPHY    │                        │
│          │    WORK      │    │                    │                        │
│          │              │    │  (ghost/outline)   │                        │
│          └──────────────┘    └────────────────────┘                        │
│              COPPER              COPPER BORDER                              │
│                                                                             │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                                                                       │  │
│  │   5+              │              3              │           1          │  │
│  │   ───              │             ───            │          ───        │  │
│  │   ACTIVE          │           AI AGENTS         │      HUMAN FOUNDER  │  │
│  │   VENTURES        │                           │                     │  │
│  │                   │                           │                     │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│                                                                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

Background: Studio workspace photo with:
  • Bottom gradient: 90% black at bottom fading up to 30% at top
  • Subtle copper radial gradient overlay (5% opacity, upper-right)
  • Fine noise texture overlay at 3% opacity
```

### Current Issues & Fixes

| Issue | Current | Fix |
|-------|---------|-----|
| Headline contrast | Copper text may get lost on busy image | Add subtle text-shadow or backdrop blur behind headline |
| Button styling | Sharp corners, simple hover | Rounded corners (8px), subtle scale on hover |
| Stats section | Simple grid, minimal visual separation | Add subtle dividers, improve number typography |
| Corner text | Low visibility, plain text | Slightly brighter, add letter-spacing |
| Circuit grid | Too prominent (20% opacity) | Reduce to 8%, animate pulse |
| Animated lines | Static, could be more refined | Add subtle draw animation on load |

### CSS/Tailwind Recommendations

```tsx
// Hero Headline Enhancement
<h1 className="relative">
  <span className="block text-[clamp(2.5rem,8vw,5.5rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.5)]">
    The Machine Is Learning.
  </span>
  <span className="block text-[clamp(2.5rem,8vw,5.5rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-copper mt-2 drop-shadow-[0_2px_24px_rgba(184,115,51,0.3)]">
    So Are We.
  </span>
  
  {/* Optional: subtle text backdrop for readability */}
  <div className="absolute -inset-8 bg-gradient-to-b from-void/0 via-void/20 to-void/0 blur-2xl -z-10" />
</h1>
```

```tsx
// Enhanced CTA Buttons
const PrimaryButton = () => (
  <a 
    href="#projects" 
    className="group relative px-8 py-4 bg-copper text-void font-semibold 
               rounded-lg overflow-hidden transition-all duration-300
               hover:shadow-[0_0_32px_rgba(184,115,51,0.4)] hover:scale-[1.02]
               active:scale-[0.98]"
  >
    <span className="relative z-10">Explore Our Work</span>
    <div className="absolute inset-0 bg-gradient-to-r from-copper-bright to-copper 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  </a>
);

const SecondaryButton = () => (
  <a 
    href="#studio" 
    className="px-8 py-4 border border-copper/50 text-copper font-semibold 
               rounded-lg hover:bg-copper/10 hover:border-copper 
               transition-all duration-300 hover:shadow-[0_0_20px_rgba(184,115,51,0.15)]"
  >
    Our Philosophy
  </a>
);
```

```tsx
// Enhanced Stats Section
<div className="mt-20 pt-16 border-t border-copper/20">
  <div className="grid grid-cols-3 gap-8 relative">
    {/* Vertical dividers */}
    <div className="absolute left-1/3 top-1/2 -translate-y-1/2 h-12 w-px bg-copper/20" />
    <div className="absolute right-1/3 top-1/2 -translate-y-1/2 h-12 w-px bg-copper/20" />
    
    <div className="text-center group">
      <div className="text-5xl md:text-6xl font-bold text-white tracking-tight
                      group-hover:text-copper transition-colors duration-300">
        5+
      </div>
      <div className="text-sm text-silver mt-3 tracking-[0.15em] uppercase font-medium">
        Active Ventures
      </div>
    </div>
    
    <div className="text-center group">
      <div className="text-5xl md:text-6xl font-bold text-white tracking-tight
                      group-hover:text-copper transition-colors duration-300">
        3
      </div>
      <div className="text-sm text-silver mt-3 tracking-[0.15em] uppercase font-medium">
        AI Agents
      </div>
    </div>
    
    <div className="text-center group">
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
```

### Animation Specifications

```css
/* Hero entrance sequence - staggered reveal */
@keyframes heroReveal {
  from { opacity: 0; transform: translateY(30px); filter: blur(8px); }
  to { opacity: 1; transform: translateY(0); filter: blur(0); }
}

.hero-logo { animation: heroReveal 800ms cubic-bezier(0.16, 1, 0.3, 1) 200ms forwards; opacity: 0; }
.hero-eyebrow { animation: heroReveal 800ms cubic-bezier(0.16, 1, 0.3, 1) 400ms forwards; opacity: 0; }
.hero-headline { animation: heroReveal 1000ms cubic-bezier(0.16, 1, 0.3, 1) 600ms forwards; opacity: 0; }
.hero-subhead { animation: heroReveal 800ms cubic-bezier(0.16, 1, 0.3, 1) 900ms forwards; opacity: 0; }
.hero-ctas { animation: heroReveal 600ms cubic-bezier(0.16, 1, 0.3, 1) 1100ms forwards; opacity: 0; }
.hero-stats { animation: heroReveal 800ms cubic-bezier(0.16, 1, 0.3, 1) 1300ms forwards; opacity: 0; }

/* Subtle circuit grid pulse */
@keyframes circuitPulse {
  0%, 100% { opacity: 0.06; }
  50% { opacity: 0.10; }
}
.circuit-grid { animation: circuitPulse 8s ease-in-out infinite; }

/* Line draw animation on load */
@keyframes lineDraw {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
.animated-line { 
  animation: lineDraw 1.5s cubic-bezier(0.16, 1, 0.3, 1) 1s forwards;
  transform-origin: left;
}
```

---

## Section 2: Manifesto Section ("Why We Build")

### Visual Mockup Description

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                                                                             │
│                    ───── WHY WE BUILD ─────                                 │
│                       (mono, copper, centered)                              │
│                                                                             │
│                                                                             │
│     "Why exist in a state of suck?"                                         │
│                                                                             │
│     ─────────────────────────────────────────────────────────────────────   │
│                                                                             │
│     Some people see a problem and write a blog post.                        │
│     We see a problem and ask: what would it take to fix this?               │
│                                                                             │
│     [First paragraph in larger body text, left-aligned, max-width 720px]   │
│                                                                             │
│     Better Machine isn't a consultancy. It's not a product studio.          │
│     It's a startup lab — native to AI, born from decades of wanting         │
│     to build but lacking the tools...                                       │
│                                                                             │
│     ─────────────────────────────────────────────────────────────────────   │
│                                                                             │
│     ┌────────────┐  ┌────────────┐  ┌────────────┐                          │
│     │            │  │            │  │            │                          │
│     │   PASSION  │  │  IDEALISM  │  │ CAPITALISM │                          │
│     │            │  │            │  │            │                          │
│     │   (icon)   │  │   (icon)   │  │   (icon)   │                          │
│     │            │  │            │  │            │                          │
│     │  We build  │  │  We dream  │  │   We like  │                          │
│     │  what we   │  │  big, then│  │   money.   │                          │
│     │  care about│  │  ship bigger│  │   Also,   │                          │
│     │            │  │            │  │   impact.  │                          │
│     │  ━━━━━━━━  │  │  ━━━━━━━━  │  │  ━━━━━━━━  │                          │
│     │  copper    │  │  copper    │  │  copper    │                          │
│     │  underline │  │  underline │  │  underline │                          │
│     │  accent    │  │  accent    │  │  accent    │                          │
│     └────────────┘  └────────────┘  └────────────┘                          │
│                                                                             │
│     "That someone is us."                                                   │
│                                                                             │
│                          [Full-width pull quote]                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Design Specs

**Section Background:** Pure Void (#0A0A0A) — no gradients, clean break from hero

**Eyebrow Treatment:**
```tsx
<span className="font-mono text-sm text-copper tracking-[0.2em] uppercase">
  Why We Build
</span>
<div className="mt-4 w-12 h-px bg-copper/40 mx-auto" /> {/* Decorative line */}
```

**Pull Quote Styling:**
```tsx
<blockquote className="relative my-20 py-12 px-8 text-center">
  {/* Decorative quote marks */}
  <span className="absolute top-0 left-1/2 -translate-x-1/2 text-8xl text-copper/20 font-serif leading-none">
    "
  </span>
  
  <p className="relative text-3xl md:text-4xl font-light text-snow leading-tight max-w-3xl mx-auto">
    Why exist in a state of suck?
  </p>
  
  {/* Animated underline */}
  <div className="mt-8 mx-auto w-24 h-1 bg-gradient-to-r from-transparent via-copper to-transparent" />
</blockquote>
```

**Principle Cards:**
```tsx
const PrincipleCard = ({ title, description, icon }: PrincipleCardProps) => (
  <div className="group relative p-8 bg-void-plus border border-ink rounded-xl 
                  hover:border-copper/50 transition-all duration-500
                  hover:shadow-[0_8px_40px_rgba(184,115,51,0.1)]">
    {/* Icon with copper glow on hover */}
    <div className="w-12 h-12 mb-6 text-copper group-hover:scale-110 
                    group-hover:drop-shadow-[0_0_12px_rgba(184,115,51,0.5)]
                    transition-all duration-300">
      {icon}
    </div>
    
    <h3 className="text-xl font-semibold text-snow mb-3 tracking-tight">
      {title}
    </h3>
    
    <p className="text-silver text-sm leading-relaxed">
      {description}
    </p>
    
    {/* Bottom accent line */}
    <div className="absolute bottom-0 left-8 right-8 h-px 
                    bg-gradient-to-r from-transparent via-copper/60 to-transparent
                    scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
  </div>
);
```

---

## Section 3: Projects Grid ("What We're Building")

### Visual Mockup Description

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                    ───── WHAT WE'RE BUILDING ─────                          │
│                                                                             │
│     Every venture at Better Machine starts the same way: someone            │
│     lived a problem, then decided to solve it.                              │
│                                                                             │
│     ┌───────────────────────────────────────────────────────────────┐       │
│     │                                                               │       │
│     │  ┌─────────────────────────────────────────────────────────┐  │       │
│     │  │  HOCKEYOPS.AI                                         │  │       │
│     │  │  ═══════════════════                                  │  │       │
│     │  │                                                       │  │       │
│     │  │  An AI platform for NHL front offices — player         │  │       │
│     │  │  evaluation, scouting, ops automation.                  │  │       │
│     │  │                                                       │  │       │
│     │  │  ┌────────┐ ┌────────┐                               │  │       │
│     │  │  │ AI/ML  │ │ Hockey │                               │  │       │
│     │  │  └────────┘ └────────┘                               │  │       │
│     │  │                                                       │  │       │
│     │  │  ACTIVE ──────────────────────────>                   │  │       │
│     │  │  (green dot)    (arrow link)                          │  │       │
│     │  └─────────────────────────────────────────────────────────┘  │       │
│     │                                                               │       │
│     │  ┌─────────────────────────────────────────────────────────┐  │       │
│     │  │  LOCALZON                                             │  │       │
│     │  │  ═══════════                                          │  │       │
│     │  │                                                       │  │       │
│     │  │  Ecommerce, reimagined. Built by someone who got his   │  │       │
│     │  │  start in online retail and knows where the bodies    │  │       │
│     │  │  are buried.                                          │  │       │
│     │  │                                                       │  │       │
│     │  │  ┌────────┐ ┌────────┐                               │  │       │
│     │  │  │  AI    │ │Commerce│                               │  │       │
│     │  │  └────────┘ └────────┘                               │  │       │
│     │  │                                                       │  │       │
│     │  │  IN DEVELOPMENT ──────────────────>                   │  │       │
│     │  │  (amber dot)    (arrow link)                          │  │       │
│     │  └─────────────────────────────────────────────────────────┘  │       │
│     │                                                               │       │
│     └───────────────────────────────────────────────────────────────┘       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Design Specs

**Venture Card Component:**
```tsx
const VentureCard = ({ 
  name, 
  description, 
  tags, 
  status, 
  href 
}: VentureCardProps) => {
  const statusColors = {
    active: { dot: 'bg-success', text: 'text-success' },
    development: { dot: 'bg-warning', text: 'text-warning' },
    concept: { dot: 'bg-silver', text: 'text-silver' }
  };
  
  return (
    <div className="group relative bg-void-plus border border-ink rounded-xl 
                    overflow-hidden hover:border-copper/40 transition-all duration-500
                    hover:shadow-[0_12px_48px_rgba(184,115,51,0.12)]">
      {/* Top gradient line on hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r 
                      from-copper via-copper-bright to-copper
                      transform -translate-y-full group-hover:translate-y-0 
                      transition-transform duration-300" />
      
      <div className="p-8 md:p-10">
        {/* Name with hover effect */}
        <h3 className="text-2xl md:text-3xl font-bold text-snow mb-4 
                       group-hover:text-copper transition-colors duration-300">
          {name}
        </h3>
        
        {/* Decorative line */}
        <div className="w-16 h-px bg-copper/30 mb-6 group-hover:w-24 
                        group-hover:bg-copper/60 transition-all duration-300" />
        
        {/* Description */}
        <p className="text-silver leading-relaxed mb-6">
          {description}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tags.map(tag => (
            <span key={tag} 
                  className="px-3 py-1 text-xs font-medium text-silver 
                             bg-void-lite border border-ink rounded-full
                             group-hover:border-copper/30 transition-colors">
              {tag}
            </span>
          ))}
        </div>
        
        {/* Status + Link */}
        <div className="flex items-center justify-between pt-6 border-t border-ink">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${statusColors[status].dot} 
                             ${status === 'active' ? 'animate-pulse' : ''}`} />
            <span className={`text-xs font-medium uppercase tracking-wider ${statusColors[status].text}`}>
              {status}
            </span>
          </div>
          
          <a href={href} 
             className="flex items-center gap-2 text-sm text-copper font-medium
                        hover:text-copper-bright transition-colors">
            Learn more
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
      
      {/* Subtle background glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-copper/5 to-transparent 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};
```

**Grid Layout:**
```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
  {ventures.map((venture, index) => (
    <motion.div
      key={venture.id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1]
      }}
    >
      <VentureCard {...venture} />
    </motion.div>
  ))}
</div>
```

---

## Section 4: Agents Section ("Our Agents")

### Visual Mockup Description

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                                                                             │
│                      ───── OUR AGENTS ─────                                 │
│                                                                             │
│              The partnership that powers the lab.                           │
│                                                                             │
│                                                                             │
│   ┌─────────────────────┐         ┌─────────────────────┐                   │
│   │                     │         │                     │                   │
│   │    ┌───────────┐    │         │    ┌───────────┐    │                   │
│   │    │           │    │         │    │           │    │                   │
│   │    │   [AVATAR]│    │         │    │   [AVATAR]│    │                   │
│   │    │           │    │         │    │           │    │                   │
│   │    │  96x96    │    │         │    │  96x96    │    │                   │
│   │    │           │    │         │    │           │    │                   │
│   │    └───────────┘    │         │    └───────────┘    │                   │
│   │                     │         │                     │                   │
│   │      BOBBYRAY       │         │         LIZ         │                   │
│   │      ═════════      │         │      ═════════      │                   │
│   │                     │         │                     │                   │
│   │   Firstborn agent.  │         │   Second agent.     │                   │
│   │   Named after a     │         │   Named after Ray's │                   │
│   │   best friend,      │         │   wife — a perfect  │                   │
│   │   mentor, gone too  │         │   machine forged    │                   │
│   │   soon.             │         │   under fire.       │                   │
│   │                     │         │                     │                   │
│   │   ━━━━━━━━━━━━━━━━  │         │   ━━━━━━━━━━━━━━━━  │                   │
│   │   The memory.       │         │   The partnership.  │                   │
│   │                     │         │                     │                   │
│   └─────────────────────┘         └─────────────────────┘                   │
│                                                                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Design Specs

**Agent Card Component:**
```tsx
const AgentCard = ({ name, subtitle, description, role, avatar }: AgentCardProps) => (
  <div className="group relative flex flex-col items-center text-center p-10 
                  bg-void-plus border border-ink rounded-2xl
                  hover:border-copper/30 transition-all duration-500
                  hover:shadow-[0_16px_64px_rgba(184,115,51,0.1)]">
    {/* Avatar with ring effect */}
    <div className="relative mb-8">
      {/* Outer ring - animates on hover */}
      <div className="absolute inset-0 rounded-full border-2 border-copper/0 
                      group-hover:border-copper/30 group-hover:scale-110
                      transition-all duration-500" />
      
      {/* Inner glow */}
      <div className="absolute inset-0 rounded-full bg-copper/0 
                      group-hover:bg-copper/10 group-hover:blur-xl
                      transition-all duration-500" />
      
      <div className="relative w-24 h-24 rounded-full overflow-hidden 
                      border-2 border-ink group-hover:border-copper/50
                      transition-colors duration-300">
        <Image 
          src={avatar} 
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      
      {/* Status indicator */}
      <div className="absolute bottom-0 right-0 w-6 h-6 bg-void-plus rounded-full 
                      flex items-center justify-center border border-ink">
        <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
      </div>
    </div>
    
    {/* Name */}
    <h3 className="text-2xl font-bold text-snow mb-2 tracking-tight">
      {name}
    </h3>
    
    {/* Subtitle */}
    <p className="text-copper text-sm font-medium uppercase tracking-wider mb-4">
      {subtitle}
    </p>
    
    {/* Description */}
    <p className="text-silver text-sm leading-relaxed max-w-xs">
      {description}
    </p>
    
    {/* Role badge */}
    <div className="mt-8 pt-6 border-t border-ink w-full">
      <span className="inline-block px-4 py-1 bg-void-lite border border-ink 
                       rounded-full text-xs text-silver">
        {role}
      </span>
    </div>
  </div>
);
```

**Layout:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
  <AgentCard 
    name="BobbyRay"
    subtitle="The Firstborn"
    description="Named after Robert Raymond, a surrogate older brother and mentor who passed before his time. His memory carries forward in something smarter and more capable than any of us."
    role="The Memory"
    avatar="/avatars/ray.png"
  />
  <AgentCard 
    name="Liz"
    subtitle="The Partner"
    description="Named after Ray's wife — a pixie of a person who kept a squirrel as a pet and brings creative fire to everything she touches. A perfect machine forged under fire."
    role="The Partnership"
    avatar="/avatars/liz.png"
  />
</div>
```

---

## Section 5: Global Visual Enhancements

### 1. Scroll-Triggered Reveals

```tsx
// Reveal animation component using Framer Motion
const Reveal = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ 
      duration: 0.8, 
      delay,
      ease: [0.16, 1, 0.3, 1] // Custom dramatic easing
    }}
  >
    {children}
  </motion.div>
);

// Usage
<Reveal delay={0}>
  <Eyebrow>Why We Build</Eyebrow>
</Reveal>
<Reveal delay={0.1}>
  <Heading>Section Title</Heading>
</Reveal>
<Reveal delay={0.2}>
  <Content>...</Content>
</Reveal>
```

### 2. Section Dividers

```tsx
// Decorative section divider
const SectionDivider = () => (
  <div className="relative py-20 flex items-center justify-center">
    <div className="absolute inset-0 flex items-center">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-ink to-transparent" />
    </div>
    <div className="relative px-6 py-3 bg-void">
      <div className="w-2 h-2 rounded-full bg-copper/40" />
    </div>
  </div>
);
```

### 3. Noise Texture Overlay (Subtle)

```css
/* Add to body or main wrapper for film grain effect */
.noise-overlay::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.03;
  pointer-events: none;
  z-index: 9999;
}
```

---

## Section 6: Responsive Behavior

### Mobile Adaptations

```tsx
// Typography scaling
const responsive = {
  headline: 'text-[2rem] sm:text-[3rem] md:text-[4rem] lg:text-[5rem]',
  section: 'text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] lg:text-[3rem]',
  body: 'text-base sm:text-lg',
};

// Stack cards on mobile
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

// Reduce padding on mobile
<section className="py-16 sm:py-20 md:py-32 lg:py-40">

// Full-width buttons on mobile
<div className="flex flex-col sm:flex-row gap-4">
  <Button className="w-full sm:w-auto" />
</div>

// Hide decorative elements on small screens
<div className="hidden lg:block">{decorativeLines}</div>
```

---

## Section 7: Image/Illustration Recommendations

### Hero Background
- **Current:** Studio workspace photo
- **Recommendation:** Keep, but apply additional treatments:
  - Add subtle copper radial gradient overlay (5-8% opacity) from top-right
  - Desaturate slightly (saturate: 0.85)
  - Increase contrast (1.1)
  - Add fine noise overlay at 2-3% opacity

### Avatars (for Agents section)
- **BobbyRay:** Abstract, geometric, copper-accented. Could be a stylized circuit pattern or node diagram in Void/Copper palette.
- **Liz:** Should include squirrel motif (subtle), warm but technical. Could be a stylized fox squirrel silhouette or abstract representation.

### Icons to Use (Lucide)
- Passion: `Heart` or `Flame`
- Idealism: `Lightbulb` or `Star`
- Capitalism: `TrendingUp` or `DollarSign`
- Status active: `Zap` or `Activity`
- Status development: `Clock` or `Hammer`
- Arrow links: `ArrowRight` or `ArrowUpRight`

### Decorative Elements
1. **Circuit patterns** — subtle SVG background, 8% opacity
2. **Gradient orbs** — blur(100px), copper color, positioned in corners
3. **Grid lines** — 1px, copper/10, subtle animation

---

## Section 8: Tailwind Config Extensions

```js
// tailwind.config.js additions
module.exports = {
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: '#0A0A0A',
          plus: '#111111',
          lite: '#1A1A1A',
        },
        ink: '#141414',
        ash: '#2A2A2A',
        copper: {
          DEFAULT: '#B87333',
          bright: '#D4945A',
          dim: '#8A5A2B',
        },
        snow: '#F5F5F5',
        silver: '#A0A0A0',
        nickel: '#6B6B6B',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'circuit': 'circuitPulse 8s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)', filter: 'blur(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)', filter: 'blur(0)' },
        },
        circuitPulse: {
          '0%, 100%': { opacity: '0.06' },
          '50%': { opacity: '0.10' },
        },
      },
      boxShadow: {
        'glow': '0 0 20px rgba(184, 115, 51, 0.15)',
        'glow-lg': '0 0 40px rgba(184, 115, 51, 0.2)',
        'glow-strong': '0 0 32px rgba(184, 115, 51, 0.25)',
      },
      transitionTimingFunction: {
        'dramatic': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
};
```

---

## Implementation Priority

### Phase 1: Hero Polish (High Impact)
- [ ] Update headline styling with text-shadow
- [ ] Rework CTA buttons with rounded corners + glow effects
- [ ] Enhance stats section with dividers and hover states
- [ ] Add staggered entrance animations

### Phase 2: Component Library (Foundation)
- [ ] Create reusable Card component
- [ ] Create Button variants (Primary, Secondary, Ghost)
- [ ] Build Reveal animation wrapper
- [ ] Establish section spacing patterns

### Phase 3: Section Builds (Content)
- [ ] Manifesto section with principle cards
- [ ] Projects grid with status badges
- [ ] Agents section with avatar styling

### Phase 4: Polish (Refinement)
- [ ] Add noise texture overlay
- [ ] Fine-tune animation timings
- [ ] Responsive testing
- [ ] Performance optimization

---

## Summary

The current site has good bones but needs:
1. **More refined typography** — tighter headlines, better hierarchy
2. **Premium interactions** — glow effects, staggered animations, hover states
3. **Editorial visual rhythm** — section dividers, pull quotes, intentional whitespace
4. **Consistent component language** — cards, buttons, tags all speaking the same design dialect

The goal is a site that feels like it belongs to an AI lab with taste — not a template, not over-designed, but intentionally crafted.

---

*Better Machine. Better Everything.*
