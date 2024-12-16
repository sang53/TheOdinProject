export class Board {
  constructor(board, squaresMap) {
    this.shotSquares = new Set();
    this.shipSquares = new Map();
    this.boardRef = board;
    this.squares = squaresMap;
    this.ships = [];
  }

  // returns true if ship can be placed at key
  checkShip(startKey, ship) {
    const keysArray = this.#getShipKeys(startKey, ship);
    // case: out of bounds
    if (keysArray.length !== ship.length) return false;

    for (const key of keysArray) {
      if (this.shipSquares.has(key)) return false;
    }
    return true;
  }

  addShip(startKey, ship) {
    const keysArray = this.#getShipKeys(startKey, ship);
    keysArray.forEach((key, i) => {
      this.shipSquares.set(key, ship);
      ship.boardSquares.set(key, ship.squares[i]);
    });
  }

  #getShipKeys(key, ship) {
    let [x, y] = Board.getCoords(key);
    const keysArray = [];
    if (ship.orient === "horizontal") {
      const x_max = x + ship.length;
      for (; x < x_max; x++) {
        const key = Board.getKeyfromCoords([x, y]);
        if (!this.squares.has(key)) return keysArray;
        keysArray.push(key);
      }
    } else {
      const y_max = y + ship.length;
      for (; y < y_max; y++) {
        const key = Board.getKeyfromCoords([x, y]);
        if (!this.squares.has(key)) return keysArray;
        keysArray.push(key);
      }
    }
    return keysArray;
  }

  removeShip(ship) {
    ship.boardSquares.forEach((_, key) => {
      this.shipSquares.delete(key);
      ship.boardSquares.delete(key);
    });
  }

  checkShot(key) {
    return !this.shotSquares.has(key);
  }

  // return shipObj if hit
  receiveShot(key) {
    this.shotSquares.add(key);

    if (!this.shipSquares.has(key)) return null;
    return this.shipSquares.get(key);
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

  static getSquareId(playerIdx, x, y) {
    return `player${playerIdx}-${x}-${y}`;
  }
}
