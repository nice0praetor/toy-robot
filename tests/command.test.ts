import { Operation, parseCommand, PlaceCommand } from '../src/lib/command';
import { Direction } from '../src/lib/table';

describe('Parse command', () => {
    test('returns null for invalid command syntax', () => {
        const result = parseCommand("some invalid command");
        expect(result).toBeNull();
    });

    test('returns null for unknown operation', () => {
        const result = parseCommand("UNKNOWN");
        expect(result).toBeNull();
    });

    test('correctly parses base command (no operands)', () => {
        const result = parseCommand("MOVE");
        expect(result.operation).toEqual(Operation.MOVE);
    });

    test('correctly parses a place command (operands)', () => {
        const result = parseCommand("PLACE 1,2,NORTH") as PlaceCommand;
        expect(result.operation).toEqual(Operation.PLACE);
        expect(result.coordinate).toEqual({x:1, y:2});
        expect(result.direction).toEqual(Direction.NORTH);
    });

    test('returns null for unknown direction', () => {
        const result = parseCommand("PLACE 1,2,NORTH-EAST") as PlaceCommand;
        expect(result).toBeNull();
    });

    test('returns null for incorect number of place arguments ', () => {
        const result = parseCommand("PLACE 1,NORTH") as PlaceCommand;
        expect(result).toBeNull();
    });

    test('returns null for invalid place coordinates ', () => {
        const result = parseCommand("PLACE a,b,NORTH") as PlaceCommand;
        expect(result).toBeNull();
    });
});

