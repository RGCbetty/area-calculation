import { Standards } from "./standards";
import compute from "../subclass/functions/compute";
export default class Deduct extends Standards {
  constructor() {
    super();
  }
  eachFloor(items, roofType, type = "area", perimeterFloors) {
    // console.log(this)
    for (let i = 1; i <= 3; i++) {
      for (let j = 1; j <= 3; j++) {
        let totalEachFloor = compute(items, `${roofType} ${i}F ${type} p${j}`);
        if (totalEachFloor[0] !== 0) {
          let deduct = 0;

          if (type == "deduct") {
            deduct = totalEachFloor[0] + perimeterFloors[i - 1];
            this[`${i}F`][`p${j}`].value += deduct;
            // console.log(deduct)
            // console.log(totalEachFloor)
            // console.log(perimeterFloors[i-1])
          }
        } else {
          if (type == "deduct") {
            if (this[`${i}F`][`p${j}`].value) continue;
            this[`${i}F`][`p${j}`].value = totalEachFloor[0];
          }
          this[`${i}F`][`p${j}`].value = totalEachFloor[0];
        }

        // totalEachFloor !== 0 ? this[`${i}F`][`p${j}`].value = totalEachFloor : this[`${i}F`][`p${j}`].value = totalEachFloor;
        // totalEachFloor !== 0 ? this[`${i}F`][`p${j}`].value = totalEachFloor : 0;
      }
    }
  }
}
