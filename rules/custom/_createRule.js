import { ESLintUtils } from '@typescript-eslint/utils';

export const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/k-yle/eslint-config-kyle/blob/main/rules/custom/${name}.js`,
);
