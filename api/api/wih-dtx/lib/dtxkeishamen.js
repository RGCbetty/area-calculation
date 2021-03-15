const { CommonItem } = require("./dtxheadertype");
const { DTXItem } = require("./dtxbase");
const { toEnm } = require("./dtxfunct");
const Enumeration = require("./dtxenumeration");

const keishaMenKeijouEnum = Enumeration.newEnum(
  ['kkKeishaRyouiki', 1],
  ['kkSuichokuSenbun']
);

const shiyouBuiEnum = Enumeration.newEnum(
  ['sbDouro'], 
  ['sbShikichiHoumen'],
  ['sbSonota1'],
  ['sbSonota2'],
  ['sbSonota3'],
  ['sbSonota4'],
  ['sbSonota5'],
);

class DTXKeishaMen extends CommonItem{
 
  constructor(){
    super()
  }

  assign(data, ln){
    this.addCommonItem(data, ln, true);
    this.shiyouBui                      = toEnm({'str': data[ln+2], 'pos': 10, 'len': 5}, shiyouBuiEnum);
    this.addCoordinate(data, ln+3, true);
    this.addCoordinate3D(data, ln+3, true);
    this.shapeType                      = toEnm({'str': data[ln+3+this.pointCount]}, keishaMenKeijouEnum);
  }

  clear(){
    super.clear();
    this.shiyouBui = '';
    this.shapeType = '';
  }

}

class DTXKeishaMenItem extends DTXItem{
  constructor(){
    super()
  }

  load(data, options) {
    let vItemCount = this.count(data);
    for (let i=1; i<=vItemCount; i++){
      let item = new DTXKeishaMen();
      item.assign(data, this.ln);
      item.setLayerName(options.houseStructure);
      this.addItem(item)
      this.ln += (item.pointCount + 3)
    }
  }
}

module.exports = {
  DTXKeishaMenItem
}