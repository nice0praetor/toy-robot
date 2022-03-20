# Toy Robot Simulator
This application is a simulation of a toy robot moving on a square tabletop, accepting commands from the user to modify the placement of the robot.

## Usage
### Interactive mode
The simulation can be run with the following command:
```
npm start
```
The simulation is now running in interactive mode and will accept commands until the process is killed `crtl-c`.

### File input
The application will process commands read from standard in terminated with a new line `\n` character.
To run a predefined set of command from a file use input redirection.

```
npm start < example_input/input-1.txt
```

## Installation 
### Node version
The project has been developed using node `17.5.0` if using node version manager, please run `nvm use` from within the project root to configure your shell to use the correct node version.

Install NPM dependencies:
```
npm ci
```


## Tests
Tests are available with the `npm test`.

## Commands
The simulation supports the following commands:
### PLACE X,Y,F
PLACE will put the toy robot on the table in position X,Y and facing NORTH, SOUTH,
EAST or WEST.
### MOVE
MOVE will move the toy robot one unit forward in the direction it is currently facing.
### LEFT / RIGHT
LEFT and RIGHT will rotate the robot 90 degrees in the specified direction without
changing the position of the robot.
### REPORT
REPORT will announce the X,Y and F of the robot. This can be in any form, but standard
output is sufficient.
