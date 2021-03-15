
const TateguGaibu = require('./dtxtategugaibu');

module.exports = class DTXTateguGaibus extends Array{
  constructor(){
    super()
  }

  create(row, data, csv, ln){
    let item = new TateguGaibu()
    item.assign(row, data, csv, ln);
    this.push(item)
  }

  getlengthFromNegativeFloorLevel(layerNumber){
    let res = 0;
    this.forEach( item => {
      res += item.getlengthFromNegativeFloorLevel(layerNumber)
    })
    return res
  }
}


