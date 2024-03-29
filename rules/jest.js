// @ts-check
/** @type {import("eslint").Linter.Config} */
module.exports = {
  files: ['**/*.test.*', '**/*.cy.*'],
  env: {
    jest: true,
  },
  plugins: ['jest'],
  extends: [
    ...require('./commonExtend'),
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:jest-formatting/recommended',
  ],
  rules: {
    ...require('./commonRules'),
    'import/no-extraneous-dependencies': 0, // in test files it's okay to require devDeps
    '@typescript-eslint/ban-ts-comment': [
      'warn', // ts-nocheck and ts-expect-error are okay in unit tests
      { 'ts-nocheck': false, 'ts-ignore': true, 'ts-expect-error': false },
    ],

    'unicorn/consistent-function-scoping': 0, // mocking APIs requiring weird syntax

    // extra jest rules
    'jest/consistent-test-it': [2, { fn: 'it' }],
    'jest/no-duplicate-hooks': 2,
    'jest/prefer-hooks-on-top': 2,
    'jest/prefer-strict-equal': 2,
  },
};
