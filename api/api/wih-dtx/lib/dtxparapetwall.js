const {CommonItem} = require("./dtxheadertype");
const {toDbl} = require("./dtxfunct");
const {DTXItem} = require("./dtxbase");

class DTXParapetWall extends CommonItem{
  
  constructor(){
    super()
    this.clear();
    this.pointCount = 2
  }

  assign(data, ln){
    this.addCommonItem(data, ln, false);
    this.height     = toDbl({'str': data[ln+3], 'pos':  0, 'len': 10});
    this.width      = toDbl({'str': data[ln+3], 'pos': 10, 'len': 10});
    this.addCoordinate(data, ln+4, false)
  }

  clear(){
    super.clear();
    this.height = 0;
    this.width = 0;
  }

}

class DTXParapetWallItem extends DTXItem{
  constructor(){
    super()
  }

  load(data, options) {
    let vItemCount = this.count(data);
    for (let i=1; i<=vItemCount; i++){
      let item = new DTXParapetWall();
      item.assign(data, this.ln);
      item.setLayerName(options.houseStructure);
      this.addItem(item);
      this.ln += 5;
    }
  }
}

module.exports = DTXParapetWallItem