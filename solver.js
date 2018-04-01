const ProcessInputFile = require('./src/processInputFile');
/**
 * Reads the argument that has the input file path and outputs the results to the screen
 */

try {
  const fileList = process.argv;

  // remove the node
  fileList.shift();
  // remove the script
  fileList.shift();
  let multipleFiles = false;
  if (typeof fileList[1] !== 'undefined') {
    multipleFiles = true;
  }
  fileList.forEach((val) => {
    ProcessInputFile(val);
    // add a marker when we have multiple files
    if (multipleFiles) {
      console.log('----------------');
    }
  });
} catch (error) {
  console.log('It was not possible to process the input file');
}
