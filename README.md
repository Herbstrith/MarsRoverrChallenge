# Mars Rover problem

A solution to the mars rover programming challenge using node.js

### Getting Started

To solve a given input file(txt) use

```
node solver.js path/to/testfile.txt
```

### Prerequisites

```
Node V8
```

### Installing

A step by step series of examples that tell you have to get a development env running

Dev environment:
```
npm install --only=dev
```

Production environment:
```
npm install
```

Some test files are present in the text folder, which can be run with:

```
node solver.js ./test/testInput/test1.txt
```
```
node solver.js ./test/testInput/test2.txt
```
```
node solver.js ./test/testInput/test3.txt
```

You can also solve multiple files like so (output will be separated by "-------"):

```
node solver.js ./test/testInput/test1.txt ./test/testInput/test2.txt ./test/testInput/test3.txt
```

## Running the tests

To run the tests use
```
npm test
```

## Generating the documentation

To generate the documentations (with jsdoc) run
```
npm run documentation
```
and a doc folder will be created


## Built With

* [nodejs](https://nodejs.org/en/) - Javascript runtime
* [mocha](https://mochajs.org/) - Test framework
* [jsdocs](https://github.com/jsdoc3/jsdoc) - Used to generate documentation
* [ESLint](https://eslint.org/) - Linter (using airBnB)


## Problem description and notes
A squad of robotic rovers are to be landed by NASA on a plateau on Mars. This plateau, which is curiously rectangular, must be navigated by the rovers so that their on-board cameras can get a complete view of the surrounding terrain to send back to Earth.

A rover's position and location is represented by a combination of x and y co-ordinates and a letter representing one of the four cardinal compass points. The plateau is divided up into a grid to simplify navigation. An example position might be 0, 0, N, which means the rover is in the bottom left corner and facing North.

In order to control a rover, NASA sends a simple string of letters. The possible letters are 'L', 'R' and 'M'. 'L' and 'R' makes the rover spin 90 degrees left or right respectively, without moving from its current spot. 'M' means move forward one grid point, and maintain the same heading.

Assume that the square directly North from (x, y) is (x, y+1).

Input
The first line of input is the upper-right coordinates of the plateau, the lower-left coordinates are assumed to be 0,0.

The rest of the input is information pertaining to the rovers that have been deployed. Each rover has two lines of input. The first line gives the rover's position, and the second line is a series of instructions telling the rover how to explore the plateau.

The position is made up of two integers and a letter separated by spaces, corresponding to the x and y co-ordinates and the rover's orientation.

Each rover will be finished sequentially, which means that the second rover won't start to move until the first one has finished moving.

Output
The output for each rover should be its final co-ordinates and heading.

Input and output files

Test Input:
```
5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM
```

Expected Output:
```
1 3 N
5 1 E
```

### NOTES:
* Corner cases:
  * Dealing with the edges of the plateau

    * Dont move - ignore movement (more likely)
    * Consider the input file invalid
  * Dealing with a position that already has a rover

    * Dont move - ignore movement (more likely)
    * Consider the input file invalid
    * move - ignore the other rover

The way i see we have (at least) two different approaches:

* Create a matrix representation of the map
  * Pros

    * Less comparissons
    * Better when we have a high amount of rovers on our input file
    * Cleaner code
  * Cons

    * More memory usage

* Store rovers on a array and just use the map height and width
  * Pros

    * Memory efficient
    * Better when we have a big plateau to explore (as to memory usage)
  * Cons

    * Iterate rover array for each movement we do
    * Higher number of comparissons
    * Seems a bit more "hacky"