import { Summary, Siding, Underlayer } from "./description";
import Compute from "./functions/compute";
export default class Base {
  constructor() {
    this.module = 0;
    this.pitch = 0;
    this.compute = Compute;
    this.items = [];
    this.records = [];
    this.rows = [];
    this.summary = new Summary();
    this.siding = new Siding();
    this.underlayer = new Underlayer();
    // this.standard = {};
  }
  extractData(dtx) {
    this.module = dtx.houseStructure.gridModule / 1000;
    // this.standard = areaData.standard;
    // this.rows = areaData.items
    this.addItems();
  }
  getIDnumber(item, index) {
    if (index == 0) {
      if (item.l_grid == "") {
        item.num = "";
      } else {
        item.num = 1;
      }
    } else {
      if (item.l_grid == "") {
        item.num = "";
      } else if (
        this.items[index - 1].l_grid == "" ||
        (this.items[index - 1].l_grid == undefined &&
          this.items[index - 1].description == "") ||
        this.items[index - 1].description == "-"
      ) {
        item.num = 1;
        item.description;
        // console.log('if empty')
      } else if (this.items[index - 1].l_grid) {
        item.num = this.items[index - 1].num + 1;
        item.description = this.items[index - 1].description;
        // console.log('if not')
      }
    }
  }
  addItems(length = 15) {
    this.items = [];
    for (let i = 0; i <= length; i++) {
      this.items.push({
        num: "",
        l_grid: "",
        l_eaves: "",
        l_eaves1: "",
        w_grid: "",
        w_eaves: "",
        description: "",
        total: "",
        pitch: "",
      });
    }
  }
  addItem() {
    this.items.push({
      num: "",
      l_grid: "",
      l_eaves: "",
      l_eaves1: "",
      w_grid: "",
      w_eaves: "",
      description: "",
      total: "",
    });
  }
  computeRow(item, standard) {
    if (item.description !== "" && item.description !== "-") {
      let type = item.description.split(" ");
      if (type[0] == "MR" || type[0] == "SP") {
        let areaSqm =
          Number(
            item.l_grid * this.module +
              Number(item.l_eaves) +
              Number(item.l_eaves1)
          ) * Number(item.w_eaves);
        this.pitch = standard[type[0].toLowerCase()][type[1]][type[3]].value;
        let pitchFactor = standard[type[0].toLowerCase()][type[1]][
          type[3]
        ].factor();
        item.pitch = pitchFactor;
        if (Number(areaSqm) == 0 || isNaN(areaSqm) || areaSqm == undefined) {
          item.total = "-";
        } else {
          item.total = areaSqm;
        }
      } else if (type[0] == "PH") {
        let areaSqm =
          Number(
            item.l_grid * this.module +
              Number(item.l_eaves) +
              Number(item.l_eaves1)
          ) * Number(item.w_eaves);
        item.total = areaSqm;
      } else {
        let areaSqm =
          Number(item.l_grid) *
          this.module *
          (Number(item.w_grid) * this.module);
        item.total = areaSqm;
      }
      //will not compute
    } else {
      item.total = "-";
    }
  }
}
