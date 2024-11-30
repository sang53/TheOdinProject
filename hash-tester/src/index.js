import "./style.css";

import { HashMap } from "./HashMap";
import { defaultArray, defaultHashFunction } from "./defaults";

const FUNCTION_INPUT = document.querySelector("#function");
const ARRAY_INPUT = document.querySelector("#input-array-v");
const RESPONSE_DIV = document.querySelector("#display-response");
const HASHMAP_DIV = document.querySelector("#display-hashmap");
const LENGTH_DIV = document.querySelector("#length");
const NODES_DIV = document.querySelector("#nodes");
const INDEXES_DIV = document.querySelector("#indexes");
const LOADF_DIV = document.querySelector("#load");

let hashMap = new HashMap();
let currentHashFunction = defaultHashFunction;
initialise();

document.addEventListener("click", clickHandler);

function clickHandler(event) {
  if (!event.target.tagName === "BUTTON") return;
  switch (event.target.id) {
    case "generate-function":
      updateHashFunction(...getInputValues(event.target));
      break;
    case "input-array-b":
      updateOutput(hashMap.inputArray(validateInputArray(ARRAY_INPUT.value)));
      break;
    case "hash-b":
      singleInput(event.target, hashMap.hashForOutput.bind(hashMap));
      break;
    case "set-b":
      setByButton(event.target);
      break;
    case "get-b":
      singleInput(event.target, hashMap.getValueByKey.bind(hashMap));
      break;
    case "remove-b":
      singleInput(event.target, hashMap.removeNodeByKey.bind(hashMap));
      break;
    case "clear-b":
      hashMap = new HashMap(currentHashFunction);
      updateOutput("Cleared!");
      break;
    case "keys-b":
      updateOutput(hashMap.getKeysOrValues(0));
      break;
    case "values-b":
      updateOutput(hashMap.getKeysOrValues(1));
      break;
    case "keys-values-b":
      updateOutput(hashMap.getKeysAndValues());
      break;
  }
}

function initialise() {
  updateOutput("");
  FUNCTION_INPUT.placeholder = currentHashFunction;
  FUNCTION_INPUT.value = currentHashFunction;
  ARRAY_INPUT.placeholder = defaultArray;
  ARRAY_INPUT.value = defaultArray;
}

// convert from input to String or Number
function validateType(string) {
  if (
    (string.at(0) === '"' && string.at(-1) === '"') ||
    (string.at(0) === "'" && string.at(-1) === "'")
  ) {
    return string.slice(1, -1);
  } else return parseFloat(string);
}

// for functions with single input source
function singleInput(button, boundFunction) {
  const input = validateType(...getInputValues(button));
  updateOutput(boundFunction(input));
}

// gets values from all inputs
function getInputValues(element) {
  const output = [];

  element.parentNode
    .querySelectorAll("textarea")
    .forEach((element) => output.push(element.value));
  element.parentNode
    .querySelectorAll("input")
    .forEach((element) => output.push(element.value));

  return output;
}

function updateHashFunction(functionString, size, load) {
  // use try block so script does not crash on bad input function
  try {
    const newHashMap = new HashMap(functionString, +size, +load);

    // only switch to new hashmap if hash function validated
    hashMap = newHashMap;
    currentHashFunction = functionString;
    updateOutput("Successfully Created New HashMap");
  } catch (error) {
    updateOutput("Hash Function " + error);
  }
}

function updateOutput(response) {
  RESPONSE_DIV.innerText = response;
  HASHMAP_DIV.textContent = hashMap.toString();
  LENGTH_DIV.textContent = `Capacity: ${hashMap.data.length}`;
  NODES_DIV.textContent = `Node Collisions: ${hashMap.collNodes}/${hashMap.storedNodes}`;
  INDEXES_DIV.textContent = `Index Collisions: ${hashMap.collIndexes}/${hashMap.storedIndexes}`;
  LOADF_DIV.textContent = `Load Factor: ${hashMap.loadFactor}`;
}

function setByButton(button) {
  const inputs = getInputValues(button).map((element) => validateType(element));
  updateOutput(hashMap.set(...inputs));
}

// transform input into [[key:value], [key:value]]
function validateInputArray(inputString = defaultArray) {
  return inputString
    .split(",")
    .map((kvPair) => kvPair.trim().split(":"))
    .filter((kvPair) => kvPair.length === 2)
    .map(([key, value]) => [validateType(key), validateType(value)]);
}
