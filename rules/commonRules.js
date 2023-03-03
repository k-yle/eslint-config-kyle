// @ts-check
/** @type {import("eslint").Linter.Config} */
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
  'prefer-reflect': 1,
  'prefer-object-spread': 1,
  'prefer-exponentiation-operator': 2,
  'prefer-object-has-own': 2,
  'logical-assignment-operators': [
    2,
    'always',
    { enforceForIfStatements: true },
  ],

  'no-warning-comments': [1, { terms: ['fixme'], location: 'anywhere' }],

  // extend existing rules
  'no-unused-vars': [1, { caughtErrors: 'all' }],

  // make react the first import in the file
  'import/order': [
    'warn',
    {
      groups: [['builtin', 'external', 'internal']],
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

  // eslint-comments
  'eslint-comments/no-unused-disable': 'error',
};
