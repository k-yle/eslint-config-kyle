// @ts-check

/** @type {Record<'added' | 'removed', import('@typescript-eslint/utils').TSESLint.FlatConfig.Rules>} */
export const reactRules = {
  added: {
    '@eslint-react/hooks-extra/no-unnecessary-use-callback': 'error',
    '@eslint-react/hooks-extra/no-unnecessary-use-memo': 'error',
    '@eslint-react/naming-convention/use-state': 'error',
    '@eslint-react/no-children-prop': 'error',
    '@eslint-react/no-missing-component-display-name': 'error',
    '@eslint-react/no-missing-context-display-name': 'error',
    '@eslint-react/no-useless-fragment': 'error',
    '@eslint-react/prefer-shorthand-boolean': 'error',
    '@eslint-react/prefer-shorthand-fragment': 'error',

    'jsx-a11y/anchor-ambiguous-text': 'error',
    'jsx-a11y/no-aria-hidden-on-focusable': 'error',
    'jsx-a11y/prefer-tag-over-role': 'error',

    'k/self-closing-comp': 'error',
  },
  removed: {
    'jsx-a11y/click-events-have-key-events': 'off',
  },
};
