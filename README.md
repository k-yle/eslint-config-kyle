# eslint-config-kyle

[![Build Status](https://github.com/k-yle/eslint-config-kyle/workflows/build/badge.svg)](https://github.com/k-yle/eslint-config-kyle/actions)
[![npm version](https://badge.fury.io/js/eslint-config-kyle.svg)](https://badge.fury.io/js/eslint-config-kyle)

💚 The eslint config I use for all my side projects.

A stricter version of the airbnb config with TS support.

## Usage (Flat Config)

Requires eslint ≥9.22 and node ≥20

```sh
npm i -D eslint-config-kyle eslint
```

Add the following to `package.json`:

```json
{
  "scripts": { "lint": "eslint ." },
  "prettier": "eslint-config-kyle/prettier"
}
```

And create a file called `eslint.config.js`:

```js
export { default } from 'eslint-config-kyle';
```

And add this to your `tsconfig.json` file:

```jsonc
{
  "extends": "eslint-config-kyle/tsconfig.base.json",
}
```

If you want to add custom rules/plugins, change `eslint.config.js` like so:

```js
import config from 'eslint-config-kyle';

export { default } from 'eslint-config-kyle';

config.push({
  files: ['**/*.*({c,m}){j,t}s*(x)'],
  rules: {
    '@typescript-eslint/consistent-type-assertions': 'error',
    // any custom rules/plugins/etc
  },
});
```

## VS Code configuration

```jsonc
{
  // By default, VS Code will not show eslint errors
  // for css files, so we need to add this snippet:
  "eslint.validate": [
    "css",
    "json",
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
  ],

  // for the best DX, enable format-on-save and
  // lint-on-save.
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
  },

  // optional, if the local vs global versions conflict.
  // the exact syntax would depend on your package manager.
  "prettier.prettierPath": "./node_modules/prettier",
}
```
