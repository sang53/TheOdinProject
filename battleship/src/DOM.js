let DOM_ELEMENTS = [];
let listeners = [];
const MAIN = document.querySelector("#main");

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
