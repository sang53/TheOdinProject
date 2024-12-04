import { Heap } from "heap-js";
import { Inputs } from "./inputsObj";
import { getMoves } from "./pieces";

export class MinHeap {
  static HeapComparator = (a, b) => {
    return MinHeap.estimate(a[0], a[1]) - MinHeap.estimate(b[0], b[1]);
  };

  static estimate(x, y) {
    return (x - Inputs.endPos[0]) ** 2 + (y - Inputs.endPos[1]) ** 2;
  }

  static startSearch() {
    const startKey = MinHeap.#getKeyFromPos(...Inputs.startPos);
    const endKey = MinHeap.#getKeyFromPos(...Inputs.endPos);

    if (startKey === endKey) return [Inputs.startPos];

    const minJumps = new Map([[startKey, 0]]);
    const prevMoves = new Map([[startKey, startKey]]);

    let found = false;
    const movesHeap = new Heap(MinHeap.HeapComparator);
    movesHeap.push(Inputs.startPos.concat([0]));

    while (movesHeap.length) {
      let [x, y, jumps] = movesHeap.pop();

      const oldKey = MinHeap.#getKeyFromPos(x, y);
      if (found && minJumps.get(endKey) - jumps < MinHeap.#distance(x, y) / 3)
        continue;
      if (jumps > minJumps.get(oldKey)) continue;
      minJumps.set(oldKey, jumps);
      jumps += 1;

      for (const [x2, y2] of getMoves(x, y)) {
        // case: out of bounds
        if (x2 >= Inputs.sides || x2 < 0 || y2 >= Inputs.sides || y2 < 0)
          continue;

        const key = MinHeap.#getKeyFromPos(x2, y2);
        // case: requires more jumps than before
        if (minJumps.get(key) <= jumps) continue;
        if (found && minJumps.get(endKey) <= jumps) continue;

        minJumps.set(key, jumps);
        prevMoves.set(key, [x, y]);

        if (key === endKey) {
          found = true;
          break;
        }
        movesHeap.push([x2, y2, jumps]);
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

  static #distance(x, y) {
    return Math.abs(x - Inputs.endPos[0]) + Math.abs(y - Inputs.endPos[1]);
  }

  static #getKeyFromPos(x, y) {
    return `${x},${y}`;
  }
}
