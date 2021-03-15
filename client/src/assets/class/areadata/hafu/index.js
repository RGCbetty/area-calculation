import Settings from "./resources/Settings";

// class Rows extends Array{
//     constructor(){
//       super()
//     }
// }

export default class Hafu extends Settings {
    constructor() {
        super();
        this.slants = [0, 0, 0];
        this.horizontals = [0, 0, 0];
        // this.items = new Rows
        // this.module = 0
        // this.standard = {}
        // this.rows = []
        // this.dtx = {}
        // this.mergedDescriptions = []
    }
    get totalHorizontal() {
        return this._totalH;
    }
    set totalHorizontal(value) {
        if (value === 0) {
            return;
        }
        this._totalH = value;
    }
    get totalSlant() {
        return this._totalS;
    }
    set totalSlant(value) {
        if (value === 0) {
            return;
        }
        this._totalS = value;
    }
    get allTotal() {
        return this.totalHorizontal + this.totalSlant;
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
        changeTotal("100250", this.allTotal);
    }
    extractData(dtx, areaData) {
        // this.dtx = dtx
        this.module = dtx.houseStructure.gridModule / 1000;
        // this.standard = areaData.standard;
        // this.rows = areaData.items
        // this.balcony.insertProperties()
        // this.parapet.insertProperties()
        // this.roofgarden.insertProperties()
        // this.area.addItems()
        this.addItems();
        this.getSubtotalRows();

        this.mergeDescriptions(dtx.yane.items);
        this.setDetails(dtx.yane.items);
        this.assignValues(areaData.standard);

        this.getTotalHafu();
        this.getTotalHana();
    }
    // 2020-08-11
    // getDescription(index, floorLevel){
    //   switch(floorLevel){
    //     case '1':
    //       this.items[index].description = 'HANA Horizontal 1F'
    //       break;
    //     case '2':
    //       this.items[index].description = 'HANA Horizontal 2F'
    //       break;
    //     case '3':
    //       this.items[index].description = 'HANA Horizontal 3F'
    //       break;
    //   }
    // }
    // 2020-08-11
    // addDescriptionList(){
    //   for(let i = 1; i <= 3; i++){
    //     this.descriptionList.push(`HANA horizontal ${i}F`)
    //   }
    //   for(let j = 1; j <= 3; j++){
    //     for(let k = 1; k <= 3; k++){
    //       this.descriptionList.push(`HAFU slant ${k}F P${j}`)
    //     }
    //   }
    // }

