import { GameState } from '../src/lib/state';
import { Direction } from '../src/lib/table';
import { Operation, PlaceCommand } from '../src/lib/command'

describe('place Operation', () => {
    test('does not initialise robot with invalid cords', () => {
        const state = new GameState();
        const command: PlaceCommand = {
            operation: Operation.PLACE,
            coordinate: {x: -1, y: -1},
            direction: Direction.EAST
        };
        state.perform(command)
        expect(state.robot).toBeUndefined();
    });

    test('initialises robot with correct direction and coordinates', () => {
        const state = new GameState();
        const command: PlaceCommand = {
            operation: Operation.PLACE,
            coordinate: {x: 0, y: 0},
            direction: Direction.EAST
        };
        state.perform(command);
        expect(state.robot.direction).toEqual(Direction.EAST);
        expect(state.robot.position).toEqual({x: 0, y: 0});
    });

    test('does not update robot position with invalid coordinates', () => {
        const state = new GameState();
        const initialRobotState = {direction: Direction.EAST, position: {x: 0, y: 0}};
        state.robot = initialRobotState;
        const command: PlaceCommand = {
            operation: Operation.PLACE,
            coordinate: {x: -1, y: -1},
            direction: Direction.EAST
        };
        state.perform(command)
        expect(state.robot).toEqual(initialRobotState);
    });

    test('updates robot position with valid coordinates', () => {
        const state = new GameState();
        state.robot = {direction: Direction.EAST, position: {x: 0, y: 0}};
        const command: PlaceCommand = {
            operation: Operation.PLACE,
            coordinate: {x: 2, y: 2},
            direction: Direction.EAST
        };
        state.perform(command)
        expect(state.robot).toEqual({direction: Direction.EAST, position: {x: 2, y: 2}});
    });
});

describe('left Operation', () => {
    test('does not initialise new robot', () => {
        const state = new GameState();
        state.perform({operation: Operation.LEFT})
        expect(state.robot).toBeUndefined();
    });

    test('updates robot direction correctly', () => {
        const state = new GameState();
        state.robot = {direction: Direction.NORTH, position: {x: 0, y: 0}};
        state.perform({operation: Operation.LEFT});
        expect(state.robot.direction).toEqual(Direction.WEST);
        state.perform({operation: Operation.LEFT});
        expect(state.robot.direction).toEqual(Direction.SOUTH);
        state.perform({operation: Operation.LEFT});
        expect(state.robot.direction).toEqual(Direction.EAST);
        state.perform({operation: Operation.LEFT});
        expect(state.robot.direction).toEqual(Direction.NORTH);
    });
});

describe('right Operation', () => {
    test('does not initialise new robot', () => {
        const state = new GameState();
        state.perform({operation: Operation.RIGHT})
        expect(state.robot).toBeUndefined();
    });

    test('updates robot direction correctly', () => {
        const state = new GameState();
        state.robot = {direction: Direction.NORTH, position: {x: 0, y: 0}};
        state.perform({operation: Operation.RIGHT});
        expect(state.robot.direction).toEqual(Direction.EAST);
        state.perform({operation: Operation.RIGHT});
        expect(state.robot.direction).toEqual(Direction.SOUTH);
        state.perform({operation: Operation.RIGHT});
        expect(state.robot.direction).toEqual(Direction.WEST);
        state.perform({operation: Operation.RIGHT});
        expect(state.robot.direction).toEqual(Direction.NORTH);
    });
});

describe('move Operation', () => {
    test('does not initialise new robot', () => {
        const state = new GameState();
        state.perform({operation: Operation.MOVE});
        expect(state.robot).toBeUndefined();
    });

    test('does not move robot off board', () => {
        const state = new GameState();
        state.robot = {direction: Direction.WEST, position: {x: 0, y: 0}};
        state.perform({operation: Operation.MOVE});
        expect(state.robot.position).toEqual({x: 0, y: 0});
    });

    test('updates robot position along x axis', () => {
        const state = new GameState();
        state.robot = {direction: Direction.EAST, position: {x: 0, y: 0}}
        state.perform({operation: Operation.MOVE});
        expect(state.robot.position).toEqual({x: 1, y: 0});
        state.perform({operation: Operation.MOVE});
        expect(state.robot.position).toEqual({x: 2, y: 0});
        state.robot.direction = Direction.WEST;
        state.perform({operation: Operation.MOVE});
        expect(state.robot.position).toEqual({x: 1, y: 0});
        state.perform({operation: Operation.MOVE});
        expect(state.robot.position).toEqual({x: 0, y: 0});
    });

    test('updates robot position along y axis', () => {
        const state = new GameState();
        state.robot = {direction: Direction.NORTH, position: {x: 0, y: 0}}
        state.perform({operation: Operation.MOVE});
        expect(state.robot.position).toEqual({x: 0, y: 1});
        state.perform({operation: Operation.MOVE});
        expect(state.robot.position).toEqual({x: 0, y: 2});
        state.robot.direction = Direction.SOUTH;
        state.perform({operation: Operation.MOVE});
        expect(state.robot.position).toEqual({x: 0, y: 1});
        state.perform({operation: Operation.MOVE});
        expect(state.robot.position).toEqual({x: 0, y: 0});
    });
});
