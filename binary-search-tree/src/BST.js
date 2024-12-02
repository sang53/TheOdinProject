import { addTree, outputResponse } from "./DOMHandler";

export class AVL {
  constructor() {
    this.size = 0;
    this.errorNaN = "Error: Not a Number";
    this.errorEmpty = "Error: Empty Tree";
    this.errorDuplicate = "Error: Duplicate Value";
    this.errorNA = "Error: Value Not Found";
  }

  // returns [rotated, continue balanceDel]
  balanceSubTree(node) {
    let continueDel;
    if (node.balance === 2) {
      continueDel = node.right.balance !== 0;
      // overloaded right side
      if (node.right && node.right.balance === -1) this.rotateRightLeft(node);
      else this.rotateLeft(node);
    } else if (node.balance === -2) {
      continueDel = node.left.balance !== 0;
      // overloaded left side
      if (node.left && node.left.balance === 1) this.rotateLeftRight(node);
      else this.rotateRight(node);
    } else return [false, true]; // return false if not rotated
    return [true, continueDel]; // return true if rotated
  }

  // simple left rotation
  rotateLeft(node) {
    this.rotate(node, "left");
    const newRoot = node.parentNode;

    // update balance factors
    newRoot.balance -= 1;
    node.balance = Math.abs(newRoot.balance);
  }

  // simple right rotation
  rotateRight(node) {
    this.rotate(node, "right");
    const newRoot = node.parentNode;

    // update balance factors
    newRoot.balance += 1;
    node.balance = 0 - newRoot.balance;
  }

  // double rotation - left on node.left -> right on node
  rotateLeftRight(node) {
    this.rotate(node.left, "left");
    this.rotate(node, "right");

    // update balance factors
    const newRoot = node.parentNode;
    switch (newRoot.balance) {
      case -1:
        node.balance = 1;
        newRoot.left.balance = 0;
        break;
      case 0:
        node.balance = 0;
        newRoot.left.balance = 0;
        break;
      case 1:
        node.balance = 0;
        newRoot.left.balance = -1;
        break;
    }
    newRoot.balance = 0;
  }

  // double rotation - right on node.right -> left on node
  rotateRightLeft(node) {
    this.rotate(node.right, "right");
    this.rotate(node, "left");

    // update balance factors
    const newRoot = node.parentNode;
    switch (newRoot.balance) {
      case -1:
        node.balance = 0;
        newRoot.right.balance = 1;
        break;
      case 0:
        node.balance = 0;
        newRoot.right.balance = 0;
        break;
      case 1:
        node.balance = -1;
        newRoot.right.balance = 0;
        break;
    }
    newRoot.balance = 0;
  }

  rotate(node, direction) {
    this.addTreeToOutput(`Pre-Rotate ${direction}:\n`);
    const oppDirection = direction === "left" ? "right" : "left";
    const newRoot = node[oppDirection];
    const parentNode = node.parentNode;

    // update parent node && parentNode reference
    newRoot.parentNode = parentNode;
    if (!parentNode) this.root = newRoot;
    else {
      if (parentNode.left === node) parentNode.left = newRoot;
      else parentNode.right = newRoot;
    }

    // rotate tree
    if (newRoot[direction]) {
      node[oppDirection] = newRoot[direction];
      node[oppDirection].parentNode = node;
    } else node[oppDirection] = null;

    newRoot[direction] = node;
    node.parentNode = newRoot;
  }

  insertArray(inputArray) {
    let successArray = [];
    let duplicateArray = [];

    inputArray.forEach((element) => {
      const response = this.insertNode(element);
      if (response.startsWith("S")) successArray.push(element);
      else duplicateArray.push(element);
    });
    return `Success: ${successArray.join(", ")}\nDuplicate: ${duplicateArray.join(", ")}`;
  }

  insertNode(value) {
    if (isNaN(value)) return this.errorNaN;

    // case: No nodes in tree
    if (!this.size) {
      this.root = new Node(value);
      this.size += 1;
      this.addTreeToOutput(`Insert Head ${value}:\n`);
      return "Success! Added: " + value;
    }

    const [parentNode, direction] = this.findSpotByVal(value);
    if (direction === "equal") return this.errorDuplicate;

    const newNode = new Node(value, parentNode);
    parentNode[direction] = newNode;

    this.updateBalancesAdd(newNode);
    this.size += 1;

    this.addTreeToOutput(`Post-Insert ${value}:\n`);
    return "Success! Added: " + value;
  }

