import "./style.css";
import { makeElement, toggleClass } from "./DOM";
import { Board } from "./Board";
import { changeSettings, settings } from "./gameSettings";
import {
  getPlayButton,
  getRulesButton,
  getSettingsButton,
  updateSettings,
  resetDOM,
  addToMain,
  removeListeners,
} from "./index-helpers";
import { Player } from "./Player";

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

function getFooter() {
  const footerDiv = makeElement("div", [["id", "footer"]]);

  footerDiv.appendChild(getRulesButton(openRules));
  footerDiv.appendChild(makeElement("div", [["id", "settings"]]));
  footerDiv.appendChild(getSettingsButton(openSettings));

  return footerDiv;
}

function nextStage() {
  removeListeners(openRules, openSettings);
  resetDOM();
  const players = [
    new Player(0, true),
    new Player(0, settings.opp === "Player"),
  ];
  shipPlace(players);
}

function openRules() {
  RULES.showModal();
  RULES.querySelector("button").addEventListener("click", closeRules, {
    once: true,
  });
}

function closeRules() {
  RULES.close();
}

function openSettings() {
  SETTINGS.showModal();
  SETTINGS.querySelector("button").addEventListener("click", closeSettings, {
    once: true,
  });
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
