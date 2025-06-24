import { RuleTester } from 'eslint';
import { afterAll, describe, it } from 'vitest';
import { noRedundantJsxCurlyBraces } from '../no-redundant-jsx-curly-braces.js';

Object.assign(RuleTester, { afterAll, describe, it, itOnly: it.only });

const ruleTester = new RuleTester({
  languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
});

ruleTester.run(
  'no-redundant-jsx-curly-braces',
  <never>noRedundantJsxCurlyBraces,
  {
    invalid: [
      {
        code: '<Component a={"b"} />',
        errors: [{ messageId: 'error' }],
        output: '<Component a="b" />',
      },
      {
        code: "<Component a={  'b'     } />",
        errors: [{ messageId: 'error' }],
        output: "<Component a='b' />",
      },
      {
        code: '<Component>{}</Component>',
        errors: [{ messageId: 'error' }],
        output: '<Component></Component>',
      },
      {
        code: '<Component>a{}</Component>',
        errors: [{ messageId: 'error' }],
        output: '<Component>a</Component>',
      },
      {
        code: '<Component> a {} b {} </Component>',
        errors: [{ messageId: 'error' }, { messageId: 'error' }],
        output: '<Component> a  b  </Component>',
      },
      {
        code: '<>{}</>',
        errors: [{ messageId: 'error' }],
        output: '<></>',
      },
    ],
    valid: [
      '<Component />',
      '<Component a="b" />',
      '<Component a={1} />',
      // eslint-disable-next-line no-template-curly-in-string
      '<Component a={`${1}`} />',
      '<Component a={`b`} />',
      "<Component a={'b' + 'c'} />",
      '<Component>{undefined}</Component>',
      "<Component>{''}</Component>",
      '<Component>{0}</Component>',
      '<Component>{/** comment */}</Component>',
    ],
  },
);
