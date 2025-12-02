import confusingBrowserGlobals from 'confusing-browser-globals';

// eslint-disable-next-line dot-notation
const isCI = process.env['CI'] || process.env['CI_REPO_NAME'];

/** @type {import('@eslint/config-helpers').Config['rules']} */
export const commonRules = {
  'block-scoped-var': 'error',
  'class-methods-use-this': 'error',
  'consistent-return': 'error',
  curly: ['error', 'multi-line'],
  'default-case': 'error',
  'default-case-last': 'error',
  'default-param-last': 'error',
  'dot-notation': 'error',
  eqeqeq: ['error', 'always'],
  'func-names': 'warn',
  'global-require': 'error',
  'grouped-accessor-pairs': 'error',
  'lines-between-class-members': [
    'error',
    'always',
    { exceptAfterSingleLine: false },
  ],
  'logical-assignment-operators': [
    'error',
    'always',
    { enforceForIfStatements: true },
  ],
  'new-cap': ['error', { capIsNew: false }],
  'new-parens': 'error',

  'no-alert': 'error',
  'no-array-constructor': 'error',
  'no-buffer-constructor': 'error',
  'no-caller': 'error',
  'no-console': [
    // `console.log` will show a warning in dev, and will
    // fail the CI if forgotten. If you explicitly want to
    // keep it, change it to `console.info` (or any other
    // method like `.warn`, `.error`)
    isCI ? 'error' : 'warn',
    { allow: Object.keys(console).filter((method) => method !== 'log') },
  ],
  'no-constructor-return': 'error',
  'no-debugger': 'error',
  // disallow empty functions, except for standalone funcs/arrows
  // https://eslint.org/docs/rules/no-empty-function
  'no-empty-function': [
    'error',
    {
      allow: ['arrowFunctions', 'functions', 'methods'],
    },
  ],
  'no-eval': 'error',
  'no-extend-native': 'error',
  'no-extra-bind': 'error',
  'no-extra-label': 'error',
  'no-extra-semi': 'error',
  'no-floating-decimal': 'error',
  'no-implied-eval': 'error',
  'no-inner-declarations': 'error',
  'no-label-var': 'error',
  'no-labels': ['error', { allowLoop: false, allowSwitch: false }],
  'no-lone-blocks': 'error',
  'no-loop-func': 'error',
  'no-mixed-operators': [
    'error',
    {
      groups: [
        ['%', '**'],
        ['+', '-'],
        ['/', '*'],
        ['&', '|', '^', '~', '<<', '>>', '>>>'],
        ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
        ['&&', '||', '??'],
      ],
    },
  ],
  'no-multi-assign': 'error',
  'no-multi-str': 'error',
  'no-new': 'error',
  'no-new-func': 'error',
  'no-new-wrappers': 'error',
  'no-object-constructor': 'error',
  'no-octal-escape': 'error',
  'no-param-reassign': ['error', { props: false }],
  'no-restricted-globals': [
    'error',
    {
      message:
        'Use Number.isFinite instead https://github.com/airbnb/javascript#standard-library--isfinite',
      name: 'isFinite',
    },
    {
      message:
        'Use Number.isNaN instead https://github.com/airbnb/javascript#standard-library--isnan',
      name: 'isNaN',
    },
    ...[
      ...confusingBrowserGlobals,
      'reportError', // because it's a commonly used in business-side code
      'Text', // common name, extremely rare that you want the global
    ].map((g) => ({
      message: `Use window.${g} instead. https://npm.im/confusing-browser-globals`,
      name: g,
    })),
  ],
  'no-restricted-syntax': [
    'warn',
    {
      // ban `import React from "react"`, prefer `import { ... } from "react"`
      message:
        'Do not use a default-import with React. Only import required functions.',
      selector:
        "ImportDeclaration[source.value='react'][specifiers.0.type='ImportDefaultSpecifier']",
    },
    {
      // DIY solution because unicorn/explicit-length-check doesn't allow !!x.length
      message:
        'Using .length in a logical expression without !! may short-circut to 0',
      selector:
        'LogicalExpression:matches([left.property.name="length"], [right.property.name="length"])',
    },
  ],
  'no-return-assign': ['error', 'always'],
  'no-return-await': 'error',
  'no-script-url': 'error',
  'no-self-compare': 'error',
  'no-sequences': 'error',
  'no-shadow-restricted-names': 'error',
  'no-template-curly-in-string': 'error',
  'no-throw-literal': 'error',
  'no-undef': 'off', // handled by TS
  'no-undef-init': 'error',
  'no-unneeded-ternary': ['error', { defaultAssignment: false }],
  'no-unreachable-loop': 'error',
  'no-unsafe-optional-chaining': [
    'error',
    { disallowArithmeticOperators: true },
  ],
  'no-unused-expressions': 'error',
  'no-useless-assignment': 'error',
  'no-useless-computed-key': 'error',
  'no-useless-concat': 'error',
  'no-useless-constructor': 'error',
  'no-useless-rename': 'error',
  'no-useless-return': 'error',
  'no-var': 'error',
  'no-void': 'error',
  'no-warning-comments': [
    // FIX­ME comments should only fail the build in the CI
    // environment, not while developing locally.
    isCI ? 'error' : 'warn',
    { location: 'anywhere', terms: ['fixme'] },
  ],
  'object-shorthand': ['error', 'always', { avoidQuotes: true }],
  'one-var': ['error', 'never'],
  'operator-assignment': ['error', 'always'],
  'prefer-arrow-callback': 'error',
  'prefer-const': [
    'error',
    { destructuring: 'all', ignoreReadBeforeAssign: true },
  ],
  'prefer-exponentiation-operator': 'error',
  'prefer-numeric-literals': 'error',
  'prefer-object-has-own': 'error',
  'prefer-object-spread': 'error',
  'prefer-promise-reject-errors': 'error',
  'prefer-reflect': ['warn', { exceptions: ['delete'] }],
  'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
  'prefer-rest-params': 'error',
  'prefer-spread': 'error',
  'prefer-template': 'error',
  'preserve-caught-error': 'error',
  'quote-props': ['error', 'as-needed'],
  quotes: [
    'error',
    'single',
    { allowTemplateLiterals: false, avoidEscape: true }, // ban untagged template literals with no expressions
  ],
  radix: 'error',
  'sort-imports': ['error', { ignoreDeclarationSort: true }], // sort the members of an import, but not the imports themselves
  'spaced-comment': ['error', 'always', { markers: ['/'] }], // for ts <reference /> comments
  'symbol-description': 'error',
  'unicode-bom': ['error', 'never'],
  'vars-on-top': 'error',
  yoda: 'error',
};
