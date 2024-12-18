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
  addToMain(makeElement("div", [["id", "shot-select-info"]]));

  players.forEach((player) => {
    toggleShips(player.board);
  });
  document
    .querySelector("#control-button")
    .addEventListener("click", confirmShots);

  if (settings.shotType === "Single") shotNum = 1;

  setupTurn();
}

function setupTurn() {
  oppBoard = players[toggleTurn(currTurn)].board;
  prevShots = shots;
  shots = new Set();

  toggleShips(players[currTurn].board);
  addListener(oppBoard.boardRef, "click", selectShot);

  if (settings.shotType === "Cluster")
    shotNum = players[currTurn].board.aliveShips.size;

  updateCtrlMsg(shotNum);
  toggleCtrlBtn(false);
}

function selectShot(event) {
  const square = event.target;
  if (square === oppBoard.boardRef) return;
  if (oppBoard.shotSquares.has(square.id)) return;

  if (shots.has(square)) removeShot(square, shots);
  else if (shotNum > shots.size) addShot(square, shots);
  else if (shotNum === 1) {
    removeShot(shots.keys.next().value, shots);
    addShot(square, shots);
  }

  toggleCtrlBtn(shotNum === shots.size);
}

function confirmShots() {
  shots.forEach((square) => {
    oppBoard.receiveShot(square.id);
    toggleClass(square, "selected");
  });

  removeListeners();
  toggleShips(players[currTurn].board);

  currTurn = toggleTurn(currTurn);
  if (!players[currTurn].cpu) afterSwitch(setupTurn, currTurn);
}
