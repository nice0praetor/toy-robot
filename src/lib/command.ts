export enum Operation {
    PLACE,
    MOVE,
    LEFT,
    RIGHT,
    REPORT
}

export type Command = {
    operation: Operation
    operands?: string[]
}

const COMMAND_SYNTAX = /^(\w+)( (\w+,*)+)?$/gi
export const parseCommand = ((line: string): Command => {
    COMMAND_SYNTAX.lastIndex = 0;

    const matches = COMMAND_SYNTAX.exec(line.trim());
    if (!matches) {
        console.error("Could not parse command. Please try again.");
        return null;
    }

    const operation = matches[0].toUpperCase();
    if (!Object.values(Operation).includes(Operation[operation])) {
        console.error(`Operation ${operation} not supported.`);
        return null;
    }

    return {
        operation: Operation[operation],
        operands: matches[2]?.trim().split(',').filter(i => i)
    }
});
