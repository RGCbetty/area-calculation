const { DTXItem } = require("./dtxbase");
const { toDbl } = require("./dtxfunct");
const { DTX2DItem } = require("./dtxheadertype");

class DTXCircle extends DTX2DItem{

  constructor(){
    super()
    this.clear();
    this.pointCount = 1;
  }

  assign(data, ln) {
    this.addCommonItem(data, ln, false);
    this.radius     = toDbl({'str': data[ln+3]});
    this.addCoordinate(data, ln+4, false);
  }
  clear(){
    super.clear();
    this.radius = 0;
  } 

}

class DTXCircleItem extends DTXItem{
  constructor(){
    super()
  }

  load(data, options) {
    let vItemCount = this.count(data);
    for(let i=1; i<=vItemCount; i++){
      let item = new DTXCircle();
      item.assign(data, this.ln);
      item.setLayerName(options.houseStructure);
      this.addItem(item);
      this.ln += 8
    }
  }
}

module.exports = {
  DTXCircleItem
}