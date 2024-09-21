/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#366FA1", // Custom primary color
        secondary: "#FFFFFF", // Custom white color
        accent: "#0D0D0D", // Custom black color
        // Add more custom colors as needed
      },
    },
  },
  plugins: [],
});