const {CommonItem} = require('./dtxheadertype');
const {DTXItem} = require('./dtxbase')

class DTXAtsumiRyouiki extends CommonItem{
  
  constructor(){
    super()
    this.clear()
  }

  assign(data, ln){
    this.addCommonItem(data, ln, true);
    this.addCoordinate(data, ln+4, true);
  }

  clear(){
    super.clear();
    this.line = false;
  }
}

class DTXAtsumiRyouikiItem extends DTXItem{
  constructor(){
    super()
  }

  load(data, options) {
    let vItemCount = this.count(data);
    for (let i=1; i<=vItemCount; i++){
      let item = new DTXAtsumiRyouiki();
      item.assign(data, this.ln);
      item.setLayerName(options.houseStructure);
      this.addItem(item);
      this.ln += (item.pointCount + 4);
    }
  }
}

module.exports = {
  DTXAtsumiRyouikiItem
}