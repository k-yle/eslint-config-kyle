// @ts-check
/** @type {import("eslint").Linter.Config['rules']} */
module.exports = {
  // turn off crap
  'no-console': 0,
  'no-underscore-dangle': 0,
  'no-plusplus': 0,
  'no-await-in-loop': 0,
  'guard-for-in': 0,
  'import/prefer-default-export': 0,
  'no-promise-executor-return': 0, // don't need this if we have TS. just results in more verbose code

  // i don't like these but they're good in principle
  'no-bitwise': 0,
  'no-nested-ternary': 0,
  'no-continue': 0,
  'no-else-return': 0,
  'prefer-destructuring': 0,

  // stricter than prettier
  curly: [2, 'multi-line'],
  'prefer-arrow-callback': 2,

  // for ts <reference /> comments
  'spaced-comment': [2, 'always', { markers: ['/'] }],

  // our added rules
  'prefer-reflect': [1, { exceptions: ['delete'] }],
  'prefer-object-spread': 1,
  'prefer-exponentiation-operator': 2,
  'prefer-object-has-own': 2,
  'logical-assignment-operators': [
    2,
    'always',
    { enforceForIfStatements: true },
  ],

  'no-warning-comments': [1, { terms: ['fixme'], location: 'anywhere' }],

  // make react the first import in the file
  'import/order': [
    'warn',
    {
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling'],
      pathGroups: [{ pattern: 'react', group: 'builtin', position: 'before' }],
      pathGroupsExcludedImportTypes: ['react'],
    },
  ],
  // ban `import React from "react"`, prefer `import { ... } from "react"`
  // this override all the defaults that airbnb has banned
  'no-restricted-syntax': [
    'warn',
    {
      selector:
        // eslint-disable-next-line unicorn/string-content
        "ImportDeclaration[source.value='react'][specifiers.0.type='ImportDefaultSpecifier']",
      message: 'only import required functions from React',
    },
  ],

  // react
  'react/jsx-props-no-spreading': 0,
  'react/prop-types': 0,
  'react/react-in-jsx-scope': 0, // no longer needed as of react 16.14+
  'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.tsx'] }], // vite requires .jsx
  'react/require-default-props': 0, // typescript handles this
  'react/function-component-definition': [
    1, // when using typescript we always want arrow-functions
    { namedComponents: 'arrow-function', unnamedComponents: 'arrow-function' },
  ],
  /* TODO: enable once PR released
  'react/display-name': [1, { checkContextObjects: true }],
  */
  'react/jsx-curly-brace-presence': 2,
  'react/no-invalid-html-attribute': 2,

  'jsx-a11y/click-events-have-key-events': 0,

  '@typescript-eslint/no-non-null-assertion': 0, // dumb rule
  '@typescript-eslint/no-namespace': 0,

  'import/extensions': [2, 'never'],
  'import/no-unresolved': 0, // TODO: figure out how to make this work with TS

  'import/no-extraneous-dependencies': [
    2,
    {
      // in test files & config files, it's okay to import devDeps
      devDependencies: ['**/*.test.*', '**/*.cy.*', '**/*.config.*'],
      optionalDependencies: false,
      peerDependencies: false,
    },
  ],

  // use TS variant of these rules
  'no-shadow': 0,
  '@typescript-eslint/no-shadow': 2,

  'no-use-before-define': 0,
  '@typescript-eslint/no-use-before-define': 2,

  'no-unused-vars': 0,
  '@typescript-eslint/no-unused-vars': [2, { caughtErrors: 'all' }],

  // disable some TS-eslint rules - i don't mind the inconsistency for these…
  '@typescript-eslint/consistent-type-definitions': 0,
  '@typescript-eslint/consistent-type-assertions': 0,
  '@typescript-eslint/consistent-indexed-object-style': 0,

  // 🦄 non-defaults
  'unicorn/no-object-as-default-parameter': 2,

  // 🦄 relax strict rules
  'unicorn/prevent-abbreviations': [
    1,
    {
      replacements: {
        temp: false, // well understood and never disambiguous. However, we do ban "tmp", as it's less readable and semantically equivilant to "temp"
        env: false, // well understood and never disambiguous. The alternative is long and unwieldy
        ref: false, // "ref" is different to "reference" in OSM, and is a well known term in react
        str: false, // mappers/helpers that work on any arbitrary string should be allowed to use str
        props: false, // "props" implies something different to "properties" in react. However, we do ban "prop" as it doesn't have a special meaning in the react world, unlike "props"
      },
      checkFilenames: false, // so that it doesn't cry about `vite-env` or `.def.ts`
    },
  ],
  'unicorn/numeric-separators-style': [
    2, // it's unnatural to use separators on the rhs of a demical point, and this rule doesn't allow that case to be disabled
    { onlyIfContainsSeparator: true },
  ],

  // 🦄 rules that would be disruptive to change, but are probably worthwhile
  'unicorn/explicit-length-check': 0,
  'unicorn/filename-case': 0,
  'unicorn/no-nested-ternary': 0,
  'unicorn/no-array-reduce': 0, // conflicts with eslint-plugin-fp
  'unicorn/catch-error-name': 0, // I use `ex`, but alternatives are just as acceptable
  'unicorn/no-array-callback-reference': 0, // great rule but you can't disable it for just Array#filter :(

  // 🦄 rules that are counterproductive
  'unicorn/prefer-module': 0, // sometimes we have no choice
  'unicorn/prefer-top-level-await': 0, // as above, many environments still don't support this
  'unicorn/no-process-exit': 0, // process.exit is perfectly valid
  'unicorn/no-useless-undefined': 0, // conflicts with eslint's `consistent-return` rule
  'unicorn/prefer-number-properties': 0, // much less readable
  'unicorn/no-for-loop': 0, // TS-eslint's prefer-for-of is much better and respects cases where the index is used
  'unicorn/no-null': 0, // good rule but sometimes null is unavoidable
  'unicorn/no-empty-file': 0, // heaps of false positives, it doesn't understand module.exports
};
