/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["DM Serif Text", ...defaultTheme.fontFamily.serif],
      },
      colors: {
        black: "#1C1C1C",
      },
    },
  },
  plugins: [],
};
