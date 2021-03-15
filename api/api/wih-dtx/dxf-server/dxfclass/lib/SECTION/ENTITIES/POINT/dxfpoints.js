const Point = require('./dxfpoint');
module.exports = class Points extends Array{
  constructor(points=[]){
    super()
    this.addPoints(points);
  }

  static newPoints(...points){
    return new Lines(points);
  }

  addPoints(points){
    points.forEach(point => {
      this.addPoint(point.newLine(point))
    })
  }

  addPoint(point){
    super.push(point);
  };

  toDXFString(){
    let result = '';
    this.forEach(point => {
      result += point.toDXFString()
    })
    return result
  }

  draw(x1, y1, layerName, colorNumber){
    this.addPoint( Point.draw(x1, y1, layerName, colorNumber) )
  }
}
