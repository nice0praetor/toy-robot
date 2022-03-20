import { Coordinate, Direction } from "./table"

export enum Operation {
    PLACE,
    MOVE,
    LEFT,
    RIGHT,
    REPORT
}

export type BaseCommand = {
    operation: Operation
}

export type PlaceCommand = BaseCommand & {
    operation: Operation.PLACE
    coordinate: Coordinate,
    direction: Direction
}

export type Command = BaseCommand | PlaceCommand;

const COMMAND_SYNTAX = /^(\w+)( (\w+,*)+)?$/gi
export const parseCommand = ((line: string): Command => {
    COMMAND_SYNTAX.lastIndex = 0;

    const matches = COMMAND_SYNTAX.exec(line.trim());
    if (!matches) {
        console.error("Could not parse command. Please try again.");
        return null;
    }

    const operation = Operation[matches[1].toUpperCase()];

    if (! (operation in Operation)) {
        console.error(`Operation ${operation} not supported.`);
        return null;
    }

    if (operation == Operation.PLACE) {
        const operands = matches[2]?.trim().split(',').filter(i => i)

        if (operands?.length < 3)  {
            console.error("Incorrect input for command PLACE");
            return;
        }

        const direction = Direction[operands[2]];

        if (!( direction in Direction)) {
            console.log('Not a direction');
            return;
        }

        const coordinates = {
            x: parseInt(operands[0]),
            y: parseInt(operands[1])
        }

        return {
            operation: operation,
            coordinate: coordinates,
            direction: direction
        } as PlaceCommand;
    }

    return {
        operation: operation,
    }
});
