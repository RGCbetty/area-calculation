const { DTXItem } = require( "../dtxbase");
const DTXKabe = require('./dtxkabe')

class KabeItems extends Array{
  constructor(){
    super()
  }

  getExternalWallLength(layerName, options){
    let res = 0
    for (let kabe of this ){
      if (layerName != kabe.layerName) continue;
      res += kabe.getOutsideWallPerimeter(kabe.layerNumber, options)
    }
    return res
  }

}

module.exports = class DTXKabeItem extends DTXItem{
  constructor(){
    super()
    this.items = new KabeItems()
  }

  load(data, ln, options) {
    
    let item = new DTXKabe();
    item.assign(data, ln);
    item.setLayerName(options.houseStructure);
    item.checkPartialWall(options)
    this.addItem(item)
  }

  getExternalWallLength(layerName, options){
    return this.items.getExternalWallLength(layerName, options);
  }

}