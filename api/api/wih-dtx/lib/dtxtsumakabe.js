const { CommonItem } = require("./dtxheadertype");
const { DTXItem } = require("./dtxbase");
const { toStr, toEnm } = require("./dtxfunct");
const Enumeration = require("./dtxenumeration");

const wallTypeEnum = Enumeration.newEnum(
  ['wtKiridzuma', 1], 
  ['wtIrimoya', 2]
);

class DTXTsumakabe extends CommonItem{
  
  constructor(){
    super()
    this.clear();
    this.pointCount = 2
  }

  assign(data, ln){
    this.addCommonItem(data, ln, false);
    this.addCoordinate(data, ln+3, false);
    this.wallType = toEnm({'str': data[ln+2], 'pos': 5, 'len': 5}, wallTypeEnum);
  }

  clear() {
    super.clear()
    this.wallType = ''
  }
}

class DTXTsumakabeItem extends DTXItem{
  constructor(){
    super()
  }

  load(data, options) {
    
    let vItemCount = this.count(data);

    for (let i=1; i<=vItemCount; i++){
      let item = new DTXTsumakabe();
      item.assign(data, this.ln);
      item.setLayerName(options.houseStructure);
      this.addItem(item);
      this.ln += 3
    }
  }
  
}

module.exports = {
  DTXTsumakabeItem
}