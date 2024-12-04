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

document.addEventListener("click", clickHandler);
initialise();

function initialise() {
  makeBoard();
}

function clickHandler(event) {
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
      stressTest();
      break;
  }
}

function changeSize(sides) {
  Inputs.sides = parseInt(sides);
  makeBoard(Inputs.sides);
}

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

function getSiblingInputs(element) {
  const inputArray = [];
  element.parentElement.querySelectorAll("input").forEach((inputElement) => {
    inputArray.push(inputElement.value);
    inputElement.value = "";
  });
  return inputArray;
}

function changeMultiples(multiples) {
  Inputs.multiples = parseInt(multiples);
  updateOutput(`Multiples set to ${Inputs.multiples}`);
}

function runMultiple(callBack) {
  for (let i = 0; i < Inputs.multiples; i++) {
    callBack();
  }
}

function stressTest() {
  updateOutput("Stress Test In Progress...");

  const t0 = performance.now();
  everyCombination(MinHeap.startSearch);
  const t1 = performance.now();
  everyCombination(BFS.startSearch);
  const t2 = performance.now();
  displayTime(t0, t1, t2);

  updateOutput("Stres Test Complete!");
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
