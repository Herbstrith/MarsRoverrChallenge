const fs = require('fs');

const Rover = require('./rover');
const Map = require('./map');

/**
 * Receives a string with a file path
 * and prints(console.log) the output
 * @param {string} file
 */
const SetupAndRun = (file) => {
  const fileLines = fs.readFileSync(file).toString().split('\r\n');
  const mapParams = fileLines[0].split(' ');
  const width = parseInt(mapParams[0], 10);
  const height = parseInt(mapParams[1], 10);
  const map = Map.createMap(width, height);
  fileLines.shift();
  let state = {
    map,
  };

  for (let i = 0; i < fileLines.length; i += 1) {
    const roverCreateParams = fileLines[i].split(' ');
    // separate line params (create)
    const roverParams = {
      x: parseInt(roverCreateParams[0], 10),
      y: parseInt(roverCreateParams[1], 10),
      facing: roverCreateParams[2],
    };
    // create rover
    state = Rover.createRover(state.map, roverParams);
    // get actions line (next line)
    i += 1;
    const roverActions = fileLines[i];
    // Process action lines
    state = Rover.takeMultipleActions(state.map, state.rover, roverActions);
    // print result
    console.log(Rover.roverActualPosition(state.rover));
  }
};

module.exports = SetupAndRun;
