// very simple implementation to detect <Component a={"b"} />, which is a bit pointless.
// at some point we should remove this and switch to `jsx-curly-brace-presence` from
// stylistic eslint.
//
// this rule also catches empty curly braces in JSX children, such as <div>{}</div>,
// which is pointless, but I can't find an eslint which catches this.

/** @type {import('@eslint/core').RuleDefinition} */
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
      /** @param {import('@typescript-eslint/utils').TSESTree.JSXEmptyExpression} node */
      [[
        'JSXFragment > JSXExpressionContainer > JSXEmptyExpression',
        'JSXElement > JSXExpressionContainer > JSXEmptyExpression',
      ].join(',')]: (node) => {
        // allow it if there's any content (whether whitespace or comment).
        // other rules will enforce the removal of redundant whitsspace
        if (node.range[0] !== node.range[1]) return;

        context.report({
          fix: (fixer) => fixer.replaceTextRange(node.parent.range, ''),
          messageId: 'error',
          node,
        });
      },
    };
  },
  meta: {
    docs: {
      description:
        'Disallow empty JSX expressions, and unnecessary JSX expressions when a literal would be sufficient',
      url: 'https://github.com/k-yle/eslint-config-kyle/blob/main/rules/custom/no-redundant-jsx-curly-braces.js',
    },
    fixable: 'code',
    messages: { error: 'Curly braces are unnecessary here.' },
    schema: [],
    type: 'layout',
  },
};
