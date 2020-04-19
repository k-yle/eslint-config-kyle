module.exports = {
  files: ["**/*.ts"],
  extends: [
    "airbnb",
    "prettier",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    ...require("./commonRules"),

    "react/jsx-filename-extension": [1, { extensions: [".tsx"] }],

    "import/extensions": 0,
    "import/no-unresolved": 0,
  },
};
