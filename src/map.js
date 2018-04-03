/**
 * @module map
 */

/**
 * @typedef Map
 * @type {Array<Array<number>>}
 */


/**
 * Returns a representation of the map built with size height and width.
 * Empty (valid positions) are represented with a 0
 * Invalid positions are represented with 1 when there is a rover on the position
 * or undefined for out of bounds values
 * @param {number} width
 * @param {number} height
 * @returns {Map} map (matrix)
 */
const createMap = (width, height) => {
  // check if input params are valid
  if (!Number.isFinite(height) ||
      !Number.isFinite(width) ||
      height < 0 || width < 0) {
    throw new Error('Invalid map height or width');
  }
  const map = new Array(width);
  for (let i = 0; i <= width; i += 1) {
    map[i] = new Array(height);
    for (let j = 0; j <= height; j += 1) {
      map[i][j] = 0;
    }
  }
  return map;
};

module.exports = {
  createMap,
};
