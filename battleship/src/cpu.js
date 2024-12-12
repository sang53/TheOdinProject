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
