import Kataganare from "./resources/kataganare";

class Properties {
    constructor(direction) {
        (this.header = direction),
            (this.grids1F = ""),
            (this.constant1F = ""),
            (this.irregular1F = ""),
            (this.grids2F = ""),
            (this.constant2F = ""),
            (this.irregular2F = ""),
            (this.grids3F = ""),
            (this.constant3F = ""),
            (this.irregular3F = "");
    }
}
class KataganareP {
    constructor(direction) {
        (this.header = direction),
            (this.grids = ""),
            (this.additional = ""),
            (this.height = ""),
            (this.area = "");
    }
}
class kataganareR {
    constructor(direction) {
        (this.header = direction),
            (this.pitch = ""),
            (this.grids = ""),
            (this.additional = ""),
            (this.width = ""),
            (this.area = "");
    }
}
export default class Youjonet extends Kataganare {
    constructor() {
        super();
        this.items = [];
        this.cardinal = [0, 0, 0, 0];
        this.coordinates = [0, 0, 0, 0];
        this.total = 0;
    }
    extractData(dtx) {
        this.module = dtx.houseStructure.gridModule / 1000;
        // this.standard = areaData.standard;
        // this.rows = areaData.items
        this.loadRows();
    }
    loadRows() {
        this.items = [];
        this.kataganareP = [];
        this.kataganareR = [];
        for (let direction of this.directions) {
            this.addRows(direction);
        }
    }
    addRows(direction) {
        let item = new Properties(direction);
        this.items.push(item);
        let item1 = new KataganareP(direction);
        this.kataganareP.push(item1);
        let item2 = new kataganareR(direction);
        this.kataganareR.push(item2);
    }
    passTotal(items) {
        const changeTotal = (id, value) => {
            items.find(item => {
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
        let total = this.total + this.totalP + this.totalR;
        changeTotal("70730", Number(Math.round(total + "e" + 3) + "e-" + 3));
    }
    // compute(row, index, label, rowIndex){
    //   switch(label){
    //     case 'Youjonet':
    //       this.computeRow(row, index)
    //       this.passData(rowIndex)
    //       break;
    //     case 'Parapet':
    //       this.computeParapetOnly(row, index)
    //       this.passData(rowIndex)
    //       break;
    //     case 'Roof':
    //       this.computeWithRoof(row, index)
    //       this.passData(rowIndex)
    //       break;
    //   }
    // }
    // passData(index){
    //   let total = this.total + this.totalP + this.totalR
    //   console.log(total, 'asfasgqwqw')
    //   // console.log(this.rows[index].value, 'asgqegjqeoij')
    //   console.error(this.rows[index])
    //   this.rows[index].value = total
    //   this.rows[index].remarks = 'Manually changed'
    // }

    computeRow(item, index, standard) {
        let total = 0;
        let news = 0;
        let el = "";
        if (item.header == "east" || item.header == "west") {
            el = this.items.findIndex(rec => {
                return item.header == "west"
                    ? rec.header == "east"
                    : rec.header == "west";
            });
        } else if (item.header == "north" || item.header == "south") {
            el = this.items.findIndex(rec => {
                return item.header == "north"
                    ? rec.header == "south"
                    : rec.header == "north";
            });
        }
        if (standard.floorLevel == "3F") {
            this.items[index].grids2F = item.grids1F;
            this.items[index].grids3F = item.grids2F;
            this.items[index].grids1F = item.grids3F;
            this.items[index].constant1F = 2;
            this.items[index].constant2F = 2;
            this.items[index].constant3F = 2;
            this.items[el].grids2F = item.grids1F;
            this.items[el].grids3F = item.grids2F;
            this.items[el].grids1F = item.grids3F;
            this.items[el].constant1F = 2;
            this.items[el].constant2F = 2;
            this.items[el].constant3F = 2;
            if (
                this.items[index].grids1F == "" ||
                this.items[index].grids2F == "" ||
                this.items[index].grids3F == ""
            ) {
                this.items[index].grids3F = "";
                this.items[index].grids2F = "";
                this.items[index].grids1F = "";
                this.items[index].constant1F = "";
                this.items[index].constant2F = "";
                this.items[index].constant3F = "";
                this.items[el].grids3F = "";
                this.items[el].grids2F = "";
                this.items[el].grids1F = "";
                this.items[el].constant1F = "";
                this.items[el].constant2F = "";
                this.items[el].constant3F = "";
            }
        } else if (standard.floorLevel == "2F") {
            this.items[index].grids2F = item.grids1F;
            this.items[index].grids1F = item.grids2F;
            this.items[index].constant1F = 2;
            this.items[index].constant2F = 2;
            this.items[el].grids2F = item.grids1F;
            this.items[el].grids1F = item.grids2F;
            this.items[el].constant1F = 2;
            this.items[el].constant2F = 2;
            if (
                this.items[index].grids1F == "" ||
                this.items[index].grids2F == ""
            ) {
                this.items[index].grids2F = "";
                this.items[index].grids1F = "";
                this.items[index].constant1F = "";
                this.items[index].constant2F = "";
                this.items[el].grids2F = "";
                this.items[el].grids1F = "";
                this.items[el].constant1F = "";
                this.items[el].constant2F = "";
            }

            // else if (item.grids2F !== "") {
            //     this.items[index].grids1F = item.grids2F;
            //     this.items[index].constant1F = 2;
            //     this.items[index].constant2F = 2;
            // }
        } else if (standard.floorLevel == "1F") {
            if (index == 0 || index == 2) {
                if (this.items[index].grids1F == "") {
                    this.items[index].constant1F = "";
                    this.items[index + 1].constant1F = "";
                } else {
                    this.items[index].constant1F = 2;
                    this.items[index + 1].constant1F = 2;
                }
            } else if (index == 1 || index == 3) {
                if (this.items[index].grids1F == "") {
                    this.items[index - 1].constant1F = "";
                    this.items[index].constant1F = "";
                } else {
                    this.items[index - 1].constant1F = 2;
                    this.items[index].constant1F = 2;
                }
            }
            this.items[el].grids1F = item.grids1F;
        }
        this.kataganareR[el].grids = item.grids1F;
        this.kataganareR[el].additional = item.constant1F;

        switch (item.header) {
            case "east":
                this.kataganareR[el - 1].grids = item.grids1F;
                this.kataganareR[el - 1].additional = item.constant1F;
                break;
            case "west":
                this.kataganareR[el + 1].grids = item.grids1F;
                this.kataganareR[el + 1].additional = item.constant1F;
                break;
            case "south":
                this.kataganareR[el - 1].grids = item.grids1F;
                this.kataganareR[el - 1].additional = item.constant1F;
                break;
            case "north":
                this.kataganareR[el + 1].grids = item.grids1F;
                this.kataganareR[el + 1].additional = item.constant1F;
                break;
            default:
                this.kataganareR[el].grids = "";
        }
        let area1F =
            (Number(item.grids1F) + Number(item.constant1F)) * this.module * 3;
        let area2F =
            (Number(item.grids2F) + Number(item.constant2F)) * this.module * 3;
        let area3F =
            (Number(item.grids3F) + Number(item.constant3F)) * this.module * 3;
        let areaAndconstant1F = Number(item.grids1F) + Number(item.constant1F);
        let areaAndconstant2F = Number(item.grids2F) + Number(item.constant2F);
        let areaAndconstant3F = Number(item.grids3F) + Number(item.constant3F);
        areaAndconstant1F = isNaN(areaAndconstant1F) ? 0 : areaAndconstant1F;
        areaAndconstant2F = isNaN(areaAndconstant2F) ? 0 : areaAndconstant2F;
        areaAndconstant3F = isNaN(areaAndconstant3F) ? 0 : areaAndconstant3F;
        area1F = isNaN(area1F) ? 0 : area1F;
        area2F = isNaN(area2F) ? 0 : area2F;
        area3F = isNaN(area3F) ? 0 : area3F;
        total = area1F + area2F + area3F;
        news = areaAndconstant1F + areaAndconstant2F + areaAndconstant3F;
        switch (index) {
            case 0:
                this.coordinates.splice(index, 1, news);
                this.cardinal.splice(index, 1, total);
                this.coordinates.splice(el, 1, news);
                this.cardinal.splice(el, 1, total);
                break;
            case 1:
                this.coordinates.splice(index, 1, news);
                this.cardinal.splice(index, 1, total);
                this.coordinates.splice(el, 1, news);
                this.cardinal.splice(el, 1, total);
                break;
            case 2:
                this.coordinates.splice(index, 1, news);
                this.cardinal.splice(index, 1, total);
                this.coordinates.splice(el, 1, news);
                this.cardinal.splice(el, 1, total);
                break;
            default:
                this.coordinates.splice(index, 1, news);
                this.cardinal.splice(index, 1, total);
                this.coordinates.splice(el, 1, news);
                this.cardinal.splice(el, 1, total);
        }
        this.total =
            this.cardinal.reduce((total, value) => total + value, 0) +
            this.totalP +
            this.totalR;
    }
    computeParapetOnly(item, index) {
        let area =
            (Number(item.grids) + Number(item.additional)) *
            this.module *
            Number(item.height);
        //  let area3F = (Number(item.grids3F) + Number(item.constant3F)) * .91 * 3.
        area = isNaN(area) ? 0 : area;
        item.area = area;
        switch (index) {
            case 0:
                this.areaP.splice(0, 1, area);
                break;
            case 1:
                this.areaP.splice(1, 1, area);
                break;
            case 2:
                this.areaP.splice(2, 1, area);
                break;
            default:
                this.areaP.splice(3, 1, area);
        }
        this.totalP = this.areaP.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        }, 0);
        this.total =
            this.cardinal.reduce((total, value) => total + value, 0) +
            this.totalP +
            this.totalR;
        //  for(let i = 0; i < this.areaP.length; i++){
        //   this.totalP += this.areaP[i]
        //  }
    }
    computeWithRoof(item, index) {
        // let el = 0;
        // if (item.header == "east" || item.header == "west") {
        //     el = this.items.findIndex(rec => {
        //         return item.header == "west"
        //             ? rec.header == "east"
        //             : rec.header == "west";
        //     });
        // } else if (item.header == "north" || item.header == "south") {
        //     el = this.items.findIndex(rec => {
        //         return item.header == "north"
        //             ? rec.header == "south"
        //             : rec.header == "north";
        //     });
        // }
        switch (item.header) {
            case "east":
                this.kataganareR[index + 1].pitch = item.pitch;
                this.kataganareR[index + 2].pitch = item.pitch;
                this.kataganareR[index + 3].pitch = item.pitch;
                this.kataganareR[index + 1].width = item.width;
                this.kataganareR[index + 2].width = item.width;
                this.kataganareR[index + 3].width = item.width;
                break;
            case "west":
                this.kataganareR[index - 1].pitch = item.pitch;
                this.kataganareR[index + 1].pitch = item.pitch;
                this.kataganareR[index + 2].pitch = item.pitch;
                this.kataganareR[index - 1].width = item.width;
                this.kataganareR[index + 1].width = item.width;
                this.kataganareR[index + 2].width = item.width;
                break;
            case "south":
                this.kataganareR[index - 1].pitch = item.pitch;
                this.kataganareR[index - 2].pitch = item.pitch;
                this.kataganareR[index + 1].pitch = item.pitch;
                this.kataganareR[index - 1].width = item.width;
                this.kataganareR[index - 2].width = item.width;
                this.kataganareR[index + 1].width = item.width;
                break;
            case "north":
                this.kataganareR[index - 1].pitch = item.pitch;
                this.kataganareR[index - 2].pitch = item.pitch;
                this.kataganareR[index - 3].pitch = item.pitch;
                this.kataganareR[index - 1].width = item.width;
                this.kataganareR[index - 2].width = item.width;
                this.kataganareR[index - 3].width = item.width;

                break;
            default:
                this.kataganareR[index].grids = "";
        }
        let area =
            (Number(item.grids) + Number(item.additional)) *
            this.module *
            (Number(item.width) * this.module) *
            Number(item.pitch);
        //  let area3F = (Number(item.grids3F) + Number(item.constant3F)) * .91 * 3
        area = isNaN(area) ? 0 : area / 10;
        item.area = Number(Math.round(area + "e" + 3) + "e-" + 3);
        switch (index) {
            case 0:
                this.areaR.splice(0, 1, area);
                break;
            case 1:
                this.areaR.splice(1, 1, area);
                break;
            case 2:
                this.areaR.splice(2, 1, area);
                break;
            default:
                this.areaR.splice(3, 1, area);
        }
        this.totalR = this.areaR.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        }, 0);
        this.total =
            this.cardinal.reduce((total, value) => total + value, 0) +
            this.totalP +
            this.totalR;
        //  for(let i = 0; i < this.areaR.length; i++){
        //   this.totalR += this.areaR[i]
        //  }
    }
}
