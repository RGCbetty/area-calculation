import { Standards } from "./standards";
import compute from "./functions/compute";

export default class Area extends Standards {
  constructor() {
    super();
  }
  summaryTotal() {
    let total = 0;
    for (let i = 1; i <= 3; i++) {
      total += Object.keys(this[`${i}F`])
        .map((key) => this[`${i}F`][key].value)
        .reduce((previous, current) => previous + current);
    }
    return isNaN(total) ? 0 : total;
  }
  eachFloor(items, roofType, type = "area", perimeterFloors) {
    if (roofType == "PH") {
      let totalEachFloor = compute(items, `${roofType} ${type}`);
      if (totalEachFloor[0] !== 0) {
        let deduct = 0;
        if (perimeterFloors) {
          if (type == "area") {
            this.PH.value = totalEachFloor[0] + perimeterFloors;
          }
        } else {
          if (type == "area") {
            this.PH.value = totalEachFloor[0];
          }
        }
        if (type == "deduct") {
          deduct = totalEachFloor[0] + perimeterFloors;
          if (this.PH.value) this.PH.value += deduct;
        }
      } else {
        if (type == "deduct") {
          if (!this.PH.value) this.PH.value = totalEachFloor[0];
        }
        // this.PH.value  = totalEachFloor[0]
      }
    } else {
      for (let i = 1; i <= 3; i++) {
        for (let j = 1; j <= 3; j++) {
          let totalEachFloor = compute(
            items,
            `${roofType} ${i}F ${type} p${j}`
          );
          // console.log(totalEachFloor)
          if (totalEachFloor[0] !== 0) {
            let deduct = 0;
            if (perimeterFloors) {
              if (type == "area") {
                this[`${i}F`][`p${j}`].value =
                  totalEachFloor[0] + perimeterFloors[i - 1];
              }
            } else {
              this[`${i}F`][`p${j}`].value = totalEachFloor[0];
            }
            if (type == "deduct") {
              deduct = totalEachFloor[0] + perimeterFloors[i - 1];
              this[`${i}F`][`p${j}`].value += deduct;
            }
          } else {
            if (type == "deduct") {
              if (this[`${i}F`][`p${j}`].value) continue;
              this[`${i}F`][`p${j}`].value = totalEachFloor[0];
            }

            this[`${i}F`][`p${j}`].value = totalEachFloor[0];
          }
        }
      }
    }
  }
}
