/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neonPink: '#ff007f', // El rosa de Modo Meche
        darkBg: '#050505',   // Un negro casi puro
      },
      boxShadow: {
        'neon': '0 0 5px #ff007f, 0 0 20px #ff007f',
      }
    },
  },
  plugins: [],
}