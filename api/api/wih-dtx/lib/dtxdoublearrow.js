const { DTX2DItem } = require("./dtxheadertype");
const { DTXItem } = require( "./dtxbase");
const { toStr, toInt, toEnm } = require( "./dtxfunct");
const { usePlaceEnum } = require( "./dtxtypes");

class DTXDoubleArrow extends DTX2DItem{

  constructor(){
    super()
    this.clear();
  }

  assign(data, ln) {
    this.addCommonItem(data, ln, false)
    this.usePlace         = toEnm({'str':data[ln+2], 'pos':  5, 'len': 5}, usePlaceEnum)
    this.text1            = toStr({'str':data[ln+2], 'pos': 10, 'len': data[ln+2].length - 10})
    this.text2            = toStr({'str':data[ln+3], 'pos':  5, 'len': data[ln+3].length - 5})
    this.inputType        = toInt({'str':data[ln+4], 'pos':  0, 'len': 5})
    this.text3            = toStr({'str':data[ln+4], 'pos':  5, 'len': data[ln+4].length - 5})
    switch(this.inputType){
      case 1: 
        this.pointCount = 2;
        break
      case 2: 
        this.pointCount = toInt({'str':data[ln+10], 'pos':  0, 'len': 5})
        break
    }
    this.addCoordinate(data, ln+11, false)
  }

  clear(){
    super.clear()
    this.text1 = '';
    this.text2 = '';
    this.text3 = '';
    this.inputType = 0;
  }
}

class DTXDoubleArrowItem extends DTXItem{
  constructor(){
    super()
  }

  load(data, options) {
    let vItemCount = this.count(data);
    for(let i=1; i<=vItemCount; i++){
      let item = new DTXDoubleArrow();
      item.assign(data, this.ln);
      item.setLayerName(options.houseStructure);
      this.addItem(item);
      this.ln += 11
    }
  }
}

module.exports = {
  DTXDoubleArrowItem
}