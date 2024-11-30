import { defaultHashFunction } from "./defaults";

export class HashMap {
  constructor(hashFunctionString = "", size = 17, loadFactor = 0.75) {
    if (size && size >= 1) this.data = new Array(parseInt(size));
    else this.data = new Array(17); // if input === "" or invalid

    if (loadFactor && loadFactor > 0 && loadFactor < 1)
      this.loadFactor = loadFactor;
    else this.loadFactor = 0.75; // if input === "" or invalid

    if (hashFunctionString) this.updateHashFunction(hashFunctionString);
    else this.hash = new Function("return " + defaultHashFunction)(); // if input === ""

    this.storedNodes = 0;
    this.storedIndexes = 0;
    this.collIndexes = 0;
    this.collNodes = 0;
  }

  // updates hash function and does a basic check that the function is valid
  updateHashFunction(hashFunctionString) {
    this.hash = new Function("return " + hashFunctionString)();
    this.hash("nba2015");
    this.hash(-48374);
    this.hash(19432.234);
    this.hash(0);
  }

  // To handle errors in hash function
  hashWrapper(key) {
    if (Number.isNaN(key)) return NaN;
    try {
      const hashedKey = this.hash(key);
      console.log(`Key: ${key}, Pre-Mod: ${hashedKey}`);
      return hashedKey % this.data.length; // make sure index is within bounds
    } catch (error) {
      console.log(error);
      return NaN; // return value that will fail
    }
  }

  // validate index from hash function
  checkIndex(index) {
    if (isNaN(index)) return false; // make sure NaN && other similar values will fail
    if (index < 0) return false;
    return true;
  }

  // returns valid index || error message depending on hash value
  getIndexByKey(key) {
    const index = parseInt(this.hashWrapper(key));
    if (!this.checkIndex(index))
      return [false, `Error: Hash of ${key} = Non-Valid Index (${index})`];
    else return [true, index];
  }

  set(key, value) {
    const response = this.addKVPair(key, value);
    this.updateArray();
    return response;
  }

  addKVPair(key, value) {
    // make sure index is valid
    const [valid, index] = this.getIndexByKey(key);
    if (!valid) return index;

    if (!this.data[index]) {
      // create new list at index if no LL
      this.data[index] = new LinkedList(new Node(key, value));
      this.storedIndexes += 1;
      this.storedNodes += 1;
      return "Success! - New List Created at: " + index;
    }

    if (this.data[index].add(new Node(key, value))) {
      // if key does not exist in LL
      this.collNodes += 1;
      this.storedNodes += 1;

      if (this.data[index].size === 2) {
        // if new collision at key
        this.collIndexes += 1;
        return "Success! - New Collision at: " + index;
      } else return "Success! - Another Collision at: " + index;
    } else return "Replaced at: " + index;
  }

  // new array with larger size if above load factor
  updateArray() {
    if (this.storedNodes < this.data.length * this.loadFactor) return;

    console.log("New Array");
    const oldData = this.data; // cannot just create new hashmap as this may run between multiple set()'s

    // make sure new array capacity meets load factor criteria
    let newSize = oldData.length * 2;
    while (newSize * this.loadFactor <= this.storedNodes) {
      newSize = newSize * 2;
    }

    this.data = new Array(newSize);
    this.storedIndexes = 0;
    this.storedNodes = 0;
    this.collIndexes = 0;
    this.collNodes = 0;

    // transfer all nodes from old array
    for (let i in oldData) {
      if (!oldData[i]) continue;
      let curr = oldData[i].head;

      // iterate through linked list and add nodes
      while (curr) {
        this.set(curr.key, curr.value);
        curr = curr.next;
      }
    }
  }

  // return hash in user-friendly string form for display on element
  hashForOutput(key) {
    const hashedKey = this.hashWrapper(key);
    return `${key} hashed to ${hashedKey} -> coerced to ${parseInt(hashedKey)}`;
  }

  getValueByKey(key) {
    const [valid, index] = this.getIndexByKey(key);
    if (!valid) return index;

    if (!this.data[index])
      return `Nothing Found at Key: ${key} -> Index: ${index}`;

    const node = this.data[index].getNodeByKey(key);
    if (node) return `Value of Key (${key}) = ${node.value}`;
    else return `Error: Key (${key}) -> Index: ${index} Not Found`;
  }

