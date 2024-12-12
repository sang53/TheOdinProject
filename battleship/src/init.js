import { makeElement, getSquareId, addToMain } from "./DOMOutput";
import { Board } from "./Board";

export function getControllers() {
  const controllers = {};
  const controlContainer = document.querySelector("#control-container");
  const instructions = controlContainer.querySelector("#instructions");
  const controlButton = controlContainer.querySelector("#control-button");
  controllers.container = controlContainer;
  controllers.instructions = instructions;
  controllers.button = controlButton;
  return controllers;
}

export function buildBoard(playerIdx, sides) {
  const board = makeElement("div", [["class", "board"]]);
  const squaresMap = new Map();

  for (let y = 0; y < sides; y++) {
    for (let x = 0; x < sides; x++) {
      const square = makeElement("div", [
        ["class", "square"],
        ["id", getSquareId(playerIdx, x, y)],
      ]);
      board.appendChild(square);
      squaresMap.set(`${x}-${y}`, square);
    }
  }
  addToMain(board);

  return new Board(board, squaresMap);
}
