import { Table } from '../src/lib/Table';

describe('bounds check', () => {
    test('fails with negative coordinates', () => {
        const table = new Table(5, 5);
        expect(table.withinBounds(-1, -1)).toBeFalsy();
        expect(table.withinBounds(1, -1)).toBeFalsy();
        expect(table.withinBounds(-1, 1)).toBeFalsy();
    });

    test('fails with coordinates above max dimensions', () => {
        const table = new Table(5, 5);
        expect(table.withinBounds(6, 6)).toBeFalsy();
        expect(table.withinBounds(1, 6)).toBeFalsy();
        expect(table.withinBounds(6, 1)).toBeFalsy();
    });

    test('passes with coordinates within dimensions', () => {
        const table = new Table(5, 5);
        expect(table.withinBounds(0, 0)).toBeTruthy();
        expect(table.withinBounds(4, 4)).toBeTruthy();
        expect(table.withinBounds(1, 3)).toBeTruthy();
    });
});
