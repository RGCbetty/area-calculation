const TateguGenkan = require('./dtxtategugenkan');

module.exports = class DTXTateguGenkans extends Array{
  constructor(){
    super()
  }

  create(row, data, csv, ln, options){
    let item = new TateguGenkan()
    item.assign(row, data, csv, ln, options);
    this.push(item)
  }

  getlengthFromNegativeFloorLevel(layerNumber){
    let res = 0;
    for (let item of this){
      res += item.getlengthFromNegativeFloorLevel(layerNumber)
    }
    return res
  }
}