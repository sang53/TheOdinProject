import { Board } from "../src/Board";
import { describe, test, expect, beforeAll } from "@jest/globals";

describe("Coord and Key transformers", () => {
  test("get key from key", () => {
    expect(Board.getKeyfromId("player0-2-3")).toBe("2-3");
    expect(Board.getKeyfromId("player1-5-6")).toBe("5-6");
  });
});

let board;
const ship1 = { length: 5, orient: "horizontal" };
const ship2 = { length: 4, orient: "vertical" };
beforeAll(() => {
  board = new Board({}, new Map());
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      board.squares.set(Board.getKeyfromCoords([x, y]), "test");
    }
  }
  board.addShip("2-3", ship1);
  board.addShip("5-4", ship2);
});

describe("adds ships correctly", () => {
  test("adds horizontal ship", () => {
    expect(board.shipSquares.has("2-3")).toBeTruthy();
    expect(board.shipSquares.has("6-3")).toBeTruthy();
    expect(board.shipSquares.has("7-3")).toBeFalsy();
  });

  test("adds vertical ship", () => {
    expect(board.shipSquares.has("5-4")).toBeTruthy();
    expect(board.shipSquares.has("5-7")).toBeTruthy();
    expect(board.shipSquares.has("5-8")).toBeFalsy();
  });
});

describe("checks ships correctly", () => {
  test("checks empty spot", () => {
    expect(
      board.checkShip("1-2", {
        length: 2,
        orient: "horizontal",
      }),
    ).toBeTruthy();
  });
  test("checks taken spot", () => {
    expect(
      board.checkShip("1-3", {
        length: 2,
        orient: "horizontal",
      }),
    ).toBeFalsy();
  });
  test("checks out of bounds", () => {
    expect(
      board.checkShip("15-12", {
        length: 2,
        orient: "horizontal",
      }),
    ).toBeFalsy();
  });
});

describe("removes ships from .shipSquares", () => {
  beforeAll(() => {
    board.removeShip(ship1);
  });
  test("removes horizontal ship", () => {
    expect(board.shipSquares.has("2-3")).toBeFalsy();
    expect(board.shipSquares.has("6-3")).toBeFalsy();
    expect(board.shipSquares.has("7-3")).toBeFalsy();
  });

  test("retains other ships", () => {
    expect(board.shipSquares.has("5-4")).toBeTruthy();
    expect(board.shipSquares.has("5-7")).toBeTruthy();
  });
});
