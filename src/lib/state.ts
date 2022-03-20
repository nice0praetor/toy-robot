import { Table, Robot, Coordinate, Direction, rotateDirection90 } from './table'
import { Operation, Command, PlaceCommand } from './command'


export class GameState {
    table = new Table(5,5);
    robot: Robot;

    /**
     * Perform an command against the GameState.
     **/
    perform(command: Command) {
        let updatedPosition: Coordinate;
        let updatedDirection: Direction;

        // If robot has not be initialised, only the place command is valid
        if (!this.robot && command.operation != Operation.PLACE) {return;}

        switch (command.operation) {
            case Operation.PLACE: {
                const palceCommand = (command as PlaceCommand);
                updatedPosition = palceCommand.coordinate;
                updatedDirection = palceCommand.direction;
                break;
            }
            case Operation.MOVE: {

                // Directions < 2 (North, East) decrement along their respective axis
                const positionalChange  = this.robot.direction < 2 ? 1 : -1;
                // Should movement take place along x axis
                const xAxis  = this.robot.direction % 2;

                const relativeCoordinateChange = {
                    x: xAxis ? positionalChange : 0,
                    y: xAxis ? 0 : positionalChange
                };

                updatedPosition = {
                    x: this.robot.position.x + relativeCoordinateChange.x,
                    y: this.robot.position.y + relativeCoordinateChange.y
                };

                break;
            }
            case Operation.LEFT: {
                updatedDirection = rotateDirection90(this.robot.direction, -1);
                break;
            }
            case Operation.RIGHT: {
                updatedDirection = rotateDirection90(this.robot.direction, 1)
                break;
            }
            case Operation.REPORT: {
                console.log(`${this.robot.position.x},${this.robot.position.y},${Direction[this.robot.direction]}`)
            }

        }

        // Only update position if the new position is within bounds
        if (updatedPosition && this.table.withinBounds(updatedPosition)) {
            this.setOrInitRobot(updatedPosition)
        }

        // Only update direction if robot has been initialised
        if (typeof updatedDirection !== 'undefined' && this.robot) {
            this.robot.direction = updatedDirection;
        }
    }

    /** Sets the position of the robot if it exists, otherwise init
     * At the provided coordinates
     * */
    private setOrInitRobot(coordinates: Coordinate) {
        if (this.robot) {
            this.robot.position = coordinates
        } else {
            this.robot = {position: coordinates, direction: Direction.NORTH};
        }
    }
}
