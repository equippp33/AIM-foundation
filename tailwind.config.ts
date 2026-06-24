import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep navy used across hero, dark callouts, footer
        navy: {
          950: "#0a1230",
          900: "#0d1838",
          800: "#142150",
          700: "#1c2c63",
          600: "#26397d",
        },
        // Ink — heading / strong text
        ink: {
          DEFAULT: "#16223f",
          soft: "#1e2c4d",
        },
        // Brand sky-blue accent (replaces pink per redesign spec)
        brand: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
        },
        // Cyan — gradient companion to brand
        coral: {
          400: "#22d3ee",
          500: "#06b6d4",
        },
        slatey: {
          400: "#8a97b0",
          500: "#647088",
          600: "#4f5a72",
        },
        mist: "#f7f8fb",
        line: "#eceef3",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        md: "10px",
        lg: "16px",
        xl: "22px",
        "2xl": "28px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,33,80,0.04), 0 8px 24px rgba(16,33,80,0.06)",
        "card-hover": "0 2px 4px rgba(16,33,80,0.06), 0 18px 40px rgba(16,33,80,0.12)",
        soft: "0 10px 30px rgba(16,33,80,0.08)",
        navbar: "0 1px 0 rgba(16,33,80,0.06)",
      },
      maxWidth: {
        container: "1320px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        float: "float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
