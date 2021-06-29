module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      Kiwi: ["Kiwi Maru"],
      Mplus: ["M PLUS Rounded 1c"],
      Reggae: ["Reggae One"],
      Kosugi: ["Kosugi Maru"],
    },
    extend: {
      colors: {
        ai: {
          light: "#eda38c",
          DEFAULT: "#e47f5a",
          dark: "#d36644",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    // require("@tailwindcss/forms")
  ],
};
