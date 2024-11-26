/** @type {import('tailwindcss').Config} */
import { COLORS } from "./src/constants";

const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", ".storybook/preview.tsx"],
  important: "#root-app",
  theme: {
    extend: {
      fontFamily: {
        sans: ["GT Eesti Pro", ...defaultTheme.fontFamily.sans],
      },
    },
    colors: COLORS,
  },
  corePlugins: {
    // Remove the Tailwind CSS preflight styles so it can use Material UI's preflight instead (CssBaseline).
    preflight: false,
  },
  plugins: [],
};
