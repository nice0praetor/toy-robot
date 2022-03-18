export class Table {
    private width: number;
    private height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    public withinBounds(x: number, y: number) {
        return -1 < x &&
            x < this.height &&
            -1 < y &&
            y < this.width;
    }
}

export type Coordinate = {x: number, y: number}
export enum Direction {North = 1, South = 2, East = 3, West = 4}

export type Robot = {
    position: Coordinate
    direction: Direction
}
