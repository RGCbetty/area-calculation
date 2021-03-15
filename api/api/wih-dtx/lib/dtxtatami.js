const { CommonItem } = require("./dtxheadertype");
const { DTXItem } = require("./dtxbase");
const { toBul, toEnm } = require("./dtxfunct");
const { reformEnum } = require("./dtxtypes");
const Enumeration = require('./dtxenumeration');

const tatamiTypeEnum = Enumeration.newEnum(
  ['tt2'], 
  ['tt3A'], 
  ['tt3B'], 
  ['tt4A'], 
  ['tt4B'], 
  ['tt45A'], 
  ['tt45B'], 
  ['tt6'], 
  ['tt75'], 
  ['tt8'], 
  ['tt10'], 
  ['tt12'], 
  ['ttHanjou'], 
  ['tt1']
);

const tatamiDirectionEnum =  Enumeration.newEnum(
  ['tdLeft', -1], 
  ['tdRight', 1]
);

class DTXTatami extends CommonItem{

  constructor(){
    super();
    this.clear();
  }

  assign(data, ln) {
    this.addCommonItem(data, ln, true);
    this.tatamiType                       = toEnm({'str': data[ln+2], 'pos': 10, 'len': 5}, tatamiTypeEnum);
    this.direction                        = toEnm({'str': data[ln+2], 'pos': 15, 'len': 5}, tatamiDirectionEnum);
    this.noLine                           = toBul({'str': data[ln+2], 'pos': 20, 'len': 5});
    this.ryuukuTatami                     = toBul({'str': data[ln+2], 'pos': 25, 'len': 5});
    this.actualDimensionInput             = toBul({'str': data[ln+2], 'pos': 30, 'len': 5});
    this.addCoordinate(data, ln+3, true);
    this.reform                           = toEnm({'str': data[ln+this.pointCount+3]}, reformEnum);
  }

  clear(){
    super.clear();
    this.tatamiType = '';
    this.direction = '';
    this.noLine = false;
    this.ryuukuTatami = false;
    this.actualDimensionInput = false;
    this.reform = '';
  }

}

class DTXTatamiItem extends DTXItem{
  constructor(){
    super()
  }

  load(data, options){
    let vItemCount = this.count(data);

    for (let i=1; i<=vItemCount; i++){
      let item = new DTXTatami();
      item.assign(data, this.ln);
      item.setLayerName(options.houseStructure);
      this.addItem(item);
      this.ln += 7
    }
  }
}

module.exports = {
  tatamiTypeEnum, 
  tatamiDirectionEnum,
  DTXTatami,
  DTXTatamiItem
}