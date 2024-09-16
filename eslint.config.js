import tsEslint from 'typescript-eslint';
import sharedConfig from './index.js';

export default tsEslint.config(...sharedConfig, {
  // extra rules that only apply to this package,
  // not to the config that we export.
  rules: {
    'sort-keys': 'warn',
  },
});
