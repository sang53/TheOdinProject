import { Inputs } from "./inputsObj";
import { BFS } from "./bfs";
import {
  displayResults,
  displayTime,
  makeBoard,
  updateOutput,
} from "./DOMHandler";
import "./style.css";
import { MinHeap } from "./heap";
import { distanceFloorStr, distanceStr, squareDiffStr } from "./defaults";

const DIALOG = document.querySelector("dialog");
const FUNCTION = document.querySelector("textarea");
document.addEventListener("click", clickHandler);
init();

function init() {
  makeBoard();
  FUNCTION.value = distanceStr;
}

function clickHandler(event) {
  // case: radio inputs
  if (event.target.getAttribute("type") === "radio") {
    switch (event.target.id) {
      case "distance":
        FUNCTION.value = distanceStr;
        break;
      case "diff":
        FUNCTION.value = squareDiffStr;
        break;
      case "diff-mod":
        FUNCTION.value = distanceFloorStr;
        break;
    }
  }

  if (event.target.tagName !== "BUTTON") return;

  switch (event.target.id) {
    case "calculate":
      calculate(event.target);
      break;
    case "size":
      changeSize(...getSiblingInputs(event.target));
      break;
    case "multiples":
      changeMultiples(...getSiblingInputs(event.target));
      break;
    case "stress-test":
      updateOutput("Stress Test In Progress...");
      stressTest();
      break;
    case "open-dialog":
      DIALOG.showModal();
      break;
    case "close-dialog":
      DIALOG.close();
      break;
    case "function":
      if (MinHeap.setEstimate(FUNCTION.value)) {
        DIALOG.close();
        updateOutput("Success! - Changed Estimation Function");
      }
      break;
  }
}

// changes internal sides && displayed board
function changeSize(sides) {
  if (!sides) return;
  Inputs.sides = parseInt(sides);
  makeBoard(Inputs.sides);
}

// displays solution && benchmarks from current input
function calculate(button) {
  const inputArray = getSiblingInputs(button);
  try {
    Inputs.setPos(inputArray);
    displayResults(MinHeap.startSearch());
    const t0 = performance.now();
    runMultiple(MinHeap.startSearch);
    const t1 = performance.now();
    runMultiple(BFS.startSearch);
    const t2 = performance.now();
    displayTime(t0, t1, t2);
  } catch (error) {
    updateOutput(error);
  }
}

// returns sibling input values from button
function getSiblingInputs(element) {
  const inputArray = [];
  element.parentElement.querySelectorAll("input").forEach((inputElement) => {
    inputArray.push(inputElement.value);
    inputElement.value = "";
  });
  return inputArray;
}

function changeMultiples(multiples) {
  if (!multiples) return;
  Inputs.multiples = parseInt(multiples);
  updateOutput(`Multiples set to ${Inputs.multiples}`);
}

// runs calculation variable amount of times for benchmarking
function runMultiple(callBack) {
  for (let i = 0; i < Inputs.multiples; i++) {
    callBack();
  }
}

// stress test every combination for current board size
function stressTest() {
  const t0 = performance.now();
  everyCombination(MinHeap.startSearch);
  const t1 = performance.now();
  everyCombination(BFS.startSearch);
  const t2 = performance.now();
  displayTime(t0, t1, t2);

  updateOutput("Stress Test Complete!");
}

function everyCombination(callback) {
  for (let y = 0; y < Inputs.sides; y++) {
    for (let x = 0; x < Inputs.sides; x++) {
      for (let y2 = 0; y2 < Inputs.sides; y2++) {
        for (let x2 = 0; x2 < Inputs.sides; x2++) {
          Inputs.setPos([`${x},${y}`, `${x2},${y2}`]);
          callback();
        }
      }
    }
  }
}
