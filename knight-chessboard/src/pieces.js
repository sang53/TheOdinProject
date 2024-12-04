import { Inputs } from "./inputsObj";

export function getMoves(x, y) {
  return movesByPiece[Inputs.piece].map(([x_offset, y_offset]) => [
    x + x_offset,
    y + y_offset,
  ]);
}

const movesByPiece = {
  knight: [
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
  ],
};
