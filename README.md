# eslint-config-kyle

[![Build Status](https://github.com/k-yle/eslint-config-kyle/workflows/build/badge.svg)](https://github.com/k-yle/eslint-config-kyle/actions)
[![npm version](https://badge.fury.io/js/eslint-config-kyle.svg)](https://badge.fury.io/js/eslint-config-kyle)

💚 The eslint config I use for all my side projects.

A stricter version of the airbnb config with TS support.

## Usage (Flat Config)

Requires eslint ≥9 and node ≥18.18

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
  "extends": "eslint-config-kyle/tsconfig",
}
```

## Usage (Legacy)

```sh
npm i -D eslint-config-kyle@22 eslint@8
```

Add the following to `package.json`:

```json
{
  "eslintConfig": { "extends": "kyle" },
  "prettier": "eslint-config-kyle/prettier"
}
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
