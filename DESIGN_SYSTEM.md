# Better Machine — Design System

## Overview

Better Machine is a native startup lab applying leading-edge AI to deliver creative business solutions. This design system powers our public presence: a dark, sophisticated, premium website that communicates passion, idealism, and technical authority.

---

## Brand Identity

### Narrative

- **Founder:** Erik Ross, 53, "aging technologist" who finally has the tools to build what he's always imagined
- **Origin story:** Named agents after best friend Ray (who passed) and his wife Liz (the "perfect machine" partnership)
- **What we build:** HockeyOps.ai, Localzon, door$, etc. — ventures born from lived experience
- **Vibe:** Passion, idealism, capitalism. "Why exist in a state of suck?"

### Personality

- **Voice:** Direct, warm, sharp. Never corporate drone, never sycophant.
- **Tone:** Confident without arrogance. Technical without gatekeeping. Premium without pretension.
- **Energy:** Builder energy — momentum, obsession, quiet competence.

---

## Color System

### Primary Palette

| Token | Hex | Role | Usage |
|-------|-----|------|-------|
| `Void` | `#0A0A0A` | Background primary | Page bg, section bg, card bg |
| `Void-Plus` | `#111111` | Background secondary | Elevated surfaces, cards, panels |
| `Void-Lite` | `#1A1A1A` | Background tertiary | Subtle elevation, input bg, hover states |
| `Ink` | `#141414` | Border/divider | 1px borders, separators, subtle outlines |
| `Ash` | `#2A2A2A` | Border hover | Interactive borders, focus rings |

### Accent Palette

| Token | Hex | Role | Usage |
|-------|-----|------|-------|
| `Copper` | `#B87333` | Primary accent | CTAs, links, highlights, active states |
| `Copper-Bright` | `#D4945A` | Accent hover | Button hover, link hover, glow |
| `Copper-Dim` | `#8A5A2B` | Accent muted | Secondary actions, inactive copper |
| `Copper-Glow` | `rgba(184, 115, 51, 0.15)` | Ambient glow | Shadows, gradients, backdrops |
| `Copper-Pulse` | `rgba(184, 115, 51, 0.4)` | Active glow | Focus states, pulsing elements |

### Text Palette

| Token | Hex | Role | Usage |
|-------|-----|------|-------|
| `Snow` | `#F5F5F5` | Primary text | Headings, body, primary content |
| `Silver` | `#A0A0A0` | Secondary text | Captions, metadata, disabled |
| `Nickel` | `#6B6B6B` | Tertiary text | Timestamps, fine print, placeholders |
| `Mist` | `rgba(245, 245, 245, 0.6)` | Overlay text | On images, darkened sections |

### Semantic Colors

| Token | Hex | Role | Usage |
|-------|-----|------|-------|
| `Success` | `#4ADE80` | Positive | Confirmation, live status, growth |
| `Warning` | `#FBBF24` | Caution | Alerts, pending states |
| `Error` | `#EF4444` | Negative | Errors, failures, critical alerts |
| `Info` | `#60A5FA` | Neutral info | Tips, info blocks |

### Gradients

```css
/* Hero gradient — subtle depth */
--gradient-hero: linear-gradient(180deg, #0A0A0A 0%, #111111 50%, #0A0A0A 100%);

/* Copper accent gradient — CTAs, key elements */
--gradient-copper: linear-gradient(135deg, #B87333 0%, #D4945A 100%);

/* Subtle edge glow — cards, panels */
--gradient-edge: linear-gradient(180deg, rgba(184, 115, 51, 0.08) 0%, transparent 100%);

/* Text gradient — hero headlines */
--gradient-text: linear-gradient(135deg, #F5F5F5 0%, #D4945A 100%);

/* Mesh background — optional animated bg */
--gradient-mesh: radial-gradient(ellipse at 30% 20%, rgba(184, 115, 51, 0.06) 0%, transparent 50%),
                 radial-gradient(ellipse at 70% 80%, rgba(184, 115, 51, 0.04) 0%, transparent 50%);
```

