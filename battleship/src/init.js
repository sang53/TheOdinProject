import { makeElement } from "./DOMOutput";
import { Board } from "./Board";

export function makeControllers() {
  const controlContainer = makeElement("div", [
    ["id", "control-container"],
    ["class", "box flex-column"],
  ]);

  const instructions = makeElement(
    "div",
    [["id", "instructions"]],
    "Welcome To BattleShip!",
  );
  controlContainer.appendChild(instructions);

  const controlButton = makeElement(
    "button",
    [["id", "control-button"]],
    "Start",
  );
  controlContainer.appendChild(controlButton);

  return {
    container: controlContainer,
    instructions: instructions,
    button: controlButton,
  };
}

export function makeBoard(playerIdx, sides) {
  const board = makeElement("div", [["class", "board hidden"]]);
  const squaresMap = new Map();

  for (let y = 0; y < sides; y++) {
    for (let x = 0; x < sides; x++) {
      const square = makeElement("div", [
        ["class", "square"],
        ["id", Board.getSquareId(playerIdx, x, y)],
      ]);
      board.appendChild(square);
      squaresMap.set(`${x}-${y}`, square);
    }
  }
  return new Board(board, squaresMap);
}
