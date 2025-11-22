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
        replacements: {
          arg: false, // well understood and never disambiguous.
          args: false, // well understood and never disambiguous.
          def: false, // reasonably common and unlikely to be disambiguous
          defs: false, // as above
          dev: false, // extremely common and never disambiguous
          env: false, // well understood and never disambiguous. The alternative is long and unwieldy
          envs: false, // as above
          i: false, // in math-heavy code, short variables like i and j are arguably more readable than 'jindex'
          j: false, // as above
          param: false, // well understood and never disambiguous.
          params: false, // well understood and never disambiguous.
          prop: false, // well understood and never disambiguous.
          props: false, // "props" implies something different to "properties" in react
          ref: false, // "ref" is different to "reference" in OSM, and is a well known term in react
          refs: false, // as above
          str: false, // mappers/helpers that work on any arbitrary string should be allowed to use str
          temp: false, // well understood and never disambiguous. However, we do ban "tmp", as it's less readable and semantically equivilant to "temp"
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
