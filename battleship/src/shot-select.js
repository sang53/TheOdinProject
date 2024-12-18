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
import {
  removeShot,
  getBoardsDiv,
  toggleCtrlBtn,
  updateCtrlMsg,
  addShot,
  updateStats,
  getStatsDiv,
} from "./shot-select-helpers";

let currTurn = 0;
let players;
let oppBoard;

let shots;
let prevShots;
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

function setupTurn() {
  oppBoard = players[toggleTurn(currTurn)].board;
  prevShots = shots;
  shots = new Set();

  toggleShips(players[currTurn].board);
  addListener(oppBoard.boardRef, "click", selectShot);
  addListener(document.querySelector("#control-button"), "click", confirmShots);

  if (settings.shotType === "Cluster")
    shotNum = players[currTurn].board.aliveShips.size;

  updateCtrlMsg(`Select ${shotNum} Shots`);
  toggleCtrlBtn(false);
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

function nextTurn() {
  removeListeners();

  if (players[toggleTurn(currTurn)].cpu) return cpuTurn();

  toggleShips(players[currTurn].board);
  currTurn = toggleTurn(currTurn);
  afterSwitch(setupTurn, currTurn);
}

function cpuTurn() {
  prevShots = shots;
  shots = getCPUShots(players[currTurn].board, shotNum);
  confirmShots();
}
