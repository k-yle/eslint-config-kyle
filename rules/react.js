/** @type {Record<'added' | 'removed', import('@eslint/config-helpers').Config['rules']>} */
export const reactRules = {
  added: {
    '@eslint-react/jsx-no-children-prop': 'error',
    '@eslint-react/jsx-no-leaked-dollar': 'error',
    '@eslint-react/jsx-no-leaked-semicolon': 'error',
    '@eslint-react/jsx-no-useless-fragment': 'error',
    '@eslint-react/no-missing-component-display-name': 'error',
    '@eslint-react/no-missing-context-display-name': 'error',
    '@eslint-react/no-misused-capture-owner-stack': 'error',

    'jsx-a11y/anchor-ambiguous-text': 'error',
    'jsx-a11y/no-aria-hidden-on-focusable': 'error',
    'jsx-a11y/prefer-tag-over-role': 'error',

    'k/no-redundant-jsx-curly-braces': 'error',
    'k/self-closing-comp': 'error',

    'react-hooks/error-boundaries': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'react-hooks/globals': 'error',
    'react-hooks/immutability': 'error',
    'react-hooks/refs': 'error',
    'react-hooks/rules-of-hooks': 'error',
    // set-state-in-effect duplicates the rule from @eslint-react
    'react-hooks/use-memo': 'error',
  },
  removed: {
    'jsx-a11y/click-events-have-key-events': 'off',
  },
};
