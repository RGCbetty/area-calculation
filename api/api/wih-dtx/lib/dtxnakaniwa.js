const {DTXItem}  = require('./dtxbase');
const {CommonItem}  = require('./dtxheadertype');

class DTXNakaniwaItem extends DTXItem{
  constructor(){
    super();
  }

  load(data, options) {
    let vItemCount = this.count(data);

    for (let i=1; i<= vItemCount; i++){
      let item = new CommonItem();
      item.addCommonItem(data, this.ln, true);
      item.addCoordinate(data, this.ln+3, true);
      item.setLayerName(options.houseStructure);
      this.addItem(item);
      this.ln += (item.pointCount + 2)
    }
  }
}

module.exports = DTXNakaniwaItem
