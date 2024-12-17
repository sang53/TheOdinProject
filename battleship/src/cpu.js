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
