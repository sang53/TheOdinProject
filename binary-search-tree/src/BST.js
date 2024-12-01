export class BST {
  constructor(sortedArray) {
    this.head = this.buildTree(sortedArray);
    this.size = 0;
    this.root = { next: this.head };
  }

  buildTree(sortedArary) {
    const queue = [[0, sortedArary.length - 1]];

    while (queue) {
      const [start, end] = queue.shift();
      if (end < start) continue;

      const middle = Math.floor((start + end) / 2);
      this.addNode(sortedArary[middle]);
      queue.push([start, middle - 1]);
      queue.push([middle + 1, end]);
    }
  }

  addNode(value) {
    let curr = this.head;

    while (true) {
      if (value < curr.value) {
        if (curr.left) curr = curr.left;
        else {
          curr.left = new Node(value);
          this.size += 1;
          return "Success";
        }
      } else if (value > curr.value) {
        if (curr.right) curr = curr.right;
        else {
          curr.right = new Node(value);
          this.size += 1;
          return "Success";
        }
      } else return "Error: Duplicate";
    }
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
