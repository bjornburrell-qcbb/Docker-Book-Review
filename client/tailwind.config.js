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
        // QCBB Purple
        50: '#FDF4FF',
        100: '#FAE8FF',
        200: '#F5D0FE',
        300: '#F0ABFC',
        400: '#E879F9',
        500: '#D946EF',
        600: '#C026D3',
        700: '#7E22CE',
        800: '#86198F',
        900: '#581C87',
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
