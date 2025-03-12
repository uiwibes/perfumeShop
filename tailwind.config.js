/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.html","./js/*.js"],
  theme: {
    extend: {
      colors: {
        'primary-gold': '#c2a575',
        'primary-gold-light': '#e2d5bc',
       
      },
      backgroundColor: {
        'bg-header': '#cbc7c7',
      },
      fontFamily: {
        'cormorant': ['Cormorant Garamond', 'serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 