/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: { 
      colors: {
      charcoal: '#36454F'
    }
  },
  },
  plugins: [require("daisyui")],
}
