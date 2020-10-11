module.exports = {
  env: {
    es6: true,
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    jsx: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'prettier',
    'prettier/react',
    'plugin:eslint-comments/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier', 'eslint-comments'],
  rules: {
    ...require('./rules/commonRules'),
  },
  overrides: [
    require('./rules/ts'),
    require('./rules/tsx'),
    require('./rules/jest'),
  ],
};
