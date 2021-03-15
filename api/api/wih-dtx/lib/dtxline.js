const { DTX2DItem } = require("./dtxheadertype");
const { DTXItem } = require( "./dtxbase.js");
const { toEnm } = require( "./dtxfunct");
const Enumeration = require( "./dtxenumeration");

const endLineSymbolEnum = Enumeration.newEnum(
  ['elNone'],
  ['elArrowHead'],
  ['elCircle'],
  ['elArrowShade'],
  ['elBox'],
  ['elArrowHalf']
);

class DTXLine extends DTX2DItem{

  constructor(){
    super()
    this.clear();
    this.pointCount = 2;
  }
  
  assign(data, ln) {
    this.addCommonItem(data, ln);
    this.addCoordinate(data, ln+3);
    this.startSymbol      = toEnm({'str': data[ln+5], 'pos': 10, 'len': 5}, endLineSymbolEnum);
    this.endSymbol        = toEnm({'str': data[ln+5], 'pos': 15, 'len': 5}, endLineSymbolEnum);
  }

  clear(){
    super.clear();
    this.startSymbol = '';
    this.endSymbol = '';
  }
}

class DTXLineItem extends DTXItem{
  constructor(){
    super()
  }

  load(data, options) {
    let vItemCount = this.count(data);

    for(let i=1; i<=vItemCount; i++){
      let item = new DTXLine();
      item.assign(data, this.ln);
      item.setLayerName(options.houseStructure);
      this.addItem(item);
      this.ln += 8;
    }
  }
}

module.exports = {
  DTXLine,
  DTXLineItem
}