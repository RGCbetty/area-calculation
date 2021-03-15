const EntitiesObject = require('../dxfentitiesobject');

const Lines = require('./dxflines');

module.exports = class LineEntity extends EntitiesObject{
  constructor(entities = []){
    super()
    this.lines = new Lines()
    entities.forEach( entity => {
      this.addEntity(entity);
    })
  }

  isLine(entity){

  }

  addEntity(entity){
    if (isLine(entity)){

    }
  }

  toDXFString(){
    return this.lines.toDXFString();
  }

  drawLine(x1, y1, x2, y2){
    this.lines.draw(x1, y1, x2, y2, this.activeLayerName, this.activeLineTypeName, this.activeColorNumber)
  }

}