import { addListener, makeElement } from "./DOM";
import { settings } from "./gameSettings";

export function getPlayButton(nextStage) {
  const playButton = makeElement("button", [["id", "start-button"]], "Start!");
  addListener(playButton, "click", nextStage, true);
  return playButton;
}

export function getRulesButton(openRules) {
  const rulesButton = makeElement(
    "button",
    [["id", "rules-button"]],
    "How To Play",
  );
  addListener(rulesButton, "click", openRules);
  return rulesButton;
}

export function getSettingsButton(openSettings) {
  const settingsButton = makeElement(
    "button",
    [["id", "settings-button"]],
    "Change Settings",
  );
  addListener(settingsButton, "click", openSettings);
  return settingsButton;
}

export function updateSettings(settingsObj = settings) {
  const settingsDiv = document.querySelector("#settings");
  const outputStr = [
    "Sides: " + settingsObj.sides,
    "Ships: " + settings.ships,
    "Shots: " + settings.shotType,
    "Opp: " + settings.opp,
  ].join("\n");
  settingsDiv.innerText = outputStr;
}
