export class Board {
  constructor(board, squaresMap) {
    this.shotSquares = new Set();
    this.shipSquares = new Map();
    this.boardRef = board;
    this.squares = squaresMap;
  }

  checkShip(squareId, ship) {
    const keysArray = this.#getShipKeys(squareId, ship);
    for (const key of keysArray) {
      if (this.shipSquares.has(key)) return false;
    }
    return true;
  }

  addShip(squareId, ship) {
    const keysArray = this.#getShipKeys(squareId, ship);
    keysArray.forEach((key) => this.shipSquares.set(key, ship));
  }

  #getShipKeys(squareId, ship) {
    const key = Board.getKeyfromId(squareId);
    let [x, y] = Board.getCoords(key);
    const keysArray = [];
    if (ship.orient === "horizontal") {
      const x_max = x + ship.length;
      for (; x < x_max; x++) {
        keysArray.push(Board.getKeyfromCoords([x, y]));
      }
    } else {
      const y_max = y + ship.length;
      for (; y < y_max; y++) {
        keysArray.push(Board.getKeyfromCoords([x, y]));
      }
    }
    return keysArray;
  }

  removeShip(ship) {
    this.shipSquares.forEach((value, key) => {
      if (value === ship) this.shipSquares.delete(key);
    });
  }

  checkShot(key) {
    if (this.shotSquares.has(key)) return false;
    return true;
  }

  receiveShot(key) {
    this.shotSquares.add(key);
    if (!this.shipSquares.has(key)) return false;
    this.shipSquares.get(key).receiveShot();
    return true;
  }

  static getKeyfromCoords([x, y]) {
    return `${x}-${y}`;
  }

  static getCoords(key) {
    return key.split("-").map((element) => +element);
  }

  static getKeyfromId(squareId) {
    return squareId.slice(8);
  }
}
