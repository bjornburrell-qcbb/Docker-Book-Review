const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    // screens: {},
    colors: {
      // Useful tool for splitting colors https://m2.material.io/design/color/the-color-system.html#tools-for-picking-colors
      primary: {
        // J&J Red
        50: '#ffeaef',
        100: '#fecbd4',
        200: '#ef979d',
        300: '#e56d77',
        400: '#f04957',
        500: '#f7313e',
        600: '#e7273d',
        700: '#d51b36',
        800: '#c8102f',
        900: '#b90023',
      },
      secondary: {
        ink: '#091f2c',
        ivory: '#edece1',
      },
      grayscale: {
        white: '#fff',
        'extra-light-gray': '#f4f4f4',
        'light-gray': '#d9d9d9',
        gray: '#888b8d',
        'dark-gray': '#63666a',
        black: '#212121',
      },
      accent: {
        sapphire: '#025994',
        ocean: '#007D8A',
        sage: '#98BCC0',
        citrus: '#DFD779',
        melon: '#DD8547',
        plum: '#8E1657',
      },
    },
    extend: {
      fontFamily: {
        main: 'Lato', // theme fonts here
      },
    },
  },
  plugins: [],
};
