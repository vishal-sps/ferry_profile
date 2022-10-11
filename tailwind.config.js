module.exports = {
  mode: 'jit',
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#E23744'
      },
      boxShadow: {
        DEFAULT: '0px 7px 64px rgba(0, 0, 0, 0.1)'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
