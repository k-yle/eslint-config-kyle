module.exports = {
  files: ['**/*.ts'],
  extends: [
    'airbnb-base',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    ...require('./commonRules'),

    'import/extensions': [2, 'never'],
    'import/no-unresolved': 0, // TODO: figure out how to make this work well
  },
};
