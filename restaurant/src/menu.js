import { createElement } from "./DOM-handler.js";

const CONTENTDIV = document.querySelector("#content");

export function addMenu() {
  addHeader();
  addContent();
  addFooter();
}

function addHeader() {
  const parentDiv = createElement();
  parentDiv.appendChild(createElement("h1", ["title"], "Restaurant Menu"));
  appendToContent(parentDiv);
}

function addContent() {
  const parentDiv = createElement("div", ["main-content"]);
  const parentUL = createElement("ul", ["menu-ul", "grid"]);
  for (let i = 0; i < 20; i++) {
    parentUL.appendChild(createElement("li", ["menu-li"], "Ravioli - $30"));
  }
  parentDiv.appendChild(parentUL);
  appendToContent(parentDiv);
}

function addFooter() {
  const parentDiv = createElement();
  parentDiv.appendChild(createElement("em", [], "Thank you for visiting!"));
  appendToContent(parentDiv);
}

function appendToContent(element) {
  CONTENTDIV.appendChild(element);
}
