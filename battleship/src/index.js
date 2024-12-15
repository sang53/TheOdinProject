import "./style.css";

import { addToMain, openRules, openCustomise, switchScreen } from "./DOMOutput";
import { makeBoard, makeControllers } from "./init";
import { resetShipSelect, setupShipSelect } from "./shipSelect";
import { Player } from "./Player";
import { cpuShips } from "./cpu";
import { battleScreen, processShots, setupShotSelect } from "./battle";

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
  ["setup", "switch", "select shots", "process shots", "cpu shots"],
  ["end screen", "stats", "play again"],
];
let stepIdx = 0;
let currentTurn = 0;

let players = [];
let controllers;

initialise();

// move to ./init???
function initialise() {
  // create players and their boards
  for (let i = 0; i < 2; i++) {
    const player = new Player(i, SHIPS);
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
        break;
      case "reset ship select":
        resetShipSelect();
        break;
      case "switch":
        switchScreen(currentTurn);
        break;
      case "cpu ships":
        cpuShips(players[1].board, SHIPS, SIDES);
        break;
    }

    switch (stepIdx) {
      case 3:
        currentTurn = toggleTurn();
        // case: cpu => set cpu ships => next stage
        if (!players[1].control) stepIdx = 5;
        // case: second ship selection => next stage
        else if (currentTurn === 0) nextStage();
        // case: player0 ship selection => switch screen
        else stepIdx++;
        gameController();
        break;
      case 4:
        stepIdx = 2;
        break;
      case 5:
        currentTurn = toggleTurn();
        nextStage();
        gameController();
        break;
      default:
        stepIdx++;
        break;
    }
  } else if (gameStage === 1) {
    switch (steps[gameStage][stepIdx]) {
      case "setup":
        battleScreen(players);
        break;
      case "switch":
        switchScreen(currentTurn);
        break;
      case "select shots":
        shotSelect();
        break;
      case "process shots":
        processShots(players[toggleTurn()]);
        break;
      case "cpu shots":
        break;
    }

    switch (stepIdx) {
      case 0:
        stepIdx++;
        gameController();
        break;
      case 3:
        currentTurn = toggleTurn();
        if (players[currentTurn].control) stepIdx = 1;
        else stepIdx = 4;
        break;
      case 4:
        stepIdx = 1;
        gameController();
        break;
      default:
        stepIdx++;
        break;
    }
  } else if (gameStage === 2) {
    switch (steps[gameStage][stepIdx]) {
      case "end screen":
        console.log("end");
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
  toggleControlButton(false);
  setupShipSelect(players[currentTurn].board, SHIPS);
}

function shotSelect() {
  const numShots = getNumShots(players[currentTurn]);
  if (numShots === 0) {
    nextStage();
    gameController();
    return;
  }
  updateController(`Select ${numShots} Shots: `, "Fire!");
  toggleControlButton(false);
  setupShotSelect(
    players[toggleTurn()].board,
    numShots,
    players[currentTurn].board,
  );
}

export function updateController(instructionMsg, buttonMsg = "") {
  controllers.instructions.innerText = instructionMsg;
  if (buttonMsg) controllers.button.innerText = buttonMsg;
}

export function toggleControlButton(bool) {
  controllers.button.disabled = !bool;
}

function toggleTurn() {
  return currentTurn ? 0 : 1;
}

function nextStage() {
  gameStage++;
  stepIdx = 0;
}

function getNumShots(playerObj = null) {
  if (shots === "single") return 1;
  else return playerObj.aliveShips;
}
