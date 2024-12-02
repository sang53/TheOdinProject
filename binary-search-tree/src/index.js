import { AVL } from "./BST";
import { defaultArray, defaultDeleteArray } from "./defaults";
import { addToResponse, clearOutputs, outputResponse } from "./DOMHandler";
import "./style.css";

document.addEventListener("click", clickHandler);

let outputType = "on-screen";
let avlTree = new AVL();
init();

function clickHandler(event) {
  // toggle output for bfs/dfs
  if (
    event.target.tagName === "INPUT" &&
    event.target.getAttribute("type") === "radio"
  ) {
    outputType = event.target.id;
  }

  if (event.target.tagName !== "BUTTON") return;

  clearOutputs();
  const button = event.target;

  // for pre/in/post order traversals
  if (button.className === "dfs") {
    avlTree.dfs(
      button.id,
      outputType === "console-log" ? console.log : addToResponse,
    );
    return;
  }

  switch (button.id) {
    case "insert-multiple":
      outputResponse(inputMultiple(button, "insertArray"));
      break;
    case "delete-multiple":
      outputResponse(inputMultiple(button, "deleteArray"));
      break;
    case "level-order":
      avlTree.bfs(outputType === "console-log" ? console.log : addToResponse);
      break;
    case "get-size":
      outputResponse("Size of Tree: " + avlTree.size);
      break;
    default:
      outputResponse(inputSingle(button));
  }
}

// converts textarea input to array and calls given AVL method
function inputMultiple(button, callBack) {
  const inputStr = getValueByButton(button, false, "textarea");
  const inputArray = inputStr
    .split(",")
    .map((element) => parseFloat(element.trim()))
    .filter((element) => !isNaN(element));
  if (inputArray.length) return avlTree[callBack](inputArray);
  else return "Error: Empty Input";
}

// converts input to number then calls AVL method with same .id as button
function inputSingle(button) {
  const input = parseFloat(getValueByButton(button));
  return avlTree[button.id](input);
}

function getValueByButton(button, reset = true, selector = "input") {
  const inputElement = button.parentNode.querySelector(selector);
  const value = inputElement.value;
  if (reset) inputElement.value = "";
  return value;
}

function init() {
  document.querySelector("#insert-multiple").value = defaultArray.join(", ");
  document.querySelector("#delete-multiple").value =
    defaultDeleteArray.join(", ");
}
