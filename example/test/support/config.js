import chai from 'chai';
import asPromised from 'chai-as-promised';
import td from 'testdouble';
import tdChai from 'testdouble-chai';

chai.use(asPromised);
chai.use(tdChai(td));

const expect = chai.expect;

export {
  expect,
  td,
};
