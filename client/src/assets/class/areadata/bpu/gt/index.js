import Sash from "./sash";

class gtSummary {
    constructor() {
        this.withoutBalcony1F = 0;
        this.withoutBalcony2F = 0;
        this.sum1F = [];
        this.sum2F = [];
        this.sum3F = [];
        this.sumTotal = [];
        this.sumGar = [];
        this.sumFuj = [];
    }
}

export default class GT extends Sash {
    constructor() {
        super();
        this.GTadditionalData = [];
        this.GTdeductionData = [];
        this.roofDeductionData = [];
        this.sashData = [];
        this.gtSummary = new gtSummary();
        this.rows = [];
    }

    //first processed used upon load; extracts data from dtx data and standard Class
    getData(dtx, areaData) {
        this.module = dtx.houseStructure.gridModule / 1000;

        this.houseLevel = areaData.standard.floorLevel;
        this.kanabakari = areaData.standard.kanabakari;
        // this.rows = areaData.items

        let data1 = dtx.balcony.items;
        let data2 = dtx.computed.balconies;

        //mutate the array of objects to fit class fields
        this.balconyData = this.balconyList(data1);

        //loop through the record to combine data 1 and 2 before process
        for (let i = 0; i < this.balconyData.length; i++) {
            this.balconyData[i].outsideGrid = data2[i].handrailLength / 0.91;
            this.balconyData[i].outsideMeter = "";
            this.balconyData[i].insideGrid = data2[i].handrailLength / 0.91;
            this.balconyData[i].insideMeter = "";
            this.balconyTile(this.balconyData[i]);
        }
        ///updates BPU area summary
        this.areaSummary();
        ///fills Below Balcony Data
        this.getBBdata();
        ///sets the number of Floors needed for Below Eaves
        this.getFloors();
        ///update total Wall Summary
        this.wallSummary();
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
        changeTotal("100011", this.gtSummary.sum1F[0].data);
        changeTotal("100012", this.gtSummary.sum2F[0].data);
        changeTotal("990090", this.gtSummary.withoutBalcony1F);
        changeTotal("990100", this.gtSummary.withoutBalcony2F);
    }

    compute(row, index, label) {
        switch (label) {
            case "Balcony":
                this.computeBalcony(row);
                this.balconyData.splice(index, 1, row);
                // this.passTotal()
                break;
            case "Parapet":
                this.computeParapetOnly(row, index);
                // this.passTotal()
                break;
            case "Roof":
                this.computeWithRoof(row, index);
                // this.passTotal()
                break;
        }
    }

    ///function for summary of Additional/Deduction/Roof Deduct/Sash
    totalAddDeductData(data, params) {
        let arr = this[data]
            .filter(
                o => o.floor.length > 4 && o.floor.slice(-2) == `${params}F`
            )
            .map(o => o.area)
            .reduce((a, b) => a + b, 0);
        let arr2 = this[data]
            .filter(o => o.floor.length < 4 && o.floor.slice(0, 1) == params)
            .map(o => o.area)
            .reduce((a, b) => a + b, 0);

        return arr + arr2;
    }
    pushTotal(fl) {
        let arr = [];
        arr.push(this.totalBbData(String(fl)));
        arr.push(this.porchTotalData(String(fl)));
        arr.push(this.totalBEavesData(String(fl)));
        arr.push(this.totalHWallData(String(fl)));
        arr.push(this.totalAddDeductData("GTadditionalData", String(fl)));
        arr.push(this.totalAddDeductData("GTdeductionData", String(fl)));
        arr.push(this.totalAddDeductData("roofDeductionData", String(fl)));
        arr.push(this.totalAddDeductData("sashData", String(fl)));
        arr = arr.reduce((a, b) => a + b, 0);
        return arr;
    }
    ///execute summary function per area
    getWallData(floor) {
        let arr = [];
        arr.push(this.getDataFromBalcony("balconyOutSum", String(floor + 1)));
        arr.push(this.getDataFromBalcony("balconyInSum", String(floor)));
        arr = this.round(
            arr.reduce((a, b) => a + b, 0) + this.pushTotal(floor),
            3
        );
        return arr;
    }

    getWallDataWithoutBalcony(floor) {
        return this.round(this.pushTotal(floor), 3);
    }

    clearSummary() {
        this.gtSummary.sum1F = [];
        this.gtSummary.sum2F = [];
        this.gtSummary.sum3F = [];
        this.gtSummary.sumTotal = [];
        this.gtSummary.sumGar = [];
        this.gtSummary.sumFuj = [];
    }

    wallSummary() {
        console.log(this);

        this.clearSummary();
        this.areaSummary();
        let level = parseInt(this.houseLevel.slice(0, 1));

        //empty container to keep a copy of area per level
        let areas = [];
        //loop through each level
        for (let i = 1; i <= level; i++) {
            let item = {
                floor: `${i}F`,
                data: this.getWallData(i)
            };
            let withoutBalcony = this.getWallDataWithoutBalcony(i);
            ///once the loop reaches the highest floor, get PH data and add
            if (i == level) {
                let ph = this.getWallData("P");
                item.data = item.data + ph;
            }

            areas.push(item.data);
            this.gtSummary[`sum${i}F`].push(item);
            this.gtSummary[`withoutBalcony${i}F`] = withoutBalcony;
        }

        ///get total wall area of all levels
        let total = {
            floor: "Total",
            data: areas.reduce((a, b) => a + b, 0)
        };
        total.data = this.round(total.data, 3);
        this.gtSummary.sumTotal.push(total);

        this.insideWallArea();
    }

    ///get wall area of inside wall
    insideWallArea() {
        const Others = ["Gar", "Fuj"];

        for (let other of Others) {
            let item = {
                floor: other == "Gar" ? "車庫" : "風除室",
                data: this.getWallData(other.slice(0, 1))
            };

            this.gtSummary[`sum${other}`].push(item);
        }
    }
}
