import { defineConfig } from 'eslint/config';
import sharedConfig from './index.js';

export default defineConfig(...sharedConfig, {
  // extra rules that only apply to this package,
  // not to the config that we export.
  name: 'eslint-config-kyle/internal',
  rules: {
    'sort-keys': 'warn',
  },
});
