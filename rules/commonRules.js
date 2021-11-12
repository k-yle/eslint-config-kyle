module.exports = {
  // turn off crap
  'no-console': 0,
  'no-restricted-syntax': 0,
  'no-await-in-loop': 0,
  'guard-for-in': 0,
  'import/prefer-default-export': 0,
  'no-promise-executor-return': 0, // don't need this if we have TS. just results in more verbose code

  // stricter than prettier
  curly: [2, 'multi-line'],
  'prefer-arrow-callback': 2,

  // for ts <reference /> comments
  'spaced-comment': [2, 'always', { markers: ['/'] }],

  // our added rules
  'prefer-object-spread': 1,
  'prefer-destructuring': 1,
  '@typescript-eslint/prefer-optional-chain': 2,
  'no-warning-comments': [1, { terms: ['fixme'], location: 'anywhere' }],

  // extend existing rules
  'no-unused-vars': [1, { caughtErrors: 'all' }],

  // react
  'react/jsx-props-no-spreading': 0,
  'react/prop-types': 0,
  'react/react-in-jsx-scope': 0, // no longer needed as of react 16.14+
  'react/jsx-filename-extension': [1, { extensions: ['.js', '.tsx'] }],
  'react/require-default-props': 0, // typescript handles this
  'react/function-component-definition': [
    1, // when using typescript we always want arrow-functions
    { namedComponents: 'arrow-function', unnamedComponents: 'arrow-function' },
  ],

  'jsx-a11y/click-events-have-key-events': 0,

  // eslint-comments
  'eslint-comments/no-unused-disable': 'error',
};
