import { makeElement, toggleClass } from "./DOM";

export function getBoardsDiv(players) {
  const containerDiv = makeElement("div", [["id", "boards"]]);
  console.log(players);
  containerDiv.appendChild(players[0].board.boardRef);
  containerDiv.appendChild(getController());
  containerDiv.appendChild(players[1].board.boardRef);
  return containerDiv;
}

function getController() {
  const container = makeElement("div", [["id", "control-container"]]);
  container.appendChild(makeElement("div", [["id", "control-msg"]]));
  container.appendChild(
    makeElement("button", [["id", "control-button"]], "Confirm"),
  );
  return container;
}

export function updateCtrlMsg(num) {
  document.querySelector("#control-msg").innerText = `Select ${num} Shots`;
}

export function toggleCtrlBtn(bool) {
  document.querySelector("#control-button").disabled = !bool;
}

export function removeShot(square, shots) {
  shots.delete(square);
  toggleClass(square, "selected");
}

export function addShot(square, shots) {
  shots.add(square);
  toggleClass(square, "selected");
}
