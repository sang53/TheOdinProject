import { Heap } from "heap-js";
import { Inputs } from "./inputsObj";
import { getMoves } from "./pieces";

export class MinHeap {
  static endPos = [0, 0];

  static HeapComparator = (a, b) => {
    return MinHeap.estimate(a[0], a[1]) - MinHeap.estimate(b[0], b[1]);
  };

  static estimate(x, y) {
    return (x - this.endPos[0]) ** 2 + (y - this.endPos[1]) ** 2;
  }

  static startSearch() {
    const startKey = MinHeap.#getKeyFromPos(...Inputs.startPos);
    const endKey = MinHeap.#getKeyFromPos(...Inputs.endPos);

    if (startKey === endKey) return [Inputs.startPos];

    const minJumps = new Map([[startKey, 0]]);
    const prevMoves = new Map([[startKey, startKey]]);

    let found = false;
    const movesHeap = new Heap(MinHeap.HeapComparator);
    movesHeap.push(Inputs.startPos);

    while (movesHeap.length) {
      let [x, y] = movesHeap.pop();

      const oldKey = MinHeap.#getKeyFromPos(x, y);
      // case: requires more jumps than current solution
      // knights can only move 3 squares per jump
      if (
        found &&
        minJumps.get(endKey) - minJumps.get(oldKey) <
          MinHeap.#distance(x, y) / 3
      )
        continue;

      const jumps = minJumps.get(oldKey) + 1;

      for (const [x2, y2] of getMoves(x, y)) {
        // case: out of bounds
        if (x2 >= Inputs.sides || x2 < 0 || y2 >= Inputs.sides || y2 < 0)
          continue;

        const key = MinHeap.#getKeyFromPos(x2, y2);
        // case: requires more jumps than before
        if (minJumps.get(key) <= jumps) continue;
        // case: requires more jumps than current solution
        if (
          found &&
          minJumps.get(endKey) - jumps < MinHeap.#distance(x2, y2) / 3
        )
          continue;

        minJumps.set(key, jumps);
        prevMoves.set(key, [x, y]);

        if (key === endKey) {
          found = true;
          break; // if x2,y2 is the solution, none of the other x2,y2's will be a solution
        }
        movesHeap.push([x2, y2]);
      }
    }

    if (!found) throw new Error(`Move Not Possible - ${startKey} : ${endKey}`);
    return MinHeap.#getMoves(prevMoves);
  }

  // returns array of moves from startPos to endPos
  static #getMoves(prevMoves) {
    const moves = [];
    const startKey = MinHeap.#getKeyFromPos(Inputs.startPos);
    let curr = Inputs.endPos;

    while (MinHeap.#getKeyFromPos(curr) !== startKey) {
      moves.push(curr);
      curr = prevMoves.get(MinHeap.#getKeyFromPos(...curr));
    }
    moves.push(Inputs.startPos);
    return moves;
  }

  // returns distance of squares (not diagonal)
  static #distance(x, y) {
    return Math.abs(x - Inputs.endPos[0]) + Math.abs(y - Inputs.endPos[1]);
  }

  // string keys for use in maps
  static #getKeyFromPos(x, y) {
    return `${x},${y}`;
  }

  // set estimate function after basic validation
  static setEstimate(functionStr) {
    const currEst = MinHeap.estimate;
    MinHeap.estimate = new Function("return " + functionStr)();
    try {
      MinHeap.estimate(0, 0);
      MinHeap.estimate(5, 8);
      MinHeap.estimate(19, 19);
      return true;
    } catch (error) {
      console.log(error);
      MinHeap.estimate = currEst;
      return false;
    }
  }
}
