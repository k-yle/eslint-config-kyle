// @ts-check
/** @type {import("eslint").Linter.Config} */
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

    '@typescript-eslint/no-non-null-assertion': 0, // dumb rule

    'import/extensions': [2, 'never'],
    'import/no-unresolved': 0, // TODO: figure out how to make this work well

    '@typescript-eslint/no-duplicate-enum-values': 2,
    '@typescript-eslint/prefer-ts-expect-error': 2,
    '@typescript-eslint/prefer-optional-chain': 2,
    '@typescript-eslint/prefer-for-of': 2,
    '@typescript-eslint/unified-signatures': 2,

    // use TS variant of these rules
    'no-shadow': 0,
    '@typescript-eslint/no-shadow': 2,

    'no-use-before-define': 0,
    '@typescript-eslint/no-use-before-define': 2,

    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': [2, { caughtErrors: 'all' }],
  },
};