### Usage Rules

- **Backgrounds:** Always Void or Void-Plus. Never white/light backgrounds.
- **Text on dark:** Snow for primary, Silver for secondary. Minimum contrast ratio 7:1.
- **Copper accents:** Use sparingly — CTAs, active nav, key highlights. Never more than 10% of surface area.
- **Glow effects:** Copper-Glow for subtle elevation. Copper-Pulse for interactive focus.
- **Gradients:** Use gradient-text for hero headlines only. gradient-copper for primary buttons.

---

## Typography

### Font Stack

```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', 'SF Mono', monospace;
```

### Type Scale

| Token | Size | Weight | Line Height | Letter Spacing | Usage |
|-------|------|--------|-------------|----------------|-------|
| `Display` | 72px / 4.5rem | 800 | 1.0 | -0.03em | Hero headlines, max impact |
| `H1` | 56px / 3.5rem | 700 | 1.1 | -0.02em | Page titles |
| `H2` | 42px / 2.625rem | 700 | 1.15 | -0.015em | Section headings |
| `H3` | 32px / 2rem | 600 | 1.2 | -0.01em | Subsection headings |
| `H4` | 24px / 1.5rem | 600 | 1.3 | -0.005em | Card titles, feature names |
| `H5` | 18px / 1.125rem | 600 | 1.4 | 0 | Labels, small headings |
| `Body` | 16px / 1rem | 400 | 1.6 | 0 | Paragraphs, default text |
| `Body-Small` | 14px / 0.875rem | 400 | 1.5 | 0 | Secondary body, descriptions |
| `Caption` | 12px / 0.75rem | 500 | 1.4 | 0.02em | Metadata, timestamps, tags |
| `Mono` | 14px / 0.875rem | 400 | 1.5 | 0 | Code, data, technical labels |
| `Mono-Small` | 12px / 0.75rem | 400 | 1.4 | 0 | Inline code, minor technical |

### Responsive Typography

```css
/* Mobile (< 768px) */
--display-mobile: 40px / 2.5rem;
--h1-mobile: 36px / 2.25rem;
--h2-mobile: 28px / 1.75rem;
--h3-mobile: 22px / 1.375rem;

/* Tablet (768px - 1024px) */
--display-tablet: 56px / 3.5rem;
--h1-tablet: 48px / 3rem;
--h2-tablet: 36px / 2.25rem;
```

### Text Styles

```css
/* Hero headline with gradient */
.text-hero {
  font-family: var(--font-sans);
  font-size: var(--display);
  font-weight: 800;
  line-height: 1.0;
  letter-spacing: -0.03em;
  background: var(--gradient-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Section heading */
.text-section {
  font-family: var(--font-sans);
  font-size: var(--h2);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.015em;
  color: var(--color-snow);
}

/* Mono label — technical, measured */
.text-mono {
  font-family: var(--font-mono);
  font-size: var(--mono);
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-copper);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Caption — metadata, restrained */
.text-caption {
  font-family: var(--font-sans);
  font-size: var(--caption);
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: 0.02em;
  color: var(--color-nickel);
}
```

### Font Loading

