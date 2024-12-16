import { makeElement } from "./DOM";
import { settings } from "./gameSettings";

const DOM_ELEMENTS = [];

export function addToMain(element) {
  document.querySelector("#main").appendChild(element);
  DOM_ELEMENTS.push(element);
}

export function getPlayButton(nextStage) {
  const playButton = makeElement("button", [["id", "start-button"]], "Start!");
  playButton.addEventListener("click", nextStage, { once: true });
  return playButton;
}

export function getRulesButton(openRules) {
  const rulesButton = makeElement(
    "button",
    [["id", "rules-button"]],
    "How To Play",
  );
  rulesButton.addEventListener("click", openRules);
  return rulesButton;
}

export function getSettingsButton(openSettings) {
  const settingsButton = makeElement(
    "button",
    [["id", "settings-button"]],
    "Change Settings",
  );
  settingsButton.addEventListener("click", openSettings);
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

export function removeListeners(openRules, openSettings) {
  document
    .querySelector("#rules-button")
    .removeEventListener("click", openRules);
  document
    .querySelector("#settings-button")
    .removeEventListener("click", openSettings);
}

export function resetDOM() {
  for (const element of DOM_ELEMENTS) element.remove();
}
