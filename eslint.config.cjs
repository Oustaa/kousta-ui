module.exports = [
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: "@typescript-eslint/parser",
      ecmaVersion: 2021,
      sourceType: "module",
    },
    plugins: {
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
      react: require("eslint-plugin-react"),
    },
    rules: {
      // Enable recommended rules
      ...require("eslint-plugin-react").configs.recommended.rules,
      ...require("@typescript-eslint/eslint-plugin").configs.recommended.rules,

      // Custom rules
      "react/prop-types": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "no-console": "warn",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