```html
<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

---

## Spacing System

### Base Unit

**4px** — the atomic spacing unit. All spacing is a multiple of 4.

### Scale

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Micro gaps, icon padding |
| `space-2` | 8px | Tight gaps, inline spacing |
| `space-3` | 12px | Small gaps, button padding-y |
| `space-4` | 16px | Default gap, card padding, input padding |
| `space-5` | 20px | Medium gap, section element spacing |
| `space-6` | 24px | Standard gap, form group spacing |
| `space-8` | 32px | Large gap, card internal spacing |
| `space-10` | 40px | Section content padding |
| `space-12` | 48px | Subsection separation |
| `space-16` | 64px | Section internal padding |
| `space-20` | 80px | Major section padding (vertical) |
| `space-24` | 96px | Hero section padding |
| `space-32` | 128px | Section separation |
| `space-40` | 160px | Major section break |

### Container Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `container-max` | 1280px | Maximum content width |
| `container-padding` | 24px (mobile) / 48px (desktop) | Horizontal page padding |
| `section-padding-y` | 80px (mobile) / 128px (desktop) | Vertical section padding |

---

## Layout Grid

### Grid System

```css
/* 12-column grid */
--grid-columns: 12;
--grid-gap: 24px;       /* desktop */
--grid-gap-mobile: 16px; /* mobile */
--grid-margin: auto;
--grid-max-width: 1280px;
```

### Breakpoints

| Name | Width | Usage |
|------|-------|-------|
| `sm` | 640px | Small tablets, large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Small desktops, tablets landscape |
| `xl` | 1280px | Standard desktops |
| `2xl` | 1536px | Large desktops |

### Z-Index Scale

| Token | Value | Usage |
|-------|-------|-------|
| `z-base` | 0 | Default content |
| `z-elevated` | 10 | Cards, raised elements |
| `z-sticky` | 100 | Sticky headers, nav |
| `z-drawer` | 200 | Mobile menus, side panels |
| `z-modal` | 300 | Modals, dialogs |
| `z-toast` | 400 | Notifications, toasts |
| `z-tooltip` | 500 | Tooltips, popovers |

---

## Component Hierarchy

### Navigation

```
Navbar (fixed, z-sticky)
├── Logo (left) — "Better Machine" wordmark, Copper on hover
├── Nav Links (center, hidden on mobile)
│   ├── About
│   ├── Ventures
│   ├── Philosophy
│   └── Contact
└── CTA Button (right) — "Start Building"
    └── Mobile: Hamburger menu
