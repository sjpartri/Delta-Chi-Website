import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "delta-red": "#c41e3a",
        "delta-gold": "#c5a572",
        "delta-navy": "#1a2332",
      },
    },
  },
  plugins: [],
};
export default config;
