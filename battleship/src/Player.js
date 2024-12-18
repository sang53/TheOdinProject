import { Board } from "./Board";

export class Player {
  constructor(num, cpu) {
    this.num = num;
    this.cpu = cpu;
    this.board = new Board();
  }
}
