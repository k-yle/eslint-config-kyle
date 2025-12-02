import { RuleTester } from 'eslint';
import { afterAll, describe, it } from 'vitest';
import { selfClosingComp } from '../self-closing-comp.js';

Object.assign(RuleTester, { afterAll, describe, it, itOnly: it.only });

const ruleTester = new RuleTester({
  languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
});

ruleTester.run('self-closing-comp', selfClosingComp, {
  invalid: [
    {
      code: 'var contentContainer = <div className="content"></div>;',
      errors: [{ messageId: 'notSelfClosing' }],
      output: 'var contentContainer = <div className="content" />;',
    },
    {
      code: 'var HelloJohn = <Hello name="John"></Hello>;',
      errors: [{ messageId: 'notSelfClosing' }],
      output: 'var HelloJohn = <Hello name="John" />;',
    },
    {
      code: 'var CompoundHelloJohn = <Hello.Compound name="John"></Hello.Compound>;',
      errors: [{ messageId: 'notSelfClosing' }],
      output: 'var CompoundHelloJohn = <Hello.Compound name="John" />;',
    },
    {
      code: 'var HelloJohn = <Hello.Compound name="John"></Hello.Compound>;',
      errors: [{ messageId: 'notSelfClosing' }],
      output: 'var HelloJohn = <Hello.Compound name="John" />;',
    },
  ],
  valid: [
    'var HelloJohn = <Hello name="John" />;',
    'var HelloJohn = <Hello.Compound name="John" />;',
    'var Profile = <Hello name="John"><img src="picture.png" /></Hello>;',
    'var Profile = <Hello.Compound name="John"><img src="picture.png" /></Hello.Compound>;',
    `
      <Hello>
        <Hello name="John" />
      </Hello>
    `,
    'var HelloJohn = <Hello name="John"> </Hello>;',
    'var HelloJohn = <Hello.Compound name="John"> </Hello.Compound>;',
    'var HelloJohn = <Hello name="John">        </Hello>;',
    'var HelloJohn = <Hello.Compound name="John">        </Hello.Compound>;',
    'var HelloJohn = <div>&nbsp;</div>;',
    "var HelloJohn = <div>{' '}</div>;",
    'var HelloJohn = <Hello name="John">&nbsp;</Hello>;',
    'var HelloJohn = <Hello.Compound name="John">&nbsp;</Hello.Compound>;',
    `
      <Hello.Compound>
        <Hello.Compound name="John" />
      </Hello.Compound>
    `,
    'var HelloJohn = <div> </div>;',
    'var HelloJohn = <div>        </div>;',
    'var contentContainer = <div className="content"><img src="picture.png" /></div>;',
    `
      <div>
        <div className="content" />
      </div>
    `,
  ],
});
