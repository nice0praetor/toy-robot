import { GameState, Command } from '../src/lib/state';
import { Direction } from '../src/lib/table';

describe('place command', () => {
    test('does not initialise robot with invalid cords', () => {
        const state = new GameState();
        state.perform(Command.Place, {x: -1, y: -1}, Direction.East)
        expect(state.robot).toBeUndefined();
    });

    test('initialises robot with correct direction and coordinates', () => {
        const state = new GameState();
        state.perform(Command.Place, {x: 0, y: 0}, Direction.East)
        expect(state.robot.direction).toEqual(Direction.East);
        expect(state.robot.position).toEqual({x: 0, y: 0});
    });

    test('does not update robot position with invalid coordinates', () => {
        const state = new GameState();
        const initialRobotState = {direction: Direction.East, position: {x: 0, y: 0}};
        state.robot = initialRobotState;
        state.perform(Command.Place, {x: -1, y: -1}, Direction.East)
        expect(state.robot).toEqual(initialRobotState);
    });

    test('updates robot position with valid coordinates', () => {
        const state = new GameState();
        state.robot = {direction: Direction.East, position: {x: 0, y: 0}};
        state.perform(Command.Place, {x: 2, y: 2}, Direction.East)
        expect(state.robot).toEqual({direction: Direction.East, position: {x: 2, y: 2}});
    });
});
