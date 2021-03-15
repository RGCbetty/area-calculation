class Items extends Array {
    constructor() {
        super();
    }
}
// class Properties {
//   constructor(){
//     this.description = ''
//     this.value = []
//   }

// }
export default class Area {
    constructor() {
        // this.properties = new Properties
        this.items = new Items();
        this.module = 0;
        this.balcony = 0;
        this.parapet = 0;
        this.roofgarden = 0;
        this.balconycount = 0;
        this.parapetcount = 0;
        this.roofgardencount = 0;
        this.insidegardencount = 0;
        this.trow = [
            { id: "70460", name: "バルコニー面積(Balcony Area)", total: "0" },
            { id: "70461", name: "パラペット面積(Parapet Area)", total: "0" },
            {
                id: "70462",
                name: "ルーフガーデン面積(Roof Garden Area)",
                total: "0"
            }
        ];
    }
    // computeRow(item, module){
    //   if(item.l_grid!='' && item.l_eaves!='' && item.l_eaves1!='' && item.w_grid!='' && item.w_eaves!='' && item.description!=''){
    //     item.area =Number(Math.round((parseFloat(item.l_grid) * 0.910 ) * (parseFloat(item.w_grid) * 0.910) +'e3')+'e-3')
    //   }
    // }
    // passTotal(){
    // passTotal(){
    //   const changeTotal = (id, value) => {
    //     this.areaData.items.find( item => {
    //       if (item.id == id){
    //         // if(!value){
    //           item.value = value
    //         // }
    //         if(value !== 0){
    //           item.remarks = 'Manually Computed'
    //           item.value = value
    //          }
    //       }
    //     })
    //   }
    //   changeTotal( '70460', this.balcony )
    //   changeTotal( '70461', this.parapet )
    //   changeTotal( '70462', this.roofgarden )
    // }
    computeAll() {
        this.balcony = this.items
            .filter(item =>
                item.description ? item.description.includes("balcony") : null
            )
            .map(item => (item.area !== "-" ? item.area : 0))
            .reduce((accumulator, currentValue) => {
                return accumulator + currentValue;
            }, 0);
        this.parapet = this.items
            .filter(item =>
                item.description ? item.description.includes("parapet") : null
            )
            .map(item => (item.area !== "-" ? item.area : 0))
            .reduce((accumulator, currentValue) => {
                return accumulator + currentValue;
            }, 0);
        this.roofgarden = this.items
            .filter(item =>
                item.description ? item.description.includes("garden") : null
            )
            .map(item => (item.area !== "-" ? item.area : 0))
            .reduce((accumulator, currentValue) => {
                return accumulator + currentValue;
            }, 0);
        this.balconycount = this.items.filter(item =>
            item.area !== "-" && item.description.includes("balcony")
                ? item.description
                : null
        ).length;
        this.parapetcount = this.items.filter(item =>
            item.area !== "-" && item.description.includes("parapet")
                ? item.description
                : null
        ).length;
        this.roofgardencount = this.items.filter(item =>
            item.area !== "-" && item.description.includes("roofgarden")
                ? item.description
                : null
        ).length;
        this.insidegardencount = this.items.filter(item =>
            item.area !== "-" && item.description.includes("inside garden")
                ? item.description
                : null
        ).length;
        for (let i = 0; i < 3; i++) {
            if (i == 0) {
                this.trow[i].total = this.balcony;
            } else if (i == 1) {
                this.trow[i].total = this.parapet;
            } else if (i == 2) {
                this.trow[i].total = this.roofgarden;
            }
        }
    }
    computeRow(item, index) {
        this.getIDnumber(item, index);
        if (item.description !== "" && item.description !== "-") {
            if (
                item.l_grid !== "" &&
                item.w_grid !== "" &&
                item.l_meter !== "" &&
                item.w_meter !== ""
            ) {
                item.area = Number(
                    Math.round(
                        parseFloat(item.l_grid) *
                            this.module *
                            parseFloat(item.l_meter) *
                            (parseFloat(item.w_grid) * this.module) *
                            parseFloat(item.w_meter) +
                            "e3"
                    ) + "e-3"
                );
            } else if (item.l_grid !== "" && item.w_grid !== "") {
                item.area = Number(
                    Math.round(
                        parseFloat(item.l_grid) *
                            this.module *
                            (parseFloat(item.w_grid) * this.module) +
                            "e3"
                    ) + "e-3"
                );
            } else if (item.l_grid !== "" && item.w_meter !== "") {
                item.area = Number(
                    Math.round(
                        parseFloat(item.l_grid) *
                            this.module *
                            parseFloat(item.w_meter) +
                            "e3"
                    ) + "e-3"
                );
            } else if (item.l_meter !== "" && item.w_grid !== "") {
                item.area = Number(
                    Math.round(
                        parseFloat(item.w_grid) *
                            this.module *
                            parseFloat(item.l_meter) +
                            "e3"
                    ) + "e-3"
                );
            } else if (item.l_meter !== "" && item.w_meter !== "") {
                item.area = Number(
                    Math.round(
                        parseFloat(item.w_meter) * parseFloat(item.l_meter) +
                            "e3"
                    ) + "e-3"
                );
            } else {
                item.area = "-";
            }
        } else {
            item.area = "-";
        }
        this.computeAll();
    }
    getIDnumber(item, index) {
        if (index == 0) {
            if (item.l_grid == "") {
                item.num = "";
            } else {
                item.num = 1;
            }
        } else {
            if (item.l_grid == "") {
                item.num = "";
            } else if (
                this.items[index - 1].l_grid == "" ||
                (this.items[index - 1].l_grid == undefined &&
                    this.items[index - 1].description == "") ||
                this.items[index - 1].description == "-"
            ) {
                item.num = 1;
                item.description;
            } else if (this.items[index - 1].l_grid) {
                item.num = this.items[index - 1].num + 1;
                // item.description = this.items[index-1].description
            }
        }
    }
    insertProperties(length = 10, module, balcony) {
        this.module = module;
        this.trow[0].total = balcony.area.total;
        this.items = [];
        for (let i = 0; i < length; i++) {
            this.items.push({
                num: "",
                l_grid: "",
                l_meter: "",
                w_grid: "",
                w_meter: "",
                description: "",
                area: ""
            });
        }
    }
    addItem() {
        this.items.push({
            num: "",
            l_grid: "",
            l_eaves: "",
            l_eaves1: "",
            w_grid: "",
            w_eaves: "",
            description: "",
            total: ""
        });
    }
}
