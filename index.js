import { join } from 'node:path';
import eslint from '@eslint/js';
import json from '@eslint/json';
import css from '@eslint/css';
import { defineConfig, globalIgnores } from 'eslint/config';
import { includeIgnoreFile } from '@eslint/compat';
// TODO: import includeIgnoreFile from eslint/config when we drop support for v9
import tsEslint from 'typescript-eslint';
import unicorn from 'eslint-plugin-unicorn';
import prettier from 'eslint-plugin-prettier/recommended';
import react from '@eslint-react/eslint-plugin';
import reactHooks from 'eslint-plugin-react-hooks';
import vitest from '@vitest/eslint-plugin';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import { flatConfigs as importPlugin } from 'eslint-plugin-import-x';
import { commonRules } from './rules/commonRules.js';
import { unicornRules } from './rules/unicorn.js';
import { importRules } from './rules/import.js';
import { reactRules } from './rules/react.js';
import { testRules } from './rules/test.js';
import { tsRules } from './rules/ts.js';
import { localisedPunctuation } from './rules/custom/localised-punctuation.js';
import { selfClosingComp } from './rules/custom/self-closing-comp.js';
import { noRedundantJsxCurlyBraces } from './rules/custom/no-redundant-jsx-curly-braces.js';

/** @type {import('@eslint/config-helpers').ConfigWithExtends[]} */
const jsConfigs = [
  eslint.configs.recommended,
  .../** @type {never} */ (tsEslint.configs.strict),
  ...tsEslint.configs.stylistic,
  unicorn.configs.recommended,
  prettier,
  importPlugin.recommended,
  jsxA11y.flatConfigs.recommended,
  react.configs['recommended-typescript'],
  reactHooks.configs.flat.recommended,
  {
    name: 'eslint-config-kyle/custom rules',
    plugins: {
      k: {
        rules: {
          'no-redundant-jsx-curly-braces': noRedundantJsxCurlyBraces,
          'self-closing-comp': selfClosingComp,
        },
      },
    },
    rules: {
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
    files: ['**/*.test.*', '**/*.bench.*', '**/*.cy.*'],
    name: 'eslint-config-kyle/test files',
    plugins: { vitest: /** @type {never} */ (vitest) },
    rules: {
      ...vitest.configs.recommended.rules,
      ...testRules.added,
      ...testRules.removed,
    },
  },
  {
    files: ['**/*.test-d.ts'],
    name: 'eslint-config-kyle/type-test-files',
    rules: {
      '@typescript-eslint/no-unused-expressions': 'off',
      'no-unused-expressions': 'off',
    },
  },
  {
    files: ['**/config/**', '**/*.config.*'],
    name: 'eslint-config-kyle/config-files',
    rules: {
      'import-x/no-anonymous-default-export': 'off',
    },
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
  },
];

export default defineConfig(
  // ignore everything that is not version-controlled
  includeIgnoreFile(join(process.cwd(), '.gitignore')),

  // and ignore some files that _are_ version-controlled
  globalIgnores(['**/*.snap'], 'eslint-config-kyle/ignore'),

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
    ...css.configs.recommended,
  },
  {
    files: ['**/*.json', '**/*.jsonc'],
    ignores: ['**/package-lock.json'],
    language: 'json/jsonc',
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
      'k/localised-punctuation': 'warn',
    },
  },
);
