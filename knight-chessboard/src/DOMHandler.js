const BOARD = document.querySelector("#board");
const RESPONSE = document.querySelector("#response");
const TIME = document.querySelector("#time");

// keep track of coloured squares to reset
const coloured = [];

export function makeBoard(sides = 8) {
  clearBoard();
  addSquares(sides);
  BOARD.style.grid = `repeat(${sides}, 1fr) / repeat(${sides}, 1fr)`;
}

function clearBoard() {
  while (BOARD.firstElementChild) {
    BOARD.firstElementChild.remove();
  }
}

function addSquares(sides) {
  for (let i = 0; i < sides; i++) {
    for (let j = 0; j < sides; j++) {
      BOARD.appendChild(makeSquare(i, j));
    }
  }
}

function makeSquare(i, j) {
  const square = document.createElement("div");
  square.classList.toggle("square");
  square.id = `square-${j}-${i}`;
  return square;
}

export function displayResults(movesArray) {
  movesArray.reverse();
  colourSquares(movesArray);
  colourEnds(movesArray[0], movesArray.at(-1));
  updateOutput(movesToString(movesArray));
}

// colour start & end squares differnt colours
function colourEnds(startPos, endPos) {
  const startSquare = BOARD.querySelector(
    `#square-${startPos[0]}-${startPos[1]}`,
  );
  startSquare.style.backgroundColor = "var(--square-start)";
  startSquare.textContent = "Start";

  const endSquare = BOARD.querySelector(`#square-${endPos[0]}-${endPos[1]}`);
  endSquare.style.backgroundColor = "var(--square-end)";
  endSquare.textContent = "End";
}

// colour & number jumped squares
function colourSquares(squaresArray) {
  coloured.forEach(
    (element) => (element.style.backgroundColor = "var(--bgc-3)"),
  );

  squaresArray.forEach(([x, y], i) => {
    const square = BOARD.querySelector(`#square-${x}-${y}`);
    square.style.backgroundColor = "var(--square-step)";
    square.textContent = i;
    coloured.push(square);
  });
}

export function updateOutput(string) {
  RESPONSE.innerText = string;
}

// converts array of jumps to string for output
function movesToString(movesArray) {
  return `Jumps: ${movesArray.length - 1}\n` + movesArray.join("\n");
}

export function displayTime(time0, time1, time2) {
  TIME.innerText = `MinHeap: ${time1 - time0}ms\nBFS: ${time2 - time1}ms`;
}
