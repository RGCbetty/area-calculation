const { CommonItem } = require("./dtxheadertype");
const { DTXItem } = require("./dtxbase");
const { toStr, toBul, toEnm } = require("./dtxfunct");
const { noteAlignEnum, reformEnum, uaTypeEnum } = require("./dtxtypes");
const Enumeration = require('./dtxenumeration')

const ceilingTypeEnum = Enumeration.newEnum(
  ['ctUndefined'], 
  ['ctGeneral'], 
  ['ctSlope']
);

class DTXVoid extends CommonItem{
  
  constructor(){
    super()
    this.clear()
  }

  assign(data, ln) {
    this.addCommonItem(data, ln, true);
    this.addCoordinate(data, ln+3, true);
    this.ceilingType                    = toEnm({'str': data[ln+this.pointCount+3], 'pos': 0, 'len': 5}, ceilingTypeEnum);
    this.skeleton                       = toBul({'str': data[ln+this.pointCount+3], 'pos': 5, 'len': 5});
    this.name                           = toStr({'str': data[ln+this.pointCount+4]});
    this.noteAlign                      = toEnm({'str': data[ln+this.pointCount+5]}, noteAlignEnum);
    this.reform                         = toEnm({'str': data[ln+this.pointCount+6]}, reformEnum);
    this.uaType                         = toEnm({'str': data[ln+this.pointCount+7]}, uaTypeEnum);
  }

  clear() {
    super.clear()
    this.ceilingType = '';
    this.skeleton = false;
    this.noteAlign = '';
    this.reform = '';
    this.uaType = '';
  }
}

class DTXVoidItem extends DTXItem{
  constructor(){
    super()
  }

  load(data, options) {
    let vItemCount = this.count(data);

    for(let i=1; i<=vItemCount; i++){
      let item = new DTXVoid();
      item.assign(data, this.ln);
      item.setLayerName(options.houseStructure);
      this.addItem(item);
      this.ln += ( item.pointCount + 7 );
    }
  }
}

module.exports = {
  DTXVoidItem
}