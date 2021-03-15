import Tanitoi from "./resources/tanitoi";
import Balcony from "./BPRG/balcony";
import Parapet from "./BPRG/parapet";
import RoofGarden from "./BPRG/roofgarden";
import Area from "./BPRG/area";
// import Total from "./totalcount"
import Youjonet from "../bankin/youjonet/index";

export default class Bankin extends Tanitoi {
  constructor() {
    super();
    this.balcony = new RoofGarden();
    this.parapet = new RoofGarden();
    this.roofgarden = new RoofGarden();
    this.area = new Area();
    // this.total = new Total
    this.length = [];
    this.youjonet = new Youjonet();
    this.dtxbalcony = {};
  }
  // lengthData:[
  getLength() {
    this.length = [];
    this.length.push(
      {
        id: "70470",
        name: "バルコニー外壁部に接する長さ(Balcony FW)",
        total: `${
          this.balcony.fw ? this.balcony.fw : this.dtxbalcony.handrail.total
        }`,
      },
      {
        id: "70480",
        name: "バルコニー立ち上げ長さ(Balcony OW)",
        total: `${
          this.balcony.ow ? this.balcony.ow : this.dtxbalcony.walllength.total
        }`,
      },
      {
        id: "70471",
        name: "パラペット外壁部に接する長さ(Parapet FW)",
        total: `${this.parapet.fw}`,
      },
      {
        id: "70481",
        name: "パラペット立ち上げ長さ(Parapet OW)",
        total: `${this.parapet.ow}`,
      },
      {
        id: "70472",
        name: "ルーフガーデン外壁部接する長さ(Roof Garden FW)",
        total: `${this.roofgarden.fw}`,
      },
      {
        id: "70482",
        name: "ルーフガーデン立ち上げ長さ(Roof Garden OW)",
        total: `${this.roofgarden.ow}`,
      }
    );
  }

  // ],
  extractData(dtx, areaData) {
    this.module = dtx.houseStructure.gridModule / 1000;
    // this.standard = areaData.standard;
    // this.rows = areaData.items
    this.dtxbalcony = areaData.balcony;
    this.balcony.insertProperties(this.module, "BU-");
    this.parapet.insertProperties(this.module, "PA-");
    this.roofgarden.insertProperties(this.module, "RG-");
    this.area.insertProperties(10, this.module, areaData.balcony);
    this.addItems();
    this.getLength();
  }
  getTotal(row, index, standard) {
    // this.balcony.insertProperties()
    this.getNumber(row, index);
    this.computeRow(row, standard);
    this.amaosaeS();
    this.amaosaeGS();
    this.amaosaeH();
    this.amaosaeGH();
    // this.passTotal()
  }
  //Area
  getTotalArea(row, index) {
    this.area.getIDNumber(row, index);
    this.area.computeRow(row);
    // this.area.computeTotal();
    // this.passTotal()
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

    changeTotal("70620", this.totalS + this.totalH);
    changeTotal("70625", this.totalGS + this.totalGH);
    changeTotal("70460", this.area.balcony);
    changeTotal("70461", this.area.parapet);
    changeTotal("70462", this.area.roofgarden);
    changeTotal("70470", this.balcony.fw);
    changeTotal("70480", this.balcony.ow);
    changeTotal("70471", this.parapet.fw);
    changeTotal("70481", this.parapet.ow);
    changeTotal("70472", this.roofgarden.fw);
    changeTotal("70482", this.roofgarden.ow);
  }
}
