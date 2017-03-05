/*
Chai + testdouble example

See:
https://github.com/testdouble/testdouble.js
https://github.com/BaseCase/testdouble-chai

Tips:
- Only stub or verify a function, not both
  - https://github.com/testdouble/testdouble.js/blob/master/docs/6-verifying-invocations.md
- Use require instead of import for any module that needs spying or stubbing of dependencies

NOTE: the below tests are not good examples of BDD. Normally, we wouldn't want to test
  impomentation details for a pure function like multiply. But it at least shows how
  to stub and spy with testdouble.
*/

/* eslint-disable import/newline-after-import, import/first */
import { expect, td } from '../support/config';
const utils = td.replace('../../src/utils');

// Must use require instead of import so that testdouble dependency injection works
/* eslint-enable import/newline-after-import, import/first */
const multiply = require('../../src/multiply').multiply;


// Reset all test doubles
afterEach(() => td.reset());

describe('multiply', () => {
  describe('td', () => {
    it('calls add', () => {
      multiply(2, 2);
      // testdouble-chai syntax
      expect(utils.add).to.be.called;
    });
    it('calls add 3 times', () => {
      multiply(2, 5);
      // testdouble-chai does not currently support 'times' so we need to manually call verify
      td.verify(utils.add(td.matchers.anything(), td.matchers.anything()), { times: 4 });
    });
    it('stubs add', () => {
      // This is a crazy convoluted test that knows way too much about implementation details.
      // It's only here to show how to stub functions. It also shows that it's possible to
      // stub dependencies of the module being tested.
      td.when(utils.add(3, 3)).thenReturn(6);
      td.when(utils.add(6, 3)).thenReturn(9);
      td.when(utils.add(9, 3)).thenReturn(1000);
      const res = multiply(3, 4);
      expect(res).to.be.equal(1000);
    });
  });
});
