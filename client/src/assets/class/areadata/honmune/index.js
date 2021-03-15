class HonmuneList extends Array {
    constructor() {
        super();
    }
}

export default class Honmune {
    constructor() {
        this.items = new HonmuneList();
        this.total = 0;
        this.module = 0;
    }
    extractData(dtx) {
        this.items = new HonmuneList();
        this.module = dtx.houseStructure.gridModule / 1000;
        let indexkey = 0;
        for (let key in dtx.yane.honmune) {
            if (key == "total") continue;
            for (let i = 0; i < dtx.yane.honmune[key].length; i++) {
                indexkey = i + 1;
                this.items.push({
                    no: i + 1,
                    floorName: key,
                    grids: "",
                    eaves: "",
                    length: dtx.yane.honmune[key][i],
                    remarks: "auto compute"
                });
            }
        }
        for (let i = indexkey; i < 10; i++) {
            this.items.push({
                no: i + 1,
                pitch: "",
                floorName: "",
                grids: "",
                eaves: "",
                length: "",
                remarks: "manual"
            });
        }
        // if (this.items.length > 0) {
        //     this.total = dtx.yane.honmune.total;
        // }
        // console.log(this.items);
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
        changeTotal("90660", this.total);
    }
}
