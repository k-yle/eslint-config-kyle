import { RuleTester } from 'eslint';
import json from '@eslint/json';
import { afterAll, describe, it } from 'vitest';
import { localisedPunctuation } from '../localised-punctuation.js';

Object.assign(RuleTester, { afterAll, describe, it, itOnly: it.only });

const ruleTester = new RuleTester({
  language: 'json/json',
  plugins: { json: <never>json },
});

ruleTester.run('localised-punctuation', <never>localisedPunctuation, {
  invalid: [
    {
      code: '"abc ... def\'s "',
      errors: [
        { data: { replacements: '…', search: '...' }, messageId: 'error' },
      ],
      // no filename, so only generic rules are applied
      output: '"abc … def\'s "',
    },
    {
      code: '"abc ... def\'s "',
      errors: [
        { data: { replacements: '…', search: '...' }, messageId: 'error' },
        { data: { replacements: '‘ or ’', search: "'" }, messageId: 'error' },
      ],
      filename: 'locales/en.json',
      output: '"abc … def\'s "', // apostrophe was not autofixed, but the ellipsis was
    },
    {
      code: '"例子.例子"',
      errors: [
        {
          data: { replacements: '。', search: String.raw`/[^\d](\.)[^\d]/` },
          messageId: 'error',
        },
      ],
      filename: 'locales/zh.json',
      output: '"例子。例子"',
    },
  ],

  valid: [
    '"abc .. def"',
    {
      code: '"1.23"',
      filename: 'locales/zh.json',
    },
  ],
});
