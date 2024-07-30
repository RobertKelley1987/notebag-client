/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Outfit", ...defaultTheme.fontFamily.sans],
        ibm: ["IBM Plex Mono", "monospace"],
      },
      colors: {
        black: "#1C1C1C",
        red: "#FF0000",
        aqua: "#13ad60",
      },
      lineClamp: {
        7: "7",
        8: "8",
      },
    },
  },
  plugins: [],
};
