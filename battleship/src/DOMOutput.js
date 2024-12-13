import { gameController } from "./index";

const CUSTOM_DIALOG = document.querySelector("#customise-dialog");
const RULES_DIALOG = document.querySelector("#rules-dialog");
const MAIN = document.querySelector("#main");

// open rules w/ || w/o progressing game on close rules
export function openRules(progress) {
  RULES_DIALOG.showModal();
  if (progress)
    RULES_DIALOG.querySelector("button").addEventListener(
      "click",
      closeRulesProgress,
    );
  else
    RULES_DIALOG.querySelector("button").addEventListener("click", closeRules);
}

function closeRules() {
  RULES_DIALOG.close();
  RULES_DIALOG.querySelector("button").removeEventListener("click", closeRules);
}

function closeRulesProgress() {
  RULES_DIALOG.close();
  RULES_DIALOG.querySelector("button").removeEventListener("click", closeRules);
  gameController();
}

export function openCustomise() {
  CUSTOM_DIALOG.showModal();
  CUSTOM_DIALOG.querySelector("button").addEventListener(
    "click",
    closeCustomise,
  );
}

function closeCustomise(event) {
  event.preventDefault();
  CUSTOM_DIALOG.querySelector("button").removeEventListener(
    "click",
    closeCustomise,
  );
  CUSTOM_DIALOG.close();
  gameController();
}

export function makeElement(tag, attributeArray, text = "") {
  const element = document.createElement(tag);
  attributeArray.forEach(([attribute, value]) => {
    element.setAttribute(attribute, value);
  });
  element.textContent = text;
  return element;
}

export function addToMain(element) {
  MAIN.appendChild(element);
}

export function toggleClass(element, className) {
  element.classList.toggle(className);
}
