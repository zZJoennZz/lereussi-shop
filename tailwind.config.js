/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pizza: {
          100: '#fff6dd',
          200: '#f5e7c3',
          300: '#e4d1a0',
          400: '#e3c986',
          500: '#d1ab48',
          600: '#c29926',
          700: '#ad8c07',
          800: '#896f06',
          900: '#695607',
        },
        ebb: '#F3F0F1',
        gumbo: '#7B9CA2',
        pottersclay: '#85573B',
        black: colors.black,
        white: colors.white,
        gray: colors.gray,
        emerald: colors.emerald,
        indigo: colors.indigo,
        yellow: colors.yellow,
        slate: colors.slate,
        red: colors.red,
        cyan: colors.cyan,
        transparent: colors.transparent,
      },
    },
  },
  plugins: [],
};
