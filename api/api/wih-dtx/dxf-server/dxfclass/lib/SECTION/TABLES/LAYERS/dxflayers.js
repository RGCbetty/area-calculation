const Layer = require('./dxflayer');

module.exports = class Layers extends Array{
  constructor(layers = []){
    super()
    layers.forEach(layer=>{
      this.addLayer( Layer.newLayer( layer ) );
    })
  }

  static newLayers(layers = []){
    return new Layers( layers )
  }

  addLayer(layer){
    super.push(layer)
  }

  toDXFString(){
    let result = '2\r\nLAYER\r\n'
    result += '70\r\n1\r\n'
    this.forEach(layer => {
      result += layer.toDXFString()
    })
    return result
  }
}