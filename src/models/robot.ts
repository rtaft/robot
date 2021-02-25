export enum Heading {
    NORTH = 'NORTH',
    EAST = 'EAST',
    SOUTH = 'SOUTH',
    WEST = 'WEST'
}

export class Robot {
    constructor(heading: Heading, x: number, y: number) {
        this.heading = heading;
        this.x = x;
        this.y = y;
    }
    heading: Heading;
    x: number;
    y: number;
}
