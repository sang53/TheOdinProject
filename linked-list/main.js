class LinkedList {
  #head;
  #tail;
  #size;

  static indexErrorMsg = "Error: Index Too Large";

  constructor() {
    this.#head = new Node();
    this.#tail = this.#head;
    this.#size = 0;
  }

  append(val) {
    this.#tail.next = new Node(val);
    this.#tail = this.#tail.next;
    this.#size += 1;
    return "Success!";
  }

  prepend(val) {
    const node = new Node(val, this.#head.next);
    this.#head.next = node;
    this.#size += 1;
    return "Success!";
  }

  #getNodeByIndex(index) {
    if (index < 0) return this.#head;

    let curr = this.#head.next;
    for (let i = 0; i < +index; i++) {
      curr = curr.next;
    }
    return curr;
  }

  #getIndexByVal(val) {
    let curr = this.#head.next;
    let i = 0;

    while (curr) {
      if (curr.val === val) return i;
      i++;
      curr = curr.next;
    }
    return false;
  }

  #checkIndex(index) {
    if (+index >= this.#size) return false;
    return true;
  }

  get head() {
    if (this.#size === 0) return "Error: No Nodes in List";
    return "Head: " + this.#head.next.val;
  }

  get tail() {
    if (this.#size === 0) return "Error: No Nodes in List";
    return "Tail: " + this.#tail.val;
  }

  get size() {
    return "Size: " + this.#size;
  }

  at(index) {
    if (!this.#checkIndex(+index)) return LinkedList.indexErrorMsg;
    return "Value: " + this.#getNodeByIndex(+index).val;
  }

  pop() {
    if (this.#size === 0) {
      return "Error: Linked List is Empty";
    }

    const node = this.#getNodeByIndex(this.#size - 2);
    node.next = null;
    this.#tail = node;
    this.#size -= 1;
    return "Success!";
  }

  find(val) {
    const index = this.#getIndexByVal(val);
    if (index || index === 0) return "Found at: " + index;
    else return "Not Found!";
  }

  toString() {
    let curr = this.#head.next;
    let output = "root -> ";
    let i = 0;

    while (curr) {
      output += `( ${i++}: ${curr.val} ) -> `;
      curr = curr.next;
    }
    return output + "null";
  }

  insertAt(value, index) {
    if (+index === this.#size) return "Error: Use Append";
    else if (+index === 0) return "Error: Use Prepend";
    else if (!this.#checkIndex(+index)) return LinkedList.indexErrorMsg;

    const node = this.#getNodeByIndex(+index - 1);
    node.next = new Node(value, node.next);
    this.#size += 1;
    return "Success!";
  }

  removeAt(index) {
    if (+index === this.#size - 1) return "Error: Use Pop";
    else if (!this.#checkIndex(+index)) return LinkedList.indexErrorMsg;

    const node = this.#getNodeByIndex(+index - 1);
    node.next = node.next.next;
    this.#size -= 1;
    return "Success!";
  }
}

class Node {
  constructor(val = null, next = null) {
    this.val = val;
    this.next = next;
  }
}

const list = new LinkedList();

const LIST_DISPLAY = document.querySelector(".list-display");
const RESPONSE_DIV = document.querySelector(".response");

document.addEventListener("click", clickHandler);

LIST_DISPLAY.textContent = list.toString();

function clickHandler(event) {
  if (event.target.tagName !== "BUTTON") return;

  switch (event.target.id) {
    case "append-b":
      RESPONSE_DIV.textContent = list.append(...getInputVals(event.target));
      break;
    case "prepend-b":
      RESPONSE_DIV.textContent = list.prepend(...getInputVals(event.target));
      break;
    case "at-b":
      RESPONSE_DIV.textContent = list.at(...getInputVals(event.target));
      break;
    case "find-b":
      RESPONSE_DIV.textContent = list.find(...getInputVals(event.target));
      break;
    case "insertAt-b":
      RESPONSE_DIV.textContent = list.insertAt(...getInputVals(event.target));
      break;
    case "removeAt-b":
      RESPONSE_DIV.textContent = list.removeAt(...getInputVals(event.target));
      break;
    case "size-b":
      RESPONSE_DIV.textContent = list.size;
      break;
    case "head-b":
      RESPONSE_DIV.textContent = list.head;
      break;
    case "tail-b":
      RESPONSE_DIV.textContent = list.tail;
      break;
    case "pop-b":
      RESPONSE_DIV.textContent = list.pop();
      break;
  }
  event.target.parentNode
    .querySelectorAll("input")
    .forEach((element) => (element.value = ""));
  LIST_DISPLAY.textContent = list.toString();
}

function getInputVals(element) {
  const inputList = element.parentNode.querySelectorAll("input");
  return Array.from(inputList).map((element) => element.value);
}
