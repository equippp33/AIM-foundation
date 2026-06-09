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
        // Brand pink / coral accent
        brand: {
          50: "#fdf2f6",
          100: "#fce7ef",
          200: "#fbcfe0",
          300: "#f7a8c4",
          400: "#f06fa0",
          500: "#e8336f",
          600: "#d61f5c",
          700: "#b41449",
        },
        coral: {
          400: "#fb7f5c",
          500: "#f9683f",
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
        container: "1200px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
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
