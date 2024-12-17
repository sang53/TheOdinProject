import { Board } from "./Board";

export class Player {
  constructor(num, human) {
    this.num = num;
    this.human = human;
    this.boardObj = new Board();
  }
}
