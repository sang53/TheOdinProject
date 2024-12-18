import { Board } from "./Board";
import { settings } from "./gameSettings";

export function randomShipPlace(board) {
  const randKeys = getShipKeys(board);

  randKeys.forEach(([ship, key]) => {
    board.addShip(ship, key);
    board.squares.get(key).appendChild(ship.shipRef);
  });
}

function getShipKeys(board) {
  const keys = [];
  board.aliveShips.forEach((ship) => {
    let randKey;
    do {
      randKey = getRandomKey();
      if (Math.random() < 0.5) ship.switchOrient();
    } while (!board.checkSquare(ship, randKey));
    keys.push([ship, randKey]);
  });
  return keys;
}

function getRandomKey(sides = settings.sides) {
  return Board.getKey([
    Math.floor(Math.random() * sides),
    Math.floor(Math.random() * sides),
  ]);
}

export function getCPUShots(oppBoard, numShots) {
  const [multiHits, singleHit] = getHits(oppBoard);
  const shots = new Set();

  multiHits.forEach((keyArray, orient) => {
    keyArray.forEach((key) => {
      getAdjShots(key, orient).forEach((adjkey) => {
        if (!oppBoard.shotSquares.has(adjkey)) shots.add(adjkey);
      });
    });
  });
  if (trimShots(shots, numShots)) return shots;

  singleHit.forEach((key) => {
    getAdjShots(key).forEach((adjkey) => {
      if (!oppBoard.shotSquares.has(adjkey)) shots.add(adjkey);
    });
  });
  if (trimShots(shots, numShots)) return shots;

  while (shots.size < numShots) {
    const randkey = getRandomKey();
    if (!oppBoard.shotSquares.has(randkey)) shots.add(randkey);
  }

  return shots;
}

function getHits(oppBoard) {
  const hits = new Map();

  oppBoard.shipSquares.forEach(([ship], key) => {
    if (oppBoard.shotSquares.has(key)) {
      if (!hits.has(ship)) hits.set(ship, []);
      hits.get(ship).push(key);
    }
  });

  const multiHits = new Map([
    ["vertical", []],
    ["horizontal", []],
  ]);
  const singleHit = new Set();

  hits.forEach((keyArray, ship) => {
    if (keyArray.length === 1) singleHit.add(keyArray[0]);
    else multiHits.get(ship.orient).push(...keyArray);
  });

  return [multiHits, singleHit];
}

function getAdjShots(key, orient = "both") {
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

function trimShots(shots, numShots) {
  if (shots.size < numShots) return false;
  if (shots.size > numShots) {
    const shotIterator = shots.keys();
    while (shots.size > numShots) {
      shots.delete(shotIterator.next().value);
    }
  }
  return true;
}
