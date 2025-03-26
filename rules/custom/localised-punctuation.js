import { basename } from 'node:path';
import { createRule } from './_createRule.js';

/**
 * If the key starts and ends with a slash, then it is treated as a regex.
 * If the value contains multiple characters, they are all suggested as possible alternatives,
 * and autofix is disabled since the replacement is not clear.
 * @satisfies {{ [lang: string]: { reference?: string; replacements: Record<string, string>; } }}
 */
const PUCTUATION = {
  _all: {
    replacements: { ' - ': '–—', '...': '…' },
  },

  'cz,de': {
    reference: 'http://chytreuvozovky.cz',
    replacements: { '"': '„“»«›‹', "'": '’' },
  },
  'en,pt,ru': {
    reference: 'https://smartquotesforsmartpeople.com',
    replacements: { '"': '“”', "'": '‘’' },
  },
  fr: {
    reference: 'https://smartquotesforsmartpeople.vincent-valentin.name',
    replacements: { '"': '«»‹›', "'": '’' },
  },
  'ja,ko,zh': {
    reference: '',
    replacements: {
      '!': '！',
      '"': '「」『』“”',
      "'": '「」『』“”',
      '(': '（',
      ')': '）',
      ',': '、，',
      '-': '–⸺～',
      '/[^\\d](\\.)[^\\d]/': '。',
      ':': '：',
      ';': '；',
      '?': '？',
      '[': '【',
      ']': '】',
      '~': '～',
    },
  },
};

/**
 * like {@link String.prototype.indexOf} but supports multiple matches
 * @param {string} source @param {string} search
 */
function indexOfAll(source, search) {
  let index = source.indexOf(search);
  /** @type {number[]} */
  const indicies = [];
  while (index !== -1) {
    indicies.push(index);
    // eslint-disable-next-line no-useless-assignment
    index = source.indexOf(search, ++index);
  }
  return indicies;
}

export const localisedPunctuation = createRule({
  create(context) {
    const fileLang = basename(context.filename).split('.')[0].split('-')[0];

    return {
      /** @param {import("@typescript-eslint/utils").TSESTree.Literal} node */
      String(node) {
        if (node.value && typeof node.value === 'string') {
          // " must be escaped, so we need to add a literal \ to the string,
          // so that the indicies match
          const stringValue = node.value.replaceAll('"', String.raw`\"`);

          for (const [langs, d] of Object.entries(PUCTUATION)) {
            if (langs !== '_all' && !langs.split(',').includes(fileLang)) {
              continue;
            }

            for (const [search, r] of Object.entries(d.replacements)) {
              const canAutoFix = r.length === 1;
              const replacements = [...r].join(' or ');

              if (
                search.startsWith('/') &&
                search.endsWith('/') &&
                search.length > 1
              ) {
                // it's a regex
                const re = new RegExp(search.slice(1, -1), 'g');
                for (const match of stringValue.matchAll(re)) {
                  context.report({
                    data: { replacements, search },
                    fix: canAutoFix
                      ? (fixer) => {
                          return fixer.replaceText(
                            node,
                            JSON.stringify(
                              node.value.replaceAll(match[1], r[0]),
                            ),
                          );
                        }
                      : undefined,
                    loc: {
                      end: {
                        column:
                          node.loc.start.column +
                          match.index +
                          search.length -
                          2,
                        line: node.loc.end.line,
                      },
                      start: {
                        column: node.loc.start.column + match.index,
                        line: node.loc.start.line,
                      },
                    },
                    messageId: 'error',
                    node,
                  });
                }
              } else {
                // it's a normal string
                for (const match of indexOfAll(stringValue, search)) {
                  context.report({
                    data: { replacements, search },
                    fix: canAutoFix
                      ? (fixer) => {
                          return fixer.replaceText(
                            node,
                            JSON.stringify(node.value.replaceAll(search, r[0])),
                          );
                        }
                      : undefined,
                    loc: {
                      end: {
                        column:
                          node.loc.start.column + match + search.length + 1,
                        line: node.loc.end.line,
                      },
                      start: {
                        column: node.loc.start.column + match + 1,
                        line: node.loc.start.line,
                      },
                    },
                    messageId: 'error',
                    node,
                  });
                }
              }
            }
          }
        }
      },
    };
  },
  defaultOptions: [],
  meta: {
    docs: {
      description: [
        'Encourages the use of language-specific punctuation, such as curly-quotes in English.',
        'If you want to add an //eslint-ignore directive, but cannot add comments to the json file,',
        'then use http://npm.im/@rushstack/eslint-bulk',
      ].join(' '),
    },
    fixable: 'code',
    messages: {
      error:
        'Prefer using language-specific punctuation. Instead of {{search}} it may be more idiomatic to use {{replacements}}',
    },
    schema: [],
    type: 'suggestion',
  },
  name: 'localised-punctuation',
});
