import { randomShipPlace } from "./cpu";
import {
  addListener,
  addToMain,
  afterSwitch,
  makeElement,
  removeListeners,
  resetDOM,
  toggleClass,
  toggleTurn,
  appendRelative,
} from "./DOM";
import { settings } from "./gameSettings";
import { shotSelect } from "./shot-select";

let currTurn = 0;
let players;
let board;

let currShipRef;
let lastPlaced;
let shipByRef;

export function shipPlace(playersArr) {
  players = playersArr || players;
  board = players[currTurn].board;

  if (players[currTurn].cpu) {
    randomShipPlace(board);
    afterSwitch(shotSelect, 0, players);
    return;
  }

  toggleClass(document.querySelector("#main"), "ship-select");
  addToMain(makeElement("h1", [], "Place Your Ships"));

  addToMain(board.boardRef);
  addListener(board.boardRef, "click", selectSquare);

  addToMain(getHangar(returnShip, rotateShips, confirmShips));
  addShipsHangar(board.aliveShips, selectShip);

  lastPlaced = new Map();
  shipByRef = getShipMap(board.aliveShips);
}

function getHangar(returnShip, rotateShip, confirmShips) {
  const hangar = makeElement("div", [["class", "ship-container"]]);
  addListener(hangar, "click", returnShip);

  hangar.appendChild(getRotateBtn(rotateShip));
  hangar.appendChild(getConfirmBtn(confirmShips));
  return hangar;
}

function getRotateBtn(rotateShip) {
  const rotateButton = makeElement(
    "button",
    [["id", "rotate-button"]],
    "Rotate Ship",
  );
  addListener(rotateButton, "click", rotateShip);
  return rotateButton;
}

function getConfirmBtn(confirmShips) {
  const confirmButton = makeElement(
    "button",
    [
      ["id", "confirm-button"],
      ["disabled", "true"],
    ],
    "Confirm Placement",
  );
  addListener(confirmButton, "click", confirmShips, true);
  return confirmButton;
}

function addShipsHangar(ships, selectShip) {
  ships.forEach((shipObj) => {
    addListener(shipObj.shipRef, "click", selectShip);
    appendShipHangar(shipObj.shipRef);
  });
}

function appendShipHangar(shipRef) {
  const hangar = document.querySelector(".ship-container");
  appendRelative(shipRef, hangar.lastElementChild);
}

function getShipMap(shipSet) {
  const shipMap = new Map();
  shipSet.forEach((shipObj) => shipMap.set(shipObj.shipRef, shipObj));
  return shipMap;
}

function selectShip(event) {
  event.stopPropagation();

  deselect(currShipRef);
  // case: click selected ship => deselect only
  if (event.currentTarget === currShipRef) return (currShipRef = null);

  currShipRef = event.currentTarget;
  toggleClass(currShipRef, "selected");

  // case: select placed ship => remove ship from board to allow movement to adj squares
  if (lastPlaced.has(currShipRef)) board.removeShip(shipByRef.get(currShipRef));

  toggleConfirmBtn(false);
}

function deselect(shipRef) {
  if (!shipRef) return;

  toggleClass(shipRef, "selected");

  // case: ship was placed prior to selection => return ship to previous location
  if (lastPlaced.has(shipRef))
    board.addShip(shipByRef.get(shipRef), lastPlaced.get(shipRef));
}

function selectSquare(event) {
  if (event.target === board.boardRef) return;
  if (!currShipRef) return;

  const shipObj = shipByRef.get(currShipRef);
  const key = event.target.id;
  if (board.checkSquare(shipObj, key))
    placeShip(shipObj, key, event.target, lastPlaced);

  deselect(currShipRef);
  currShipRef = null;

  // allow confirm if all ships placed
  toggleConfirmBtn(lastPlaced.size === settings.ships);
}

function placeShip(shipObj, key, square, lastPlaced) {
  const shipRef = shipObj.shipRef;
  if (!lastPlaced.has(shipRef)) toggleClass(shipRef, "placed");
  lastPlaced.set(shipRef, key);
  square.appendChild(shipRef);
}

function returnShip() {
  if (!currShipRef) return;
  if (!lastPlaced.has(currShipRef)) return;

  lastPlaced.delete(currShipRef);
  resetShip(currShipRef);

  // rotate ship to match hangar ships
  const className = getUnplacedShips(lastPlaced, board)[0].shipRef.className;
  if (currShipRef.className !== className) rotate(shipByRef.get(currShipRef));

  deselect(currShipRef);
  currShipRef = null;
  toggleConfirmBtn(false);
}

function toggleConfirmBtn(bool) {
  document.querySelector("#confirm-button").disabled = !bool;
}

function resetShip(currShip) {
  appendShipHangar(currShip);
  toggleClass(currShip, "placed");
}

function getUnplacedShips(placedMap, board) {
  const shipArray = [];
  board.aliveShips.forEach((shipObj) => {
    if (!placedMap.has(shipObj.shipRef)) shipArray.push(shipObj);
  });
  return shipArray;
}

function rotateShips(event) {
  event.stopPropagation();

  const ships = getUnplacedShips(lastPlaced, board);
  ships.forEach((shipObj) => rotate(shipObj));
}

function rotate(shipObj) {
  toggleClass(shipObj.shipRef, "rotated");
  shipObj.switchOrient();
}

function confirmShips(event) {
  event.stopPropagation();

  // remove all elements from #main
  removeListeners();
  resetDOM();

  // reset variables for gc
  currShipRef = null;
  shipByRef = null;
  lastPlaced = null;

  currTurn = toggleTurn(currTurn);
  if (currTurn === 1 && players[1].cpu) shipPlace();
  else if (currTurn === 1) afterSwitch(shipPlace, 1);
  else {
    toggleClass(document.querySelector("#main"), "ship-select");
    afterSwitch(shotSelect, 0, players);
  }
}
