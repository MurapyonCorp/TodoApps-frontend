import type { Config } from "tailwindcss";
import flowbite from "flowbite-react/tailwind";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
    flowbite.content(),
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
  plugins: [
    flowbite.plugin()
  ],
  darkMode: "media",
};
export default config;
