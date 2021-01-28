module.exports = {
  files: [
    '**/__tests__/*.test.js',
    '**/__tests__/*.test.ts',
    '**/__tests__/*.test.tsx',
  ],
  env: {
    jest: true,
  },
  plugins: ['jest'],
  extends: ['plugin:jest/recommended', 'plugin:jest/style'],
  rules: {
    'import/no-extraneous-dependencies': 0, // in test files it's okay to require devDeps
    '@typescript-eslint/ban-ts-comment': [
      'warn', // ts-nocheck and ts-expect-error are okay in unit tests
      { 'ts-nocheck': false, 'ts-ignore': true, 'ts-expect-error': false },
    ],

    // extra jest rules
    'jest/consistent-test-it': [2, { fn: 'it' }],
    'jest/no-duplicate-hooks': 2,
    'jest/no-expect-resolves': 2,
    'jest/prefer-hooks-on-top': 2,
    'jest/prefer-strict-equal': 2,
  },
};
