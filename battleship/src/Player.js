import { Board } from "../old-src/Board";

export class Player {
  constructor(num, human) {
    this.num = num;
    this.human = human;
    this.boardRef = new Board();
  }
}
