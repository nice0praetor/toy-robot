export class Table {
    private width: number;
    private height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    public withinBounds(coordinate: Coordinate) {
        return -1 < coordinate.x &&
            coordinate.x < this.height &&
            -1 < coordinate.y &&
            coordinate.y < this.width;
    }
}

export type Coordinate = {x: number, y: number}
export enum Direction {North = 1, South = 2, East = 3, West = 4}

export type Robot = {
    position: Coordinate
    direction: Direction
}
