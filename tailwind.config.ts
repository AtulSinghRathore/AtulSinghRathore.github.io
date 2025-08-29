import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./styles/**/*.{css}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0b0d12",
        surface: "#0d0f14",
        text: "#e7ebf2",
        muted: "#a3aab8",
        accent: "#3ea6ff",
        accent2: "#7b61ff",
        ok: "#20e3b2"
      },
      borderRadius: { xl2: "1.25rem" },
      boxShadow: {
        glow: "0 10px 30px rgba(62,166,255,.25)",
        glowSoft: "0 8px 24px rgba(62,166,255,.35)"
      }
    }
  },
  plugins: []
} satisfies Config;
