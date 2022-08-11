/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        appColor: '#008dba',
        searchBgColor: '#33a3c8'
      }
    },
  },
  plugins: [],
}
