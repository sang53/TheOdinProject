const RULES_DIALOG = document.querySelector("#rules-dialog");
const MAIN = document.querySelector("#main");

export function openRules() {
  RULES_DIALOG.showModal();
  RULES_DIALOG.querySelector("button").addEventListener("click", closeRules);
}

function closeRules() {
  RULES_DIALOG.close();
  RULES_DIALOG.querySelector("button").removeEventListener("click", closeRules);
}

export function updateController(instructionMsg, buttonMsg = "") {
  controllers.instructions.innerText = instructionMsg;
  if (buttonMsg) controllers.button.innerText = buttonMsg;
}

export function makeElement(tag, attributeArray) {
  const element = document.createElement(tag);
  attributeArray.forEach(([attribute, value]) => {
    element.setAttribute(attribute, value);
  });
  return element;
}

export function getSquareId(playerIdx, x, y) {
  return `player${playerIdx}-${x}-${y}`;
}

export function addToMain(element) {
  MAIN.appendChild(element);
}

export function toggleControlButton() {
  controllers.button.disabled = !controllers.button.disabled;
}
