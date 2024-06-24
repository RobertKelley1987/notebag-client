/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        ibm: ["IBM Plex Mono", "monospace"],
      },
      colors: {
        black: "#1C1C1C",
        red: "#FF0000",
      },
    },
  },
  plugins: [],
};
