import "./style.css";

import { getData } from "./APIHandler";
import { UnitHandler, updateData } from "./DOMHandler";

const SEARCHBAR = document.querySelector("#city-name");
const BUTTON = document.querySelector("button");

document.addEventListener("click", clickHandler);

async function search() {
  BUTTON.disabled = true;
  await getData(SEARCHBAR.value, UnitHandler.getUnits()).then(updateData);
  BUTTON.disabled = false;
}

function clickHandler(event) {
  switch (event.target.tagName) {
    case "BUTTON":
      if (!BUTTON.disabled) search();
      break;
    case "INPUT":
      if (event.target.id !== "city-name")
        UnitHandler.changeUnits(event.target.id);
      break;
  }
}

search();
