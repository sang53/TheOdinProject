let DOM_ELEMENTS = [];
let listeners = [];

const MAIN = document.querySelector("#main");
const SWITCH = document.querySelector("#switch-screen");

export function makeElement(tag, attributeArray, text = "") {
  const element = document.createElement(tag);
  attributeArray.forEach(([attribute, value]) => {
    element.setAttribute(attribute, value);
  });
  element.innerText = text;
  return element;
}

export function toggleClass(element, className) {
  element.classList.toggle(className);
  return element;
}

export function addToMain(element) {
  MAIN.appendChild(element);
  DOM_ELEMENTS.push(element);
}

export function resetDOM() {
  DOM_ELEMENTS.forEach((element) => element.remove());
  DOM_ELEMENTS = [];
}

export function addListener(element, eventType, callback, once = false) {
  element.addEventListener(eventType, callback, { once });
  if (!once) listeners.push([element, eventType, callback]);
}

export function removeListeners() {
  listeners.forEach(([element, eventType, callback]) => {
    element.removeEventListener(eventType, callback);
  });
  listeners = [];
}

export function afterSwitch(callback, currTurn, ...args) {
  SWITCH.showModal();
  SWITCH.querySelector("#player-turn").innerText =
    `Player ${currTurn + 1}'s Turn`;

  addListener(
    SWITCH.querySelector("button"),
    "click",
    () => {
      SWITCH.close();
      callback(...args);
    },
    true,
  );
}
