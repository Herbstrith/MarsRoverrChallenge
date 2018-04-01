/* eslint-env node, mocha */

const mocha = require('mocha');
const chai = require('chai');

const expect = chai.expect;

const Map = require('../src/map');
const Rover = require('../src/rover');

describe('Rover creation tests', () => {
  it('Should create rover in a map', () => {
    const testMap = Map.createMap(5, 5);
    const testRover = { x: 1, y: 2, facing: 'N' };
    const state = Rover.createRover(testMap, testRover);
    expect(state.map).property('2').property('3').equals(1);
    expect(state.rover).property('facing').equals(testRover.facing);
    expect(state.rover).property('x').equals(testRover.x + 1);
    expect(state.rover).property('y').equals(testRover.y + 1);
  });

  it('Should create multiple rovers in edges of the map', () => {
    const testMap = Map.createMap(5, 5);
    const testRover = { x: 5, y: 5, facing: 'S' };
    let state = Rover.createRover(testMap, testRover);
    expect(state.map).property('6').property('6').equals(1);
    expect(state.rover).property('facing').equals(testRover.facing);
    expect(state.rover).property('x').equals(testRover.x + 1);
    expect(state.rover).property('y').equals(testRover.y + 1);

    const testRover2 = { x: 0, y: 0, facing: 'E' };
    state = Rover.createRover(testMap, testRover2);
    expect(state.map).property('1').property('1').equals(1);
    expect(state.rover).property('facing').equals(testRover2.facing);
    expect(state.rover).property('x').equals(testRover2.x + 1);
    expect(state.rover).property('y').equals(testRover2.y + 1);
  });

  it('Should not create rover outside the map', () => {
    const testMap = Map.createMap(5, 5);
    let testRover = { x: 8, y: 2, facing: 'N' };
    expect(() => Rover.createRover(testMap, testRover)).to.throw();
    testRover = { x: 4, y: 10, facing: 'S' };
    expect(() => Rover.createRover(testMap, testRover)).to.throw();
    testRover = { x: -1, y: 2, facing: 'S' };
    expect(() => Rover.createRover(testMap, testRover)).to.throw();
  });
});

describe('Rover rotation methods tests', () => {
  it('Should rotate left', () => {
    expect(Rover.rotateLeft('N')).equals('W');
    expect(Rover.rotateLeft('W')).equals('S');
    expect(Rover.rotateLeft('S')).equals('E');
    expect(Rover.rotateLeft('E')).equals('N');
  });

  it('Should rotate right', () => {
    expect(Rover.rotateRight('N')).equals('E');
    expect(Rover.rotateRight('E')).equals('S');
    expect(Rover.rotateRight('S')).equals('W');
    expect(Rover.rotateRight('W')).equals('N');
  });
});

