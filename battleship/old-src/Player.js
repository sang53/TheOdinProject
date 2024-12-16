import { Board } from "./Board";

export class Player {
  constructor(num, shipNum) {
    this.control = true;
    this.number = num;
    this.aliveShips = shipNum;
  }

  makeBoard() {
    this.boardObj = new Board();
  }
}
