import Items from "../../items";
import Compute from "../functions/compute";

export default class Properties {
    constructor() {
        this.compute = Compute;
        this.items = new Items();
        // this.standard = {};
        this.rows = [];
        this.module = 0;
    }

    addItems(length = 15) {
        this.items = [];
        for (let i = 0; i <= length; i++) {
            this.items.push({
                num: "",
                grids: "",
                additional: "",
                constant: "",
                description: "",
                direction: "",
                length: ""
            });
        }
    }
    getNumber(item, index) {
        if (index == 0) {
            if (
                item.grids == "" &&
                item.additional == "" &&
                item.constant == ""
            ) {
                item.num = "";
            } else {
                item.num = 1;
            }
        } else {
            if (
                item.grids == "" &&
                item.additional == "" &&
                item.constant == ""
            ) {
                item.num = "";
            } else if (
                this.items[index - 1].grids == "" &&
                this.items[index - 1].additional == "" &&
                this.items[index - 1].constant == ""
            ) {
                item.num = 1;
                item.description;
                // console.log('if empty')
            } else if (
                this.items[index - 1].grids ||
                this.items[index - 1].additional ||
                this.items[index - 1].constant
            ) {
                item.num = this.items[index - 1].num + 1;
                // item.description = this.items[index-1].description
                // console.log('if not')
            }
        }
    }

    computeRow(item, standard) {
        if (item.description !== "" && item.description !== "-") {
            let type = item.description.split(" ");
            if (type[1] == "s" || type[2] == "s") {
                if (type.length > 4) {
                    item.pitch = standard.allpitch[type[3]][type[4]].factor();
                    // == 1
                    //     ? 0
                    //     : standard.allpitch[type[3]][type[4]].factor();
                } else {
                    // console.log(standard.allpitch[type[2]][type[3]].factor())

                    item.pitch = standard.allpitch[type[2]][type[3]].factor();
                    // == 1
                    //   ? 0
                    //   : standard.allpitch[type[2]][type[3]].factor();
                }
                let length =
                    (Number(item.grids) * this.module +
                        Number(item.additional) +
                        Number(item.constant)) *
                    item.pitch;
                if (
                    Number(length) == 0 ||
                    isNaN(length) ||
                    length == undefined
                ) {
                    item.length = "-";
                } else {
                    item.length = length;
                }
            } else if (type[1] == "h" || type[2] == "h") {
                let length =
                    Number(item.grids * this.module) +
                    Number(item.additional) +
                    Number(item.constant);
                item.length = length;
                // console.log(length);
            }
        } else {
            item.length = "-";
        }
    }
}
