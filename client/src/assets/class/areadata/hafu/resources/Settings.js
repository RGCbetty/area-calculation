class Rows extends Array {
    constructor() {
        super();
    }
}

class SubtotalRow {
    constructor(num) {
        this["No."] = num;
        this["HANA 1F"] = "";
        this["HAFU 1F"] = "";
        this["HANA 2F"] = "";
        this["HAFU 2F"] = "";
        this["HANA 3F"] = "";
        this["HAFU 3F"] = "";
    }
}
export default class Settings {
    constructor() {
        // this.descriptionList = []
        this.mergedDescriptions = [];
        this.items = new Rows();
        this.rows = [];
        this.module = 0;
        // this.standard = {};
        this.subTotal = [];
        this.pitchFactor = 0;
    }
    getSubtotalRows(count = 20) {
        this.subTotal = [];
        for (let i = 1; i <= count; i++) {
            this.addSubtotalRows(i);
        }
    }
    addSubtotalRows(num) {
        let row = new SubtotalRow(num);
        this.subTotal.push(row);
    }
    getMatchedPitch(keraba, standard) {
        let pitch = "";
        for (let floors in standard.allpitch) {
            if (floors == "PH") continue;
            for (let pitches in standard.allpitch[floors]) {
                if (pitches == "roofStyle") continue;
                for (let value in standard.allpitch[floors][pitches]) {
                    if (
                        standard.allpitch[floors][pitches][value] ==
                        keraba.pitch
                    )
                        pitch = pitches.toUpperCase();
                }
            }
        }
        return pitch;
    }
    computeRow(item, standard) {
        if (item.description !== "" && item.description !== "-") {
            let type = item.description.split(" ");
            if (type[0] == "HAFU" || type[0] == "HAFU") {
                let subTotal = Number(
                    item.grids * this.module +
                        Number(item.eaves) +
                        Number(item.eaves1)
                );
                type[3] = type[3].toLowerCase();
                // this.pitch = this.standard.allpitch[type[2]][type[3]].value
                this.pitchFactor = standard.allpitch[type[2]][type[3]].factor();
                item.pitch = this.pitchFactor;
                if (
                    Number(subTotal) == 0 ||
                    isNaN(subTotal) ||
                    subTotal == undefined
                ) {
                    item.subTotal = 0;
                } else {
                    item.subTotal = subTotal * 1000;
                }
            } else {
                let subTotal =
                    Number(item.grids) * this.module +
                    Number(item.eaves) +
                    Number(item.eaves1);
                item.subTotal = subTotal * 1000;
            }
            //will not compute
        } else {
            item.subTotal = "-";
        }
    }
    getIDnumber(item, index) {
        if (index == 0) {
            if (item.grids == "") {
                item.num = "";
            } else {
                item.num = 1;
            }
        } else {
            if (item.grids == "") {
                item.num = "";
            } else if (
                this.items[index - 1].grids == "" ||
                (this.items[index - 1].grids == undefined &&
                    this.items[index - 1].description == "") ||
                this.items[index - 1].description == "-"
            ) {
                item.num = 1;
                item.description;
            } else if (this.items[index - 1].grids) {
                item.num = this.items[index - 1].num + 1;
                // item.description = this.items[index-1].description
            }
        }
    }

    addItems(count = 30) {
        // this.addDescriptionList();
        this.items = [];
        for (let i = 0; i < count; i++) {
            this.items.push({
                num: "",
                grids: "",
                eaves: "",
                eaves1: "",
                subTotal: "",
                description: ""
            });
        }
    }

    setDetails(dtxItems) {
        for (const items of dtxItems) {
            for (const upper of items.upperEaves) {
                upper["pitch"] = items.pitch;
                upper["layerName"] = items.layerName;
            }
            for (const lower of items.lowerEaves) {
                lower["pitch"] = items.pitch;
                lower["layerName"] = items.layerName;
            }
            for (const keraba of items.kerabaEaves) {
                keraba["pitch"] = items.pitch;
                keraba["layerName"] = items.layerName;
            }
        }
    }
    mergeDescriptions(dtxItems) {
        let mapped = "";
        let toMap = dtxItems.map(res => {
            return {
                kerabaEaves: res.kerabaEaves,
                lowerEaves: res.lowerEaves,
                upperEaves: res.upperEaves,
                layerName: res.layerName,
                pitch: res.pitch
            };
        });
        mapped = toMap;
        let grouped = {};
        for (let obj of mapped) {
            for (let [key, val] of Object.entries(obj)) {
                grouped[key] = (grouped[key] || []).concat(val);
            }
        }
        this.mergedDescriptions = [];
        this.mergedDescriptions.push(grouped);
    }
}
