/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        chatGpt: "#73AA9B",
        netflix: "#564d4d",
        facebook: "#3C5A9A",
        vectormind: "#574CFF",
        youtube: "#E50914"
      },
      fontFamily: {
        raleway: ["Raleway", "sans-serif"],
        librefranklin: ["Libre Franklin", "sans-serif"]
      }
    },
  },
  plugins: [],
}