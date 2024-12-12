import "./style.css";

import { openRules, updateController } from "./DOMOutput";
import { getCustomRules, openCustomise } from "./DOMInput";
import { getControllers } from "./init";
import { setupShipSelect } from "./shipSelect";
import { Player } from "./Player";

let gameStage = 0;
let currentStep = "startScreen";
let players = [];
let sides;
let ships;
let shots;
let currentTurn = 0;

let controllers;

initialise();

function initialise() {
  controllers = getControllers();
  controllers.button.addEventListener("click", gameController);
  document.addEventListener("gameProgress", gameController);
}

function gameController() {
  if (gameStage === 0) {
    switch (currentStep) {
      case "startScreen":
        currentStep = "rules";
        openRules();
        updateController("Customise Rules!", "Customise");
        break;
      case "rules":
        currentStep = "customise";
        openCustomise();
        break;
      case "customise":
        currentStep = "placeShips";
        setCustomRules();
        break;
      case "placeShips":
        setupShipSelect(players[currentTurn]);
        currentStep = "saveShips";
        break;
      case "saveShips":
        break;
      case "switch":
        break;
    }
  }
}

function setCustomRules() {
  const inputObj = getCustomRules();
  sides = parseInt(inputObj.sides);
  ships = parseInt(inputObj.ships);
  players.push(new Player(0, true));
  players.push(new Player(1, inputObj.player));

  if (inputObj.single) shots = "single";
  else shots = "cluster";
  document.dispatchEvent(new Event("gameProgress"));
  return players;
}
