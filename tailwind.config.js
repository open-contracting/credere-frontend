/** @type {import('tailwindcss').Config} */
import { COLORS } from "./src/constants";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", ".storybook/preview.tsx"],
  important: "#root-app",
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "GT Eesti Pro",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          '"Noto Sans"',
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
    },
    colors: COLORS,
  },
  plugins: [],
};
