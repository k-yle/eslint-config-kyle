// @ts-check
/** @type {import("eslint").Linter.Config} */
module.exports = {
  files: ['**/*.tsx'],
  extends: [
    'airbnb',
    'airbnb/hooks',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    ...require('./ts').rules,
  },
};