  // returns [parentNode, direction] of given value in subtree
  // or returns [node, "equals"] if value in subtree
  findSpotByVal(value, subTreeHead = this.root) {
    let curr = subTreeHead;

    while (curr) {
      if (value < curr.value) {
        if (curr.left) curr = curr.left;
        else return [curr, "left"];
      } else if (value > curr.value) {
        if (curr.right) curr = curr.right;
        else return [curr, "right"];
      } else return [curr, "equal"];
    }
  }

  // recursively update balance factors post .insertNode()
  updateBalancesAdd(node) {
    // exit recursion if at root
    if (node === this.root) return;

    // update balance according to direction
    const parentNode = node.parentNode;
    if (parentNode.left === node) parentNode.balance -= 1;
    else parentNode.balance += 1;

    // if rotated, subtree height remains constant
    if (this.balanceSubTree(parentNode)[0]) return;
    // propagate up tree if unbalanced
    if (parentNode.balance !== 0) this.updateBalancesAdd(parentNode);
  }

  deleteArray(inputArray) {
    let successArray = [];
    let naArray = [];
    inputArray.forEach((element) => {
      const response = this.delete(element);
      if (response.startsWith("S")) successArray.push(element);
      else naArray.push(element);
    });
    return `Success: ${successArray.join(", ")}\nNot Found: ${naArray.join(", ")}`;
  }

  delete(value) {
    if (isNaN(value)) return this.errorNaN;
    if (!this.size) return this.errorEmpty;
    const [node, relation] = this.findSpotByVal(value);
    if (relation !== "equal") return this.errorNA;

    // case: 2 children
    if (node.left && node.right) {
      // find replacement node which is smallest/largest in right/left subtrees
      const [smallest, depth_s] = this.findInSubtree(node.right, "smallest");
      const [largest, depth_l] = this.findInSubtree(node.left, "largest");
      // choose furthest node to minimise rotations? -> current
      // or choose closest node to minimise BF updates?
      const replaceNode = depth_s > depth_l ? smallest : largest;

      // remove replacement node from current position
      this.delete(replaceNode.value);

      // replace node with replacement node
      node.value = replaceNode.value;

      this.addTreeToOutput(`Post-Delete ${value}:\n`);
      return `Success! ${value} replaced with ${node.value}`;
    }
    // case: Removing root
    else if (node === this.root) {
      if (node.left) this.root = node.left;
      else if (node.right) this.root = node.right;
      else this.root = null;
      this.size -= 1;

      this.addTreeToOutput(`Post-Delete ${value}:\n`);
      return `Success! Root replaced with ${this.root ? this.root.value : "null"}`;
    }
    // case: 0 or 1 children (non-root)
    else {
      const parentNode = node.parentNode;
      const direction = parentNode.left === node ? "left" : "right";

      if (node.left) {
        // replace node with node.left
        parentNode[direction] = node.left;
        node.left.parentNode = parentNode;
      } else if (node.right) {
        // replace node with node.right
        parentNode[direction] = node.right;
        node.right.parentNode = parentNode;
      } else parentNode[direction] = null; // case: 0 children = leaf node

      // update balance factors
      this.updateBalancesDel(parentNode, direction);
      this.size -= 1;

      this.addTreeToOutput(`Post-Delete ${value}:\n`);
      return `Success! ${value} replaced with ${parentNode[direction] ? parentNode[direction] : null}`;
    }
  }

  // find smallest or largest of given subtree; used in .delete() - case: 2 children
  findInSubtree(subTreeHead, relation) {
    let curr = subTreeHead;
    const direction = relation === "smallest" ? "left" : "right";
    let depth = 0;

    while (curr[direction]) {
      curr = curr[direction];
      depth += 1;
    }
    return [curr, depth];
  }

