/** @type {Record<'added' | 'removed', import('@eslint/config-helpers').Config['rules']>} */
export const unicornRules = {
  added: {
    'unicorn/no-object-as-default-parameter': 'error',
    'unicorn/numeric-separators-style': [
      'error',
      { onlyIfContainsSeparator: true }, // it's unnatural to use separators on the rhs of a demical point, and this rule doesn't allow that case to be disabled
    ],
    'unicorn/prefer-export-from': ['error', { ignoreUsedVariables: true }], // turn on ignoreUsedVariables, should really be on by default
    'unicorn/prefer-import-meta-properties': 'error',
    'unicorn/prefer-ternary': ['error', 'only-single-line'], // multiline cases can be more readable as if statements
    'unicorn/prevent-abbreviations': [
      'warn',
      {
        checkFilenames: false, // so that it doesn't cry about `vite-env` or `.def.ts`
        // the official list is full of terms that are not ambiguous, which is really unhelpful.
        // we only want to warn about ambiguous terms (with >1 possible interpretation), or obscure
        // abbreviations where there is a more standard alterantive. But it's not possible to import from
        // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/rules/shared/abbreviations.js
        // Therefore, we define our own list.
        extendDefaultReplacements: false,
        replacements: {
          e: { error: true, event: true }, // ambiguous
          evt: { event: true }, // non-standard abbreviation
          idx: { index: true }, // non-standard abbreviation
        },
      },
    ],
  },
  removed: {
    'unicorn/catch-error-name': 'off', // I use `ex`, but alternatives are just as acceptable
    'unicorn/explicit-length-check': 'off', // covered by no-restricted-syntax above
    'unicorn/filename-case': 'off', // too disruptive to enable
    'unicorn/import-style': 'off', // this rule special-cases node:path, which is weird and not really helpful
    'unicorn/no-array-callback-reference': 'off', // great rule but you can't disable it for just Array#filter :(
    'unicorn/no-array-reduce': 'off', // conflicts with eslint-plugin-fp
    'unicorn/no-await-expression-member': 'off', // unhelpful rule, it's just as readable as any other method expression
    'unicorn/no-empty-file': 'off', // heaps of false positives, it doesn't understand module.exports
    'unicorn/no-for-loop': 'off', // TS-eslint's prefer-for-of is much better and respects cases where the index is used
    'unicorn/no-nested-ternary': 'off', // too disruptive to enable
    'unicorn/no-null': 'off', // good rule but sometimes null is unavoidable
    'unicorn/no-process-exit': 'off', // process.exit is perfectly valid
    'unicorn/no-unnecessary-polyfills': 'off', // good rule, but it's too expensive. takes up 19% of lint time
    'unicorn/no-useless-undefined': 'off', // conflicts with eslint's `consistent-return` rule
    'unicorn/prefer-global-this': 'off', // many environments don't support globalThis yet
    'unicorn/prefer-math-trunc': 'off', // i love this rule but it's inconvenient when you're genuinely using bitwise ops
    'unicorn/prefer-module': 'off', // sometimes we have no choice
    'unicorn/prefer-number-properties': 'off', // much less readable
    'unicorn/prefer-top-level-await': 'off', // as above, many environments still don't support this
  },
};
