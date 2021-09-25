const colors = require('tailwindcss/colors')
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    cursor: {
      none: "none",
      grab: "grab",
      grabbing: "grabbing"
    },
    extend: {},
    colors: {
      primary: colors.indigo,
      secondary: colors.yellow,
      neutral: colors.gray,
      "pure-black": {
        1000: "rgba(0, 0, 0, 1)",
        500: "rgba(0, 0, 0, .5)",
        300: "rgba(0, 0, 0, .3)",
        200: "rgba(0, 0, 0, .2)",
      },
      white: colors.white,
    }
  },
  variants: {
    extend: {
      backgroundColor: ['active']
    },
  },
  plugins: [],
}
