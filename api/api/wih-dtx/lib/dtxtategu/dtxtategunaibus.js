const TateguNaibu = require('./dtxtategunaibu');

module.exports = class DTXTateguNaibus extends Array{
  constructor(){
    super()
  }

  create(row, data, csv, ln){
    let item = new TateguNaibu()
    item.assign(row, data, csv, ln);
    this.push(item)
  }
}