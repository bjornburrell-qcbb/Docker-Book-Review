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
        200: '#C7D2FE',
        300: '#A5B4FC',
        400: '#818CF8',
        500: '#6366F1',
        600: '#4F46E5',
        700: '#7E22CE',
        800: '#3730A3',
        900: '#312E81',
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
