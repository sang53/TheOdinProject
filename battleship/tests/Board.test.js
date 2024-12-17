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

describe("add ships to board", () => {
  beforeAll(() => {
    board.addShip({ length: 5, orient: "horizontal" }, "0-0");
    board.addShip({ length: 4, orient: "vertical" }, "9-6");
  });

  test("add horizontal ship", () => {
    for (let x = 0; x < 5; x++) {
      expect(board.shipSquares.has(Board.getKey([x, 0]))).toBeTruthy();
    }
    expect(board.shipSquares.has(Board.getKey([5, 0]))).toBeFalsy();
  });
  test("add vertical ship", () => {
    for (let y = 6; y < 10; y++) {
      expect(board.shipSquares.has(Board.getKey([9, y]))).toBeTruthy();
    }
    expect(board.shipSquares.has(Board.getKey[(9, 5)])).toBeFalsy();
  });
});

describe("checks if ship can be placed", () => {
  test("available spot", () => {
    expect(
      board.checkSquare({ length: 3, orient: "horizontal" }, "2-3"),
    ).toBeTruthy();
    expect(
      board.checkSquare({ length: 5, orient: "vertical" }, "5-2"),
    ).toBeTruthy();
  });

  test("unavailable spot", () => {
    expect(
      board.checkSquare({ length: 3, orient: "horizontal" }, "7-9"),
    ).toBeFalsy();
    expect(
      board.checkSquare({ length: 4, orient: "vertical" }, "0-0"),
    ).toBeFalsy();
  });

  test("out of bounds", () => {
    expect(
      board.checkSquare({ length: 3, orient: "horizontal" }, "9-9"),
    ).toBeFalsy();
    expect(
      board.checkSquare({ length: 5, orient: "vertical" }, "5-7"),
    ).toBeFalsy();
  });
});

describe("removes ship", () => {
  beforeAll(() => {
    const hShip = board.shipSquares.get("0-0")[0];
    board.removeShip(hShip);
    const vShip = board.shipSquares.get("9-6")[0];
    board.removeShip(vShip);
  });
  test("remove horizontal ship", () => {
    for (let x = 0; x < 5; x++) {
      expect(board.shipSquares.has(Board.getKey([x, 0]))).toBeFalsy();
    }
    expect(board.shipSquares.has(Board.getKey([5, 0]))).toBeFalsy();
  });
  test("remove vertical ship", () => {
    for (let y = 6; y < 10; y++) {
      expect(board.shipSquares.has(Board.getKey([9, y]))).toBeFalsy();
    }
    expect(board.shipSquares.has(Board.getKey[(9, 5)])).toBeFalsy();
  });
});
