const { CommonItem } = require("./dtxheadertype");
const { itemCount } = require("./dtxfunct");
const { DTXItem } = require("./dtxbase");

const shiageTypeEnum = {
  '0': 'stPochi', 
  '1': 'stDomakon', 
  '2': 'stTerasu'
};
Object.freeze(shiageTypeEnum);

class DTXPorch extends CommonItem{

  constructor(){
    super()
    this.clear();
  }

  assign(data, ln) {
    this.addCommonItem(data, ln, true);
    this.addCoordinate(data, ln+4, true )
  }

  clear(){
    super.clear();
    this.shiageType = '';
  }

}

class DTXPorchItem extends DTXItem{
  constructor(){
    super()
  }

  load(data, options) {
    let vItemCount = itemCount(data[0]);
    
    for (let i=1; i<=vItemCount; i++){
      let item = new DTXPorch();
      item.assign(data, this.ln);
      item.setLayerName(options.houseStructure);
      this.addItem(item);
      this.ln += (item.pointCount + 5);
    }

  }

}

module.exports = DTXPorchItem
