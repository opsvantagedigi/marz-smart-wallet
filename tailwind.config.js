/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "marz-blue": "#001F3F",
        "marz-green": "#00E1C6",
        "marz-yellow": "#FFD600",
        "marz-bg-dark": "#020617",
        "marz-surface-dark": "rgba(255,255,255,0.04)",
        "marz-text-dark": "#E2E8F0",
        "glass-light": "rgba(255,255,255,0.08)",
        "glass-dark": "rgba(0,0,0,0.25)",
        "glass-border": "rgba(255,255,255,0.15)",
      },
      backgroundImage: {
        "marz-gradient": "linear-gradient(135deg, #001F3F 0%, #00E1C6 50%, #FFD600 100%)",
      },
      backdropBlur: {
        xs: "2px",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        orbitron: ["Orbitron", "sans-serif"],
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(24px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(0,225,198,0.7)" },
          "50%": { boxShadow: "0 0 24px 8px rgba(0,225,198,0.7)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out forwards",
        "slide-up": "slide-up 0.6s ease-out forwards",
        "pulse-glow": "pulse-glow 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
