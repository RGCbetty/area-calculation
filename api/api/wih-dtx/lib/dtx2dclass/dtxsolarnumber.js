const { DTXItem } = require("../dtxbase");
const { DTX2DBase } = require("./dtx2dbase");

class DTXSolarNumber extends DTX2DBase{
  constructor(){
    super()
  }

  assign(aTX) {
    // console.log(aTX)
    this.setCommon(aTX)
    this.name = aTX.text;
  }
  
}

class DTXSolarNumberItem extends DTXItem{
  constructor(){
    super()
  }

isSolarNumber(aTX = '') {
	if (aTX.materialCode != ''){
    // console.log(aTX)
		return aTX.materialCode.indexOf('Solar Number') !== -1
	}else{
		return ( ( aTX.layerNumber < 0 ) && ( aTX.text == '①' || aTX.text == '②' ) )
	}
}

  

  load(aTX) {
    if (this.isSolarNumber(aTX)){
      let item = new DTXSolarNumber();
      item.assign(aTX);
      this.addItem(item);
    }
  }
}

module.exports = {
  DTXSolarNumberItem
}