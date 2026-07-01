/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#ffffff', ink: '#151515', acid: '#52282d', oxblood: '#52282d', mist: '#f4f4f2'
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['DM Sans', 'Arial', 'sans-serif']
      }
    }
  },
  plugins: []
}
