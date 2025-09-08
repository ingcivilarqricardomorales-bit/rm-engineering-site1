/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html','./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#121212',
          accent: '#FFD300', // amarillo energía
          muted: '#6B7280',
        }
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
