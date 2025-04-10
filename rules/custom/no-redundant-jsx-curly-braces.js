// very simple implementation to detect <Component a={"b"} />, which is a bit pointless.
// at some point we should remove this and switch to `jsx-curly-brace-presence` from
// stylistic eslint.

/** @type {import('@typescript-eslint/utils').TSESLint.RuleModule<'error'>} */
export const noRedundantJsxCurlyBraces = {
  create(context) {
    return {
      /** @param {import('@typescript-eslint/utils').TSESTree.Literal} node */
      'JSXAttribute > JSXExpressionContainer > Literal': (node) => {
        if (typeof node.value !== 'string') return;
        context.report({
          fix(fixer) {
            return fixer.replaceTextRange(node.parent.range, node.raw);
          },
          messageId: 'error',
          node,
        });
      },
    };
  },
  defaultOptions: [],
  meta: {
    docs: {
      description:
        'Disallow unnecessary JSX expressions when a literal would be sufficient',
      url: 'https://github.com/k-yle/eslint-config-kyle/blob/main/rules/custom/no-redundant-jsx-curly-braces.js',
    },
    fixable: 'code',
    messages: { error: 'Curly braces are unnecessary here.' },
    schema: [],
    type: 'layout',
  },
};
