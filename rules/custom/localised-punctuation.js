// eslint-disable-next-line unicorn/no-unnecessary-polyfills
import escapeRegExp from 'regexp.escape';

/**
 * If the key starts and ends with a slash, then it is treated as a regex.
 * If the value contains multiple characters, they are all suggested as possible alternatives,
 * and autofix is disabled since the replacement is not clear.
 * @type {{ [lang: string]: { reference?: string; replacements: Record<string, string>; unexpected?: Set<string> } }}
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
      '/(?:[^\\d])(\\.)(?:[^\\d])/': '。',
      ':': '：',
      ';': '；',
      '?': '？',
      '[': '【',
      ']': '】',
      '~': '～',
    },
  },
};

const ALL_PUNCTUATION = new Set(
  Object.entries(PUCTUATION)
    .filter(([key]) => key !== '_all')
    .flatMap(([, lang]) => Object.values(lang.replacements))
    .join(''),
);

// loop again to generate a set of punctuation that is unexpected for each language.
// For example, `【` would typically not be used in English.
for (const lang of Object.values(PUCTUATION)) {
  const allFromThisLang = new Set(Object.values(lang.replacements).join(''));

  // Set#difference is only available in >node22
  lang.unexpected = new Set(
    [...ALL_PUNCTUATION].filter((char) => !allFromThisLang.has(char)),
  );
}

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

const langFormatter = new Intl.DisplayNames(
  Intl.DateTimeFormat().resolvedOptions().locale,
  { type: 'language' },
);

/**
 * @param {import("@humanwhocodes/momoa").StringNode} node
 * @param {string} source
 * @param {string} target
 * @returns {Parameters<Parameters<Rule['create']>[0]['report']>[0]['fix']}
 */
const createFixer = (node, source, target) => (fixer) => {
  return fixer.replaceText(
    node,
    JSON.stringify(node.value.replaceAll(source, target)),
  );
};

/** @param {string} search */
const isRegExp = (search) =>
  search.startsWith('/') && search.endsWith('/') && search.length > 1;

/**
 * @typedef {import('@eslint/json/types').JSONRuleDefinition<[], 'error' | 'suggestion' | 'unexpected'>} Rule
 * @type {Rule}
 */
export const localisedPunctuation = {
  create(context) {
    const fileLang =
      context.filename.split(/[\\/]/).pop()?.split('.')[0].split('-')[0] || '';

    // try to use the formatted language name if available
    let language = fileLang;
    try {
      const formatted = langFormatter.of(fileLang);
      if (formatted) language = formatted;
    } catch {
      // ignore
    }

    return {
      /** @param {import("@humanwhocodes/momoa").MemberNode} member */
      Member(member) {
        const node = member.value;
        if (node.type === 'String') {
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

              const re = isRegExp(search)
                ? new RegExp(search.slice(1, -1), 'g')
                : new RegExp(
                    `(?:[\\w\\s])(${escapeRegExp(search)})(?:[\\w\\s])`,
                    'g',
                  );

              for (const match of stringValue.matchAll(re)) {
                context.report({
                  data: {
                    language,
                    replacements,
                    search: isRegExp(search) ? match[1] : search,
                  },
                  fix: canAutoFix
                    ? createFixer(node, match[1], r[0])
                    : undefined,
                  loc: {
                    end: {
                      column:
                        node.loc.start.column +
                        match.index +
                        (isRegExp(search)
                          ? search.length - 2
                          : search.length - 1),
                      line: node.loc.end.line,
                    },
                    start: {
                      column: node.loc.start.column + match.index,
                      line: node.loc.start.line,
                    },
                  },
                  messageId: 'error',
                  node,
                  suggest: canAutoFix
                    ? []
                    : [...r].map((replacement) => ({
                        data: { replacement },
                        fix: createFixer(node, match[1], replacement),
                        messageId: 'suggestion',
                      })),
                });
              }
            }

            if (langs !== '_all') {
              for (const search of d.unexpected || []) {
                for (const match of indexOfAll(stringValue, search)) {
                  context.report({
                    data: { language, search },
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
                    messageId: 'unexpected',
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
  meta: {
    docs: {
      description: [
        'Encourages the use of language-specific punctuation, such as curly-quotes in English.',
        'If you want to add an //eslint-ignore directive, but cannot add comments to the json file,',
        'then use http://npm.im/@rushstack/eslint-bulk',
      ].join(' '),
      url: 'https://github.com/k-yle/eslint-config-kyle/blob/main/rules/custom/localised-punctuation.js',
    },
    fixable: 'code',
    hasSuggestions: true,
    messages: {
      error:
        'Prefer using language-specific punctuation. Instead of {{search}} it may be more idiomatic to use {{replacements}} in {{language}}.',
      suggestion: 'Use {{replacement}} instead.',
      unexpected:
        '{{search}} is typically not used in {{language}}. Consider using language-specific punctuation.',
    },
    schema: [],
    type: 'suggestion',
  },
};
