import { Inputs } from "./inputsObj";
import { BFS } from "./bfs";
import { MinHeap } from "./heap";

export function test(num) {
  Inputs.sides = num;
  console.log("Testing:");
  try {
    testEveryCombo(num);
  } catch (error) {
    console.log(error);
  }
  console.log("Done");
}

function testEveryCombo(num) {
  for (let y = 0; y < Inputs.sides; y++) {
    for (let x = 0; x < Inputs.sides; x++) {
      for (let y2 = 0; y2 < Inputs.sides; y2++) {
        for (let x2 = 0; x2 < Inputs.sides; x2++) {
          Inputs.setPos([`${x},${y}`, `${x2},${y2}`]);
          if (BFS.startSearch().length !== MinHeap.startSearch().length)
            throw new Error(`${x},${y}`, `${x2},${y2}`);
        }
      }
    }
  }
}
