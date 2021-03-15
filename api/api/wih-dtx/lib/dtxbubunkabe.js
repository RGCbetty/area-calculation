const { CommonItem } = require("./dtxheadertype");
const { DTXItem } = require("./dtxbase");
const { toInt, toBul, sTrim, toDbl, toEnm } = require("./dtxfunct");
const { reformEnum } = require("./dtxtypes");
const { DPoint } = require("../cadmodule/cadtypes");
const Enumeration = require("./dtxenumeration");

const borderDesignEnum = Enumeration.newEnum(
  ['bdNashi'],
  ['bdJougeHonsen']
);

const bubunKabeInputEnum = Enumeration.newEnum(
  ['bi2Ten'],
  ['biShuuchi']
);

class DTXBubunKabe extends CommonItem{

  constructor(){
    super()
    this.clear();
    this.pointCount = 2;
    this.textDisplay = {
      houkou: new DPoint(),
      ichi: new DPoint()
    };
  }

  assign(data, ln) {
    this.addCommonItem(data, ln, false);
    this.mountDirection                     = toInt({'str': data[ln+2], 'pos':  5, 'len':  5});
    this.lowerHeight.autoCalculation        = toBul({'str': data[ln+2], 'pos': 10, 'len':  5});
    this.upperHeight.autoCalculation        = toBul({'str': data[ln+2], 'pos': 15, 'len':  5});
    this.lowerHeight.border                 = toBul({'str': data[ln+2], 'pos': 20, 'len':  5});
    this.upperHeight.border                 = toBul({'str': data[ln+2], 'pos': 25, 'len':  5});
    this.border.design                      = toEnm({'str': data[ln+2], 'pos': 30, 'len':  5}, borderDesignEnum);
    this.inputMethod                        = toEnm({'str': data[ln+2], 'pos': 35, 'len':  5}, bubunKabeInputEnum);
    this.sekisanKubun                       = toInt({'str': data[ln+2], 'pos': 40, 'len':  5});
    this.border.height                      = toDbl({'str': data[ln+3], 'pos':  0, 'len': 10});
    this.lowerHeight.point1                 = toDbl({'str': data[ln+3], 'pos': 10, 'len': 10});
    this.lowerHeight.point2                 = toDbl({'str': data[ln+3], 'pos': 20, 'len': 10});
    this.upperHeight.point1                 = toDbl({'str': data[ln+3], 'pos': 30, 'len': 10});
    this.upperHeight.point2                 = toDbl({'str': data[ln+3], 'pos': 40, 'len': 10});
    this.length                             = toDbl({'str': data[ln+3], 'pos': 50, 'len': 10});
    this.addCoordinate(data, ln+4, false);
    this.textDisplay.houkou.dX              = toDbl({'str': data[ln+5], 'pos':  0, 'len': 10});
    this.textDisplay.houkou.dY              = toDbl({'str': data[ln+5], 'pos': 10, 'len': 10});
    this.textDisplay.ichi.dX                = toDbl({'str': data[ln+5], 'pos': 20, 'len': 10});
    this.textDisplay.ichi.dY                = toDbl({'str': data[ln+5], 'pos': 30, 'len': 10});
    this.name                               = sTrim({'str': data[ln+6]});
    this.reform                             = toEnm({'str': data[ln+7]}, reformEnum)
  }

  clear() {
    super.clear();
    this.inputMethod = '';
    this.length = 0;
    this.sekisanKubun = 0;
    this.mountDirection = 0;
    this.textDisplay = {};
    this.border = {};
    this.upperHeight = {};
    this.lowerHeight = {};
    this.reform = '';
  }
}

class DTXBubunKabeItem extends DTXItem{
  constructor(){
    super()
  }

  load(data, options) {
    let vItemCount = this.count(data);

    for (let i=1; i<=vItemCount; i++) {
      let item = new DTXBubunKabe();
      item.assign(options.data, this.ln);
      item.setLayerName(options.houseStructure);
      this.addItem(item);
      this.ln += 7; 
    }
  }

}

module.exports = {
  borderDesignEnum,
  bubunKabeInputEnum,
  DTXBubunKabe,
  DTXBubunKabeItem
}