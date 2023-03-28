// @ts-check
/** @type {import("eslint").Linter.Config} */
module.exports = {
  env: {
    es6: true,
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    jsx: true,
  },
  extends: require('./rules/commonExtend'),
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'eslint-comments'],
  rules: require('./rules/commonRules'),
  overrides: [require('./rules/jest')],
  settings: {
    react: {
      version: '18',
    },
  },
};
