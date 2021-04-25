const colors = require('tailwindcss/colors')
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    cursor: {
      none: "none"
    },
    extend: {},
    colors: {
      primary: colors.indigo,
      secondary: colors.yellow,
      neutral: colors.gray,
    }
  },
  variants: {
    extend: {
      backgroundColor: ['active']
    },
  },
  plugins: [],
}
