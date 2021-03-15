const { CommonItem } = require("../dtxheadertype");

class DTX2DBase extends CommonItem{

  constructor(){
    super()
    this.clear();
  }

  clear(){
    this.isAlreadyAssigned = false
  }
}

module.exports = {
  DTX2DBase
}