    getTotalHafu() {
        for (let i = 1, length = 3; i <= length; i++) {
            let hafuDetails = this.items
                .filter(item =>
                    item.description
                        ? item.description.includes(`HAFU slant ${i}F`)
                        : null
                )
                .map(item => ({
                    subTotal: item.subTotal,
                    pitch: item.pitch
                }));
            let subTotal = hafuDetails.map(item => item.subTotal);
            for (let j = 0; j < subTotal.length; j++) {
                this.subTotal[j][`HAFU ${i}F`] =
                    subTotal[j] == 0 ? null : subTotal[j];

                console.log(subTotal);
            }

            let pitchFactor = hafuDetails.map(item => item.pitch);
            // let hafu = this.items.filter(item => item.description ? item.description.includes(`HAFU ${i}F`): null)
            subTotal =
                subTotal.length > 0
                    ? subTotal.reduce((total, num) => total + num, 0)
                    : 0;
            if (pitchFactor.length > 0) {
                subTotal = (Number(subTotal) / 1000) * pitchFactor[i - 1];
            }
            this.slants.splice(i - 1, 1, subTotal);
        }
        let total = this.slants.reduce((total, num) => total + num, 0);
        this.totalSlant = total;
    }
    getTotalHana() {
        for (let i = 1, length = 3; i <= length; i++) {
            let hana = this.items
                .filter(item =>
                    item.description
                        ? item.description.includes(`HANA horizontal ${i}F`)
                        : null
                )
                .map(item => item.subTotal);
            // let hana = this.items.filter(item => item.description ? item.description.includes(`HANA ${i}F`): null)
            for (let j = 0; j < hana.length; j++) {
                this.subTotal[j][`HANA ${i}F`] = hana[j] == 0 ? null : hana[j];
            }
            hana =
                hana.length > 0
                    ? hana.reduce((total, num) => total + num, 0)
                    : 0;
            hana = Number(hana) / 1000;
            this.horizontals.splice(i - 1, 1, hana);
        }
        let total = this.horizontals.reduce((total, num) => total + num, 0);
        this.totalHorizontal = total;
    }
    assignValues(standard) {
        let i = 1;
        let j = 1;

        // arr.forEach( item => {
        for (let item of this.mergedDescriptions) {
            if (item.upperEaves) {
                for (let upper of item.upperEaves) {
                    if (upper.noNeedinHafu) continue;
                    this.items[i].num = j;
                    this.items[i].grids = Number(upper.distance) / 1000;
                    this.items[i].subTotal =
                        Number(upper.distance) * this.module;
                    let floorLevel = upper.layerName.substr(0, 1);
                    switch (floorLevel) {
                        case "1":
                            this.items[i].description = `HANA horizontal 1F`;
                            // this.subTotal[k]['HANA 1F'] += upper.distance;
                            // this.totalSlant.splice(0 , 1, filtered.length)
                            // this.$set(this.items[i], 'description', 'HANA horizontal 1F');
                            break;
                        case "2":
                            this.items[i].description = `HANA horizontal 2F`;
                            // this.subTotal[k]['HANA 2F'] += upper.distance;
                            // this.$set(this.items[i], 'description', 'HANA horizontal 2F');
                            break;
                        case "3":
                            this.items[i].description = `HANA horizontal 3F`;
                            // this.subTotal[k]['HANA 3F'] += upper.distance;
                            // this.$set(this.items[i], 'description', 'HANA horizontal 3F');
                            break;
                    }
                    j++;
                    i++;
                }
            }
            if (item.lowerEaves) {
                for (let lower of item.lowerEaves) {
                    if (lower.noNeedinHafu) continue;
                    this.items[i].num = j;
                    this.items[i].grids = Number(lower.distance) / 1000;
                    this.items[i].subTotal =
                        Number(lower.distance) * this.module;
                    let floorLevel = lower.layerName.substr(0, 1);
                    switch (floorLevel) {
                        case "1":
                            this.items[i].description = `HANA horizontal 1F`;
                            // this.subTotal[k]['HANA 1F'] += lower.distance;
                            // this.$set(this.items[i], 'description', 'HANA horizontal 1F');
                            break;
                        case "2":
                            this.items[i].description = `HANA horizontal 2F`;
                            // this.subTotal[k]['HANA 2F'] += lower.distance;
                            // this.$set(this.items[i], 'description', 'HANA horizontal 2F');
                            break;
                        case "3":
                            this.items[i].description = `HANA horizontal 3F`;
                            // this.subTotal[k]['HANA 3F'] += lower.distance;
                            // this.$set(this.items[i], 'description', 'HANA horizontal 3F');
                            break;
                    }
                    // this.areaData.hafu.items[i].description = 'HANA Horizontal'
                    j++;
                    i++;
                }
            }
            j = 1;
            i++;
            if (item.kerabaEaves) {
                for (let keraba of item.kerabaEaves) {
                    if (keraba.noNeedinHafu) continue;
                    console.log(this.items);

                    this.items[i].num = j;
                    this.items[i].grids = Number(keraba.distance) / 1000;
                    this.items[i].subTotal =
                        Number(keraba.distance) * this.module;
                    let floorLevel = keraba.layerName.substr(0, 1);
                    switch (floorLevel) {
                        case "1": {
                            this.items[
                                i
                            ].description = `HAFU slant 1F ${this.getMatchedPitch(
                                keraba,
                                standard
                            )}`;
                            // this.subTotal[k]['HAFU 1F'] += keraba.distance;
                            let pitchLowerCase = this.getMatchedPitch(
                                keraba,
                                standard
                            ).toLowerCase();
                            this.items[i].pitch = standard.allpitch[
                                `${floorLevel}F`
                            ][`${pitchLowerCase}`].factor();
                            // this.$set( this.items[i], 'description', `HAFU slant 1F ${getMatchedPitch(keraba)}`);
                            break;
                        }
                        case "2": {
                            this.items[
                                i
                            ].description = `HAFU slant 2F ${this.getMatchedPitch(
                                keraba,
                                standard
                            )}`;
                            // this.subTotal[k]['HAFU 2F'] += keraba.distance;
                            let pitchLowerCase = this.getMatchedPitch(
                                keraba,
                                standard
                            ).toLowerCase();
                            this.items[i].pitch = standard.allpitch[
                                `${floorLevel}F`
                            ][`${pitchLowerCase}`].factor();
                            // this.$set(this.items[i], 'description', `HAFU slant 2F ${getMatchedPitch(keraba)}`);
                            break;
                        }
                        case "3": {
                            this.items[
                                i
                            ].description = `HAFU slant 3F ${this.getMatchedPitch(
                                keraba,
                                standard
                            )}`;
                            // this.subTotal[k]['HAFU 3F'] += keraba.distance;
                            let pitchLowerCase = this.getMatchedPitch(
                                keraba,
                                standard
                            ).toLowerCase();
                            this.items[i].pitch = standard.allpitch[
                                `${floorLevel}F`
                            ][`${pitchLowerCase}`].factor();
                            // this.$set(this.items[i], 'description', `HAFU slant 3F ${getMatchedPitch(keraba)}`);
                            break;
                        }
                    }
                    j++;
                    i++;
                }
            }
        }
        // });
    }
    //  getMatchedPitch(keraba){
    //     let pitch = ''
    //     for(let i = 0; i < this.standard.rows.length; i++){
    //     for(let key in this.standard.rows[i]){
    //       if(this.standard.rows[i][key] == keraba.pitch && key !== 'FL'){
    //         pitch = key
    //         // test =  this.areaData.standard.rows[i][key]
    //       console.log(key + '==' + this.standard.rows[i][key])

