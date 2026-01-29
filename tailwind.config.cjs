/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0a0a0a",
        coal: "#111111",
        anthracite: "#1a1a1a",
        gold: "#D4AF37",
        goldBright: "#FFD700",
        platinum: "#E5E4E2",
      },
      boxShadow: {
        goldGlow: "0 0 0 1px rgba(212,175,55,.25), 0 0 32px rgba(212,175,55,.18)",
      },
      letterSpacing: {
        luxe: ".22em",
      },
    },
  },
  plugins: [],
};
