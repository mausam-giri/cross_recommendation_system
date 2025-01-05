/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary":{
          500: "#2D2D2D",
          700: "#161616",
          900: "#030303"
        }
      }
    },
  },

  plugins: [],
}