import { sides, ships } from "./gameLogic";
import {
  updateController,
  makeElement,
  addToMain,
  toggleControlButton,
} from "./DOMOutput";
import { buildBoard } from "./init";

let currentShip;
let currentBoard;
let hangarShips;
let placedShips;
let hangar;

export function setupShipSelect(player) {
  updateController("Place Your Ships!", "Done");
  toggleControlButton();

  assignBoard(player);
  hangar = getHangar();
  hangarShips = getShips();

  currentBoard.addEventListener("click", selectSquare);
}

function assignBoard(player) {
  currentBoard = buildBoard(player.number, sides);
  player.setBoard(currentBoard);
}

function getHangar() {
  const container = makeElement("div", [["class", "ship-container"]]);
  container.addEventListener("click", selectShip);
  addToMain(container);
  return container;
}

function getShips() {
  const shipsArray = [];
  for (let i = 1; i <= ships; i++) {
    const ship = buildShip(i);
    ship.addEventListener("click", selectShip);
    shipsArray.push(ship);
  }
  return shipsArray;
}

function selectShip(event) {
  event.currentTarget.classList.toggle("selected");
  if (event.currentTarget === currentShip) {
    currentShip = null;
    return;
  }
  if (currentShip) currentShip.classList.toggle("selected");
  currentShip = event.currentTarget;
}

function selectSquare(event) {
  if (!currentShip) return;

  if (!currentBoard.checkShip(event.target.id, currentShip)) {
    currentShip = null;
    return;
  }
}

function buildShip(length) {
  const ship = makeElement("div", [
    ["class", "ship"],
    ["id", `ship-${length}`],
  ]);
  for (let i = 0; i < length; i++) {
    ship.appendChild(makeElement("div", [["class", "square"]]));
  }
  return ship;
}
