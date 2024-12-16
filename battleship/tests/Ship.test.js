import { Ship } from "../src/Ship";

describe("makes ships", () => {
  let shipArray;
  beforeAll(() => {
    shipArray = Ship.makeShips(5);
  });

  test("makes correct number of ships", () => {
    expect(shipArray.length).toBe(5);
  });

  test("each ship has a DOM element reference", () => {
    expect(shipArray[0].shipRef).not.toBeUndefined();
  });
});
