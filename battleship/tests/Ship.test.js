import { Ship } from "../src/Ship";
import { describe, test, expect, beforeAll } from "@jest/globals";

describe("makes ships", () => {
  let shipSet;
  beforeAll(() => {
    shipSet = Ship.makeShips(5);
  });

  test("makes correct number of ships", () => {
    expect(shipSet.size).toBe(5);
  });

  test("each ship has a DOM element reference", () => {
    expect(shipSet.keys().next().value.shipRef).toBeDefined();
  });
});
