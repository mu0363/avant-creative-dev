module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "plugin:react/recommended",
    "plugin:tailwindcss/recommended",
    "prettier",
    "plugin:import/errors",
    "plugin:import/warnings",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "tailwindcss"],
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"],
    "react/prop-types": ["off"],
    "react/react-in-jsx-scope": ["off"],
    "no-undef": "error",
  },
};
