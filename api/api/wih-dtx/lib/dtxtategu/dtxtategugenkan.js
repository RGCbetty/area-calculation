const DTXTateguProperty = require('./dtxtateguproperty');
const tateguTypes = require('./dtxtategutypes');

module.exports = class extends DTXTateguProperty{
  constructor(){
    super()
    this.hashiraYose = {};
    this.direction
  }

  addheyamei(options){
    return ''
  }

  assign(row, data, csv, ln, options){
    this.addCommonProperty(row, data, csv, ln);
    this.hashiraYose = tateguTypes.houkouTypeEnum[csv.cellAsInteger(row, 12)];
    if (this.heyamei1 == ''){
      this.heyamei1 = this.heyamei2
    }
    this.heyamei2 = '';


  }
}