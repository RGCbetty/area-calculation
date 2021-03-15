const { CommonItem } = require("./dtxheadertype");
const { DTXItem } = require( "./dtxbase");
const { sTrim, toInt, toEnm } = require( "./dtxfunct");
const { noteAlignEnum, reformEnum, uaTypeEnum } = require( "./dtxtypes");
const Enumeration = require('./dtxenumeration')

const tokonomaTypeEnum = Enumeration.newEnum(
  ['ttTokokamachi'], 
  ['ttJibanNomi']
);

class DTXTokonoma extends CommonItem{

  constructor(){
    super()
    this.clear();
  }

  assign(data, ln) {
    this.addCommonItem(data, ln, true);
    this.tokonomaType                 = toEnm({'str': data[ln+2], 'pos': 10, 'len': 5}, tokonomaTypeEnum);
    this.kamachiHeight                = toInt({'str': data[ln+2], 'pos': 15, 'len': 5});
    this.noteAlign                    = toEnm({'str': data[ln+2], 'pos': 20, 'len': 5}, noteAlignEnum);
    this.name                         = sTrim({'str': data[ln+3]});
    this.addCoordinate(data, ln+4, true);
    this.reform                       = toEnm({'str': data[ln+this.pointCount+4]}, reformEnum);
    this.uaType                       = toEnm({'str': data[ln+this.pointCount+5]}, uaTypeEnum);
  }

  clear(){
    super.clear()
    this.tokonomaType  = '';
    this.kamachiHeight = 0;
    this.noteAlign     = '';
    this.reform        = '';
    this.uaType        = '';
  }

}

class DTXTokonomaItem extends DTXItem{
  constructor(){
    super()
  }

  load(data, options) {
    let vItemCount = this.count(data);

    for (let i=1; i<=vItemCount; i++){
      let item = new DTXTokonoma();
      item.assign(data, this.ln);
      item.setLayerName(options.houseStructure);
      this.addItem(item);
      this.ln += (item.pointCount + 5)
    }
  }
}

module.exports = {
  tokonomaTypeEnum,
  DTXTokonoma,
  DTXTokonomaItem
}