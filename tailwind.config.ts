import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        primary: "var(--primary)",
        "primary-on": "var(--primary-on)",
        surface: "var(--surface)",
        highlight: "var(--highlight)",
        font: {
          default: "var(--font-default)",
        },
      },
    },
  },
  plugins: [],
};
export default config;
