// @ts-check

/** @type {Record<'added' | 'removed', import('@typescript-eslint/utils').TSESLint.FlatConfig.Rules>} */
export const testRules = {
  added: {
    'vitest/consistent-test-it': ['error', { fn: 'it' }],
    'vitest/no-duplicate-hooks': 'error',
    'vitest/no-focused-tests': 1,
    'vitest/prefer-hooks-on-top': 'error',
    'vitest/prefer-snapshot-hint': 'error',
    'vitest/prefer-strict-equal': 'error',
    'vitest/prefer-to-have-length': 'error',
    'vitest/prefer-todo': 'error',
    'vitest/require-top-level-describe': 'error',
  },
  removed: {
    '@typescript-eslint/ban-ts-comment': [
      'warn', // ts-nocheck and ts-expect-error are okay in unit tests
      { 'ts-expect-error': false, 'ts-ignore': true, 'ts-nocheck': false },
    ],
    'unicorn/consistent-function-scoping': 'off', // mocking APIs requiring weird syntax
  },
};
