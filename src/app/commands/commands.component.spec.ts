import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Heading, Robot } from 'src/models/robot';

import { CommandsComponent } from './commands.component';

describe('CommandsComponent', () => {
    let component: CommandsComponent;
    let fixture: ComponentFixture<CommandsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [CommandsComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CommandsComponent);
        component = fixture.componentInstance;
        component.tableSize = 5;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('test move north', () => {
        component.robot = new Robot(Heading.NORTH, 0, 0);
        expect(component.robot.x).toEqual(0);
        expect(component.robot.y).toEqual(0);
        expect(component.robot.heading).toEqual(Heading.NORTH);
        component.moveRobot();
        expect(component.robot.x).toEqual(0);
        expect(component.robot.y).toEqual(1);
        expect(component.robot.heading).toEqual(Heading.NORTH);
    });

    it('test move north edge', () => {
        component.robot = new Robot(Heading.NORTH, 0, 4);
        component.moveRobot();
        expect(component.robot.x).toEqual(0);
        expect(component.robot.y).toEqual(4);
        expect(component.robot.heading).toEqual(Heading.NORTH);
    });

    it('test move south edge', () => {
        component.robot = new Robot(Heading.SOUTH, 0, 0);
        component.moveRobot();
        expect(component.robot.x).toEqual(0);
        expect(component.robot.y).toEqual(0);
        expect(component.robot.heading).toEqual(Heading.SOUTH);
    });

    it('test move south', () => {
        component.robot = new Robot(Heading.SOUTH, 0, 4);
        component.moveRobot();
        expect(component.robot.x).toEqual(0);
        expect(component.robot.y).toEqual(3);
        expect(component.robot.heading).toEqual(Heading.SOUTH);
    });

    it('test move east', () => {
        component.robot = new Robot(Heading.EAST, 0, 0);
        component.moveRobot();
        expect(component.robot.x).toEqual(1);
        expect(component.robot.y).toEqual(0);
        expect(component.robot.heading).toEqual(Heading.EAST);
    });

    it('test move east edge', () => {
        component.robot = new Robot(Heading.EAST, 4, 0);
        component.moveRobot();
        expect(component.robot.x).toEqual(4);
        expect(component.robot.y).toEqual(0);
        expect(component.robot.heading).toEqual(Heading.EAST);
    });

    it('test move west', () => {
        component.robot = new Robot(Heading.WEST, 4, 0);
        component.moveRobot();
        expect(component.robot.x).toEqual(3);
        expect(component.robot.y).toEqual(0);
        expect(component.robot.heading).toEqual(Heading.WEST);
    });

    it('test move west edge', () => {
        component.robot = new Robot(Heading.WEST, 0, 0);
        component.moveRobot();
        expect(component.robot.x).toEqual(0);
        expect(component.robot.y).toEqual(0);
        expect(component.robot.heading).toEqual(Heading.WEST);
    });

    it('test move west edge', () => {
        component.moveRobot();
        expect(component.robot).toBeUndefined();
    });

    it('test add message', () => {
        component.addMessage('test');
        expect(component.output).toEqual('test\n');
        component.addMessage('test');
        expect(component.output).toEqual('test\ntest\n');
        component.addMessage('test\n');
        expect(component.output).toEqual('test\ntest\ntest\n\n');
    });

    it('test turn', () => {
        component.robot = new Robot(Heading.EAST, 0, 0);
        component.turnRobot(1);
        expect(component.robot.heading).toEqual(Heading.SOUTH);
        component.turnRobot(1);
        expect(component.robot.heading).toEqual(Heading.WEST);
        component.turnRobot(1);
        expect(component.robot.heading).toEqual(Heading.NORTH);
        component.turnRobot(-1);
        expect(component.robot.heading).toEqual(Heading.WEST);
        component.turnRobot(-1);
        expect(component.robot.heading).toEqual(Heading.SOUTH);
        component.turnRobot(-1);
        expect(component.robot.heading).toEqual(Heading.EAST);
        component.turnRobot(4);
        expect(component.robot.heading).toEqual(Heading.EAST);
        component.turnRobot(-4);
        expect(component.robot.heading).toEqual(Heading.EAST);
        component.turnRobot(2);
        expect(component.robot.heading).toEqual(Heading.WEST);
        component.turnRobot(-2);
        expect(component.robot.heading).toEqual(Heading.EAST);
        component.turnRobot(-8);
        expect(component.robot.heading).toEqual(Heading.EAST);
    });

    it('test runAction', () => {
        let temp = '';
        component.processCommand = (value) => {
            temp = value;
        };
        component.commands = 'some command';
        component.runCommands();
        expect(temp).toEqual('some command');
    });

    it('test process place', () => {
        component.processCommand('PLACE 0,0,NORTH');
        expect(component.robot.x).toEqual(0);
        expect(component.robot.y).toEqual(0);
        expect(component.robot.heading).toEqual(Heading.NORTH);
        component.processCommand('PLACE 4,4,SOUTH');
        expect(component.robot.x).toEqual(4);
        expect(component.robot.y).toEqual(4);
        expect(component.robot.heading).toEqual(Heading.SOUTH);
        component.processCommand('PLACE 5,4,SOUTH');

    });

    it('test process place bad', () => {
        component.processCommand('PLACE 5,4,SOUTH');
        expect(component.robot).toBeUndefined();
        component.processCommand('PLACE -1,-1,SOUTH');
        expect(component.robot).toBeUndefined();
        component.processCommand('PLACE 0,0,FOOBAR');
        expect(component.robot).toBeUndefined();
    });

    it('test process move', () => {
        component.robot = new Robot(Heading.WEST, 0, 0);
        let called = false;
        component.moveRobot = () => { called = true; };
        component.processCommand('MOVE');
        expect(called).toEqual(true);
    });

    it('test process right', () => {
        component.robot = new Robot(Heading.WEST, 0, 0);
        let turn = 0;
        component.turnRobot = (direction) => {
            turn = direction;
        };
        component.processCommand('RIGHT');
        expect(turn).toEqual(1);
    });

    it('test process left', () => {
        component.robot = new Robot(Heading.WEST, 0, 0);
        let turn = 0;
        component.turnRobot = (direction) => {
            turn = direction;
        };
        component.processCommand('LEFT');
        expect(turn).toEqual(-1);
    });

    it('test process report', () => {
        component.robot = new Robot(Heading.WEST, 0, 0);
        component.processCommand('REPORT');
        expect(component.output).toEqual('0,0,WEST\n');
    });

    it('test process bad 1', () => {
        component.processCommand(' REPORT ');
        expect(component.output).toEqual('Invalid Command:  REPORT \n');
    });

    it('test process bad 2', () => {
        component.processCommand('JUNK');
        expect(component.output).toEqual('Invalid Command: JUNK\n');
    });

});
