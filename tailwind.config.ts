import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { navy: { 900: "#0a1a33", 800: "#10284d", 700: "#17376a" } },
    },
  },
  plugins: [],
};
export default config;
