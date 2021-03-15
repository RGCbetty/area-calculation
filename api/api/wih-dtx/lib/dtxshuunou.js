const dtxheader = require("./dtxheadertype");
const {toStr, toEnm} = require("./dtxfunct");
const {noteAlignEnum, reformEnum, uaTypeEnum} = require("./dtxtypes");
const {DTXItem} = require("./dtxbase");

class DTXShuunou extends dtxheader.CommonItem{
  
  constructor(){
    super()
  }

  assign(data, ln){
    this.addCommonItem(data, ln, true);
    this.noteAlign                        = toEnm( {'str':data[ln+2], 'pos': 15, 'len': 5}, noteAlignEnum);
    this.name                             = toStr({'str':data[ln+4]})
    this.addCoordinate(data, ln+5, true);
    this.reform                           = toEnm( { 'str':data[ln+5+this.pointCount] }, reformEnum );
    this.uaType                           = toEnm( { 'str':data[ln+6+this.pointCount] }, uaTypeEnum );
  }

  clear(){
    super.clear();
    this.noteAlign = {};
    this.reform = {};
    this.uaType = {};
  }
}

class DTXShuunouItem extends DTXItem{
  constructor(){
    super()
  }
  
  load(data, options) {
    let vItemCount = this.count(data);
    for (let i=1; i<=vItemCount; i++){
      let item = new DTXShuunou()
      item.assign(data, this.ln);
      item.setLayerName(options.houseStructure);
      this.addItem(item);
      this.ln += (item.pointCount + 6)
    }
  }
}

module.exports = DTXShuunouItem
