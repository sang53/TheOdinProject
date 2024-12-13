import { Board } from "../src/Board";
import { cpuShips } from "../src/cpu";
import { describe, test, expect, beforeAll } from "@jest/globals";

let board;

describe("adds ships to random squares", () => {
  beforeAll(() => {
    board = new Board(null, null);
    cpuShips(board, 5, 10);
  });
  test("correct number of ships", () => {
    expect(board.shipSquares.size).toBe(15);
  });
});
