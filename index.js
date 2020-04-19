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
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier'],
  rules: {
    ...require('./rules/commonRules'),
  },
  overrides: [
    require('./rules/ts'),
    require('./rules/tsx'),
    require('./rules/jest'),
  ],
};
