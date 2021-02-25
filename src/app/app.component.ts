import { Component } from '@angular/core';
import { Robot } from 'src/models/robot';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    tableSize = 5;
    robot: Robot;

    setRobot(robot: Robot): void {
        /**
         * Updates the robot locally so it can be shared with other children (the table display)
         */
        this.robot = robot;
    }
}
