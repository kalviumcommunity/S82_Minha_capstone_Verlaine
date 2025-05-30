/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        rose: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
        },
        gold: {
          300: '#f4d03f',
          500: '#d4a017',
        },
        cream: '#fefce8',
        mauve: '#a3a3a3',
        plum: '#4c1d95',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};