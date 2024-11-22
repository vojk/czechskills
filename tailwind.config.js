/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Orbitron', 'sans-serif'], // Primary Font
        secondary: ['Open Sans', 'sans-serif'], // Secondary Font
      },
      colors: {
        brand: {
          nebulaBlue: '#1A237E', // Nebula Blue
          cosmicPurple: '#8E24AA', // Cosmic Purple
          starburstYellow: '#FFEB3B', // Starburst Yellow
          midnightBlack: '#212121', // Midnight Black
        },
      },
    },
  },
  plugins: [],
}

