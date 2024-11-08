import { createElement } from "./DOM-handler.js";

const CONTENTDIV = document.querySelector("#content");
const INFORMATION = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";


export function addHome() {
    addHeader();
    addContent();
    addFooter();
}


function addHeader() {
    const parentDiv = createElement();
    parentDiv.appendChild(createElement("h1", ["title"], "Welcome to Restaurant!"));
    appendToContent(parentDiv);
}

function addContent() {
    const parentDiv = createElement("div", ["main-content"]);
    for (let i = 0; i < 3; i++) {
    parentDiv.appendChild(createElement("p", ["paragraph"], INFORMATION));
    }
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