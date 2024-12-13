import "./style.css";

import { addToMain, openRules, openCustomise, toggleClass } from "./DOMOutput";
import { getCustomRules } from "./DOMInput";
import { makeBoard, makeControllers } from "./init";
import { setupShipSelect } from "./shipSelect";
import { Player } from "./Player";

const SIDES = 10;
const SHIPS = 5;

let gameStage = 0;
let currentStep = "start screen";
let players = [];
let shots;
let currentTurn = 0;

let controllers;

initialise();

function initialise() {
  // create players and their boards
  for (let i = 0; i < 2; i++) {
    const player = new Player(0);
    player.setBoard(makeBoard(i, SIDES));
    players.push(player);
  }

  // make & reference controllers
  controllers = makeControllers();

  // add boards (hidden) & controllers to DOM
  addToMain(players[0].board.boardRef);
  addToMain(controllers.container);
  addToMain(players[1].board.boardRef);

  // controller button = main method to progresses game
  controllers.button.addEventListener("click", gameController);
}

export function gameController() {
  if (gameStage === 0) {
    switch (currentStep) {
      case "start screen":
        openRules(true);
        currentStep = "rules";
        break;
      case "rules":
        openCustomise();
        currentStep = "customise game";
        break;
      case "customise game":
        setCustomRules();
        currentStep = "ships screen";
        shipSelect();
        break;
      case "ships screen":
        break;
      case "switch":
        break;
    }
  }
}

function setCustomRules() {
  const inputObj = getCustomRules();
  players[1].control = inputObj.player;

  if (inputObj.single) shots = "single";
  else shots = "cluster";
}

function shipSelect() {
  updateController("Place Your Ships!", "Done");
  toggleControlButton();
  const board = players[currentTurn].board;
  toggleClass(board.boardRef, "hidden");
  setupShipSelect(board, SHIPS);
}

export function updateController(instructionMsg, buttonMsg = "") {
  controllers.instructions.innerText = instructionMsg;
  if (buttonMsg) controllers.button.innerText = buttonMsg;
}

export function toggleControlButton(bool = controllers.button.disabled) {
  controllers.button.disabled = !bool;
}
