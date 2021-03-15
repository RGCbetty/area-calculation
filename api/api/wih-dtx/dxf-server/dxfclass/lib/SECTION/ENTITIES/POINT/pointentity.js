const LineEntity = require('../LINE/lineentity');
const Points = require('./dxfpoints');

module.exports = class PointEntity extends LineEntity{
  constructor(entities){
    super(entities);
    this.points = new Points();
    entities.forEach( entity => {
      this.addPoint(entity);
    })
  }

  isPoint(entity){
    
  }

  addPoint(entity){
    if (isPoint(entity)){

    }
  }

  toDXFString(){
    let result = '';
    result += super.toDXFString();
    result += this.points.toDXFString()
    return result;
  }
  
  drawPoint(x1, y1){
    this.points.draw(x1, y1, this.activeLayerName, this.activeColorNumber)
  }

}

