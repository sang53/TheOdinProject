import { setCustomRules } from "../src/gameLogic";
import { describe, test, expect } from "@jest/globals";

describe("sets custom rules", () => {
  test("sets first player", () => {
    expect(
      setCustomRules({
        sides: 5.2,
        ships: 7,
        player: false,
        single: true,
      })[0],
    ).toMatchObject({ number: 0, control: true });
  });
  test("sets second player", () => {
    expect(
      setCustomRules({
        sides: 5.2,
        ships: 7,
        player: false,
        single: true,
      })[1],
    ).toMatchObject({ number: 1, control: false });
  });
});
