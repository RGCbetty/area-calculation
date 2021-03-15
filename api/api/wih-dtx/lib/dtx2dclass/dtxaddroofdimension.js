const { DTX2DBase } = require("./dtx2dbase");
const { DTXItem } = require("../dtxbase");
const { eaveTypeEnum } = require("../dtxtypes");
const { toEnm } = require("../dtxfunct");

class DTXAddRoofDim extends DTX2DBase{
  
  isKeraba(aLN) {
    return aLN.materialCode.indexOf('Keraba') !== -1;
  }

  isLower(aLN) {
    return aLN.materialCode.indexOf('Lower') !== -1;
  }

  isUpper(aLN) {
    return aLN.materialCode.indexOf('Upper') !== -1; 
  }

  constructor(){
    super();
    this.clear();
  }

  assign(aLN) {
    this.setCommon(aLN);
    if ( this.isKeraba(aLN) ){
      this.eaveType = toEnm('0', eaveTypeEnum); 
    }else if ( this.isLower(aLN) ){
      this.eaveType = toEnm('1', eaveTypeEnum);
    }else if ( this.isUpper(aLN) ){
      this.eaveType = toEnm('2', eaveTypeEnum);
    }
  }

  get size(){
    return this.linePt.lengthDistance;
  }

  clear(){
    super.clear()
    this.eaveType = {}
  }

}

class DTXAddRoofDimItem extends DTXItem{
  constructor(){
    super()
  }

  isAddRoofDim(aLN) {
    return aLN.materialCode.indexOf('AddRoofDim') !== -1;
  }

  load(aLN) {
    if (this.isAddRoofDim(aLN)){
      let item = new DTXAddRoofDim();
      item.assign(aLN);
      this.addItem(item);
    }
  }
}

module.exports = {
  DTXAddRoofDim,
  DTXAddRoofDimItem
}