describe('Rover movement tests', () => {
  it('Should move north', () => {
    const testMap = Map.createMap(5, 5);
    const testRover = { x: 1, y: 2, facing: 'N' };
    let state = Rover.createRover(testMap, testRover);

    state = Rover.moveRover(state.map, state.rover);
    expect(state.map).property('2').property('4').equals(1);
    expect(state.rover).property('facing').equals(testRover.facing);
    expect(state.rover).property('x').equals(testRover.x + 1);
    expect(state.rover).property('y').equals(testRover.y + 2);
  });

  it('Should move south', () => {
    const testMap = Map.createMap(5, 5);
    const testRover = { x: 1, y: 2, facing: 'S' };
    let state = Rover.createRover(testMap, testRover);

    state = Rover.moveRover(state.map, state.rover);
    expect(state.map).property('2').property('2').equals(1);
    expect(state.rover).property('facing').equals(testRover.facing);
    expect(state.rover).property('x').equals(testRover.x + 1);
    expect(state.rover).property('y').equals(testRover.y);
  });

  it('Should move east', () => {
    const testMap = Map.createMap(5, 5);
    const testRover = { x: 1, y: 2, facing: 'E' };
    let state = Rover.createRover(testMap, testRover);

    state = Rover.moveRover(state.map, state.rover);
    expect(state.map).property('3').property('3').equals(1);
    expect(state.rover).property('facing').equals(testRover.facing);
    expect(state.rover).property('x').equals(testRover.x + 2);
    expect(state.rover).property('y').equals(testRover.y + 1);
  });

  it('Should move west', () => {
    const testMap = Map.createMap(5, 5);
    const testRover = { x: 1, y: 2, facing: 'W' };
    let state = Rover.createRover(testMap, testRover);

    state = Rover.moveRover(state.map, state.rover);
    expect(state.map).property('0').property('3').equals(1);
    expect(state.rover).property('facing').equals(testRover.facing);
    expect(state.rover).property('x').equals(testRover.x);
    expect(state.rover).property('y').equals(testRover.y + 1);
  });

  it('Should not move north (invalid position)', () => {
    const testMap = Map.createMap(5, 5);
    const obstacleRover = { x: 1, y: 3, facing: 'N' };
    let state = Rover.createRover(testMap, obstacleRover);
    const testRover = { x: 1, y: 2, facing: 'N' };
    state = Rover.createRover(testMap, testRover);
    state = Rover.moveRover(state.map, state.rover);
    expect(state.map).property('2').property('3').equals(1);
    expect(state.rover).property('facing').equals(testRover.facing);
    expect(state.rover).property('x').equals(testRover.x + 1);
    expect(state.rover).property('y').equals(testRover.y + 1);
  });

  it('Should not move south (invalid position)', () => {
    const testMap = Map.createMap(5, 5);
    const obstacleRover = { x: 1, y: 1, facing: 'N' };
    let state = Rover.createRover(testMap, obstacleRover);
    const testRover = { x: 1, y: 2, facing: 'S' };
    state = Rover.createRover(testMap, testRover);
    state = Rover.moveRover(state.map, state.rover);
    expect(state.map).property('2').property('3').equals(1);
    expect(state.rover).property('facing').equals(testRover.facing);
    expect(state.rover).property('x').equals(testRover.x + 1);
    expect(state.rover).property('y').equals(testRover.y + 1);
  });

  it('Should not move east (invalid position)', () => {
    const testMap = Map.createMap(5, 5);
    const obstacleRover = { x: 2, y: 2, facing: 'N' };
    let state = Rover.createRover(testMap, obstacleRover);
    const testRover = { x: 1, y: 2, facing: 'E' };
    state = Rover.createRover(testMap, testRover);
    state = Rover.moveRover(state.map, state.rover);
    expect(state.map).property('2').property('3').equals(1);
    expect(state.rover).property('facing').equals(testRover.facing);
    expect(state.rover).property('x').equals(testRover.x + 1);
    expect(state.rover).property('y').equals(testRover.y + 1);
  });

  it('Should not move west (invalid position)', () => {
    const testMap = Map.createMap(5, 5);
    const obstacleRover = { x: 0, y: 2, facing: 'N' };
    let state = Rover.createRover(testMap, obstacleRover);
    const testRover = { x: 1, y: 2, facing: 'W' };
    state = Rover.createRover(testMap, testRover);
    state = Rover.moveRover(state.map, state.rover);
    expect(state.map).property('2').property('3').equals(1);
    expect(state.rover).property('facing').equals(testRover.facing);
    expect(state.rover).property('x').equals(testRover.x + 1);
    expect(state.rover).property('y').equals(testRover.y + 1);
  });
});

describe('Take action method tests', () => {
  it('Should rotate left', () => {
    const testMap = Map.createMap(5, 5);
    const testRover = { x: 1, y: 2, facing: 'N' };
    let state = Rover.createRover(testMap, testRover);
    state = Rover.takeAction(state.map, testRover, 'L');
    expect(state).property('rover').property('facing').equals('W');
  });

  it('Should rotate right', () => {
    const testMap = Map.createMap(5, 5);
    const testRover = { x: 1, y: 2, facing: 'N' };
    let state = Rover.createRover(testMap, testRover);
    state = Rover.takeAction(state.map, testRover, 'R');
    expect(state).property('rover').property('facing').equals('E');
  });

  it('Should move', () => {
    const testMap = Map.createMap(5, 5);
    const testRover = { x: 1, y: 2, facing: 'N' };
    let state = Rover.createRover(testMap, testRover);

    state = Rover.takeAction(state.map, state.rover, 'M');
    expect(state).property('rover').property('x').equals(2);
    expect(state).property('rover').property('y').equals(4);
    expect(state).property('rover').property('facing').equals('N');
    expect(state).property('map').property('2').property('4').equals(1);
  });

  it('Should move a second rover', () => {
    const testMap = Map.createMap(5, 5);
    const testRover = { x: 1, y: 2, facing: 'N' };
    let state = Rover.createRover(testMap, testRover);

    state = Rover.takeAction(state.map, state.rover, 'M');
    expect(state).property('rover').property('x').equals(2);
    expect(state).property('rover').property('y').equals(4);
    expect(state).property('rover').property('facing').equals('N');
    expect(state).property('map').property('2').property('4').equals(1);

    const testRover2 = { x: 4, y: 2, facing: 'E' };
    state = Rover.createRover(testMap, testRover2);

    state = Rover.takeAction(state.map, state.rover, 'M');

    expect(state).property('rover').property('x').equals(6);
    expect(state).property('rover').property('y').equals(3);
    expect(state).property('rover').property('facing').equals('E');
    // the previous rover
    expect(state).property('map').property('2').property('4').equals(1);
    expect(state).property('map').property('6').property('3').equals(1);
  });
});