    //       }
    //     }
    //   }
    //   return pitch
    //  }
}

// let i = 1;
// let trials = ''
// let trial = this.dtx.yane.items.map(res =>{
//     return {
//       kerabaEaves: res.kerabaEaves,
//       lowerEaves: res.lowerEaves,
//       upperEaves: res.upperEaves,
//       layerName: res.layerName,
//       pitch: res.pitch
//     }
//   }
//     )
//     // if(trial.length <= 1){
//         // return;
//     // }
//     trials = trial

// let arr = []
// let grouped = {};

//   for (let obj of trials){
//     for (let [key, val] of Object.entries(obj)){
//         grouped[key] = (grouped[key] || []).concat(val)
//     }
//   }
// arr.push(grouped)
//   for(const items of this.dtx.yane.items){
//     for(const upper of items.upperEaves){
//       upper['pitch'] = items.pitch
//       upper['layerName'] = items.layerName
//     }
//     for(const lower of items.lowerEaves){
//       lower['pitch'] = items.pitch
//       lower['layerName'] = items.layerName
//     }
//     for(const keraba of items.kerabaEaves){
//       keraba['pitch'] = items.pitch
//       keraba['layerName'] = items.layerName
//     }

//   }
// arr.forEach( item => {

//   for ( let upper of item.upperEaves ){
//     if (upper.noNeedinHafu) continue;

