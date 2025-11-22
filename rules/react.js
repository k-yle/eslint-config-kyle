/** @type {Record<'added' | 'removed', import('@eslint/config-helpers').Config['rules']>} */
export const reactRules = {
  added: {
    '@eslint-react/jsx-dollar': 'error',
    '@eslint-react/jsx-shorthand-boolean': 'error',
    '@eslint-react/jsx-shorthand-fragment': 'error',
    '@eslint-react/no-children-prop': 'error',
    '@eslint-react/no-missing-component-display-name': 'error',
    '@eslint-react/no-missing-context-display-name': 'error',
    '@eslint-react/no-misused-capture-owner-stack': 'error',
    '@eslint-react/no-unnecessary-key': 'error', // there are obviously valid cases, but it's good to make these cases explicit with an eslint-disable comment
    '@eslint-react/no-unnecessary-use-callback': 'error',
    '@eslint-react/no-unnecessary-use-memo': 'error',
    '@eslint-react/no-useless-fragment': 'error',

    'jsx-a11y/anchor-ambiguous-text': 'error',
    'jsx-a11y/no-aria-hidden-on-focusable': 'error',
    'jsx-a11y/prefer-tag-over-role': 'error',

    'k/no-redundant-jsx-curly-braces': 'error',
    'k/self-closing-comp': 'error',

    'react-hooks/component-hook-factories': 'error',
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
