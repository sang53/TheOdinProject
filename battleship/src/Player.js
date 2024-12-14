export class Player {
  constructor(num, shipNum) {
    this.control = true;
    this.number = num;
    this.aliveShips = shipNum;
  }

  setBoard(board) {
    this.board = board;
  }
}
