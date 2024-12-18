import {
  addListener,
  addToMain,
  makeElement,
  toggleShips,
  toggleTurn,
} from "./DOM";
import { settings } from "./gameSettings";
import {
  getBoardsDiv,
  toggleCtrlBtn,
  updateCtrlMsg,
} from "./shot-select-helpers";

let currTurn = 0;
let players;
let shots;
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

  setupTurn(players, currTurn, selectShot);
}

function setupTurn() {
  toggleShips(players[currTurn].board);
  addListener(
    players[toggleTurn(currTurn)].board.boardRef,
    "click",
    selectShot,
  );

  if (settings.shotType === "Cluster")
    shotNum = players[currTurn].board.aliveShips.size;

  updateCtrlMsg(shotNum);
  toggleCtrlBtn(false);
}

function selectShot(event) {}

function confirmShots(event) {}
