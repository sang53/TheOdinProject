export const settings = {
  sides: 10,
  ships: 5,
  shotType: "Cluster",
  opp: "CPU",
};

export function changeSettings(inputObj) {
  settings.sides = inputObj.sides || settings.sides;
  settings.ships = inputObj.ships || settings.ships;
  settings.shotType = inputObj.shot;
  settings.opp = inputObj.opp;
}
