/** @type {Record<'added' | 'removed', import('@eslint/config-helpers').Config['rules']>} */
export const tsRules = {
  added: {
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { fixStyle: 'inline-type-imports' },
    ],
    '@typescript-eslint/no-import-type-side-effects': 'error',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        caughtErrors: 'all', // enforce `} catch {` with no argument
        varsIgnorePattern: '^_', // allow `_` prefixed variables for Explicit Resource Management
      },
    ],
    '@typescript-eslint/no-use-before-define': 'error',

    '@typescript-eslint/prefer-literal-enum-member': [
      'error', // enable allowBitwiseExpressions
      { allowBitwiseExpressions: true },
    ],
  },
  removed: {
    '@typescript-eslint/consistent-indexed-object-style': 'off', // too disruptive to enable
    '@typescript-eslint/consistent-type-assertions': 'off', // too disruptive to enable
    '@typescript-eslint/consistent-type-definitions': 'off', // too disruptive to enable
    '@typescript-eslint/no-dynamic-delete': 'off', // annoying and unhelpful
    '@typescript-eslint/no-namespace': 'off', // namespaces are a bad idea for runtime code, but still useful for grouping types
    '@typescript-eslint/no-non-null-assertion': 'off', // dumb rule, encourages typecasts which are more risky
  },
};
