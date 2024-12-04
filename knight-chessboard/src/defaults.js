export const squareDiffStr = `function squaresDiff(x, y) {
  return Math.abs(x - this.endPos[0]) + Math.abs(y - this.endPos[1]);
}`;

export const distanceStr = `function distance(x, y) {
  return (x - this.endPos[0]) ** 2 + (y - this.endPos[1]) ** 2;
}`;

// uses the fact that knight moves ~2 distance per jump
export const distanceFloorStr = `function squareDiffMod(x, y) {
  return Math.floor(((x - this.endPos[0]) ** 2 + (y - this.endPos[1]) ** 2) / 2);
}`;
