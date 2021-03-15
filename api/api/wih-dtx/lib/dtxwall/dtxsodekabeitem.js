const { DTXItem } = require( "../dtxbase");
const DTXSodekabe = require('./dtxsodekabe')

class SodekabeItems extends Array{
  constructor(){
    super()
  }

  getExternalWallLength(layerName, options){
    let res = 0
    for (let sode of this ){
      if (layerName != sode.layerName) continue;
      res += sode.getOutsideWallPerimeter(sode.layerNumber, options)
    }
    return res
  }

}

module.exports = class DTXSodeKabeItem extends DTXItem{
  constructor(){
    super()
    this.items = new SodekabeItems()
  }
  
  load(data, ln, options) {
    let item = new DTXSodekabe();
    item.assign(data, ln);
    item.setLayerName(options.houseStructure);
    this.addItem(item);  
  }

  getExternalWallLength(layerName, options){
    return this.items.getExternalWallLength(layerName, options);
  }


}