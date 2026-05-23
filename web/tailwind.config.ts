import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Better Machine Brand
        copper: {
          DEFAULT: "#B87333",
          light: "#C48A4E",
          dark: "#8B5A2B",
          bright: "#D4965A",
        },
        // Dark palette
        void: "#0A0A0A",
        charcoal: "#141414",
        graphite: "#1C1C1C",
        // Light accents
        offwhite: "#FAFAFA",
        silver: "#A0A0A0",
        snow: "#FAFAFA",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-1": ["4.5rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-2": ["3rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "headline": ["2rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "subhead": ["1.25rem", { lineHeight: "1.4" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-up": "fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "circuit-pulse": "circuitPulse 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeUp: {
          "0%": { opacity: "0", filter: "blur(8px)", transform: "translateY(20px)" },
          "100%": { opacity: "1", filter: "blur(0)", transform: "translateY(0)" },
        },
        circuitPulse: {
          "0%, 100%": { opacity: "0.05" },
          "50%": { opacity: "0.12" },
        },
      },
      boxShadow: {
        "glow": "0 0 32px rgba(184, 115, 51, 0.25)",
        "glow-lg": "0 0 48px rgba(184, 115, 51, 0.35)",
        "glow-strong": "0 0 32px rgba(184, 115, 51, 0.4)",
        "glow-subtle": "0 0 20px rgba(184, 115, 51, 0.15)",
      },
      transitionTimingFunction: {
        "dramatic": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
