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
// Capture group positions within command syntax
const OPERATION_CAPTURE = 1
const OPERANDS_CAPTURE = 2

/**
 * Parse a string into a Command object.
 **/
export const parseCommand = ((line: string): Command => {
    COMMAND_SYNTAX.lastIndex = 0; //Reset regex internal pointer

    // Search for known command syntax in input
    const matches = COMMAND_SYNTAX.exec(line.trim());
    if (!matches) {
        console.error("Could not parse command. Please try again.");
        return null;
    }

    const operation = Operation[matches[OPERATION_CAPTURE].toUpperCase()];

    if (! (operation in Operation)) {
        console.error(`Operation ${operation} not supported.`);
        return null;
    }

    if (operation == Operation.PLACE) {
        // Position of operands within capture group
        const X_POS = 0;
        const Y_POS = 1;
        const DIRECTION_POS = 2;

        const operands = matches[OPERANDS_CAPTURE]?.trim().split(',').filter(i => i)

        if (operands?.length < 3 || operands?.length > 3)  {
            console.error("Incorrect input for command PLACE");
            return null;
        }

        const direction = Direction[operands[DIRECTION_POS].toUpperCase()];

        if (!( direction in Direction)) {
            console.error('Invalid direction');
            return null;
        }


        const coordinates = {
            x: parseInt(operands[X_POS]),
            y: parseInt(operands[Y_POS])
        }

        if (isNaN(coordinates.x) || isNaN(coordinates.y)) {
            console.error('Invalid coordinates');
            return null;
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