```

**Specs:**
- Height: 72px desktop, 64px mobile
- Background: `rgba(10, 10, 10, 0.8)` with `backdrop-filter: blur(12px)`
- Border-bottom: 1px solid `var(--color-ink)`
- Logo font: Inter 700, 18px
- Nav links: Inter 500, 14px, Silver → Snow on hover
- Active link: Copper
- CTA: gradient-copper background, Void text, 14px, 600 weight

### Hero Section

```
Hero (full viewport height, centered)
├── Eyebrow (mono, Copper) — "NATIVE STARTUP LAB"
├── Headline (Display, gradient-text) — "Why exist in a state of suck?"
├── Subhead (Body, Silver, max-width 600px) — "We apply leading-edge AI to deliver creative business solutions."
├── CTA Group
│   ├── Primary Button — "Explore Our Work"
│   └── Secondary Button — "Our Philosophy" (ghost)
└── Scroll Indicator (bottom, animated)
```

**Specs:**
- Min-height: 100vh
- Padding: var(--space-24) vertical
- Background: gradient-mesh + gradient-hero
- Headline max-width: 900px
- Subhead max-width: 600px
- CTA gap: var(--space-4)

### Section Component

```
Section
├── Eyebrow (optional, mono, Copper)
├── Heading (H2, Snow)
├── Description (Body, Silver, max-width 640px)
└── Content (varies by section type)
```

**Specs:**
- Padding-y: var(--section-padding-y)
- Content max-width: var(--container-max)
- Centered by default; left-aligned for text-heavy sections
- Eyebrow-to-heading gap: var(--space-3)
- Heading-to-description gap: var(--space-4)
- Description-to-content gap: var(--space-10)

### Card Component

```
Card
├── Icon or Image (optional)
├── Heading (H4)
├── Body (Body-Small, Silver)
└── Meta or CTA (Caption or Text Button)
```

**Specs:**
- Background: Void-Plus
- Border: 1px solid Ink
- Border-radius: 12px
- Padding: var(--space-8)
- Hover: border-color Ash, subtle translateY(-2px), box-shadow Copper-Glow
- Transition: all 0.3s ease

### Button Component

**Variants:**

| Variant | Background | Text | Border | Hover |
|---------|-----------|------|--------|-------|
| Primary | gradient-copper | Void | none | Brighten, scale(1.02) |
| Secondary | transparent | Copper | 1px solid Copper | bg Copper-Glow |
| Ghost | transparent | Snow | 1px solid Ink | border Ash, bg Void-Lite |
| Mono | transparent | Copper | none | text Copper-Bright |

**Specs:**
- Height: 44px (standard), 36px (compact)
- Padding: 0 var(--space-6)
- Border-radius: 8px
- Font: Inter 600, 14px
- Transition: all 0.2s ease

### Input Component

**Specs:**
- Height: 44px
- Background: Void-Lite
- Border: 1px solid Ink
- Border-radius: 8px
- Padding: 0 var(--space-4)
- Font: Inter 400, 16px, Snow
- Placeholder: Nickel
- Focus: border Copper, box-shadow Copper-Glow
- Transition: all 0.2s ease

---

## Animation & Motion

### Philosophy

- **Restrained but present.** Motion should feel intentional, never decorative.
- **Purpose-driven:** Animate to guide attention, indicate state change, or create spatial relationships.
- **Performance-first:** Use `transform` and `opacity` only. Avoid animating layout properties.
- **Respect preferences:** Honor `prefers-reduced-motion`.

### Easing Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `ease-smooth` | `cubic-bezier(0.4, 0, 0.2, 1)` | Default transitions |
| `ease-enter` | `cubic-bezier(0, 0, 0.2, 1)` | Elements entering view |
| `ease-exit` | `cubic-bezier(0.4, 0, 1, 1)` | Elements leaving view |
| `ease-bounce` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful interactions (sparingly) |
| `ease-dramatic` | `cubic-bezier(0.16, 1, 0.3, 1)` | Hero reveals, major transitions |

### Duration Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `duration-instant` | 100ms | Micro-interactions, hover states |
| `duration-fast` | 200ms | Button presses, toggles |
| `duration-normal` | 300ms | Card hovers, modals, menus |
| `duration-slow` | 500ms | Section reveals, page transitions |
| `duration-dramatic` | 800ms | Hero animations, major entrances |

### Standard Animations

```css
/* Fade up — primary entrance */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
/* duration: 500ms, easing: ease-dramatic */

/* Fade in — subtle entrance */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
/* duration: 300ms, easing: ease-smooth */

/* Scale in — for cards, modals */
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1); }
}
/* duration: 300ms, easing: ease-enter */

/* Slide in from right — for drawers */
@keyframes slideInRight {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}
/* duration: 300ms, easing: ease-dramatic */

/* Pulse — for live indicators, attention */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
/* duration: 2000ms, infinite, ease-smooth */

/* Shimmer — for loading states */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
/* background: linear-gradient(90deg, transparent, rgba(184,115,51,0.1), transparent) */

/* Scroll indicator bounce */
@keyframes bounceDown {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
}
/* duration: 2000ms, infinite, ease-smooth */
```

### Scroll-Triggered Reveals

```css
/* Elements fade up as they enter viewport */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 500ms ease-dramatic, transform 500ms ease-dramatic;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger children */
.reveal-stagger > *:nth-child(1) { transition-delay: 0ms; }
.reveal-stagger > *:nth-child(2) { transition-delay: 100ms; }
.reveal-stagger > *:nth-child(3) { transition-delay: 200ms; }
.reveal-stagger > *:nth-child(4) { transition-delay: 300ms; }
```

### Hover Patterns

```css
/* Card lift */
.card:hover {
  transform: translateY(-4px);
  border-color: var(--color-ash);
  box-shadow: 0 8px 32px var(--color-copper-glow);
  transition: all 300ms ease-smooth;
}

/* Button press */
.button:active {
  transform: scale(0.98);
  transition: transform 100ms ease-smooth;
}

