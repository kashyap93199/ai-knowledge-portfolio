import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#05070f",
          raised: "#0a0f1e",
          card: "#0d1428",
          line: "rgba(148, 163, 184, 0.14)",
        },
        cyan: {
          DEFAULT: "#22d3ee",
          soft: "#67e8f9",
          dim: "#155e75",
        },
        violet: {
          DEFAULT: "#a78bfa",
          soft: "#c4b5fd",
          dim: "#5b21b6",
        },
        emerald: {
          DEFAULT: "#34d399",
          soft: "#6ee7b7",
        },
        danger: {
          DEFAULT: "#f87171",
          soft: "#fca5a5",
        },
        paper: {
          DEFAULT: "#f8fafc",
          muted: "#64748b",
        },
        muted: {
          DEFAULT: "#94a3b8",
          dim: "#64748b",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        glow: "0 0 24px rgba(34, 211, 238, 0.35)",
        "glow-violet": "0 0 24px rgba(167, 139, 250, 0.35)",
        card: "0 10px 40px -12px rgba(0, 0, 0, 0.5)",
      },
      backgroundImage: {
        "radial-grid":
          "radial-gradient(circle at 20% 0%, rgba(34,211,238,0.08), transparent 40%), radial-gradient(circle at 85% 15%, rgba(167,139,250,0.08), transparent 40%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "grid-flow": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "48px 48px" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "slide-up": "slide-up 0.5s ease-out both",
        shimmer: "shimmer 1.8s linear infinite",
        "grid-flow": "grid-flow 6s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;