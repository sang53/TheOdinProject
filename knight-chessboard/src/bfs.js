export class BFS {
  startSearch() {
    let jumps = 0;
    let queue = [this.startArray];
    while (!this.found && queue.length) {
      jumps += 1;
      queue = this.searchQueue(this.queue);
    }

    if (!this.found) return "Error: Not Possible";

    const moves = [];

    let curr_x = this.END_X;
    let curr_y = this.END_Y;

    while (curr_x !== this.START_X && curr_y !== this.START_Y) {
      moves.push([curr_x, curr_y]);
      [curr_x, curr_y] = this.prevMove.get([curr_x, curr_y]);
    }

    return [jumps, moves];
  }

  searchQueue(queue) {
    const nextQueue = [];
    while (queue.length) {
      this.iterateMoves(queue.pop());
    }
    return nextQueue;
  }

  iterateMoves([x, y]) {
    const movesToCheck = [];
    // iterate over all possible moves
    for (const [x2, y2] of this.getMoves(x, y)) {
      // make sure within bounds and not visited
      if (!this.validate([x2, y2])) continue;

      this.prevMove.set([x2, y2], [x, y]);
      movesToCheck.push([x2, y2]);

      // exit if end position found
      if (x2 === this.END_X && y2 === this.END_Y) {
        this.found = true;
        return;
      }
    }
  }

  getMoves(x, y) {
    return [
      [x + 2, y + 1],
      [x + 2, y - 1],
      [x - 2, y + 1],
      [x - 2, y - 1],
      [x + 1, y + 2],
      [x + 1, y - 2],
      [x - 1, y + 2],
      [x - 1, y - 2],
    ];
  }

  validate([x2, y2]) {
    if (x2 >= SIDE || x2 < 0 || y2 >= SIDE || y2 < 0) return false;
    if (this.prevMove.get([x2, y2])) return false;

    return true;
  }
}
