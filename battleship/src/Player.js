import { Board } from "../old-src/Board";

export class Player {
  constructor(num, human, sides, ships) {
    this.num = num;
    this.human = human;
    this.boardRef = new Board(sides, ships);
  }
}
