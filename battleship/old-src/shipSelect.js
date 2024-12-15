import { toggleControlButton } from ".";
import { Board } from "./Board";
import { makeElement, addToMain, toggleClass } from "./DOMOutput";
import { Ship } from "./Ship";

let currBoardObj;
let hangarRef;

let currShipRef;
let hangarShipIds;
let lastPlaced;
let shipObjFromId;

// move ship creation to init??
// change to store ship placement in shipsquares map => board.shipSquares = shipsquares
// would make it easier to add cpu ships for player to see at end of game

export function setupShipSelect(board, numShips) {
  // initialise helper data structures
  hangarShipIds = new Set();
  lastPlaced = new Map();

  // set up hangar & attach to DOM
  hangarRef = makeHangar();
  addToMain(hangarRef);
  hangarRef.addEventListener("click", returnShip);

  currBoardObj = board;
  toggleClass(currBoardObj.boardRef, "hidden");
  currBoardObj.boardRef.addEventListener("click", selectSquare);

  // set up ships & attach to DOM && add shipObj ref to board
  shipObjFromId = makeShips(numShips, currBoardObj);
  shipObjFromId.forEach((shipObj, shipId) => {
    hangarShipIds.add(shipId);
    hangarRef.appendChild(shipObj.shipRef);
    shipObj.shipRef.addEventListener("click", selectShip);
  });
}

function makeHangar() {
  const hangar = makeElement("div", [["class", "ship-container"]]);
  const rotateButton = makeElement("button", [[]], "Rotate Ship");
  hangar.appendChild(rotateButton);
  rotateButton.addEventListener("click", rotateShips);
  return hangar;
}

// make each ship => return map
export function makeShips(numShips, boardObj) {
  const shipMap = new Map();
  for (let i = 1; i <= numShips; i++) {
    const ship = buildShip(i);
    shipMap.set(ship.shipRef.id, ship);
    boardObj.ships.push(ship);
  }
  return shipMap;
}

function selectShip(event) {
  event.stopPropagation();
  const currTarget = event.currentTarget;

  if (currShipRef) deselectShip(currShipRef);

  // case: click on selected ship => no selected ship
  if (currTarget === currShipRef) {
    currShipRef = null;
  }
  // case: new ship selected => select new ship
  else {
    toggleClass(currTarget, "selected");
    currShipRef = currTarget;

    // remove selected ship from board if already placed
    if (!hangarShipIds.has(currTarget.id)) {
      currBoardObj.removeShip(shipObjFromId.get(currTarget.id));
      toggleControlButton(false);
    }
  }
}

function deselectShip(shipRef) {
  toggleClass(shipRef, "selected");

  const shipObj = shipObjFromId.get(shipRef.id);
  // replace ship on same squares if previously selected from board
  if (lastPlaced.has(shipRef.id)) {
    currBoardObj.addShip(lastPlaced.get(shipRef.id), shipObj);
  }

  toggleControlButton(hangarShipIds.size === 0);
}

// rotates all ships in hangar
function rotateShips(event) {
  event.stopPropagation();

  hangarShipIds.forEach((shipId) => {
    rotate(shipObjFromId.get(shipId));
  });
}

function rotate(shipObj) {
  shipObj.switchOrient();
  toggleClass(shipObj.shipRef, "rotated");
}

function selectSquare(event) {
  if (!currShipRef) return;
  if (event.target === currBoardObj.boardRef) return;

  // case: ship cannot be placed at click location
  if (
    !currBoardObj.checkShip(
      Board.getKeyfromId(event.target.id),
      shipObjFromId.get(currShipRef.id),
    )
  ) {
    deselectShip(currShipRef);
    currShipRef = null;
  } else placeShip(event.target);
}

function placeShip(square) {
  // add ship to board DOM & board.shipSquares
  const shipObj = shipObjFromId.get(currShipRef.id);
  const key = Board.getKeyfromId(square.id);
  currBoardObj.addShip(key, shipObj);
  lastPlaced.set(currShipRef.id, key);
  square.appendChild(currShipRef);

  // case: ship is from hangar
  if (hangarShipIds.has(currShipRef.id)) {
    toggleClass(currShipRef, "placed");
    hangarShipIds.delete(currShipRef.id);
  }

  // deselect ship
  toggleClass(currShipRef, "selected");
  currShipRef = null;

  // can progress game if all ships placed
  toggleControlButton(hangarShipIds.size === 0);
}

function returnShip() {
  if (!currShipRef) return;
  if (hangarShipIds.has(currShipRef.id)) return;

  const shipObj = shipObjFromId.get(currShipRef.id);

  // rotate ship to fit in hangar if needed
  if (needRotate(shipObj)) rotate(shipObj);

  // move ship back to hangar
  toggleClass(currShipRef, "placed");
  hangarRef.appendChild(currShipRef);
  hangarShipIds.add(currShipRef.id);

  // update internal ship placement data
  lastPlaced.delete(currShipRef.id);

  deselectShip(currShipRef);
  currShipRef = null;
}

// determine need to rotate ship to fit in hangar
function needRotate(shipObj) {
  if (!hangarShipIds.size) return false;
  const hangarShip = shipObjFromId.get(hangarShipIds.values().next().value);
  return shipObj.orient !== hangarShip.orient;
}

export function resetShipSelect() {
  // remove all event listeners & uneeded DOM elements
  hangarRef.removeEventListener("click", returnShip);
  hangarRef.querySelector("button").removeEventListener("click", rotateShips);
  hangarRef.remove();

  currBoardObj.boardRef.removeEventListener("click", selectSquare);
  toggleClass(currBoardObj.boardRef, "hidden");

  shipObjFromId.forEach((shipObj) => {
    shipObj.shipRef.removeEventListener("click", selectShip);
  });

  // nullify global variables for garbage collection
  currBoardObj = null;
  hangarRef = null;
  currShipRef = null;
  hangarShipIds = null;
  shipObjFromId = null;
  lastPlaced = null;
}
