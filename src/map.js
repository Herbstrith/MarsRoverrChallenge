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
 * Invalid positions are represented with a 1
 * The method sets the borders of the maps as 1, so the resulting matrix will have
 * a width and length acrescented by 2.
 * It increases memory usage ... but gives room to a simpler boundary checking during movement
 * @param {number} width
 * @param {number} height
 * @returns {Map} map (matrix)
 */
const createMap = (width, height) => {
  // check if input params are valid
  if (!Number.isFinite(height) ||
      !Number.isFinite(width) ||
      height === -1 ||
      width === -1) {
    throw new Error('Invalid map height or width');
  }
  const arrayBoundY = height + 2;
  const arrayBoundX = width + 2;
  const map = new Array(arrayBoundX);
  for (let i = 0; i <= arrayBoundX; i += 1) {
    map[i] = new Array(arrayBoundY);
    for (let j = 0; j <= arrayBoundY; j += 1) {
      map[i][j] = 0;
    }
  }
  for (let i = 0; i <= arrayBoundX; i += 1) {
    map[i][0] = 1;
  }

  for (let i = 0; i <= arrayBoundY; i += 1) {
    map[0][i] = 1;
  }

  for (let i = 0; i <= arrayBoundY; i += 1) {
    map[arrayBoundX][i] = 1;
  }

  for (let i = 0; i <= arrayBoundX; i += 1) {
    map[i][arrayBoundY] = 1;
  }
  return map;
};

module.exports = {
  createMap,
};
