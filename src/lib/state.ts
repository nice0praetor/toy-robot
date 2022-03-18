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
        switch (command) {
            case Command.Place: {
                // Ignore attempts to place robot outside of bounds
                if (!this.table.withinBounds(coordinate)) {
                    break;
                }
                this.robot = {direction: direction, position: coordinate};
                break;
            }
            case Command.Move: {break}
            case Command.Left: {break}
            case Command.Right: {break}
            case Command.Report: {break}
        }
    }
}
