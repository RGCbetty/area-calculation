const PointEntity = require('../POINT/pointentity');
const Texts = require('./dxftexts');

module.exports = class TextEntity extends PointEntity{
  constructor(entities){
    super(entities);
    this.texts = new Texts();
    entities.forEach( entity => {
      this.addText(entity);
    })
  }

  isText(entity){
    
  }

  addText(entity){
    if (addText(entity)){

    }
  }

  toDXFString(){
    let result = '';
    result += super.toDXFString();
    result += this.texts.toDXFString()
    return result;
  }

  drawText(x1, y1, value){
    this.texts.draw(x1, y1, value, this.activeLayerName, this.activeColorNumber)
  }

}