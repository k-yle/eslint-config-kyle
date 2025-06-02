// @ts-check

/** @type {Record<'added' | 'removed', import('@typescript-eslint/utils').TSESLint.FlatConfig.Rules>} */
export const importRules = {
  added: {
    'import-x/dynamic-import-chunkname': 'off', // TODO: broken rule, enable once fixed
    'import-x/first': 'error',
    'import-x/newline-after-import': 'error',
    'import-x/no-absolute-path': 'error',
    'import-x/no-anonymous-default-export': 'error',
    // 'import-x/no-cycle': ['error', { maxDepth: '∞' }], // extremely slow (60x slower than the next worse rule)
    'import-x/no-dynamic-require': 'error',
    'import-x/no-empty-named-blocks': 'error',
    'import-x/no-extraneous-dependencies': [
      'error',
      {
        // in test files & config files, it's okay to import devDeps
        devDependencies: [
          '**/*.test.*',
          '**/*.test*.*', // .test-d.ts is used by vitest's type-tests
          '**/*.cy.*',
          '**/*.config.*',
          '**/scripts/**',
        ],
        optionalDependencies: false,
        peerDependencies: true, // allow peerDeps to be imported
      },
    ],
    'import-x/no-mutable-exports': 'error',
    'import-x/no-named-default': 'error',
    'import-x/no-relative-packages': 'error',
    'import-x/no-self-import': 'error',
    'import-x/no-useless-path-segments': ['error', { commonjs: true }],
    'import-x/no-webpack-loader-syntax': 'error',
    'import-x/order': [
      'warn',
      {
        // make react the first import in the file
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling'],
        pathGroups: [
          { group: 'builtin', pattern: 'react', position: 'before' },
        ],
        pathGroupsExcludedImportTypes: ['react'],
      },
    ],
  },
  removed: {
    'import-x/default': 'off', // too expensive & already handled by TS
    'import-x/named': 'off', // too expensive & already handled by TS
    'import-x/namespace': 'off', // too expensive & already handled by TS
    'import-x/no-unresolved': 'off', // too expensive & already handled by TS
  },
};
