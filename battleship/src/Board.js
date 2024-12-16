import { makeElement } from "./DOM";
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
    this.sides = sides;
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

  static getKey([x, y]) {
    return `${x}-${y}`;
  }

  static getCoords(key) {
    return key.split("-");
  }

  static #attachSquares(boardRef, squaresMap) {
    squaresMap.forEach((square) => {
      boardRef.appendChild(square);
    });
  }
}
