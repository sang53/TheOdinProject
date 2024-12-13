import "./style.css";

import {
  addToMain,
  openRules,
  openCustomise,
  toggleClass,
  switchScreen,
} from "./DOMOutput";
import { getCustomRules } from "./DOMInput";
import { makeBoard, makeControllers } from "./init";
import { setupShipSelect } from "./shipSelect";
import { Player } from "./Player";

const SIDES = 10;
const SHIPS = 5;
let shots;

let gameStage = 0;
const steps = [["rules", "customise", "ship select", "switch", "cpu ships"]];
let stepIdx = 0;
let currentTurn = 0;

let players = [];
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
    switch (steps[gameStage][stepIdx]) {
      case "rules":
        openRules(true);
        break;
      case "customise":
        openCustomise();
        break;
      case "ship select":
        shipSelect();
        toggleTurn();
        break;
      case "switch":
        switchScreen(currentTurn);
        break;
      case "cpu ships":
        // randomly set cpu ships
        toggleTurn();
        break;
    }

    switch (stepIdx) {
      case 2:
        if (currentTurn === 1) nextStage();
        else if (players[1].control) stepIdx = 4;
        else stepIdx++;
        break;
      case 3:
        stepIdx = 2;
        break;
      case 4:
        nextStage();
        break;
      default:
        stepIdx++;
    }
  }
}

export function setCustomRules(inputObj) {
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

function toggleTurn() {
  currentTurn = currentTurn ? 0 : 1;
  return currentTurn;
}

function nextStage() {
  gameStage++;
  stepIdx = 0;
}
