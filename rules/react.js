// @ts-check

/** @type {Record<'added' | 'removed', import('@typescript-eslint/utils').TSESLint.FlatConfig.Rules>} */
export const reactRules = {
  added: {
    'jsx-a11y/anchor-ambiguous-text': 'error',
    'jsx-a11y/no-aria-hidden-on-focusable': 'error',
    'jsx-a11y/prefer-tag-over-role': 'error',

    'react/button-has-type': 'error',
    'react/destructuring-assignment': 'error',
    'react/display-name': ['warn', { checkContextObjects: true }],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/hook-use-state': 'error',
    'react/iframe-missing-sandbox': 'error',
    'react/jsx-boolean-value': ['error', 'never'],
    'react/jsx-curly-brace-presence': 'error',
    'react/jsx-no-constructed-context-values': 'error',
    'react/jsx-no-useless-fragment': 'error',
    'react/jsx-pascal-case': 'error',
    'react/no-array-index-key': 'warn',
    'react/no-danger': 'error',
    'react/no-invalid-html-attribute': 'error',
    'react/no-unstable-nested-components': 'error',
    'react/no-unused-prop-types': 'error',
    'react/self-closing-comp': 'error',
    'react/style-prop-object': 'error',
    'react/void-dom-elements-no-children': 'error',
  },
  removed: {
    'jsx-a11y/click-events-have-key-events': 'off',

    'react/jsx-no-leaked-render': 'off', // handled by TS
    'react/prop-types': 'off', // pointless for typescript
    'react/react-in-jsx-scope': 'off', // no longer needed as of react 16.14+
  },
};
