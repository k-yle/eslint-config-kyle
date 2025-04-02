// @ts-check
import { join } from 'node:path';
import eslint from '@eslint/js';
import json from '@eslint/json';
import css from '@eslint/css';
import { includeIgnoreFile } from '@eslint/compat';
import tsEslint from 'typescript-eslint';
import unicorn from 'eslint-plugin-unicorn';
import prettier from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import vitest from '@vitest/eslint-plugin';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import-x';
import globals from 'globals';
import { commonRules } from './rules/commonRules.js';
import { unicornRules } from './rules/unicorn.js';
import { importRules } from './rules/import.js';
import { reactRules } from './rules/react.js';
import { testRules } from './rules/test.js';
import { tsRules } from './rules/ts.js';
import { localisedPunctuation } from './rules/custom/localised-punctuation.js';

/** @type {import('typescript-eslint').ConfigWithExtends[]} */
const jsConfigs = [
  includeIgnoreFile(join(process.cwd(), '.gitignore')),
  { ignores: ['**/*.snap', '**/.next'], name: 'eslint-config-kyle/ignore' },
  eslint.configs.recommended,
  ...tsEslint.configs.strict,
  ...tsEslint.configs.stylistic,
  unicorn.configs.recommended,
  prettier,
  importPlugin.flatConfigs.recommended,
  jsxA11y.flatConfigs.recommended,
  react.configs.flat?.recommended,
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
];

export default tsEslint.config(
  // we need to update all JS configs to only validate JS/TS files,
  // because other languages don't necessarily have a compatible
  // AST API...
  ...jsConfigs.map((block) => ({
    ...block,
    files: block.files || ['**/*.*({c,m}){j,t}s*(x)'],
  })),

  // now we can add custom languages
  {
    files: ['**/*.css'],
    language: 'css/css',
    name: 'eslint-config-kyle/css',
    ...css.configs.recommended,
  },
  {
    files: ['**/*.json', '**/*.jsonc'],
    ignores: ['package-lock.json'],
    language: 'json/jsonc',
    name: 'eslint-config-kyle/json',
    ...json.configs.recommended,
  },
  {
    files: ['**/locales/*.json'],
    name: 'eslint-config-kyle/json-locale-files',
    plugins: {
      k: {
        rules: {
          'localised-punctuation': localisedPunctuation,
        },
      },
    },
    rules: {
      'json/sort-keys': 'error',
      'k/localised-punctuation': 'error',
    },
  },
);
