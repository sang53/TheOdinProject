import { MinHeap } from "./heap";

// Object to store all input values
export class Inputs {
  static sides = 8;
  static piece = "knight";
  static startPos;
  static endPos;
  static multiples = 1;

  static setPos(inputArray) {
    Inputs.#setStart(inputArray[0]);
    Inputs.#setEnd(inputArray[1]);
  }

  static #setStart(inputString) {
    const startArray = Inputs.#validateToArray(inputString);
    Inputs.startPos = startArray;
  }

  static #setEnd(inputString) {
    const endArray = Inputs.#validateToArray(inputString);
    Inputs.endPos = endArray;
    MinHeap.endPos = endArray; // add to MinHeap for changing est function
  }

  // validates input string and returns position array
  static #validateToArray(inputString) {
    const inputArray = inputString
      .split(",")
      .map((string) => parseInt(string))
      .filter((num) => !isNaN(num) && num >= 0 && num < Inputs.sides);
    if (inputArray.length !== 2) throw new Error("Invalid Position Input");
    return inputArray;
  }
}
