/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        '50xl': '20rem', // adjust as needed for your design
      },
    },
  },
  plugins: [],
};
