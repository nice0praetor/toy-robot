import { Table } from '../src/lib/Table';

describe('bounds check', () => {
    test('fails with negative coordinates', () => {
        const table = new Table(5, 5);
        expect(table.withinBounds({x: -1, y: -1})).toBeFalsy();
        expect(table.withinBounds({x: 1, y: -1})).toBeFalsy();
        expect(table.withinBounds({x: -1, y: 1})).toBeFalsy();
    });

    test('fails with coordinates above max dimensions', () => {
        const table = new Table(5, 5);
        expect(table.withinBounds({x: 6, y: 6})).toBeFalsy();
        expect(table.withinBounds({x: 1, y: 6})).toBeFalsy();
        expect(table.withinBounds({x: 6, y: 1})).toBeFalsy();
    });

    test('passes with coordinates within dimensions', () => {
        const table = new Table(5, 5);
        expect(table.withinBounds({x: 0, y: 0})).toBeTruthy();
        expect(table.withinBounds({x: 4, y: 4})).toBeTruthy();
        expect(table.withinBounds({x: 1, y: 3})).toBeTruthy();
    });
});
