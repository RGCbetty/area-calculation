const { DTXSolarNumberItem } = require("./dtx2dclass/dtxsolarnumber");
const { DTXAddRoofDimItem } = require("./dtx2dclass/dtxaddroofdimension");

class DTXTwoDItem{

  constructor(){
    this.solarNumber = new DTXSolarNumberItem();
    this.additionalRoofDim = new DTXAddRoofDimItem();
  }
  fromText(vTX) {
    for (const tTX of vTX.items){
      // if (!tTX.materialCode) continue;
      this.solarNumber.load(tTX);
    }
  }

  fromLine(vLN) {
    for (const tLN of vLN.items){
      if (!tLN.materialCode) continue;
      this.additionalRoofDim.load(tLN);
    }
  }

  load(values) {
    this.fromText(values.text);
    this.fromLine(values.line)
  }

  clear() {
    this.solarNumber.clear();
    this.additionalRoofDim.clear(); 
  }
  
}

module.exports = {
  DTXTwoDItem
}