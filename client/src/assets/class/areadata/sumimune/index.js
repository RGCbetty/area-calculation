class SumimuneList extends Array {
    constructor() {
        super();
    }
}

export default class Sumimune {
    constructor() {
        this.items = new SumimuneList();
        this.total = 0;
        this.module = 0;
    }
    extractData(dtx) {
        this.items = new SumimuneList();
        let indexkey = 0;

        for (let key in dtx.yane.sumimune) {
            if (key == "total") continue;
            for (let keyname in dtx.yane.sumimune[key]) {
                if (keyname == "total") continue;
                for (let index in dtx.yane.sumimune[key][keyname]) {
                    if (index == "total") continue;
                    dtx.yane.sumimune[key][keyname][index].forEach(
                        (item, i) => {
                            indexkey = i + 1;
                            // let totalLength =
                            Number(item) *
                                Math.pow((keyname * keyname) / 100 + 2, 0.5);
                            console.log(item);
                            this.items.push({
                                no: i + 1,
                                pitch: keyname,
                                floorName: key,
                                grids: "",
                                eaves: "",
                                length:
                                    Number(item) *
                                    Math.pow(
                                        (keyname * keyname) / 100 + 2,
                                        0.5
                                    ),
                                remarks: "auto compute"
                            });
                        }
                    );
                }
            }
        }
        // let length = this.items.length;
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
        if (!dtx.message) {
            this.total = dtx.yane.sumimune.total;
            this.module = dtx.houseStructure.gridModule / 1000;
        }

        // for (let key in dtx.yane.sumimune) {
        //   if (key == "total") continue;
        //   for (let i = 0; i < dtx.yane.sumimune[key].length; i++) {
        //     this.items.push({
        //       no: i + 1,
        //       floorName: key,
        //       grids: "",
        //       eaves: "",
        //       length: dtx.yane.sumimune[key][i],
        //       remarks: "auto compute",
        //     });
        //   }
        // }
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
        changeTotal("90670", this.total);
    }
}
