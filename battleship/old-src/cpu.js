import { processShots } from "./battle";
import { Board } from "./Board";
import { makeShips } from "./shipSelect";

export function cpuShips(board, numShips, sides) {
  const shipObjArray = makeShips(numShips, board);
  randomPlacement(shipObjArray, board, sides);
}

export function randomPlacement(shipObjArray, board, sides) {
  // add ships to random coordinate
  shipObjArray.forEach((shipObj) => {
    // generate random keys & rotations until ship fits on board
    let key;
    do {
      key = getRandKey(sides);
      if (Math.random() < 0.5) shipObj.switchOrient();
    } while (!board.checkShip(key, shipObj));

    board.addShip(key, shipObj);
    board.squares.get(key).appendChild(shipObj.shipRef);
  });
}

function getRandKey(sides) {
  return Board.getKeyfromCoords([getRandCoord(sides), getRandCoord(sides)]);
}

function getRandCoord(sides) {
  return Math.floor(Math.random() * sides);
}

const multiShots = new Map();
const singleShots = new Map();

export function getCpuShots(playerObj, numShots) {
  const shotArray = [];

  multiShots.forEach((_, shipObj) => {
    if (shipObj.isSunk()) multiShots.delete(shipObj);
  });
  shotArray.push(...getShots(multiShots, numShots));
  shotArray.push(...getShots(singleShots, numShots - shotArray.length));

  updateMaps(playerObj.board, shotArray);

  return shotArray;
}

function getShots(shotMap, num) {
  const shots = new Set();

  shotMap.forEach((_, keyArray) => {
    while (shots.size < num && keyArray.length) shots.add(keyArray.pop());
  });
  return shots;
}

function updateMaps(boardObj, shots) {
  shots.forEach((key) => {
    if (!boardObj.shipSquares.has(key)) return;
    const shipObj = boardObj.shipSquares.get(key);
    if (multiShots.has(shipObj))
      multiShots
        .get(shipObj)
        .push(...getAdjShots(boardObj, key, shipObj.orient));
    else if (singleShots.has(shipObj)) {
      const keyArray = singleShots.get(shipObj);
      singleShots.delete(shipObj);
      keyArray.push(...getAdjShots(boardObj, key, shipObj.orient));
    }
  });
}

function getCpuShotss(playerObj, numShots, sides) {
  const selectedKeys = new Set();
  const adjacentShots = getSmartShots(playerObj.board, numShots);

  while (adjacentShots.length && selectedKeys.size < numShots) {
    selectedKeys.add(adjacentShots.pop());
  }
  if (selectedKeys.size === numShots) return selectedKeys;
}

function getSmartShots(boardObj, numShots) {
  const shots = new Set();

  const hitShips = new Map();

  // get map of alive ships that have been hit and the hits
  boardObj.shipSquares.forEach((shipObj, key) => {
    if (boardObj.shotSquares.has(key) && !shipObj.isSunk())
      if (hitShips.has(shipObj)) hitShips.get(shipObj).push(key);
      else hitShips.set(shipObj, [key]);
  });

  const multiShot = new Map();
  const singleShot = new Map();

  // separate ships into hit once & hit multiple times
  hitShips.forEach((shipObj, keyArray) => {
    if (keyArray.length > 1) multiShot.set(shipObj, keyArray);
    else singleShot.set(shipObj, keyArray);
  });

  // if ship is sunk remove from contention
  // if more than 2 shots on same ship => get adjacent shots in orientation
  // 1 shot on ship => get adjacent shots in all directions
  // fill out rest of shots with random shots
}

function getAdjShots(boardObj, key, orient = "both") {
  const shotArray = [];
  const [x, y] = Board.getCoords(key);
  if (orient === "horizontal" || orient === "both") {
    for (const newX of [x + 1, x - 1])
      shotArray.push(Board.getKeyfromCoords(newX, y));
  }
  if (orient === "vertical" || orient === "both") {
    for (const newY of [y + 1, y - 1])
      shotArray.push(Board.getKeyfromCoords(x, newY));
  }
  return shotArray;
}
