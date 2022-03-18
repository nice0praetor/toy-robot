import { Table, Robot, Coordinate, Direction} from './table'

export enum Command {
    Place,
    Move,
    Left,
    Right,
    Report
}

export class GameState {
    table = new Table(5,5);
    robot: Robot;

    perform(command: Command, coordinate?: Coordinate, direction?: Direction) {
        let updatedPosition: Coordinate;
        let updatedDirection: Direction;

        // If robot has not be initialised, only the place command is valid
        if (!this.robot && command != Command.Place) {return;}

        switch (command) {
            case Command.Place: {
                updatedPosition = coordinate;
                updatedDirection = direction;
                break;
            }
            case Command.Move: {

                // Directions < 2 (North, East) decrement along their respective axis
                const positionalChange  = this.robot.direction < 2 ? 1 : -1;
                // Should movement take place along y axis
                const yAxis  = this.robot.direction % 2;

                const relativeCoordinateChange = {
                    x: yAxis ? 0 : positionalChange,
                    y: yAxis ? positionalChange : 0
                };

                updatedPosition = {
                    x: this.robot.position.x + relativeCoordinateChange.x,
                    y: this.robot.position.y + relativeCoordinateChange.y
                };

                break;
            }
            case Command.Left: {
                updatedDirection = (this.robot.direction - 1  + 4) % 4
                break;
            }
            case Command.Right: {
                updatedDirection = (this.robot.direction + 1  + 4) % 4
                break;
            }
            case Command.Report: {
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
            this.robot = {position: coordinates, direction: Direction.North};
        }
    }
}
