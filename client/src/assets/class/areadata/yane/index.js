import Settings from "./resources/Settings";
import Mainroof from "./subclass/Mainroof";
import Solarpanel from "./subclass/Solarpanel";
import Lperimeter from "./subclass/Lperimeter";
import Penthouse from "./subclass/Penthouse";
import Total from "./subclass/Total";
// import Standards from "./subclass/Mainroof/subclass/standards/index"

export default class Yane extends Settings {
  constructor() {
    super();
    // this.standards = new Standards();
    this.mainroof = new Mainroof();
    this.mr = new Mainroof();
    this.solarpanel = new Solarpanel();
    this.sp = new Solarpanel();
    this.lperimeter = new Lperimeter();
    this.penthouse = new Penthouse();
    this.total = new Total();
    this.totalmanual = new Total();
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
    changeTotal("990201", this.penthouse.area.PH.value);
    //MR
    changeTotal("990150", this.mainroof.area.sum1F);
    changeTotal("990160", this.mainroof.area.sum2F);
    changeTotal("990170", this.mainroof.area.sum3F);
    //SP
    changeTotal("990175", this.solarpanel.area.sum1F);
    changeTotal("990176", this.solarpanel.area.sum2F);
    changeTotal("990177", this.solarpanel.area.sum3F);
    changeTotal("990178", this.solarpanel.area.total);
  }
  extractData(dtx, areaData) {
    this.module = dtx.houseStructure.gridModule / 1000;
    // this.standard = areaData.standard;
    // this.rows = areaData.items
    // this.balcony.insertProperties()
    // this.parapet.insertProperties()
    // this.roofgarden.insertProperties()
    // this.area.addItems()
    this.addItems();

    this.assignValues(dtx.yane.items, areaData.standard);
    this.total.compute(this.mr.area, areaData.standard.mr);
    this.totalmanual.compute(this.mainroof.area, areaData.standard.mr);
  }
  getMatchedSPPitch(item, standard) {
    let pitch = "";
    for (let floors in standard.sp) {
      if (floors == "PH") continue;
      for (let pitches in standard.sp[floors]) {
        if (pitches == "roofStyle") continue;
        for (let value in standard.sp[floors][pitches]) {
          if (standard.sp[floors][pitches][value] == item.pitch)
            pitch = pitches;
        }
      }
    }
    return pitch;
  }
  getMatchedMRPitch(item, standard) {
    let pitch = "";
    for (let floors in standard.mr) {
      if (floors == "PH") continue;
      for (let pitches in standard.mr[floors]) {
        if (pitches == "roofStyle") continue;
        for (let value in standard.mr[floors][pitches]) {
          if (standard.mr[floors][pitches][value] == item.pitch)
            pitch = pitches;
        }
      }
    }
    return pitch;
  }
  assignValues(items, standard) {
    let i = 1;
    for (let item of items) {
      if (item.name) {
        let floorLevel = item.layerName.substr(0, 1);
        switch (floorLevel) {
          case "1": {
            this.items[
              i
            ].description = `SP ${floorLevel}F area ${this.getMatchedSPPitch(
              item,
              standard
            )}`;
            // this.solarpanel.area[`${floorLevel}F`][`${this.getMatchedSPPitch(item)}`].value = item.roofArea
            this.sp.area[`${floorLevel}F`][
              `${this.getMatchedSPPitch(item, standard)}`
            ].value = item.roofArea;
            break;
          }
          case "2": {
            this.items[
              i
            ].description = `SP ${floorLevel}F area ${this.getMatchedSPPitch(
              item,
              standard
            )}`;
            // this.solarpanel.area[`${floorLevel}F`][`${this.getMatchedSPPitch(item)}`].value = item.roofArea
            this.sp.area[`${floorLevel}F`][
              `${this.getMatchedSPPitch(item, standard)}`
            ].value = item.roofArea;
            break;
          }
          case "3": {
            this.items[
              i
            ].description = `SP ${floorLevel}F area ${this.getMatchedSPPitch(
              item,
              standard
            )}`;
            // this.solarpanel.area[`${floorLevel}F`][`${this.getMatchedSPPitch(item)}`].value = item.roofArea
            this.sp.area[`${floorLevel}F`][
              `${this.getMatchedSPPitch(item, standard)}`
            ].value = item.roofArea;
            break;
          }
        }
        i++;

        i++;
      } else {
        let floorLevel = item.layerName.substr(0, 1);
        switch (floorLevel) {
          case "1": {
            this.items[
              i
            ].description = `MR ${floorLevel}F area ${this.getMatchedMRPitch(
              item,
              standard
            )}`;
            // this.mainroof.area[`${floorLevel}F`][`${this.getMatchedMRPitch(item)}`].value = item.roofArea
            this.mr.area[`${floorLevel}F`][
              `${this.getMatchedMRPitch(item, standard)}`
            ].value = item.roofArea;
            break;
          }
          case "2": {
            this.items[
              i
            ].description = `MR ${floorLevel}F area ${this.getMatchedMRPitch(
              item,
              standard
            )}`;
            // this.mainroof.area[`${floorLevel}F`][`${this.getMatchedMRPitch(item)}`].value = item.roofArea
            this.mr.area[`${floorLevel}F`][
              `${this.getMatchedMRPitch(item, standard)}`
            ].value = item.roofArea;
            break;
          }
          case "3": {
            this.items[
              i
            ].description = `MR ${floorLevel}F area ${this.getMatchedMRPitch(
              item,
              standard
            )}`;
            // this.mainroof.area[`${floorLevel}F`][`${this.getMatchedMRPitch(item)}`].value = item.roofArea
            this.mr.area[`${floorLevel}F`][
              `${this.getMatchedMRPitch(item, standard)}`
            ].value = item.roofArea;
            break;
          }
        }
        i++;

        i++;
      }
    }
  }
  computeAll(item, standard) {
    if (item.description && (item.total !== "" || item.total !== "-")) {
      this.mainroof.perimeter.eachFloor(this.items, "MR");
      this.solarpanel.area.eachFloor(this.items, "SP");
      this.mainroof.area.eachFloor(
        this.items,
        "MR",
        "area",
        this.mr.perimeter.floors
      );
      // this.mainroof.deduct.eachFloor()
      this.mainroof.area.eachFloor(
        this.items,
        "MR",
        "deduct",
        this.mr.perimeter.floors
      );
      this.mainroof.kiritsuma.eachFloor(
        this.items,
        "MR",
        "area",
        this.mr.perimeter.floors
      );
      this.lperimeter.eachFloor(this.items, "L");
      this.penthouse.perimeter.eachFloor(this.items, "PH");
      this.penthouse.area.eachFloor(
        this.items,
        "PH",
        "area",
        this.penthouse.perimeter.value
      );

      this.penthouse.area.eachFloor(
        this.items,
        "PH",
        "deduct",
        this.penthouse.perimeter.value
      );
      this.total.compute(this.mr.area, standard.mr);
      this.totalmanual.compute(this.mainroof.area, standard.mr);
    }
  }
  //GETTING THE TOTAL FLAT ROOF AND SLOPE ROOF

  // computeRow(item){
  //   if ( item.description !== '' && item.description !== '-' ){
  //     let type = item.description.split(" ")
  //       if((type[0] == 'MR' && type[2] == 'area') || (type[0] == 'SP' && type[2] == 'area')){
  //         let areaSqm = (Number((item.l_grid * this.module))+ Number(item.l_eaves)+ Number(item.l_eaves1)) * (Number((item.w_grid * this.module))+ Number(item.w_eaves)+ Number(item.w_eaves1))
  //        console.log(this.standard[ type[0].toLowerCase() ][ type[1] ][ type[3] ])
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

  //   console.log(this.standards)
  //   } else {
  //     item.total = '-'
  //   }
  // }
}
