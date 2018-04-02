/* eslint-env node, mocha */

const mocha = require('mocha');
const chai = require('chai');

const expect = chai.expect;

const ProcessInputFile = require('../src/processInputFile');

describe('Maps test', () => {
  it('Should process input file testInput/test1.txt without error', () => {
    expect(() => ProcessInputFile('test/testInput/test1.txt')).to.not.throw();
  });

  it('Should process input file testInput/test2.txt without error', () => {
    expect(() => ProcessInputFile('test/testInput/test2.txt')).to.not.throw();
  });

  it('Should process input file testInput/test3.txt without error', () => {
    expect(() => ProcessInputFile('test/testInput/test3.txt')).to.not.throw();
  });

  it('Should process input file testInput/test4.txt without error', () => {
    expect(() => ProcessInputFile('test/testInput/test4.txt')).to.not.throw();
  });
});

