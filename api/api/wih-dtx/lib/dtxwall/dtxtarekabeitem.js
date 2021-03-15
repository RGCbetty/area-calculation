const { DTXItem } = require( "../dtxbase");
const DTXTarekabe = require('./dtxtarekabe')

module.exports = class DTXTareKabeItem extends DTXItem{
  constructor(){
    super()
  }

  load(data, ln, options) {
    let item = new DTXTarekabe();
    item.assign(data, ln);
    item.setLayerName(options.houseStructure);
    this.addItem(item);
  }

}