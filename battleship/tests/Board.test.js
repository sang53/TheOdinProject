import { Board } from "../src/Board";
import { describe, test, expect, beforeAll } from "@jest/globals";
import { Ship } from "../src/Ship";

let board;

beforeAll(() => {
  board = new Board(10, 5);
});

describe("test squares map", () => {
  test("squares map", () => {
    expect(board.squares).toBeDefined();
  });
  test("number of squares", () => {
    expect(board.squares.size).toBe(100);
  });
  test("key value pair", () => {
    expect(board.squares.get("5-5")).toBeDefined();
  });
});

describe("test ships", () => {
  test("alive ships set", () => {
    expect(board.aliveShips).toBeDefined;
  });
  test("number of ships", () => {
    expect(board.aliveShips.size).toBe(5);
  });
  test("ship exists", () => {
    expect(board.aliveShips.keys().next().value).toBeDefined();
  });
  test("ship is a ship", () => {
    expect(board.aliveShips.keys().next().value).toBeInstanceOf(Ship);
  });
});
