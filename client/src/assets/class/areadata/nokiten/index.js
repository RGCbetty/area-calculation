import Hangingwall from "./hangingwall";
import { Dehairy } from "../../../BPU/Tables";
export default class Nokiten extends Hangingwall {
  constructor() {
    super();
    this.total1F = 0;
    this.total2F = 0;
    this.total3F = 0;
    this.total = 0;
  }
  computeAll(item) {
    if (item.description) {
      this.hwallcount();
      this.balconycount();
      this.wallEavesMR();
      this.wallEavesSP();
      this.hangingWall();
      this.balcony();
      this.parapet1F();
      this.garage1F();
      this.Fujyoshitsu1F();
      this.PHeaves();
      // this.checkDehairi(item)
    }
  }

  passTotal(items) {
    const changeTotal = (id, value) => {
      items.find((item) => {
        if (item.id == id) {
          if (item.remarks == "Auto" && value !== 0) {
            let bool = confirm(
              `${item.id} has a value. Do you want to overwrite?`
            );
            if (bool == true) {
              item.value = value;
              item.remarks = "Manually Computed";
            }
          } else {
            if (item.remarks !== "Auto") {
              item.value = value;
              if (value) {
                let bool = confirm(
                  `${item.id} has a value. Are you sure do you want to save?`
                );
                if (bool == true) {
                  item.value = value;
                  item.remarks = "Manually Computed";
                }
              } else {
                item.remarks = "Manual";
              }
            }
          }
        }
      });
    };
    changeTotal("990214", this.totalSummary);
  }

  checkDehairi(item, index, standard) {
    let newItem = {};
    Object.assign(newItem, item);

    if (item.description) {
      let type = item.description.split(" ");
      if (type[0] == "MR" || type[0] == "SP") {
        this.pitch = standard[type[0].toLowerCase()][type[1]][type[3]].value;
        let dehairi =
          Dehairy[standard.plywoodThickness][this.pitch] == undefined
            ? 0
            : Dehairy[standard.plywoodThickness][this.pitch];
        let max = dehairi.LS;
        max = dehairi.HS > max ? dehairi.HS : max;
        max = dehairi.KS > max ? dehairi.KS : max;
        this.items[index].num = newItem.num;
        this.items[index].l_grid = newItem.l_grid;
        this.items[index].description = newItem.description;
        this.items[index].l_eaves =
          newItem.l_eaves <= max ? newItem.l_eaves : "";
        this.items[index].l_eaves1 =
          newItem.l_eaves1 <= max ? newItem.l_eaves1 : "";
        this.items[index].w_eaves =
          newItem.w_eaves <= max ? newItem.w_eaves : "";
        this.items[index].pitch = newItem.pitch;
        this.items[index].total =
          Number(
            this.items[index].l_grid * this.module +
              Number(this.items[index].l_eaves) +
              Number(this.items[index].l_eaves1)
          ) * Number(this.items[index].w_eaves);

        // if(!this.items[index].w_eaves){
        //   this.items[index] = {}
        // }
      }
    }
  }
  get overAll1F() {
    return (
      this.siding.floorPlus[0] +
      this.siding.hangingwall[0] +
      this.siding.penthouse[0] +
      this.siding.fujyoshitsu +
      this.summary.floors[0]
    );
  }
  get overAll2F() {
    return (
      this.siding.floorPlus[1] +
      this.siding.hangingwall[1] +
      this.siding.penthouse[1] +
      this.summary.floors[1]
    );
  }
  get overAll3F() {
    return (
      this.siding.floorPlus[2] +
      this.siding.hangingwall[2] +
      this.siding.penthouse[2] +
      this.summary.floors[2]
    );
  }
  get totalSummary() {
    return this.overAll1F + this.overAll2F + this.overAll3F;
  }
  get balconytotal() {
    return this.siding.balcony.reduce((total, value) => total + value);
  }
  get hangingwalltotal() {
    return (
      this.siding.hangingwall.reduce((total, value) => total + value) +
      this.siding.parapet
    );
  }
  get partialEaves1F() {
    return (
      this.siding.floorPlus[0] +
      this.siding.penthouse[0] +
      this.siding.parapet +
      this.summary.floors[0]
    );
  }
  get partialEaves2F() {
    return (
      this.siding.floorPlus[1] +
      this.siding.penthouse[1] +
      this.summary.floors[1]
    );
  }
  get partialEaves3F() {
    return (
      this.siding.floorPlus[2] +
      this.siding.penthouse[2] +
      this.summary.floors[2]
    );
  }
  get totalEaves() {
    return this.partialEaves1F + this.partialEaves2F + this.partialEaves3F;
  }
}
