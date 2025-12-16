/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", ".storybook/preview.tsx"],
  important: true, // Tailwind layers would be lower priority than MUI classes.
};
