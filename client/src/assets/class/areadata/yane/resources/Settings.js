class Items extends Array {
  constructor() {
    super();
  }
}

export default class Settings {
  constructor() {
    this.items = new Items();
    this.module = 0;

    this.rows = [];
    this.pitch = 0;
    this.slope = 0;
    this.flat = 0;
  }
  computeRow(item, standard) {
    if (item.description !== "" && item.description !== "-") {
      let type = item.description.split(" ");
      if (type[2] == "area") {
        let areaSqm =
          (Number(item.l_grid * this.module) +
            Number(item.l_eaves) +
            Number(item.l_eaves1)) *
          (Number(item.w_grid * this.module) +
            Number(item.w_eaves) +
            Number(item.w_eaves1));
        if (type[0] == "MR" || type[0] == "SP") {
          // this.pitch = this.standard[ type[0].toLowerCase() ][ type[1] ][ type[3] ].factor()
          // console.log(standard)
          let pitchFactor = standard[type[0].toLowerCase()][type[1]][
            type[3]
          ].factor();
          item.pitch = pitchFactor;
          item.roofstyle =
            standard[type[0].toLowerCase()][type[1]][`roofStyle`];
        }
        if (Number(areaSqm) == 0 || isNaN(areaSqm) || areaSqm == undefined) {
          item.total = "-";
        } else {
          // Number(Math.round((areaSqm)+'e'+3)+'e-'+3)
          item.total = Number(Math.round(areaSqm + "e" + 3) + "e-" + 3);
        }
        // this.mainroof.area.eachFloor(this.items, this.pitch, 'MR')
        // this.solarpanel.area.eachFloor(this.items, this.pitch, 'SP')
      } else if (type[0] == "MR" && type[1] == "perimeter") {
        let areaSqm =
          Number(item.l_grid * this.module) +
          Number(item.l_eaves) +
          Number(item.l_eaves1);
        item.total = areaSqm;
      } else if (type[2] == "deduct") {
        let areaSqm =
          (Number(item.l_grid * this.module) +
            Number(item.l_eaves) +
            Number(item.l_eaves1)) *
          (Number(item.w_grid * this.module) +
            Number(item.w_eaves) +
            Number(item.w_eaves1));
        let pitchFactor = standard[type[0].toLowerCase()][type[1]][
          type[3]
        ].factor();
        item.pitch = pitchFactor;
        item.total = -Math.abs(
          Number(Math.round(areaSqm + "e" + 3) + "e-" + 3)
        );
      } else if (type[0] == "L" && type[1] == "perimeter") {
        let areaSqm =
          Number(item.l_grid * this.module) +
          Number(item.l_eaves) +
          Number(item.l_eaves1);
        item.total = Number(Math.round(areaSqm + "e" + 3) + "e-" + 3);
      } else if (type[0] == "PH") {
        if (type[1] == "area") {
          let area =
            (Number(item.l_grid * this.module) +
              Number(item.l_eaves) +
              Number(item.l_eaves1)) *
            (Number(item.w_grid * this.module) +
              Number(item.w_eaves) +
              Number(item.w_eaves1));
          let pitchFactor = standard[`mr`][type[0]].factor();
          item.pitch = pitchFactor;
          item.total = area;
        } else if (type[1] == "deduct") {
          let areaDeduct =
            (Number(item.l_grid * this.module) +
              Number(item.l_eaves) +
              Number(item.l_eaves1)) *
            (Number(item.w_grid * this.module) +
              Number(item.w_eaves) +
              Number(item.w_eaves1));
          let pitchFactor = standard[`mr`][type[0]].factor();
          item.pitch = pitchFactor;
          // Number(Math.round((areaDeduct)+'e'+3)+'e-'+3)
          item.total = -Math.abs(
            Number(Math.round(areaDeduct + "e" + 3) + "e-" + 3)
          );
        } else if (type[1] == "perimeter") {
          let perimeter =
            Number(item.l_grid * this.module) +
            Number(item.l_eaves) +
            Number(item.l_eaves1);
          let pitchFactor = standard[`mr`][type[0]].factor();
          item.pitch = pitchFactor;
          // Number(Math.round((perimeter)+'e'+3)+'e-'+3)
          item.total = Number(Math.round(perimeter + "e" + 3) + "e-" + 3);
        }
      }
      //will not compute
    } else {
      item.total = "-";
    }
  }
  // computeRow(item){
  //   if ( item.description !== '' && item.description !== '-' ){
  //     let type = item.description.split(" ")
  //       if((type[0] == 'MR' && type[2] == 'area') || (type[0] == 'SP' && type[2] == 'area')){
  //         let areaSqm = (Number((item.l_grid * this.module))+ Number(item.l_eaves)+ Number(item.l_eaves1)) * (Number((item.w_grid * this.module))+ Number(item.w_eaves)+ Number(item.w_eaves1))
  //         this.pitch = this.standard[ type[0].toLowerCase() ][ type[1] ][ type[3] ].factor()
  //         let pitchFactor = this.standard[ type[0].toLowerCase() ][ type[1] ][ type[3] ].factor()
  //         item.pitch = pitchFactor
  //         if(Number(areaSqm) == 0 || isNaN(areaSqm) || areaSqm == undefined){
  //           item.total = '-'
  //         } else {
  //           item.total = areaSqm
  //         }
  //       } else if ( type[0] == 'PH') {
  //         let areaSqm = Number((item.l_grid * this.module) + Number(item.l_eaves)+ Number(item.l_eaves1))   * Number(item.w_eaves)
  //         item.total = areaSqm
  //       }
  //       else {
  //         let areaSqm = (Number(item.l_grid) * this.module) * ( Number(item.w_grid) * this.module)
  //         item.total = areaSqm
  //       }
  //   //will not compute
  //   } else {
  //     item.total = '-'
  //   }
  // }

  getIDnumber(item, index) {
    if (index == 0) {
      if (item.l_grid == "") {
        item.num = "";
      } else {
        item.num = 1;
      }
    } else {
      if (item.grids == "") {
        item.num = "";
      } else if (
        this.items[index - 1].l_grid == "" ||
        (this.items[index - 1].l_grid == undefined &&
          this.items[index - 1].description == "") ||
        this.items[index - 1].description == "-"
      ) {
        item.num = 1;
        item.description;
      } else if (
        this.items[index - 1].l_grid ||
        this.items[index - 1].description
      ) {
        item.num = this.items[index - 1].num + 1;
        item.description = this.items[index - 1].description;
      }
    }
  }

  addItems(length = 20) {
    this.items = [];
    for (let i = 1; i <= length; i++) {
      this.items.push({
        num: " ",
        l_grid: "",
        l_eaves: "",
        l_eaves1: "",
        w_grid: "",
        w_eaves: "",
        w_eaves1: "",
        description: "",
        total: "",
        pitch: "",
      });
    }
  }
}
