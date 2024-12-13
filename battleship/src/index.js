import "./style.css";

import {
  addToMain,
  openRules,
  openCustomise,
  toggleClass,
  switchScreen,
} from "./DOMOutput";
import { makeBoard, makeControllers } from "./init";
import { resetShipSelect, setupShipSelect } from "./shipSelect";
import { Player } from "./Player";

const SIDES = 10;
const SHIPS = 5;
let shots;

let gameStage = 0;
const steps = [
  [
    "rules",
    "customise",
    "ship select",
    "reset ship select",
    "switch",
    "cpu ships",
  ],
];
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
  console.log(gameStage, stepIdx);
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
        currentTurn = toggleTurn();
        break;
      case "reset ship select":
        resetShipSelect();
        toggleClass(players[toggleTurn()].board.boardRef, "hidden");
        break;
      case "switch":
        switchScreen(currentTurn);
        break;
      case "cpu ships":
        // randomly set cpu ships
        currentTurn = toggleTurn();
        break;
    }

    switch (stepIdx) {
      case 3:
        if (currentTurn === 0) nextStage();
        else if (!players[1].control) {
          stepIdx = 5;
          gameController();
          return;
        } else {
          stepIdx++;
          gameController();
          return;
        }
        break;
      case 4:
        stepIdx = 2;
        break;
      case 5:
        nextStage();
        gameController();
        return;
      default:
        stepIdx++;
        break;
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
  return currentTurn ? 0 : 1;
}

function nextStage() {
  gameStage++;
  stepIdx = 0;
}
