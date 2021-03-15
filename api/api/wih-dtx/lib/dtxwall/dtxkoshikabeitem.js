const { DTXItem } = require( "../dtxbase");
const DTXKoshikabe = require('./dtxkoshikabe')

module.exports = class DTXKoshiKabeItem extends DTXItem{
  constructor(){
    super()
  }
  
  load(data, ln, options) {
    let item = new DTXKoshikabe();
    item.assign(data, ln);
    item.setLayerName(options.houseStructure);
    this.addItem(item);  
  }

}