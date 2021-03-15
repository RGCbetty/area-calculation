import BBItem from "./bbItems";
import { BalconyWall } from "../../../../../assets/BPU/Tables";

export default class BelowBalcony extends BBItem {
  constructor() {
    super();
    this.bbData = [];
  }

  //fill below balcony data container using the data provided on BPU balcony
  getBBdata() {
    let gtBal = this.balconyData.filter((o) => o.outsideMaterial == "GT");
    this.bbData = [];
    //loop through the filtered records and create a new object using the available data per item
    gtBal.forEach((o) => {
      let item = {};

      item.bbBalcony = `${o.floorLevel}-${o.balconyName}-${o.type}`;
      item.bbFloorLevel =
        o.floorLevel.slice(0, 1) == "2"
          ? "1階"
          : o.floorLevel.slice(0, 1) == "3"
          ? "2階"
          : `${this.houseLevel.slice(0, 1)}階`;
      item.bbGrid = "";
      item.bbMeter = "";
      item.bbHeight =
        o.floorLevel == "PH"
          ? BalconyWall.BB["TC"][`${this.kanabakari}-${this.houseLevel}.PH`]
          : BalconyWall.BB["TC"][
              `${this.kanabakari}-${this.houseLevel}.${o.floorLevel.slice(
                0,
                1
              )}F`
            ];
      item.bbArea = 0;
      this.bbData.push(item);
    });
  }

  //called when changes on Balcony Data (BPU) was made
  reloadBBdata(item) {
    //determine the index of modified balcony data
    let index = this.balconyData.indexOf(item);

    //create a new object using the new balcony data
    let newItem = {};
    newItem.bbBalcony = `${item.floorLevel}-${item.balconyName}-${item.type}`;
    newItem.bbFloorLevel =
      item.floorLevel.slice(0, 1) == "2"
        ? "1階"
        : item.floorLevel.slice(0, 1) == "3"
        ? "2階"
        : `${this.houseLevel.slice(0, 1)}階`;

    //check if the new balcony data is an additional data
    if (this.bbData[index] == undefined) {
      newItem.bbGrid = "";
      newItem.bbMeter = "";
      newItem.bbArea = 0;
      newItem.bbHeight =
        item.floorLevel == "PH"
          ? BalconyWall.BB["TC"][`${this.kanabakari}-${this.houseLevel}.PH`]
          : BalconyWall.BB["TC"][
              `${this.kanabakari}-${this.houseLevel}.${item.floorLevel.slice(
                0,
                1
              )}F`
            ];

      //add new data
      this.bbData.push(newItem);
    } else {
      newItem.bbGrid = this.bbData[index].bbGrid;
      newItem.bbMeter = this.bbData[index].bbMeter;
      newItem.bbArea = this.bbData[index].bbArea;

      //checks and copies below balcony height
      if (this.bbData[index].bbHeight) {
        newItem.bbHeight = this.bbData[index].bbHeight;
      } else {
        newItem.bbHeight =
          item.floorLevel == "PH"
            ? BalconyWall.BB["TC"][`${this.kanabakari}-${this.houseLevel}.PH`]
            : BalconyWall.BB["TC"][
                `${this.kanabakari}-${this.houseLevel}.${item.floorLevel.slice(
                  0,
                  1
                )}F`
              ];
      }

      //replace the old below balcony data
      this.bbData.splice(index, 1, newItem);
    }
  }

  checkRemove(array) {
    for (let x = array.length - 1; x >= 0; x--) {
      this.bbData.splice(array[x], 1);
    }
  }

  //computation of below balcony area
  computeArea(item) {
    item.bbGrid = !item.bbGrid ? "" : item.bbGrid;
    item.bbMeter = !item.bbMeter ? "" : item.bbMeter;
    let grid =
      item.bbGrid.length != 0 ? parseFloat(item.bbGrid) * this.module : 0;
    let meter = item.bbMeter.length != 0 ? parseFloat(item.bbMeter) : 0;
    let height = item.bbHeight.length != 0 ? parseFloat(item.bbHeight) : 0;

    item.bbArea = (grid + meter) * height;
    item.bbArea = this.round(parseFloat(item.bbArea), 3);

    //splice method was used to due to vue's reactivity
    let index = this.bbData.indexOf(item);
    this.bbData.splice(index, 1, item);
  }

  ///for Wall Summary
  totalBbData(params) {
    return this.bbData
      .filter((o) => o.bbFloorLevel.slice(0, 1) == params)
      .map((o) => o.bbArea)
      .reduce((a, b) => a + b, 0);
  }
}
