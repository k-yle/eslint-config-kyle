module.exports = {
  files: ["**/*.tsx"],
  extends: [
    "airbnb",
    "airbnb/hooks",
    "prettier",
    "prettier/react",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    ...require("./commonRules"),

    "react/prop-types": 0,
    "react/jsx-filename-extension": [1, { extensions: [".tsx"] }],
    // ^ pointless since this config only runs for .tsx files

    "import/extensions": 0,
    "import/no-unresolved": 0,
    "import/prefer-default-export": 0,
  },
};
