/** Table class encapsulates coordinate space and bounds checking */
export class Table {
    private width: number;
    private height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    /** Tests provided coordinates against the table's bounds
     * @returns boolean true if within bounds false if outside
     * */
    public withinBounds(coordinate: Coordinate) {
        return -1 < coordinate.x &&
            coordinate.x < this.height &&
            -1 < coordinate.y &&
            coordinate.y < this.width;
    }
}

export type Coordinate = {x: number, y: number}

// Direction enum with value ordered in 90degree increments
// This allows for easy rotation. NORTH (0) + 1 = 1 EAST
export enum Direction {NORTH = 0, EAST = 1, SOUTH = 2, WEST = 3}

/**
 * Rotate the Direction by 90 * the increment provided.
 * Increment of 1 will rotate right, -1 will rotate left.
 **/
export const rotateDirection90 = ((direction: Direction, increment: number): Direction  => {
    // DIRECTION enum is ordered in 90 degree increments
    // adding or subtracting 1 is the same as rotating
    // 90 or -90 degree respectively.
    // Modulo is used here to wrap around.
    return (direction + increment + 4) % 4
});

export type Robot = {
    position: Coordinate
    direction: Direction
}
