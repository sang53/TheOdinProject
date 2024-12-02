const RESPONSE_DIV = document.querySelector("#response");
const TREE_CONTAINER = document.querySelector("#trees");

// sets response output to string
export function outputResponse(string) {
  RESPONSE_DIV.innerText = string;
}

// used as callback in bfs/dfs -> therefore built-in formatting
export function addToResponse(string) {
  if (RESPONSE_DIV.textContent === "") RESPONSE_DIV.textContent += string;
  else RESPONSE_DIV.textContent += ", " + string;
}

// appends tree snapshot to #trees container
export function addTree(string) {
  const tree = document.createElement("div");
  tree.classList.toggle("box");

  // bold post-* trees - initial snapshot of next step
  if (string.startsWith("Post")) string = "<b>" + string + "</b>";

  tree.innerHTML = string;
  TREE_CONTAINER.appendChild(tree);
}

export function clearOutputs() {
  clearTrees();
  clearResponse();
}

// remove all currently displayed trees except the last one
function clearTrees() {
  while (TREE_CONTAINER.firstElementChild !== TREE_CONTAINER.lastElementChild) {
    TREE_CONTAINER.firstChild.remove();
  }
}

function clearResponse() {
  RESPONSE_DIV.innerText = "";
}
