import { RuleTester } from 'eslint';
import json from '@eslint/json';
import { afterAll, describe, it } from 'vitest';
import { localisedPunctuation } from '../localised-punctuation.js';

Object.assign(RuleTester, { afterAll, describe, it, itOnly: it.only });

const ruleTester = new RuleTester({
  language: 'json/json',
  plugins: { json },
});

ruleTester.run('localised-punctuation', <never>localisedPunctuation, {
  invalid: [
    {
      code: JSON.stringify({ a: "abc ... def's " }),
      errors: [
        {
          data: { language: 'Māori', replacements: '…', search: '...' },
          messageId: 'error',
        },
      ],
      filename: 'locales/mi.json', // no rules for this lang, so only generic rules are applied
      output: JSON.stringify({ a: "abc … def's " }),
    },
    {
      code: JSON.stringify({ a: "abc ... def's" }),
      errors: [
        {
          data: { language: 'English', replacements: '…', search: '...' },
          messageId: 'error',
        },
        {
          data: { language: 'English', replacements: '‘ or ’', search: "'" },
          messageId: 'error',
          suggestions: [
            {
              messageId: 'suggestion',
              output: JSON.stringify({ a: 'abc ... def‘s' }),
            },
            {
              messageId: 'suggestion',
              output: JSON.stringify({ a: 'abc ... def’s' }),
            },
          ],
        },
      ],
      filename: 'locales/en.json',
      output: JSON.stringify({ a: "abc … def's" }), // apostrophe was not autofixed, but the ellipsis was
    },
    {
      code: JSON.stringify({ a: '例子.例子' }),
      errors: [
        {
          data: {
            language: 'Chinese',
            replacements: '。',
            search: '.',
          },
          messageId: 'error',
        },
      ],
      filename: 'locales/zh-Hans.json',
      output: JSON.stringify({ a: '例子。例子' }),
    },
    {
      code: JSON.stringify({ a: '（beispiel）' }),
      errors: [
        { data: { language: 'German', search: '（' }, messageId: 'unexpected' },
        { data: { language: 'German', search: '）' }, messageId: 'unexpected' },
      ],
      filename: 'locales/de.json',
    },
  ],

  valid: [
    JSON.stringify({ a: 'abc .. def' }),
    { code: JSON.stringify({ a: '1.23' }), filename: 'locales/zh.json' },
    { code: JSON.stringify({ 'a.b': '1.2' }), filename: 'locales/zh.json' },
    { code: JSON.stringify({ a: '（' }), filename: 'locales/zh.json' },
    {
      code: JSON.stringify({ a: '({code})例子(markdown)[markdown]' }),
      filename: 'locales/zh.json',
    },
  ],
});
