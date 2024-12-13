export class Player {
  constructor(num) {
    this.control = true;
    this.number = num;
  }

  setBoard(board) {
    this.board = board;
  }
}
