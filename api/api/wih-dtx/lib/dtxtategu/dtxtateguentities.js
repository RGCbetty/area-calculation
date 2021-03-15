const { DTXItem } = require("../dtxbase");
const DTXTateguNaibus = require('./dtxtategunaibus');
const DTXTateguGaibus = require('./dtxtategugaibus');
const DTXTateguGenkans = require('./dtxtategugenkans');
const CSVTateguHRD = require('../../csv-server/hrdcsv/csvclass/csvtateguhrd')
const {toInt} = require("../dtxfunct");

module.exports = class DTXTateguEntities extends DTXItem{
  constructor(){
    super()
    this.naibu = new DTXTateguNaibus();
    this.gaibu = new DTXTateguGaibus();
    this.genkan = new DTXTateguGenkans();
  }

  load(data, options) {
  
    let tategucsv = new CSVTateguHRD();
    if ( tategucsv.loadFromArchServer(`${options.planInfo.memo1}-${options.planInfo.memo2}`) ){
      let vItemCount = this.count(data);
      for (let i=1; i<=vItemCount; i++) {
        let tori = tategucsv.cellAsInteger(i, 4)
        let add = toInt({'str': data[this.ln + 29]})
        
        switch(tori){
          case 0: 
            this.naibu.create(i, data, tategucsv, this.ln);
            break;
          case 1:
            this.gaibu.create(i, data, tategucsv, this.ln);
            break;
          case 2:
            this.genkan.create(i, data, tategucsv, this.ln, options);
            break;
        }

        this.ln += (add + 38); 
      }
    }
  }

  getlengthFromNegativeFloorLevel(layerNumber){
    let res = 0;
    res = this.gaibu.getlengthFromNegativeFloorLevel(layerNumber);
    res += this.genkan.getlengthFromNegativeFloorLevel(layerNumber);
    return res
  }

}