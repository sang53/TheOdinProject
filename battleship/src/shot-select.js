import { getCPUShots } from "./cpu";
import {
  addListener,
  addToMain,
  afterSwitch,
  makeElement,
  removeListeners,
  toggleClass,
  toggleShips,
  toggleTurn,
} from "./DOM";
import { settings } from "./gameSettings";

let currTurn = 0;
let players;
let oppBoard;

let shots;
let shotNum;

export function shotSelect(playerArr) {
  players = playerArr;
  document.querySelector("#main").classList.toggle("shot-select");
  addToMain(makeElement("h1", [], "Battle Phase"));
  addToMain(getBoardsDiv(players));
  addToMain(getStatsDiv());

  players.forEach((player) => {
    toggleShips(player.board);
  });
  if (settings.shotType === "Single") shotNum = 1;
  setupTurn();
}

function getBoardsDiv(players) {
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

function getStatsDiv() {
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

function getStatStr(hits, shots) {
  const acc = shots === 0 ? 0 : Math.round((hits / shots) * 100);
  return `Hits: ${hits} / 15\nShots: ${shots}\nAcc: ${acc}%`;
}

function setupTurn() {
  oppBoard = players[toggleTurn(currTurn)].board;
  shots = new Set();

  toggleShips(players[currTurn].board);
  addListener(oppBoard.boardRef, "click", selectShot);
  addListener(document.querySelector("#control-button"), "click", confirmShots);

  if (settings.shotType === "Cluster")
    shotNum = players[currTurn].board.aliveShips.size;

  updateCtrlMsg(`Select ${shotNum} Shots`);
  toggleCtrlBtn(false);
}

function updateCtrlMsg(str) {
  document.querySelector("#control-msg").innerText = str;
}

function toggleCtrlBtn(bool) {
  document.querySelector("#control-button").disabled = !bool;
}

function selectShot(event) {
  const square = event.target;
  if (square === oppBoard.boardRef) return;
  if (oppBoard.shotSquares.has(square.id)) return;

  if (shots.has(square)) removeShot(square, shots);
  else if (shotNum > shots.size) addShot(square, shots);
  else if (shotNum === 1) {
    removeShot(shots.keys().next().value, shots);
    addShot(square, shots);
  }

  toggleCtrlBtn(shotNum === shots.size);
}

function addShot(square, shots) {
  shots.add(square);
  toggleClass(square, "selected");
}

function removeShot(square, shots) {
  shots.delete(square);
  toggleClass(square, "selected");
}

function confirmShots() {
  let hits = 0;
  shots.forEach((square) => {
    if (oppBoard.receiveShot(square.id)) hits++;
    toggleClass(square, "selected");
  });

  updateCtrlMsg(`Hits: ${hits}\nMisses: ${shotNum - hits}`);
  updateStats(oppBoard, currTurn);
  removeListeners();
  addListener(document.querySelector("#control-button"), "click", nextTurn);
}

function updateStats(oppBoard, currTurn) {
  const statDiv = document.querySelector(`#stats-player${currTurn + 1}`);
  let hits = 0;
  let shots = oppBoard.shotSquares.size;

  oppBoard.shipSquares.forEach((_, key) => {
    if (oppBoard.shotSquares.has(key)) hits++;
  });

  statDiv.innerText = getStatStr(hits, shots);
}

function nextTurn() {
  removeListeners();

  if (players[toggleTurn(currTurn)].cpu) return cpuTurn();

  toggleShips(players[currTurn].board);
  currTurn = toggleTurn(currTurn);
  afterSwitch(setupTurn, currTurn);
}

function cpuTurn() {
  shots = getCPUShots(players[currTurn].board, shotNum);
  confirmShots();
}
