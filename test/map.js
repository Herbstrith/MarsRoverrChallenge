/* eslint-env node, mocha */

const mocha = require('mocha');
const chai = require('chai');

const expect = chai.expect;

const Map = require('../src/map');

describe('Maps test', () => {
  it('Should create a 5 x 5 map', () => {
    const testMap = Map.createMap(5, 5);
    expect(testMap).lengthOf(6);
    expect(testMap[0]).lengthOf(6);
    expect(testMap[1]).lengthOf(6);
    expect(testMap[2]).lengthOf(6);
    expect(testMap[3]).lengthOf(6);
    expect(testMap[4]).lengthOf(6);
    expect(testMap[5]).lengthOf(6);
    testMap.forEach((line) => {
      line.forEach((column) => {
        expect(column).equals(0);
      });
    });
  });

  it('Should create a 99 x 99 map', () => {
    const testMap = Map.createMap(99, 99);
    expect(testMap).lengthOf(100);
    testMap.forEach((line) => {
      line.forEach((column) => {
        expect(column).equals(0);
      });
    });
  });

  it('Should create a 45 x 78 map', () => {
    const testMap = Map.createMap(45, 78);
    expect(testMap).lengthOf(46);
    expect(testMap).lengthOf(46);
    expect(testMap[0]).lengthOf(79);
    testMap.forEach((line) => {
      line.forEach((column) => {
        expect(column).equals(0);
      });
    });
  });

  it('Should create a 78 x 45 map', () => {
    const testMap = Map.createMap(78, 45);
    expect(testMap).lengthOf(79);
    expect(testMap[0]).lengthOf(46);
    testMap.forEach((line) => {
      line.forEach((column) => {
        expect(column).equals(0);
      });
    });
  });

  it('Should create a 0 x 45 map', () => {
    const testMap = Map.createMap(0, 45);
    expect(testMap).lengthOf(1);
    expect(testMap[0]).lengthOf(46);
    testMap.forEach((line) => {
      line.forEach((column) => {
        expect(column).equals(0);
      });
    });
  });

  it('Should create a 78 x 0 map', () => {
    const testMap = Map.createMap(78, 0);
    expect(testMap).lengthOf(79);
    expect(testMap[0]).lengthOf(1);
    testMap.forEach((line) => {
      line.forEach((column) => {
        expect(column).equals(0);
      });
    });
  });

  it('Should not create map with negative height or width', () => {
    expect(() => Map.createMap(-1, 99)).to.throw('Invalid map height or width');
    expect(() => Map.createMap(5, -1)).to.throw('Invalid map height or width');
    expect(() => Map.createMap(-1, -1)).to.throw('Invalid map height or width');
    expect(() => Map.createMap(-10, -8)).to.throw('Invalid map height or width');
    expect(() => Map.createMap(undefined, 8)).to.throw('Invalid map height or width');
    expect(() => Map.createMap(8, undefined)).to.throw('Invalid map height or width');
    expect(() => Map.createMap(null, 8)).to.throw('Invalid map height or width');
    expect(() => Map.createMap(8, null)).to.throw('Invalid map height or width');
  });
});
