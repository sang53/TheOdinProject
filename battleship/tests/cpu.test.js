import { Board } from "../src/Board";
import { cpuShips } from "../src/cpu";
import { describe, test, expect, beforeAll } from "@jest/globals";

let board;

describe("adds ships to random squares", () => {
  beforeAll(() => {
    board = new Board(null, new Map());
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        board.squares.set(Board.getKeyfromCoords([x, y]), "test");
      }
    }
    cpuShips(board, 5, 10);
  });
  test("correct number of ships", () => {
    expect(board.shipSquares.size).toBe(15);
  });
});
