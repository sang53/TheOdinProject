import { Board } from "./Board";

export class Player {
  constructor(num, cpu) {
    this.num = num;
    this.cpu = cpu;
    this.boardObj = new Board();
  }
}
