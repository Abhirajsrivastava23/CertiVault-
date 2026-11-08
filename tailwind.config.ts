import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B1020",
        surface: {
          DEFAULT: "#111827",
          50: "#1E2640",
          100: "#1A2238",
          200: "#141B2D",
          card: "#131B2E",
          hover: "#1A253E",
          border: "#1F2B47",
        },
        primary: {
          DEFAULT: "#3B82F6",
          hover: "#2563EB",
          light: "#60A5FA",
          dark: "#1D4ED8",
        },
        accent: {
          DEFAULT: "#6366F1",
          hover: "#4F46E5",
          light: "#818CF8",
        },
        navy: {
          950: "#070B16",
          900: "#0B1020",
          850: "#0F162B",
          800: "#131C35",
          700: "#1E2A4D",
          600: "#2B3C6B",
        },
        success: "#10B981",
        warning: "#F59E0B",
        danger: "#EF4444",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 25px -5px rgba(59, 130, 246, 0.25)",
        "glow-accent": "0 0 25px -5px rgba(99, 102, 241, 0.25)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-glow": "radial-gradient(circle at 50% 20%, rgba(59, 130, 246, 0.15), transparent 70%)",
        "card-gradient": "linear-gradient(180deg, rgba(26, 37, 62, 0.6) 0%, rgba(17, 24, 39, 0.8) 100%)",
      },
    },
  },
  plugins: [],
} satisfies Config;

