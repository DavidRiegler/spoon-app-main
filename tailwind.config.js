/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        burnt: '#E57E60',
        lila: '#7C3B7C',
        snow: '#FCF7F8',
        vanilla: '#F3E9B5',
        pink: '#C25EA9',
      },
      borderRadius: {
        'custom': '3rem',
      },
      width: {
        '128': '35rem',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('tailwind-scrollbar'),
  ],
}