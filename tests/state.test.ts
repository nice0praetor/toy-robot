import { GameState } from '../src/lib/state';
import { Direction } from '../src/lib/table';
import { Operation } from '../src/lib/command'

describe('place Operation', () => {
    test('does not initialise robot with invalid cords', () => {
        const state = new GameState();
        state.perform(Operation.Place, {x: -1, y: -1}, Direction.East)
        expect(state.robot).toBeUndefined();
    });

    test('initialises robot with correct direction and coordinates', () => {
        const state = new GameState();
        state.perform(Operation.Place, {x: 0, y: 0}, Direction.East)
        expect(state.robot.direction).toEqual(Direction.East);
        expect(state.robot.position).toEqual({x: 0, y: 0});
    });

    test('does not update robot position with invalid coordinates', () => {
        const state = new GameState();
        const initialRobotState = {direction: Direction.East, position: {x: 0, y: 0}};
        state.robot = initialRobotState;
        state.perform(Operation.Place, {x: -1, y: -1}, Direction.East)
        expect(state.robot).toEqual(initialRobotState);
    });

    test('updates robot position with valid coordinates', () => {
        const state = new GameState();
        state.robot = {direction: Direction.East, position: {x: 0, y: 0}};
        state.perform(Operation.Place, {x: 2, y: 2}, Direction.East)
        expect(state.robot).toEqual({direction: Direction.East, position: {x: 2, y: 2}});
    });
});

describe('left Operation', () => {
    test('does not initialise new robot', () => {
        const state = new GameState();
        state.perform(Operation.Left)
        expect(state.robot).toBeUndefined();
    });

    test('updates robot direction correctly', () => {
        const state = new GameState();
        state.robot = {direction: Direction.North, position: {x: 0, y: 0}};
        state.perform(Operation.Left)
        expect(state.robot.direction).toEqual(Direction.West);
        state.perform(Operation.Left)
        expect(state.robot.direction).toEqual(Direction.South);
        state.perform(Operation.Left)
        expect(state.robot.direction).toEqual(Direction.East);
        state.perform(Operation.Left)
        expect(state.robot.direction).toEqual(Direction.North);
    });
});

describe('right Operation', () => {
    test('does not initialise new robot', () => {
        const state = new GameState();
        state.perform(Operation.Right)
        expect(state.robot).toBeUndefined();
    });

    test('updates robot direction correctly', () => {
        const state = new GameState();
        state.robot = {direction: Direction.North, position: {x: 0, y: 0}};
        state.perform(Operation.Right)
        expect(state.robot.direction).toEqual(Direction.East);
        state.perform(Operation.Right)
        expect(state.robot.direction).toEqual(Direction.South);
        state.perform(Operation.Right)
        expect(state.robot.direction).toEqual(Direction.West);
        state.perform(Operation.Right)
        expect(state.robot.direction).toEqual(Direction.North);
    });
});

describe('move Operation', () => {
    test('does not initialise new robot', () => {
        const state = new GameState();
        state.perform(Operation.Move)
        expect(state.robot).toBeUndefined();
    });

    test('does not move robot off board', () => {
        const state = new GameState();
        state.robot = {direction: Direction.West, position: {x: 0, y: 0}}
        state.perform(Operation.Move)
        expect(state.robot.position).toEqual({x: 0, y: 0});
    });

    test('updates robot position along x axis', () => {
        const state = new GameState();
        state.robot = {direction: Direction.North, position: {x: 0, y: 0}}
        state.perform(Operation.Move)
        expect(state.robot.position).toEqual({x: 1, y: 0});
        state.perform(Operation.Move)
        expect(state.robot.position).toEqual({x: 2, y: 0});
        state.robot.direction = Direction.South;
        state.perform(Operation.Move)
        expect(state.robot.position).toEqual({x: 1, y: 0});
        state.perform(Operation.Move)
        expect(state.robot.position).toEqual({x: 0, y: 0});
    });

    test('updates robot position along y axis', () => {
        const state = new GameState();
        state.robot = {direction: Direction.East, position: {x: 0, y: 0}}
        state.perform(Operation.Move)
        expect(state.robot.position).toEqual({x: 0, y: 1});
        state.perform(Operation.Move)
        expect(state.robot.position).toEqual({x: 0, y: 2});
        state.robot.direction = Direction.West;
        state.perform(Operation.Move)
        expect(state.robot.position).toEqual({x: 0, y: 1});
        state.perform(Operation.Move)
        expect(state.robot.position).toEqual({x: 0, y: 0});
    });
});