/* Link underline grow */
.link {
  position: relative;
}
.link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--color-copper);
  transition: width 200ms ease-smooth;
}
.link:hover::after {
  width: 100%;
}

/* Image zoom */
.image-container:hover img {
  transform: scale(1.05);
  transition: transform 500ms ease-smooth;
}
```

### Page Transitions

```css
/* Simple fade between pages */
.page-enter {
  opacity: 0;
  transform: translateY(8px);
}
.page-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 300ms ease-enter, transform 300ms ease-enter;
}
.page-exit {
  opacity: 1;
}
.page-exit-active {
  opacity: 0;
  transition: opacity 200ms ease-exit;
}
```

### Ambient Motion (Optional)

```css
/* Subtle mesh gradient drift — for hero only */
@keyframes meshDrift {
  0%, 100% {
    background-position: 0% 0%, 100% 100%;
  }
  50% {
    background-position: 100% 100%, 0% 0%;
  }
}
/* Apply to gradient-mesh background */
/* duration: 20000ms, infinite, linear */

/* Copper line trace — decorative element */
@keyframes lineTrace {
  0% { stroke-dashoffset: 1000; }
  100% { stroke-dashoffset: 0; }
}
/* For SVG decorative lines */
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .reveal {
    opacity: 1;
    transform: none;
  }
}
```

---

## Shadow & Elevation

```css
/* Subtle elevation — cards at rest */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);

/* Default elevation — raised cards */
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.4);

/* High elevation — modals, drawers */
--shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.5);

/* Copper glow — hover states, focus */
--shadow-glow: 0 0 20px rgba(184, 115, 51, 0.15);

/* Copper pulse — active states */
--shadow-glow-strong: 0 0 32px rgba(184, 115, 51, 0.25);
```

---

## Border & Radius

```css
--radius-sm: 6px;   /* Buttons, inputs, small elements */
--radius-md: 8px;   /* Cards, panels */
--radius-lg: 12px;  /* Large cards, modals */
--radius-xl: 16px;  /* Feature sections */
--radius-full: 9999px; /* Pills, avatars */
```

---

## Iconography

- **Style:** Outline, 1.5px stroke, minimal
- **Size scale:** 16px (inline), 20px (buttons), 24px (navigation), 32px (features)
- **Color:** Inherit from parent (Silver default, Snow on hover, Copper for active/CTA)
- **Library:** Lucide React or Heroicons (outline style)
- **Stroke caps:** Round

---

## Asset Guidelines

### Photography

- **Treatment:** Desaturated, high contrast. Optional subtle copper tint overlay.
- **Filter:** `saturate(0.8) contrast(1.1)` with `mix-blend-mode: overlay` of Copper-Glow
- **Subjects:** Builders, tools, infrastructure, abstract tech textures

### Illustrations

- **Style:** Abstract geometric, circuit-like patterns, node/mesh diagrams
- **Color:** Monochromatic with copper accents
- **Usage:** Hero backgrounds, section dividers, loading states

### Logo Usage

- **Primary:** Horizontal lockup, Snow on dark
- **Minimum size:** 120px width
- **Clear space:** 24px on all sides
- **Never:** Distort, rotate, change colors, add effects

---

## Accessibility

### Minimum Requirements

- **Contrast:** All text meets WCAG 2.1 AA (4.5:1 for body, 3:1 for large text). Aim for AAA where possible.
- **Focus indicators:** 2px solid Copper outline, offset 2px from element
- **Touch targets:** Minimum 44x44px for interactive elements
- **Motion:** Respect `prefers-reduced-motion`
- **Semantics:** Proper heading hierarchy (h1 → h2 → h3, no skips)
- **Alt text:** All images have descriptive alt text or `aria-hidden="true"` for decorative

### Focus States

```css
:focus-visible {
  outline: 2px solid var(--color-copper);
  outline-offset: 2px;
  border-radius: inherit;
}
```

### Screen Reader Helpers

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

---

## Tokens Summary (CSS Custom Properties)

```css
:root {
  /* Colors */
  --color-void: #0A0A0A;
  --color-void-plus: #111111;
  --color-void-lite: #1A1A1A;
  --color-ink: #141414;
  --color-ash: #2A2A2A;
  --color-copper: #B87333;
  --color-copper-bright: #D4945A;
  --color-copper-dim: #8A5A2B;
  --color-copper-glow: rgba(184, 115, 51, 0.15);
  --color-copper-pulse: rgba(184, 115, 51, 0.4);
  --color-snow: #F5F5F5;
  --color-silver: #A0A0A0;
  --color-nickel: #6B6B6B;
  --color-mist: rgba(245, 245, 245, 0.6);
  --color-success: #4ADE80;
  --color-warning: #FBBF24;
  --color-error: #EF4444;
  --color-info: #60A5FA;

  /* Typography */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', 'SF Mono', monospace;
  --text-display: 4.5rem;
  --text-h1: 3.5rem;
  --text-h2: 2.625rem;
  --text-h3: 2rem;
  --text-h4: 1.5rem;
  --text-h5: 1.125rem;
  --text-body: 1rem;
  --text-body-small: 0.875rem;
  --text-caption: 0.75rem;
  --text-mono: 0.875rem;
  --text-mono-small: 0.75rem;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
  --space-32: 128px;
  --space-40: 160px;

  /* Layout */
  --container-max: 1280px;
  --container-padding: 24px;
  --section-padding-y: 80px;

  /* Grid */
  --grid-columns: 12;
  --grid-gap: 24px;

  /* Radii */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.5);
  --shadow-glow: 0 0 20px rgba(184, 115, 51, 0.15);
  --shadow-glow-strong: 0 0 32px rgba(184, 115, 51, 0.25);

  /* Animation */
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-enter: cubic-bezier(0, 0, 0.2, 1);
  --ease-exit: cubic-bezier(0.4, 0, 1, 1);
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-dramatic: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-instant: 100ms;
  --duration-fast: 200ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  --duration-dramatic: 800ms;
}

