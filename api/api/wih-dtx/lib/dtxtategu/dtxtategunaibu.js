const DTXTateguProperty = require('./dtxtateguproperty');
const tateguTypes = require('./dtxtategutypes');

module.exports = class extends DTXTateguProperty{
  constructor(){
    super();
    this.komado = false;
    this.fusuma = false;
    this.fusumaLocation = {};

  } 

  assign(row, data, csv, ln){
    this.addCommonProperty(row, data, csv, ln);
    this.komado = csv.cellsAsBoolean(row, 39);
    this.fusuma = csv.cellsAsBoolean(row, 39);
    this.fusumaLocation = tateguTypes.houkouTypeEnum[csv.cellAsInteger(row, 40)];
    
    // if ( ( this.name.indexOf('PM') > -1) || ( this.name.indexOf('PL') > -1) ){

    // }

    

  }
}