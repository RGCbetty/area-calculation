class Pitch {
  constructor() {
    this.value = "";
  }
  // =((B831*B831/100)+2)^0.5
  factor() {
    const round = (value, decimals = 3) => {
      return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
    };
    if (+this.value > 0) {
      return round(Math.sqrt(this.value ** 2 + 100) / 10);
    } else {
      return 0;
    }
  }
}

class Floor {
  constructor() {
    this.p1 = new Pitch();
    this.p2 = new Pitch();
    this.p3 = new Pitch();
    this.roofStyle = "";
  }
}

class Roof {
  constructor() {
    this["1F"] = new Floor();
    this["2F"] = new Floor();
    this["3F"] = new Floor();
    this["PH"] = new Pitch();
  }
}

class Overall {
  constructor(floor) {
    this.FL = floor;
    this.P1 = "";
    this.P2 = "";
    this.P3 = "";
  }
}
class MRrow {
  constructor(floor) {
    this.MR = floor;
    this.P1 = "";
    this.P2 = "";
    this.P3 = "";
  }
}
class SProw {
  constructor(floor) {
    this.SP = floor;
    this.P1 = "";
    this.P2 = "";
    this.P3 = "";
  }
}

export default class Standard {
  constructor() {
    this.module = 0;
    this.kanabakari = "";
    //for Nokiten
    this.floorLevel = "";
    // this.fireproofType = '';
    this.plywoodThickness = "";
    this.allpitch = new Roof();
    this.mr = new Roof();
    this.sp = new Roof();
    this.rows = [];
    this.MRrows = [];
    this.SProws = [];
  }
  getFloors() {
    // let floors = +this.floorLevel.split("F")[0]
    this.rows = [];
    this.MRrows = [];
    this.SProws = [];
    for (let i = 1; i <= 3; i++) {
      this.addRows(`${i}F`);
    }
  }
  addRows(floor) {
    let row = new Overall(floor);
    let mr = new MRrow(floor);
    let sp = new SProw(floor);
    this.rows.push(row);
    this.MRrows.push(mr);
    this.SProws.push(sp);
  }
  getPitchDetails(roofItems) {
    this.getFloors();
    let details = roofItems.map((rec) => {
      return {
        layerName: rec.layerName,
        name: rec.name,
        pitch: rec.pitch,
      };
    });
    let arr = details.sort((a, b) => {
      return a.name.length - b.name.length;
    });
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i].pitch == arr[i + 1].pitch) {
        delete arr[i];
      }
    }
    arr = arr.filter((el) => {
      return typeof el !== "undefined";
    });
    let count1F = 0;
    let count2F = 0;
    let count3F = 0;
    for (let value of arr) {
      if (value.layerName.includes(3)) {
        count3F++;
        this.rows[2][`P${count3F}`] = value.pitch;
        this.allpitch["3F"][`p${count3F}`].value = value.pitch;
      } else if (value.layerName.includes(2)) {
        count2F++;
        this.rows[1][`P${count2F}`] = value.pitch;
        this.allpitch["2F"][`p${count2F}`].value = value.pitch;
      } else if (value.layerName.includes(1)) {
        count1F++;
        this.rows[0][`P${count1F}`] = value.pitch;
        this.allpitch["1F"][`p${count1F}`].value = value.pitch;
      }
    }
    let countmr1F = 0;
    let countmr2F = 0;
    let countmr3F = 0;
    let countsp1F = 0;
    let countsp2F = 0;
    let countsp3F = 0;

    for (let i of roofItems) {
      if (i.name) {
        if (i.layerName.includes(3)) {
          countsp3F++;
          if (countsp3F > 3) continue;
          this.SProws[2][`P${countsp3F}`] = i.pitch;
          this.sp["3F"][`p${countsp3F}`].value = i.pitch;
        } else if (i.layerName.includes(2)) {
          countsp2F++;
          if (countsp2F > 3) continue;
          this.SProws[1][`P${countsp2F}`] = i.pitch;
          this.sp["2F"][`p${countsp2F}`].value = i.pitch;
        } else if (i.layerName.includes(1)) {
          countsp1F++;
          if (countsp1F > 3) continue;
          this.SProws[0][`P${countsp1F}`] = i.pitch;
          this.sp["1F"][`p${countsp1F}`].value = i.pitch;
        }
      } else {
        if (i.layerName.includes(3)) {
          countmr3F++;
          if (countmr3F > 3) continue;
          this.MRrows[2][`P${countmr3F}`] = i.pitch;
          this.mr["3F"][`p${countmr3F}`].value = i.pitch;
        } else if (i.layerName.includes(2)) {
          countmr2F++;
          if (countmr2F > 3) continue;
          this.MRrows[1][`P${countmr2F}`] = i.pitch;
          this.mr["2F"][`p${countmr2F}`].value = i.pitch;
        } else if (i.layerName.includes(1)) {
          countmr1F++;

          if (countmr1F > 3) continue;
          this.MRrows[0][`P${countmr1F}`] = i.pitch;
          this.mr["1F"][`p${countmr1F}`].value = i.pitch;
        }
      }
    }
  }
  convertFloorLevel(specName) {
    switch (specName) {
      case "１Ｆ":
        this.floorLevel = "1F";
        break;
      case "２Ｆ":
        this.floorLevel = "2F";
        break;
      case "３Ｆ":
        this.floorLevel = "3F";
        break;
    }
    // 0030	３Ｆ
    // 0010	１Ｆ
    // 0020	２Ｆ
  }

  convertPlywoodThickness(thickness) {
    switch (thickness) {
      case "１２mm":
        this.plywoodThickness = 12;
        break;
      case "９mm":
        this.plywoodThickness = 9;
        break;
    }

    // １２mm
    // ９mm
  }

  convertKanabakari(specName) {
    let kana = specName.substr(0, 3);

    switch (kana) {
      case "２４０":
        this.kanabakari = "240";
        break;
      case "２６０":
        this.kanabakari = "260";
        break;
      case "２６５":
        this.kanabakari = "265";
        break;
    }

    // 0060	２４０□
    // 0051	２４０+Ｔ□
    // 0010	２６５
    // 0020	２４０
    // 0041	２４０＋Ｔ
    // 0040	２４０＋
    // 0030	２６０【一般現場使用禁止】
    // 0067	２６０+□
    // 0070	２６５□
    // 0050	２４０+□
    // 0065	２６０＋
  }
}
