export class Ship {
  constructor(length, shipRef) {
    this.length = length;
    this.hits = 0;
    this.orient = "horizontal";
    this.shipRef = shipRef;
    this.squares = [];
    this.boardSquares = new Map();
  }

  // return true if shot has sunk ship
  receiveHit() {
    return ++this.hits === this.length;
  }

  switchOrient() {
    this.orient = this.orient === "horizontal" ? "vertical" : "horizontal";
  }

  isSunk() {
    return this.hits === this.length;
  }
}
