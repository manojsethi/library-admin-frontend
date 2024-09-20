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
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#8B5CF6", // Violet-500 as primary default
          light: "#A78BFA", // Lighter variant of the primary color (example: blue-500)
        },
        // primary: "#5c6ac4",
        //secondary: "#ecc94b",
      },
    },
  },
  plugins: [],
};
export default config;
