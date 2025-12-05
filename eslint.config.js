import { defineConfig } from 'eslint/config';
import sharedConfig from './index.js';

export default defineConfig(...sharedConfig, {
  // extra rules that only apply to this package,
  // not to the config that we export.
  files: ['**/*.*({c,m}){j,t}s*(x)'],
  name: 'eslint-config-kyle/internal',
  rules: {
    '@typescript-eslint/consistent-type-assertions': 'error', // test that rules from plugins can be extended by consumers
    'sort-keys': 'warn',
  },
});