describe('roverActualPosition method tests', () => {
  it('Should return the position of a rover that moved', () => {
    const testMap = Map.createMap(5, 5);
    const testRover = { x: 1, y: 2, facing: 'N' };
    let state = Rover.createRover(testMap, testRover);

    state = Rover.takeAction(state.map, state.rover, 'M');
    const position = Rover.roverActualPosition(state.rover);
    expect(position).equals('1 3 N');
  });

  it('Should move a second rover', () => {
    const testMap = Map.createMap(5, 5);
    const testRover = { x: 1, y: 2, facing: 'N' };
    let state = Rover.createRover(testMap, testRover);

    state = Rover.takeAction(state.map, state.rover, 'M');
    const position = Rover.roverActualPosition(state.rover);
    expect(position).equals('1 3 N');
    const testRover2 = { x: 4, y: 2, facing: 'E' };
    state = Rover.createRover(testMap, testRover2);
    state = Rover.takeAction(state.map, state.rover, 'M');
    const position2 = Rover.roverActualPosition(state.rover);
    expect(position2).equals('5 2 E');
  });
});


describe('Take list of action method tests', () => {
  it('Should take one action', () => {
    const testMap = Map.createMap(5, 5);
    const testRover = { x: 1, y: 2, facing: 'N' };
    let state = Rover.createRover(testMap, testRover);

    state = Rover.takeMultipleActions(state.map, state.rover, 'M');
    expect(state).property('rover').property('x').equals(2);
    expect(state).property('rover').property('y').equals(4);
    expect(state).property('rover').property('facing').equals('N');
    expect(state).property('map').property('2').property('4').equals(1);
  });

  it('Should take multiple actions', () => {
    const testMap = Map.createMap(5, 5);
    const testRover = { x: 1, y: 2, facing: 'N' };
    let state = Rover.createRover(testMap, testRover);

    state = Rover.takeMultipleActions(state.map, state.rover, 'LMLMLMLMM');
    expect(state).property('rover').property('x').equals(2);
    expect(state).property('rover').property('y').equals(4);
    expect(state).property('rover').property('facing').equals('N');
    expect(state).property('map').property('2').property('4').equals(1);
  });

  it('Should take multiple actions', () => {
    const testMap = Map.createMap(5, 5);
    const testRover = { x: 3, y: 3, facing: 'E' };
    let state = Rover.createRover(testMap, testRover);

    state = Rover.takeMultipleActions(state.map, state.rover, 'MMRMMRMRRM');
    expect(state).property('rover').property('x').equals(6);
    expect(state).property('rover').property('y').equals(2);
    expect(state).property('rover').property('facing').equals('E');
    expect(state).property('map').property('6').property('2').equals(1);
  });

  it('Should take multiple actions (multiple rovers)', () => {
    const testMap = Map.createMap(5, 5);
    const testRover = { x: 1, y: 2, facing: 'N' };
    let state = Rover.createRover(testMap, testRover);

    state = Rover.takeMultipleActions(state.map, state.rover, 'LMLMLMLMM');
    expect(state).property('rover').property('x').equals(2);
    expect(state).property('rover').property('y').equals(4);
    expect(state).property('rover').property('facing').equals('N');
    expect(state).property('map').property('2').property('4').equals(1);

    const testRover2 = { x: 3, y: 3, facing: 'E' };
    state = Rover.createRover(state.map, testRover2);

    state = Rover.takeMultipleActions(state.map, state.rover, 'MMRMMRMRRM');
    expect(state).property('rover').property('x').equals(6);
    expect(state).property('rover').property('y').equals(2);
    expect(state).property('rover').property('facing').equals('E');
    expect(state).property('map').property('6').property('2').equals(1);
    expect(state).property('map').property('2').property('4').equals(1);
  });
});
