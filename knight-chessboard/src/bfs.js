import { getMoves } from "./pieces";
import { Inputs } from "./inputsObj";

export class BFS {
  // Uses parameters from Inputs => array of min moves from .startPos to .endPos
  static startSearch() {
    // case start & end positions are the same
    if (
      Inputs.startPos[0] === Inputs.endPos[0] &&
      Inputs.startPos[1] === Inputs.endPos[1]
    )
      return [Inputs.startPos];

    let moves = [Inputs.startPos];
    let found = false;
    const prevMoves = new Map();

    while (!found && moves.length) {
      let nextMoves = []; // re-assign movesArray to use .pop() instead of .shift()

      while (moves.length) {
        const movesToCheck = BFS.#iterateMoves(moves.pop(), prevMoves);
        if (!movesToCheck) {
          found = true;
          break; // will always find minimum first
        }
        nextMoves = nextMoves.concat(movesToCheck);
      }
      moves = nextMoves;
    }
    if (!found) throw new Error("Move Not Possible");
    return BFS.#getMoves(prevMoves);
  }

  // iterates through all possible moves from x, y
  static #iterateMoves([x, y], prevMoves) {
    const movesToCheck = [];

    // iterate over all possible moves
    for (const [x2, y2] of getMoves(x, y)) {
      const key = BFS.#getKeyFromPos(x2, y2);

      // make sure not visited & in bounds
      if (prevMoves.has(key)) continue;
      if (x2 >= Inputs.sides || x2 < 0 || y2 >= Inputs.sides || y2 < 0)
        continue;

      prevMoves.set(key, [x, y]);
      movesToCheck.push([x2, y2]);

      // exit if end position found
      if (x2 === Inputs.endPos[0] && y2 === Inputs.endPos[1]) return false;
    }
    return movesToCheck;
  }

  // returns array of moves from startPos to endPos
  static #getMoves(prevMoves) {
    const moves = [];
    const startKey = BFS.#getKeyFromPos(Inputs.startPos);
    let curr = Inputs.endPos;

    while (BFS.#getKeyFromPos(curr) !== startKey) {
      moves.push(curr);
      curr = prevMoves.get(BFS.#getKeyFromPos(...curr));
    }
    moves.push(Inputs.startPos);
    return moves;
  }

  // string key for use in maps
  static #getKeyFromPos(x, y) {
    return `${x},${y}`;
  }
}
