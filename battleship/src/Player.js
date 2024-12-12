export class Player {
  constructor(num, control) {
    this.control = control;
    this.number = num;
  }

  setBoard(board) {
    this.board = board;
  }
}
