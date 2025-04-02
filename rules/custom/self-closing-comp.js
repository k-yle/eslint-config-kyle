// copied from https://github.com/eslint-stylistic/eslint-stylistic
// which was copied from https://github.com/jsx-eslint/eslint-plugin-react
// because we don't need an entire plugin just for a rule that's
// trivial to implement ourselves.

/** @type {import('@typescript-eslint/utils').TSESLint.RuleModule<'notSelfClosing'>} */
export const selfClosingComp = {
  create(context) {
    return {
      /** @param {import('@typescript-eslint/utils').TSESTree.JSXOpeningElement} node */
      JSXOpeningElement(node) {
        const shouldBeSelfClosed =
          (node.name?.type === 'JSXIdentifier' ||
            node.name?.type === 'JSXMemberExpression') &&
          !node.selfClosing &&
          node.parent.children.length === 0;

        if (!shouldBeSelfClosed) return;

        context.report({
          fix(fixer) {
            // Represents the last character of the JSXOpeningElement, the '>' character
            const openingElementEnding = node.range[1] - 1;
            // Represents the last character of the JSXClosingElement, the '>' character
            const closingElementEnding =
              node.parent.closingElement?.range[1] ?? NaN;

            // Replace />.*<\/.*>/ with '/>'
            return fixer.replaceTextRange(
              [openingElementEnding, closingElementEnding],
              ' />',
            );
          },
          messageId: 'notSelfClosing',
          node,
        });
      },
    };
  },
  defaultOptions: [],
  meta: {
    docs: {
      description:
        'Disallow extra closing tags for components without children',
      url: 'https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md',
    },
    fixable: 'code',
    messages: {
      notSelfClosing: 'Empty components should be self-closing',
    },
    schema: [],
    type: 'layout',
  },
};
