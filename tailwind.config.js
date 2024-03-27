/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#EEBA5C',
        background: "#E9EBEB",
      }
    },
  },
  plugins: [],
}
