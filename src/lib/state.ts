import { Table, Robot } from './table'

export enum Command {
    Place,
    Move,
    Left,
    Right,
    Report
}

export class GameState {
   table = new Table(5,5);
   robot: Robot;

   perform(command: Command) {
       switch (command) {
           case Command.Place: {break}
           case Command.Move: {break}
           case Command.Left: {break}
           case Command.Right: {break}
           case Command.Report: {break}
       }
   }
}
