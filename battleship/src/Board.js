import { makeElement, toggleClass } from "./DOM";
import { settings } from "./gameSettings";
import { Ship } from "./Ship";

export class Board {
  constructor(sides = settings.sides) {
    this.boardRef = Board.#makeBoard();
    this.squares = Board.#makeSquares(sides);
    Board.#attachSquares(this.boardRef, this.squares);

    this.aliveShips = Ship.makeShips();
    this.deadShips = new Set();

    this.shotSquares = new Set();
    this.shipSquares = new Map();
  }

  #getSquares(key, length, orient) {
    let [x, y] = Board.getCoords(key);
    const keysArray = [];

    if (orient === "horizontal") {
      const x_max = x + length;
      if (x_max > settings.sides) return [];
      for (; x < x_max; x++) keysArray.push(Board.getKey([x, y]));
    } else {
      const y_max = y + length;
      if (y_max > settings.sides) return [];
      for (; y < y_max; y++) keysArray.push(Board.getKey([x, y]));
    }
    return keysArray;
  }

  checkSquare(shipObj, key) {
    const squares = this.#getSquares(key, shipObj.length, shipObj.orient);
    if (!squares.length) return false;
    for (const key of squares) if (this.shipSquares.has(key)) return false;
    return true;
  }

  addShip(shipObj, key) {
    const keysArray = this.#getSquares(key, shipObj.length, shipObj.orient);
    keysArray.forEach((key, i) => {
      this.shipSquares.set(key, [shipObj, i]);
    });
  }

  removeShip(shipObj) {
    this.shipSquares.forEach(([ship], key) => {
      if (ship === shipObj) this.shipSquares.delete(key);
    });
  }

  receiveShot(key) {
    this.shotSquares.add(key);
    if (!this.shipSquares.has(key)) toggleClass(this.squares.get(key), "shot");
    else {
      const [ship, i] = this.shipSquares.get(key);
      if (ship.receiveHit(i)) {
        this.aliveShips.delete(ship);
        this.deadShips.add(ship);
      }
      toggleClass(this.squares.get(key), "hit");
    }
    return this.shipSquares.has(key);
  }

  static getKey([x, y]) {
    return `${x}-${y}`;
  }

  static getCoords(key) {
    return key.split("-").map((coord) => +coord);
  }

  static #makeBoard() {
    return makeElement("div", [["class", "board"]]);
  }

  static #makeSquares(sides) {
    const squaresMap = new Map();
    for (let y = 0; y < sides; y++) {
      for (let x = 0; x < sides; x++) {
        const key = Board.getKey([x, y]);
        const square = makeElement("div", [
          ["class", "square"],
          ["id", key],
        ]);
        squaresMap.set(key, square);
      }
    }
    return squaresMap;
  }

  static #attachSquares(boardRef, squaresMap) {
    squaresMap.forEach((square) => {
      boardRef.appendChild(square);
    });
  }
}
