import "./style.css";
import {
  makeElement,
  toggleClass,
  addToMain,
  resetDOM,
  removeListeners,
  addListener,
  afterSwitch,
} from "./DOM";
import { Board } from "./Board";
import { changeSettings, settings } from "./gameSettings";
import { Player } from "./Player";
import { shipPlace } from "./ship-placement";

const RULES = document.querySelector("#rules-modal");
const SETTINGS = document.querySelector("#settings-modal");

startScreen();

function startScreen() {
  toggleClass(document.querySelector("#main"), "start-screen");
  addToMain(makeElement("h1", [], "Play BattleShip!"));
  addToMain(getBoardsDiv());
  addToMain(getFooter());
  updateSettings();
}

function getBoardsDiv() {
  const contentDiv = makeElement("div", [["id", "boards"]]);

  contentDiv.appendChild(new Board(10, 5).boardRef);
  contentDiv.appendChild(getPlayButton(nextStage));
  contentDiv.appendChild(new Board(10, 5).boardRef);

  return contentDiv;
}

function getPlayButton(nextStage) {
  const playButton = makeElement("button", [["id", "start-button"]], "Start!");
  addListener(playButton, "click", nextStage, true);
  return playButton;
}

function getFooter() {
  const footerDiv = makeElement("div", [["id", "footer"]]);

  footerDiv.appendChild(getRulesButton(openRules));
  footerDiv.appendChild(makeElement("div", [["id", "settings"]]));
  footerDiv.appendChild(getSettingsButton(openSettings));

  return footerDiv;
}

function getRulesButton(openRules) {
  const rulesButton = makeElement(
    "button",
    [["id", "rules-button"]],
    "How To Play",
  );
  addListener(rulesButton, "click", openRules);
  return rulesButton;
}

function getSettingsButton(openSettings) {
  const settingsButton = makeElement(
    "button",
    [["id", "settings-button"]],
    "Change Settings",
  );
  addListener(settingsButton, "click", openSettings);
  return settingsButton;
}

function nextStage() {
  removeListeners();
  resetDOM();
  toggleClass(document.querySelector("#main"), "start-screen");

  const players = [new Player(0, false), new Player(1, settings.opp === "CPU")];
  afterSwitch(shipPlace, 0, players);
}

function openRules() {
  RULES.showModal();
  addListener(RULES.querySelector("button"), "click", closeRules, true);
}

function closeRules() {
  RULES.close();
}

function openSettings() {
  SETTINGS.showModal();
  addListener(SETTINGS.querySelector("button"), "click", closeSettings, true);
}

function closeSettings(event) {
  const formElements = SETTINGS.querySelector("form").elements;

  changeSettings({
    shot: formElements["cluster"].checked ? "Cluster" : "Single",
    opp: formElements["computer"].checked ? "CPU" : "Player",
  });

  updateSettings();
  event.preventDefault();
  SETTINGS.close();
}

function updateSettings(settingsObj = settings) {
  const settingsDiv = document.querySelector("#settings");
  const outputStr = [
    "Sides: " + settingsObj.sides,
    "Ships: " + settings.ships,
    "Shots: " + settings.shotType,
    "Opp: " + settings.opp,
  ].join("\n");
  settingsDiv.innerText = outputStr;
}
