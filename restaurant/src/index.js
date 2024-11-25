import "./style.css";
import { addMenu } from "./menu.js";
import { addHome } from "./home.js";
import { addContacts } from "./contact.js";

const CONTENTDIV = document.querySelector("#content");
CONTENTDIV.className = "flex column";

document.addEventListener("click", eventHandler);

let currentPage = "home";
addHome();

function eventHandler(event) {
  if (event.target.id !== currentPage) {
    switch (event.target.id) {
      case "home":
        removeNodes();
        addHome();
        currentPage = "home";
        break;
      case "menu":
        removeNodes();
        addMenu();
        currentPage = "menu";
        break;
      case "contact":
        removeNodes();
        addContacts();
        currentPage = "contact";
        break;
    }
  }
}

function removeNodes() {
  while (CONTENTDIV.firstElementChild) {
    CONTENTDIV.firstElementChild.remove();
  }
}
