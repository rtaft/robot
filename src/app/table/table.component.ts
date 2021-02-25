import { Component, Input } from '@angular/core';
import { faRobot } from '@fortawesome/free-solid-svg-icons';

import { Heading, Robot } from 'src/models/robot';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent {
    /**
     * Renders the table top with the robot on it.
     */
    @Input() tableSize: number;
    @Input() robot: Robot;
    faRobot = faRobot;

    constructor() {}

    getRobotClass(): string {
        /**
         * Returns the class for the robot dynamicly based on heading.
         */
        if (this.robot.heading === Heading.EAST) {
            return 'robot fa-4x fa-rotate-270';
        }
        if (this.robot.heading === Heading.NORTH) {
            return 'robot fa-4x fa-rotate-180';
        }
        if (this.robot.heading === Heading.WEST) {
            return 'robot fa-4x fa-rotate-90';
        }
        return 'robot fa-4x';
    }
}
