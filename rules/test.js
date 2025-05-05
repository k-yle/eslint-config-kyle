// @ts-check

/** @type {Record<'added' | 'removed', import('@typescript-eslint/utils').TSESLint.FlatConfig.Rules>} */
export const testRules = {
  added: {
    'vitest/consistent-test-it': ['error', { fn: 'it' }],
    'vitest/no-duplicate-hooks': 'error',
    'vitest/no-focused-tests': 1,
    'vitest/no-standalone-expect': 'error',
    'vitest/padding-around-all': 'error',
    'vitest/prefer-called-with': 'error', // more explicit tests are better, can still use expect.any
    'vitest/prefer-comparison-matcher': 'error',
    // 'vitest/prefer-describe-function-title': 'error', // TODO: (semver breaking) enable
    // 'vitest/prefer-snapshot-hint': 'error', // TODO: (semver breaking) enable
    'vitest/prefer-each': 'error',
    'vitest/prefer-equality-matcher': 'error',
    'vitest/prefer-hooks-in-order': 'error',
    'vitest/prefer-hooks-on-top': 'error',
    'vitest/prefer-mock-promise-shorthand': 'error',
    'vitest/prefer-snapshot-hint': 'error',
    'vitest/prefer-spy-on': 'error',
    'vitest/prefer-strict-equal': 'error',
    'vitest/prefer-to-contain': 'error',
    'vitest/prefer-to-have-length': 'error',
    'vitest/prefer-todo': 'error',
    'vitest/prefer-vi-mocked': 'error',
    'vitest/require-mock-type-parameters': 'error',
    'vitest/require-to-throw-message': 'error',
    'vitest/require-top-level-describe': 'error',
  },
  removed: {
    '@typescript-eslint/ban-ts-comment': [
      'warn', // ts-nocheck and ts-expect-error are okay in unit tests
      { 'ts-expect-error': false, 'ts-ignore': true, 'ts-nocheck': false },
    ],
    'unicorn/consistent-function-scoping': 'off', // mocking APIs requiring weird syntax
    'vitest/padding-around-expect-groups': 'off', // counterproductive; the other padding rules are good
  },
};
