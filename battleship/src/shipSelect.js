import { toggleControlButton } from ".";
import { Board } from "./Board";
import { makeElement, addToMain, toggleClass } from "./DOMOutput";
import { Ship } from "./Ship";

let currBoardObj;
let hangarRef;

let currShipRef;
let hangarShipIds;
let shipObjFromId;

export function setupShipSelect(board, numShips) {
  // initialise helper data structures
  hangarShipIds = new Set();

  // set up hangar & attach to DOM
  hangarRef = makeHangar();
  addToMain(hangarRef);
  hangarRef.addEventListener("click", returnShip);

  // set up ships & attach to DOM
  shipObjFromId = makeShips(numShips);
  shipObjFromId.forEach((shipObj, shipId) => {
    hangarShipIds.add(shipId);
    hangarRef.appendChild(shipObj.shipRef);
    shipObj.shipRef.addEventListener("click", selectShip);
  });

  currBoardObj = board;
  currBoardObj.boardRef.addEventListener("click", selectSquare);
}

function makeHangar() {
  const hangar = makeElement("div", [["class", "ship-container"]]);
  const rotateButton = makeElement("button", [[]], "Rotate Ship");
  hangar.appendChild(rotateButton);
  rotateButton.addEventListener("click", rotateShips);
  return hangar;
}

// make each ship => return map
function makeShips(numShips) {
  const shipMap = new Map();
  for (let i = 1; i <= numShips; i++) {
    const ship = buildShip(i);
    shipMap.set(ship.shipRef.id, ship);
  }
  return shipMap;
}

// make & attach ship to DOM => return ship Obj
function buildShip(length) {
  const shipRef = makeElement("div", [
    ["class", "ship"],
    ["id", `ship-${length}`],
  ]);
  for (let i = 0; i < length; i++) {
    shipRef.appendChild(makeElement("div", [["class", "square"]]));
  }
  return new Ship(length, shipRef);
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
  if (shipObj.startKey) currBoardObj.addShip(shipObj.startKey, shipObj);

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
  currBoardObj.addShip(Board.getKeyfromId(square.id), shipObj);
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
  currBoardObj.removeShip(currBoardObj);
  shipObj.startKey = null;

  deselectShip(currShipRef);
  currShipRef = null;
}

// rotate to fit in hangar if needed
function needRotate(shipObj) {
  if (!hangarShipIds.size) return false;
  const hangarShip = shipObjFromId.get(hangarShipIds.values().next().value);
  return shipObj.orient !== hangarShip.orient;
}

export function resetShipSelect() {
  // remove all event listeners
  hangarRef.removeEventListener("click", returnShip);
  hangarRef.querySelector("button").removeEventListener("click", rotateShips);
  hangarRef.remove();

  currBoardObj.boardRef.removeEventListener("click", selectSquare);

  shipObjFromId.forEach((shipObj) => {
    shipObj.shipRef.removeEventListener("click", selectShip);
  });

  // nullify global variables for garbage collection
  currBoardObj = null;
  hangarRef = null;
  currShipRef = null;
  hangarShipIds = null;
  shipObjFromId = null;
}