  removeNodeByKey(key) {
    const [valid, index] = this.getIndexByKey(key);
    if (!valid) return index;

    if (!this.data[index])
      return `Nothing Found at Key: ${key} -> Index: ${index}`;

    if (!this.data[index].remove(key))
      return `Error: Key (${key}) -> Index: ${index} Not Found`;

    this.storedNodes -= 1;

    // make sure tracked values remain correct
    if (this.data[index].size === 0) {
      this.data[index] = null;
      this.storedIndexes -= 1;
    } else if (this.data[index].size === 1) {
      this.collIndexes -= 1;
      this.collNodes -= 1;
    } else this.collNodes -= 1;
    return `Success - Removed Key: ${key} at Index: ${index}`;
  }

  // returns [["key:value", "key:value"], ["key:value"]]
  toStringArray() {
    let output = [];
    for (let linkedList of this.data) {
      if (linkedList) output.push(linkedList.toStringArray());
    }
    return output;
  }

  // return String of keys or values depending on selector
  getKeysOrValues(selector) {
    const stringArray = this.toStringArray();
    let output = selector === 0 ? "Keys: " : "Values: ";

    for (let i in stringArray) {
      output += stringArray[i]
        .map((element) => element.split(":")[selector])
        .join(", ");
      output += ", ";
    }
    return output;
  }

  getKeysAndValues() {
    const stringArray = this.toStringArray();
    let output = "Key:Value = ";

    for (let i in stringArray) {
      output += stringArray[i].join(", ");
      output += ", ";
    }
    return output;
  }

  // return string for entire hashmap with structure
  toString() {
    let output = "";
    for (let i in this.data) {
      if (!this.data[i]) continue;
      output += `${i}: [ `;
      output += this.data[i].toStringArray().join(", ");
      output += " ], ";
    }
    return output;
  }

  // input multiple K:V pairs
  inputArray(kvArray) {
    console.log("Start Multiple: ");
    // keep track of what has been done
    let addedString = "Added: ";
    let failedString = "Failed: ";
    let replacedString = "Replaced: ";

    for (let [key, value] of kvArray) {
      let response = this.addKVPair(key, value);
      if (response.startsWith("Success")) addedString += `${key}:${value}, `;
      else if (response.startsWith("Replaced"))
        replacedString += `${key}:${value}, `;
      else failedString += `${key}:${value}, `;
    }

    console.log("End Multiple", "\n", "");

    this.updateArray(); // increase size of array if needed

    return [addedString, replacedString, failedString].join("\n");
  }
}

// to store in hashmap.data[i]
class LinkedList {
  constructor(node) {
    this.head = node;
    this.tail = node;
    this.size = 1;
  }

  // return true if appended, false if node.value replaced
  add(node) {
    const oldNode = this.getNodeByKey(node.key);
    if (oldNode) {
      oldNode.value = node.value;
      return false;
    } else {
      this.append(node);
      return true;
    }
  }

  getNodeByKey(key) {
    let curr = this.head;

    while (curr) {
      if (curr.key === key) return curr;
      curr = curr.next;
    }
    return false;
  }

  append(node) {
    this.tail.next = node;
    this.tail = node;
    this.size += 1;
  }

  remove(key) {
    // handle case of only 1 node in list
    if (this.size === 1 && this.head.key === key) {
      this.size = 0;
      return true;
    }

    // handle case of removing head
    if (this.head.key === key) {
      this.head = this.head.next;
      this.size -= 1;
      return true;
    }

    // find node previous to key
    let curr = this.head;
    while (curr && curr.next.key !== key) {
      curr = curr.next;
    }

    // curr === null if not found
    if (!curr) return false;

    // case default: found node
    curr.next = curr.next.next;
    this.size -= 1;
    return true;
  }

  // returns ["key:value", "key:value"]
  toStringArray() {
    let curr = this.head;
    let output = [];
    while (curr) {
      output.push(curr.toString());
      curr = curr.next;
    }
    return output;
  }
}

// to store in LinkedList
class Node {
  constructor(key, value, next = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }

  toString() {
    // wrap in "" if key or value is string
    const key = typeof this.key === "string" ? `"${this.key}"` : this.key;
    const value =
      typeof this.value === "string" ? `"${this.value}"` : this.value;

    return `${key}:${value}`;
  }
}
