import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./node_modules/flowbite-react/lib/**/*.js",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        auto1fr: "auto 1fr auto",
      },
      gridTemplateColumns: {
        full: "100%",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
  darkMode: "media",
};
export default config;
