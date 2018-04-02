/**
 * @module rover
 */

/**
 * @typedef Rover
 * @type {object}
 * @property {number} x the actual x position of the rover on the map representation
 * @property {number} y the actual y position of the rover on the map representation
 * @property {string} facing can be either "N", "S", "E" or "W"
 */

/**
 * @typedef State
 * @type {object}
 * @property {Map} map the state of the map
 * @property {Rover} rover the position and facing of the rover that is being issued inputs
 */

/**
 * Creates a rover on a given map
 * @param {Map} map The map matrix to create the rover on. The reference will be altered (out)
 * @param {Rover} rover the rover to be positioned on the map
 * @returns {State}
 */
const createRover = (map, { x, y, facing }) => {
  // check if we are in a invalid position
  if (typeof map[x] === 'undefined' || map[x][y] !== 0) {
    throw new Error('Invalid starting position for rover');
  }
  map[x][y] = 1;
  return { map, rover: { x, y, facing } };
};

/**
 * Rotates the rover to the right according to its actual facing.
 * Returns the same value in case of invalid facing value
 * @param {string} facing can be either "N", "S", "E" or "W"
 * @returns {string} the resulting facing after rotating right
 */
const rotateRight = (facing) => {
  switch (facing) {
    case 'N':
      return 'E';
    case 'E':
      return 'S';
    case 'S':
      return 'W';
    case 'W':
      return 'N';
    default:
      return facing;
  }
};

/**
 * Rotates the rover to the left according to its actual facing.
 * Returns the same value in case of invalid facing value
 * @param {string} facing can be either "N", "S", "E" or "W"
 * @returns {string} the resulting facing after rotating left
 */
const rotateLeft = (facing) => {
  switch (facing) {
    case 'N':
      return 'W';
    case 'W':
      return 'S';
    case 'S':
      return 'E';
    case 'E':
      return 'N';
    default:
      return facing;
  }
};

/**
 * Moves a rover on a map according to its current facing.
 * Sets  to the drone old position and 1 to the new drone position on map.
 * If the position to move is invalid (out of bounds or has a rover on it)
 * the rover wont take action.
 * @param {Map} map reference value will be altered (out)
 * @param {Rover} rover
 * @returns {State}
 */
const moveRover = (map, { x, y, facing }) => {
  let newX = x;
  let newY = y;
  switch (facing) {
    case 'N':
      newY += 1;
      break;
    case 'W':
      newX -= 1;
      break;
    case 'S':
      newY -= 1;
      break;
    case 'E':
      newX += 1;
      break;
    default:
      break;
  }
  // check if we are not in a valid position and do nothing
  if (typeof map[newX] === 'undefined' || map[newX][newY] !== 0) {
    return { map, rover: { x, y, facing } };
  }
  // move the rover
  map[x][y] = 0;
  map[newX][newY] = 1;
  return { map, rover: { x: newX, y: newY, facing } };
};

/**
 * Executes a given action on rover on the given map
 * @param {Map} map
 * @param {Rover} rover
 * @param {string} action one of the possible actions: "L", "R" or "M"
 * @returns {State}
 */
const takeAction = (map, { x, y, facing }, action) => {
  switch (action) {
    case 'L':
      return { map, rover: { x, y, facing: rotateLeft(facing) } };
    case 'R':
      return { map, rover: { x, y, facing: rotateRight(facing) } };
    case 'M':
      return moveRover(map, { x, y, facing });
    default:
      return { map, rover: { x, y, facing } };
  }
};

/**
 * With a given map and rover, process a string of actions.
 * @param {Map} map
 * @param {Rover} rover
 * @param {string} actionString string that contains the letters "L", "R" or "M"
 * @returns {State}
 */
const takeMultipleActions = (map, rover, actionString) => {
  let state = { map, rover };
  actionString.split('').forEach((action) => {
    state = takeAction(state.map, state.rover, action);
  });
  return { map: state.map, rover: state.rover };
};

/**
 * Returns the expected output string (minus 1 to coordinates)
 * @param {Rover} rover
 * @returns {string}
 */
const roverActualPosition = ({ x, y, facing }) => `${x} ${y} ${facing}`;

module.exports = {
  createRover,
  takeMultipleActions,
  takeAction,
  rotateLeft,
  rotateRight,
  moveRover,
  roverActualPosition,
};