//     this.areaData.hafu.items[i].grids = (Number(upper.distance) / 1000);
//     this.areaData.hafu.items[i].eaves = upper.layerName
//     this.areaData.hafu.items[i].subTotal = upper.distance
//     let floorLevel = upper.layerName.substr(0,1)
//       switch(floorLevel){
//       case '1':
//         this.$set(this.areaData.hafu.items[i], 'description', 'HANA horizontal 1F');
//         break;
//       case '2':
//         this.$set(this.areaData.hafu.items[i], 'description', 'HANA horizontal 2F');
//         break;
//       case '3':
//         this.$set(this.areaData.hafu.items[i], 'description', 'HANA horizontal 3F');
//         break;
//     }
//     i++
//   }

//   for ( let lower of item.lowerEaves ){
//     if (lower.noNeedinHafu) continue;
//     this.areaData.hafu.items[i].grids = (Number(lower.distance) / 1000);
//     this.areaData.hafu.items[i].eaves = lower.layerName
//     this.areaData.hafu.items[i].subTotal = lower.distance
//     switch(lower.layerName.substr(0,1)){
//       case '1':
//         this.$set(this.areaData.hafu.items[i], 'description', 'HANA horizontal 1F');
//         break;
//       case '2':
//         this.$set(this.areaData.hafu.items[i], 'description', 'HANA horizontal 2F');
//         break;
//       case '3':
//         this.$set(this.areaData.hafu.items[i], 'description', 'HANA horizontal 3F');
//         break;
//     }
//     // this.areaData.hafu.items[i].description = 'HANA Horizontal'
//     i++
//   }

//   i++;

//   for ( let keraba of item.kerabaEaves ){
//     if (keraba.noNeedinHafu) continue;
//     this.areaData.hafu.items[i].grids = (Number(keraba.distance) / 1000);
//     this.areaData.hafu.items[i].eaves = keraba.layerName;
//     this.areaData.hafu.items[i].subTotal = keraba.distance
//      switch(keraba.layerName.substr(0,1)){
//       case '1':{
//          let pitch = ''
//         for(let i = 0; i < this.areaData.standard.rows.length; i++){
//         for(let key in this.areaData.standard.rows[i]){
//           if(this.areaData.standard.rows[i][key] == keraba.pitch && key !== 'FL'){
//             pitch = key
//             // test =  this.areaData.standard.rows[i][key]
//           console.log(key + '==' + this.areaData.standard.rows[i][key])

//           }
//         }
//       }
//         this.$set( this.areaData.hafu.items[i], 'description', `HAFU slant 1F ${pitch}`);
//         break;
//       }
//       case '2':{
//         let pitch = ''
//         for(let i = 0; i < this.areaData.standard.rows.length; i++){
//           for(let key in this.areaData.standard.rows[i]){
//           if(this.areaData.standard.rows[i][key] == keraba.pitch && key !== 'FL'){
//             pitch = key
//             // test =  this.areaData.standard.rows[i][key]
//           console.log(key + '==' + this.areaData.standard.rows[i][key])

//           }
//         }
//       }
//         this.$set(this.areaData.hafu.items[i], 'description', `HAFU slant 2F ${pitch}`);
//         break;
//       }
//       case '3':{
//          let pitch = ''
//         for(let i = 0; i < this.areaData.standard.rows.length; i++){
//         for(let key in this.areaData.standard.rows[i]){
//           if(this.areaData.standard.rows[i][key] == keraba.pitch && key !== 'FL'){
//             pitch = key
//             // test =  this.areaData.standard.rows[i][key]
//           console.log(key + '==' + this.areaData.standard.rows[i][key])

//           }
//         }
//       }
//         this.$set(this.areaData.hafu.items[i], 'description', `HAFU slant 3F ${pitch}`);
//         break;
//       }
//     }
//     // this.$set(this.areaData.hafu.items[i], 'description','HAFU slant 1F P1');
//     i++
//   }

// });
