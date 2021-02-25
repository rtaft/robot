import { AfterViewChecked, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Robot, Heading } from 'src/models/robot';

@Component({
    selector: 'app-commands',
    templateUrl: './commands.component.html',
    styleUrls: ['./commands.component.scss']
})
export class CommandsComponent implements AfterViewChecked {
    /**
     * Renders and processes the commands and outputs any results.
     */
    @Input() tableSize: number;
    @Output() setRobot = new EventEmitter<Robot>();
    @ViewChild('scrollwindow') private scrollwindow: ElementRef;
    output = '';
    robot: Robot;
    headings = Object.values(Heading);
    commands = '';
    commandList: string[] = [];
    waitTime = 500;

    constructor() {}

    ngAfterViewChecked(): void {
        /**
         * Ensures the output window is always scrolled to the bottom.
         */
        this.scrollwindow.nativeElement.scrollTop = this.scrollwindow.nativeElement.scrollHeight;
    }

    addMessage(message: string): void {
        /**
         * Adds a message to the output.
         */
        this.output += message + '\n';
    }

    moveRobot(): void {
        /**
         * Moves the robot forward in the direction it is facing.
         * If the robot is at the edge of the table, it does not move.
         * If there is no robot, it does nothing.
         */
        if (this.robot) {
            if (this.robot.heading === Heading.NORTH) {
                this.robot.y = Math.min(this.robot.y + 1, this.tableSize - 1);
            } else if (this.robot.heading === Heading.SOUTH) {
                this.robot.y = Math.max(this.robot.y - 1, 0);
            } else if (this.robot.heading === Heading.EAST) {
                this.robot.x = Math.min(this.robot.x + 1, this.tableSize - 1);
            } else if (this.robot.heading === Heading.WEST) {
                this.robot.x = Math.max(this.robot.x - 1, 0);
            }
        }
    }

    turnRobot(direction: number): void {
        /**
         * Turns the robot X number of 90 degree turns.  Positive is clockwise (right), negative is counter clockwise (left)
         */
        this.robot.heading = this.headings[(this.headings.indexOf(this.robot.heading) + (direction % 4) + 4) % 4];
    }

    runCommands(): void {
        /**
         * Clears the output and starts processing the commands.
         */
        this.output = '';
        this.commandList = this.commands.split('\n');
        this.nextCommand();
    }

    nextCommand(): void {
        /**
         * Runs the next command in the list.
         * If there are more commands, it schedules the next command half a second from when it was called.
         */
        this.processCommand(this.commandList.shift());
        if (this.commandList.length > 0) {
            setTimeout(() => { this.nextCommand(); }, this.waitTime);
        }
    }

    processCommand(command: string): void {
        /**
         * Takes a single command string and processes it if it is valid.
         */
        const placeCommand = /PLACE (\d+),(\d+),(NORTH|EAST|SOUTH|WEST)/mg;
        const match = placeCommand.exec(command);
        if (match) {
            const x = parseInt(match[1], 10);
            const y = parseInt(match[2], 10);
            if (x < 0 || x >= this.tableSize || y < 0 || y >= this.tableSize) {
                this.addMessage('Invalid Location: ' + command);
            } else {
                this.robot = new Robot(Heading[match[3]], x, y);
                this.setRobot.emit(this.robot);
            }
        } else if (command === 'MOVE') {
            this.moveRobot();
        } else if (command === 'LEFT') {
            this.turnRobot(-1);
        } else if (command === 'RIGHT') {
            this.turnRobot(1);
        } else if (command === 'REPORT') {
            this.addMessage(this.robot.x + ',' + this.robot.y + ',' + this.robot.heading);
        } else if (command.trim() !== '') {
            this.addMessage('Invalid Command: ' + command);
        }
    }
}
