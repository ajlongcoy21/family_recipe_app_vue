/* eslint-env node */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue-green": "#2C4A52",
        waterway: "#537072",
        haze: "#8E9B97",
        smog: "#F4EBDB",
      },
      fontFamily: {
        oswald: ["Oswald"],
        playfairDisplay: ["Playfair Display"],
        shadowsIntoLight: ["Shadows Into Light"],
      },
      screens: {
        nutrient_information: "1331px",
        // => @media (min-width: 1331px) { ... }
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
