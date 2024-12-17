import { addListener, addToMain, makeElement, toggleClass } from "./DOM";
import { getHangar, addShipsHangar } from "./ship-placement-helpers";

let currTurn = 0;
let players;

export function shipPlace(playersArr) {
  players = playersArr;
  const currPlayer = players[currTurn];

  toggleClass(document.querySelector("#main"), "ship-select");
  addToMain(makeElement("h1", [], "Place Your Ships"));

  addToMain(currPlayer.boardObj.boardRef);
  addListener(currPlayer.boardObj.boardRef, "click", selectSquare);

  addToMain(getHangar(returnShip, rotateShips, confirmShips));
  addShipsHangar(currPlayer.boardObj.aliveShips, selectShip);
}

function selectShip(event) {
  event.stopPropagation();
}

function selectSquare(event) {}

function returnShip(event) {}

function rotateShips(event) {
  event.stopPropagation();
}

function confirmShips(event) {
  event.stopPropagation();
}
