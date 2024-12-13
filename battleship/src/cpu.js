import { Board } from "./Board";
import { Ship } from "./Ship";

export function cpuShips(board, numShips, sides) {
  const shipObjArray = getCpuShips(numShips);

  // add ships to random coordinate
  shipObjArray.forEach((shipObj) => {
    // generate random keys & rotations until ship fits on board
    let key;
    do {
      key = getRandKey(sides);
      if (Math.random() < 0.5) shipObj.switchOrient();
    } while (!board.checkShip(key, shipObj));

    board.addShip(key, shipObj);
  });
}

function getCpuShips(numShips) {
  const shipArray = [];
  for (let i = 1; i <= numShips; i++) {
    shipArray.push(new Ship(i));
  }
  return shipArray;
}

function getRandKey(sides) {
  return Board.getKeyfromCoords([getRandCoord(sides), getRandCoord(sides)]);
}

function getRandCoord(sides) {
  return Math.floor(Math.random() * sides);
}
