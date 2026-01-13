import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "deep-charcoal": "#0d1117",
        charcoal: "#171717",
        "charcoal-light": "#21262d",
        "charcoal-lighter": "#2a2a2a",
        "charcoal-darker": "#0d0d0d",
        "gh-green": "#2ea043",
        "gh-green-bright": "#3fb950",
        "gh-green-dark": "#238636",
      },
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"],
        sans: ["Syne", "sans-serif"],
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        "float-slow": "float-slow 20s ease-in-out infinite",
        "float-slower": "float-slower 25s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "33%": { transform: "translate(30px, -30px)" },
          "66%": { transform: "translate(-20px, 20px)" },
        },
        "float-slower": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "33%": { transform: "translate(-40px, 30px)" },
          "66%": { transform: "translate(30px, -20px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(46, 160, 67, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(46, 160, 67, 0.6)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
