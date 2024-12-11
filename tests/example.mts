// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// eslint-disable-next-line sort-imports
import { c, b, a } from 'example';

console.log(a + b + c);

// prettier stopped stripping useless escapes in v3.4, so
// we test that eslint still removes them.
// eslint-disable-next-line no-useless-escape
console.log('\a');
