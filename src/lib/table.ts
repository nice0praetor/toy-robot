export class Table {
    width: number;
    height: number;

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
