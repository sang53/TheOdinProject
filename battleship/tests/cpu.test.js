import { randomShipPlace } from "../src/cpu";
import { Board } from "../src/Board";
import { beforeAll, describe, expect, test } from "@jest/globals";

let board;

beforeAll(() => {
  board = new Board();
  randomShipPlace(board);
});

describe("places ships randomly on board", () => {
  test("number of ship squares placed", () => {
    expect(board.shipSquares.size).toBe(15);
  });
  test("every ship placed", () => {
    const shipSet = new Set();
    board.shipSquares.forEach(([ship]) => shipSet.add(ship));
    expect(shipSet.size).toBe(5);
  });
  test("ship randomly switches orientation", () => {
    let vertical = false;
    board.shipSquares.forEach(([ship]) => {
      if (ship.orient === "vertical") vertical = true;
    });
    expect(vertical).toBeTruthy();
  });
});
