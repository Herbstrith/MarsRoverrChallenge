/* eslint-env node, mocha */

const mocha = require('mocha');
const chai = require('chai');

const expect = chai.expect;

const Map = require('../src/map');

describe('Maps test', () => {
  it('Should create a 5 x 5 map', () => {
    const testMap = Map.createMap(5, 5);
    expect(testMap).lengthOf(8);
    expect(testMap[0]).lengthOf(8);
    expect(testMap[1]).lengthOf(8);
    expect(testMap[2]).lengthOf(8);
    expect(testMap[3]).lengthOf(8);
    expect(testMap[4]).lengthOf(8);
    expect(testMap[5]).lengthOf(8);
    expect(testMap[6]).lengthOf(8);
    testMap.forEach((line, indexY) => {
      line.forEach((column, indexX) => {
        if (indexY === 0 || indexY === 7 ||
            indexX === 0 || indexX === 7) {
          expect(column).equals(1);
        } else {
          expect(column).equals(0);
        }
      });
    });
  });

  it('Should create a 99 x 99 map', () => {
    const testMap = Map.createMap(99, 99);
    expect(testMap).lengthOf(102);
    testMap.forEach((line, indexY) => {
      line.forEach((column, indexX) => {
        if (indexY === 0 || indexY === 101 ||
            indexX === 0 || indexX === 101) {
          expect(column).equals(1);
        } else {
          expect(column).equals(0);
        }
      });
    });
  });

  it('Should create a 45 x 78 map', () => {
    const testMap = Map.createMap(45, 78);
    expect(testMap).lengthOf(48);
    expect(testMap).lengthOf(48);
    expect(testMap[0]).lengthOf(81);
    testMap.forEach((line, indexX) => {
      line.forEach((column, indexY) => {
        if (indexY === 0 || indexY === 80 ||
            indexX === 0 || indexX === 47) {
          expect(column).equals(1);
        } else {
          expect(column).equals(0);
        }
      });
    });
  });

  it('Should create a 78 x 45 map', () => {
    const testMap = Map.createMap(78, 45);
    expect(testMap).lengthOf(81);
    expect(testMap[0]).lengthOf(48);
    testMap.forEach((line, indexX) => {
      line.forEach((column, indexY) => {
        if (indexY === 0 || indexY === 47 ||
            indexX === 0 || indexX === 80) {
          expect(column).equals(1);
        } else {
          expect(column).equals(0);
        }
      });
    });
  });

  it('Should create a 0 x 45 map', () => {
    const testMap = Map.createMap(0, 45);
    expect(testMap).lengthOf(3);
    expect(testMap[0]).lengthOf(48);
    testMap.forEach((line, indexX) => {
      line.forEach((column, indexY) => {
        if (indexY === 0 || indexY === 47 ||
            indexX === 0 || indexX === 2) {
          expect(column).equals(1);
        } else {
          expect(column).equals(0);
        }
      });
    });
  });

  it('Should create a 78 x 0 map', () => {
    const testMap = Map.createMap(78, 0);
    expect(testMap).lengthOf(81);
    expect(testMap[0]).lengthOf(3);
    testMap.forEach((line, indexX) => {
      line.forEach((column, indexY) => {
        if (indexY === 0 || indexY === 2 ||
            indexX === 0 || indexX === 80) {
          expect(column).equals(1);
        } else {
          expect(column).equals(0);
        }
      });
    });
  });

  it('Should not create map with negative height or width', () => {
    expect(() => Map.createMap(-1, 99)).to.throw('Invalid map height or width');
    expect(() => Map.createMap(5, -1)).to.throw('Invalid map height or width');
    expect(() => Map.createMap(-1, -1)).to.throw('Invalid map height or width');
    expect(() => Map.createMap(undefined, 8)).to.throw('Invalid map height or width');
    expect(() => Map.createMap(8, undefined)).to.throw('Invalid map height or width');
    expect(() => Map.createMap(null, 8)).to.throw('Invalid map height or width');
    expect(() => Map.createMap(8, null)).to.throw('Invalid map height or width');
  });
});
