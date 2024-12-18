import { makeElement, toggleClass } from "./DOM";

export function getBoardsDiv(players) {
  const containerDiv = makeElement("div", [["id", "boards"]]);
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

export function getStatsDiv() {
  const container = makeElement("div", [
    ["id", "stats"],
    ["class", "box"],
  ]);
  container.appendChild(getPlayerStatDiv(0));
  container.appendChild(getPlayerStatDiv(1));
  return container;
}

function getPlayerStatDiv(num) {
  const statDiv = makeElement("div", [["class", "box"]]);
  statDiv.appendChild(makeElement("h4", [], `Player ${num + 1}:`));
  statDiv.appendChild(
    makeElement("div", [["id", `stats-player${num + 1}`]], getStatStr(0, 0)),
  );

  return statDiv;
}

export function updateCtrlMsg(str) {
  document.querySelector("#control-msg").innerText = str;
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

export function updateStats(oppBoard, currTurn) {
  const statDiv = document.querySelector(`#stats-player${currTurn + 1}`);
  let hits = 0;
  let shots = oppBoard.shotSquares.size;

  oppBoard.shipSquares.forEach((_, key) => {
    if (oppBoard.shotSquares.has(key)) hits++;
  });

  statDiv.innerText = getStatStr(hits, shots);
}

function getStatStr(hits, shots) {
  const acc = shots === 0 ? 0 : Math.round((hits / shots) * 100);
  return `Hits: ${hits} / 15\nShots: ${shots}\nAcc: ${acc}%`;
}
