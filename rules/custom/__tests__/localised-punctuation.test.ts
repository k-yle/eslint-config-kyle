import { RuleTester } from 'eslint';
import json from '@eslint/json';
import { afterAll, describe, it } from 'vitest';
import { localisedPunctuation } from '../localised-punctuation.js';

Object.assign(RuleTester, { afterAll, describe, it, itOnly: it.only });

const ruleTester = new RuleTester({
  language: 'json/json',
  plugins: { json },
});

ruleTester.run('localised-punctuation', localisedPunctuation, {
  invalid: [
    {
      code: JSON.stringify({ a: "abc ... def's " }),
      errors: [
        {
          column: 11,
          data: { language: 'Māori', replacements: '…', search: '...' },
          endColumn: 14,
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
          column: 11,
          data: { language: 'English', replacements: '…', search: '...' },
          endColumn: 14,
          messageId: 'error',
        },
        {
          column: 18,
          data: { language: 'English', replacements: '‘ or ’', search: "'" },
          endColumn: 19,
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
      code: JSON.stringify({ a: '[a](b)...' }),
      errors: [
        {
          column: 6, // because of the markdown, the range is the entire string
          data: { language: 'English', replacements: '…', search: '...' },
          endColumn: 17, // end of string
          messageId: 'error',
        },
      ],
      filename: 'locales/en.json',
      output: JSON.stringify({ a: '[a](b)…' }), // autofix preserved the markdown
    },
    {
      code: JSON.stringify({ a: '例子.例子' }),
      errors: [
        {
          column: 9,
          data: {
            language: 'Chinese',
            replacements: '。',
            search: '.',
          },
          endColumn: 10,
          messageId: 'error',
        },
      ],
      filename: 'locales/zh-Hans.json',
      output: JSON.stringify({ a: '例子。例子' }),
    },
    {
      code: JSON.stringify({ a: '（beispiel）' }),
      errors: [
        {
          column: 7,
          data: { language: 'German', search: '（' },
          endColumn: 8,
          messageId: 'unexpected',
        },
        {
          column: 16,
          data: { language: 'German', search: '）' },
          endColumn: 17,
          messageId: 'unexpected',
        },
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
      code: JSON.stringify({ a: '{code}例子[markdown](markdown)' }),
      filename: 'locales/zh.json',
    },
    {
      code: JSON.stringify({ a: '【标题】 例子 [网址]({url})。' }),
      filename: 'locales/zh.json',
    },
  ],
});
