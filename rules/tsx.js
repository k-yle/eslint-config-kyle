module.exports = {
  files: ['**/*.tsx'],
  extends: [
    'airbnb',
    'airbnb/hooks',
    'prettier',
    'prettier/react',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    ...require('./commonRules'),

    'react/prop-types': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    // ^ pointless since this config only runs for .tsx files

    'import/extensions': [2, 'never'],
    'import/no-unresolved': 0, // TODO: figure out how to make this work well
  },
};
