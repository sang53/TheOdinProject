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
    keysArray.forEach((key) => this.shipSquares.set(key, ship));

    ship.startKey = startKey;
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
        if (!this.squares.has(key)) return keysArray;
        keysArray.push(Board.getKeyfromCoords([x, y]));
      }
    }
    return keysArray;
  }

  removeShip(ship) {
    this.shipSquares.forEach((value, key) => {
      if (value === ship) {
        this.shipSquares.delete(key);
      }
    });
  }

  checkShot(key) {
    if (this.shotSquares.has(key)) return false;
    return true;
  }

  receiveShot(key) {
    this.shotSquares.add(key);
    if (!this.shipSquares.has(key)) return null;
    const shipObj = this.shipSquares.get(key);
    shipObj.receiveHit();
    return shipObj;
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
