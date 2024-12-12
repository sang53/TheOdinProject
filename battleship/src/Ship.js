export class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.orient = "horizontal";
  }

  receiveHit() {
    this.hits++;
  }

  isSunk() {
    return this.hits >= this.length;
  }

  switchOrient() {
    this.orient = this.orient === "horizontal" ? "vertical" : "horizontal";
  }
}