  // recursively update balance factors post .delete()
  updateBalancesDel(node, direction) {
    // update balance of current node depending on direction
    if (direction === "left") node.balance += 1;
    else node.balance -= 1;

    const [rotated, continueBalance] = this.balanceSubTree(node);

    // Case: Not rotated; only continue propagation if new balance == 0
    if (!rotated && node.balance !== 0) return;
    // Case: Rotated && pivot.balance == 0 prior to rotation:
    // stop propagation
    else if (rotated && !continueBalance) return;
    // Case: Rotated && pivot.balance != 0 prior to rotation:
    // continue propagation from new root
    else if (rotated && continueBalance) node = node.parentNode;

    // stop propagation at root
    if (node === this.root) return;

    // propagate to parent node
    const nextNode = node.parentNode;
    const nextDirection = node === nextNode.left ? "left" : "right";
    this.updateBalancesDel(nextNode, nextDirection);
  }

  find(value) {
    if (!this.size) return this.errorEmpty;
    const [node, relation] = this.findSpotByVal(value);
    if (relation === "equal") {
      return `${value} found!\nHeight: ${this.findHeight(node)}\n${this.depth(value)}`;
    } else return this.errorNA;
  }

  // level order
  bfs(callBack) {
    if (!this.size) return outputResponse(this.errorEmpty);
    const queue = [this.root];

    if (callBack === console.log) callBack(`Start level-order`);

    while (queue.length) {
      let node = queue.shift();
      callBack(node.value);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    if (callBack === console.log) {
      callBack(`End level-order\n`, "");
      outputResponse("Success! Output in console");
    }
  }

  // "pre"/"in"/"post" order
  dfs(order, callBack) {
    if (!this.size) return outputResponse(this.errorEmpty);
    if (callBack === console.log) callBack(`Start ${order}-order`);

    dfsTraverse(this.root);

    if (callBack === console.log) {
      callBack(`End ${order}-order\n`, "");
      outputResponse("Success! Output in console");
    }

    // recursive traversal
    function dfsTraverse(node) {
      if (!node) return;

      if (order === "pre") callBack(node.value);
      dfsTraverse(node.left);
      if (order === "in") callBack(node.value);
      dfsTraverse(node.right);
      if (order === "post") callBack(node.value);
    }
  }

  depth(value) {
    if (!this.size) return this.errorEmpty;
    let i = 0;
    let curr = this.root;

    while (curr) {
      if (value < curr.value) curr = curr.left;
      else if (value > curr.value) curr = curr.right;
      else return `Depth of ${value}: ` + i;
      i++;
    }
    return this.errorNA;
  }

  height(value) {
    if (!this.size) return this.errorEmpty;

    const [node, relation] = this.findSpotByVal(value);
    if (relation !== "equal") return this.errorNA;
    return `Height of ${value}: ` + this.findHeight(node);
  }

  // recursively search height using min of children height
  findHeight(node) {
    // base case: null (non-leaf) -> remove from calcuation
    if (!node) return Infinity;
    // base case: leaf node -> start counting height
    if (!node.right && !node.left) return 0;

    return (
      Math.min(this.findHeight(node.right), this.findHeight(node.left)) + 1
    );
  }

  // returns [line1, line2...]
  toStringArray(node = this.head) {
    const stringArray = [];
    this.prettyPrint(node, stringArray);
    return stringArray;
  }

  addTreeToOutput(prefix) {
    addTree(prefix + this.toStringArray().join("\n"));
  }

  // returns joined stringArray
  printSubtree(value) {
    if (!this.size) return this.errorEmpty;

    const [node, relation] = this.findSpotByVal(value);
    if (relation !== "equal") return this.errorNA;
    return this.toStringArray(node).join("\n");
  }

  // stores tree in stringArray := [line1, line2...]
  prettyPrint(node = this.root, stringArray, prefix = "", isLeft = true) {
    if (!node) {
      return stringArray.push(this.errorEmpty);
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        stringArray,
        `${prefix}${isLeft ? "│\t\t " : " \t\t"}`,
        false,
      );
    }
    stringArray.push(`${prefix}${isLeft ? "└── " : "┌── "}${node.toString()}`);
    if (node.left !== null) {
      this.prettyPrint(
        node.left,
        stringArray,
        `${prefix}${isLeft ? " \t\t" : "│\t\t"}`,
        true,
      );
    }
  }
}

class Node {
  constructor(value, parentNode = null) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.balance = 0;
    this.parentNode = parentNode;
  }

  toString() {
    return `${this.value}: ${this.balance}`;
  }
}