@media (min-width: 768px) {
  :root {
    --container-padding: 48px;
    --section-padding-y: 128px;
    --text-display: 4.5rem;
    --text-h1: 3.5rem;
    --text-h2: 2.625rem;
    --text-h3: 2rem;
  }
}

@media (min-width: 1024px) {
  :root {
    --grid-gap: 24px;
  }
}
```

---

## Implementation Notes

### Tech Stack Recommendations

- **Framework:** Next.js 14+ (App Router) or Astro
- **Styling:** Tailwind CSS v3+ with this design system as a plugin/config extension
- **Animation:** Framer Motion for React, or GSAP for complex sequences
- **Fonts:** Google Fonts (Inter + JetBrains Mono) or self-hosted for performance
- **Icons:** Lucide React

### Tailwind Config Extension

```js
// tailwind.config.js
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
        'fade-up': 'fadeUp 500ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 300ms ease-out forwards',
        'pulse-soft': 'pulse 2s ease-in-out infinite',
        'bounce-slow': 'bounceDown 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        bounceDown: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(8px)' },
        },
      },
    },
  },
};
```

### File Structure

```
app/
├── globals.css           /* Design system tokens */
├── layout.tsx            /* Root layout, fonts, metadata */
├── page.tsx              /* Homepage */
├── sections/
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Ventures.tsx
│   ├── Philosophy.tsx
│   └── Contact.tsx
├── components/
│   ├── Navbar.tsx
│   ├── Section.tsx
│   ├── Card.tsx
│   ├── Button.tsx
│   ├── Input.tsx
│   └── Footer.tsx
└── hooks/
    └── useScrollReveal.ts
```

---

## Version

**v1.0** — Initial release, 2026-05-23

---

*Better Machine. Why exist in a state of suck?*
