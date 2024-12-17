import { addListener, appendRelative, makeElement, toggleClass } from "./DOM";

export function getHangar(returnShip, rotateShip, confirmShips) {
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

export function addShipsHangar(ships, selectShip) {
  ships.forEach((shipObj) => {
    addListener(shipObj.shipRef, "click", selectShip);
    appendShipHangar(shipObj.shipRef);
  });
}

function appendShipHangar(shipRef) {
  const hangar = document.querySelector(".ship-container");
  appendRelative(shipRef, hangar.lastElementChild);
}

export function placeShip(shipObj, key, square, lastPlaced) {
  const shipRef = shipObj.shipRef;
  if (!lastPlaced.has(shipRef)) toggleClass(shipRef, "placed");
  lastPlaced.set(shipRef, key);
  square.appendChild(shipRef);
}

export function getShipMap(shipSet) {
  const shipMap = new Map();
  shipSet.forEach((shipObj) => shipMap.set(shipObj.shipRef, shipObj));
  return shipMap;
}

export function getUnplacedShips(placedMap, board) {
  const shipArray = [];
  board.aliveShips.forEach((shipObj) => {
    if (!placedMap.has(shipObj.shipRef)) shipArray.push(shipObj);
  });
  return shipArray;
}

export function rotate(shipObj) {
  toggleClass(shipObj.shipRef, "rotated");
  shipObj.switchOrient();
}

export function toggleConfirmBtn(bool) {
  document.querySelector("#confirm-button").disabled = !bool;
}

export function resetShip(currShip) {
  appendShipHangar(currShip);
  toggleClass(currShip, "placed");
}
