// @ts-check
import { join } from 'node:path';
import eslint from '@eslint/js';
import { includeIgnoreFile } from '@eslint/compat';
import tsEslint from 'typescript-eslint';
import unicorn from 'eslint-plugin-unicorn';
import prettier from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
// @ts-expect-error -- no typedefs yet
import reactHooks from 'eslint-plugin-react-hooks';
import vitest from 'eslint-plugin-vitest';
// @ts-expect-error -- no typedefs yet
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import-x';
import globals from 'globals';
import { commonRules } from './rules/commonRules.js';
import { unicornRules } from './rules/unicorn.js';
import { importRules } from './rules/import.js';
import { reactRules } from './rules/react.js';
import { testRules } from './rules/test.js';
import { tsRules } from './rules/ts.js';

export default tsEslint.config(
  includeIgnoreFile(join(process.cwd(), '.gitignore')),
  { ignores: ['**/*.snap'], name: 'eslint-config-kyle/ignore' },
  eslint.configs.recommended,
  ...tsEslint.configs.strict,
  ...tsEslint.configs.stylistic,
  unicorn.configs['flat/recommended'],
  prettier,
  importPlugin.flatConfigs.recommended,
  jsxA11y.flatConfigs.recommended,
  /** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.Config} */ (
    react.configs.flat?.recommended
  ),
  {
    languageOptions: {
      globals: globals.browser,
    },
    name: 'eslint-config-kyle/custom rules',
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...commonRules,
      ...reactRules.added,
      ...reactRules.removed,
      ...tsRules.added,
      ...tsRules.removed,
      ...unicornRules.added,
      ...unicornRules.removed,
      ...importRules.added,
      ...importRules.removed,
    },
    settings: {
      react: { version: '18' },
    },
  },
  {
    files: ['**/*.test.*', '**/*.cy.*'],
    name: 'eslint-config-kyle/test files',
    plugins: { vitest },
    rules: {
      ...vitest.configs.recommended.rules,
      ...testRules.added,
      ...testRules.removed,
    },
  },
);
