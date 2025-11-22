/** @type {Record<'added' | 'removed', import('@eslint/config-helpers').Config['rules']>} */
export const testRules = {
  added: {
    'vitest/consistent-test-it': ['error', { fn: 'it' }],
    'vitest/no-duplicate-hooks': 'error',
    'vitest/no-focused-tests': 1,
    'vitest/no-standalone-expect': 'error',

    // 'padding-around-all' includes 'padding-around-expect-groups',
    // which we don't want because that one is counterproductive. The
    // rest are good, but we need to explicitly list them all:
    'vitest/padding-around-after-all-blocks': 'error',
    'vitest/padding-around-after-each-blocks': 'error',
    'vitest/padding-around-before-all-blocks': 'error',
    'vitest/padding-around-before-each-blocks': 'error',
    'vitest/padding-around-describe-blocks': 'error',
    'vitest/padding-around-test-blocks': 'error',

    'vitest/prefer-called-with': 'error', // more explicit tests are better, can still use expect.any
    'vitest/prefer-comparison-matcher': 'error',
    'vitest/prefer-describe-function-title': 'error',
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
    'vitest/require-to-throw-message': 'error',
    'vitest/require-top-level-describe': 'error',
    'vitest/valid-title': ['error', { allowArguments: true }], // need allowArguments to avoid conflicting with `vitest/prefer-describe-function-title`
  },
  removed: {
    '@eslint-react/no-create-ref': 'off', // allowed in unit tests which are not hooks
    '@typescript-eslint/ban-ts-comment': [
      'warn', // ts-nocheck and ts-expect-error are okay in unit tests
      { 'ts-expect-error': false, 'ts-ignore': true, 'ts-nocheck': false },
    ],
    'unicorn/consistent-function-scoping': 'off', // mocking APIs requiring weird syntax
  },
};
