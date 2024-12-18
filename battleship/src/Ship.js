import { makeElement, toggleClass } from "./DOM";
import { settings } from "./gameSettings";

export class Ship {
  constructor(length, shipRef) {
    this.length = length;
    this.hits = 0;
    this.orient = "horizontal";
    this.shipRef = shipRef;
  }

  switchOrient() {
    this.orient = this.orient === "horizontal" ? "vertical" : "horizontal";
  }

  receiveHit(num) {
    toggleClass(this.shipRef.querySelector(`.num-${num}`), "hit");
    return ++this.hits === this.length;
  }

  static makeShips(num = settings.ships) {
    const shipSet = new Set();
    for (let length = 1; length <= num; length++) {
      shipSet.add(new Ship(length, Ship.#buildShip(length)));
    }
    return shipSet;
  }

  static #buildShip(length) {
    const shipRef = makeElement("div", [
      ["class", "ship"],
      ["id", `ship-${length}`],
    ]);
    for (let i = 0; i < length; i++) {
      shipRef.appendChild(Ship.#makeSquare(i));
    }
    return shipRef;
  }

  static #makeSquare(i) {
    return makeElement("div", [["class", `square num-${i}`]]);
  }
}
