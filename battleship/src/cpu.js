import { Board } from "./Board";
import { Ship } from "./Ship";

export function cpuShips(board, numShips, sides) {
  const shipObjArray = getCpuShips(numShips);

  // add ships to random coordinate
  shipObjArray.forEach((shipObj) => {
    let key = getRandKey(sides);
    // generate random keys until ship fits on board
    while (!board.checkShip(key, shipObj)) {
      key = getRandKey(sides);
    }
    board.addShip(key, shipObj);
  });
}

function getCpuShips(numShips) {
  const shipArray = [];
  for (let i = 0; i < numShips; i++) {
    shipArray.push(new Ship(i));
  }
  return shipArray;
}

function getRandKey(sides) {
  return Board.getKeyfromCoords(getRandCoord(sides), getRandCoord(sides));
}

function getRandCoord(sides) {
  return Math.floor(Math.random() * sides);
}
