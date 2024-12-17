import { addListener, appendRelative, makeElement } from "./DOM";

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
    [["id", "confirm-button"]],
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

export function appendShipHangar(shipRef) {
  const hangar = document.querySelector(".ship-container");
  appendRelative(shipRef, hangar.lastElementChild);
}
