import { toggleControlButton, updateController } from ".";
import { Board } from "./Board";
import { toggleClass, toggleShipsDisplay } from "./DOMOutput";

let shots;
let boardObj;
let selectedKeys;

export function battleScreen(players) {
  // show all boards
  players.forEach((player) => {
    toggleClass(player.board.boardRef, "hidden");
  });

  // hide all ships
  players.forEach((player) => {
    toggleShipsDisplay(player.board);
  });
}

export function setupShotSelect(hitBoardObj, numShots, currBoardObj) {
  boardObj = hitBoardObj;
  shots = numShots;
  selectedKeys = new Set();

  boardObj.boardRef.addEventListener("click", selectShot);
  toggleShipsDisplay(currBoardObj);
}

function selectShot(event) {
  if (event.target === boardObj.boardRef) return;

  const key = Board.getKeyfromId(event.target.id);
  // case: already shot square
  if (!boardObj.checkShot(key)) return;
  // case: selected squre => deselect
  if (selectedKeys.has(key)) selectedKeys.delete(key);
  else if (selectedKeys.size < shots) selectedKeys.add(key);
  // case: 1 shot & select another square => move shot to new square
  else if (shots === 1) {
    const prevKey = selectedKeys.keys().next().value;
    toggleClass(boardObj.squares.get(prevKey), "selected");
    selectedKeys.delete(prevKey);
    selectedKeys.add(key);
  } else return; // case: >1 shot & select another square

  toggleClass(event.target, "selected");
  toggleControlButton(selectedKeys.size === shots);
}

export function processShots(hitPlayer, shotKeys = selectedKeys) {
  const hitShips = [];
  const currBoardObj = hitPlayer.board;

  // register each shot & get hit ships
  shotKeys.forEach((shotKey) => {
    const hitShipObj = currBoardObj.receiveShot(shotKey);
    const hitSquareRef = currBoardObj.squares.get(shotKey);

    if (hitShipObj) {
      hitShips.push(hitShipObj);

      // display hit
      toggleClass(hitSquareRef, "hit");
      if (hitShipObj.boardSquares.has(shotKey))
        toggleClass(hitShipObj.boardSquares.get(shotKey), "hit");
    } else toggleClass(hitSquareRef, "shot");
  });

  // register hit ships
  hitShips.forEach((shipObj) => {
    if (shipObj.receiveHit()) hitPlayer.aliveShips--;
  });

  updateController(
    `Hits: ${hitShips.length}\nMisses: ${shots - hitShips.length}`,
    "Continue",
  );

  if (shotKeys === selectedKeys) resetShotSelect(currBoardObj);
}

function resetShotSelect(currBoardObj) {
  boardObj.boardRef.removeEventListener("click", selectShot);
  toggleShipsDisplay(currBoardObj);
  selectedKeys.forEach((key) => {
    toggleClass(boardObj.squares.get(key), "selected");
  });
  boardObj = null;
  shots = null;
  selectedKeys = null;
}
