module.exports = class Point{
  constructor(point){
    this.colorNumber = 7;
    this.thickness = 0
    this.assign(point);
  }

  assign(point){
    if(point){
      this.layerName = point.layerName;
      this.colorNumber = point.colorNumber;
      this.dPoints = [{dX:0, dY:0, dZ:0}];
      this.dPoints = [{...this.dPoints[0], ...point.dPoints[0]}];
    }
  }

  static newPoint(point){
    return new Point(point);
  }

  static draw(x1, y1, layerName, colorNumber){
    return new Point({
        'layerName': layerName,
        'colorNumber': colorNumber,
        'dPoints': [{dX: x1, dY: y1}]
      })  
  }

  toDXFString(){
    let result = `0\r\nPOINT\r\n`;
    result += `8\r\n${this.layerName}\r\n`;
    result += `62\r\n${this.colorNumber}\r\n`;
    result += `10\r\n${this.dPoints[0].dX.toFixed(6)}\r\n`;
    result += `20\r\n${this.dPoints[0].dY.toFixed(6)}\r\n`;
    result += `30\r\n${this.dPoints[0].dZ.toFixed(6)}\r\n`;
    result += `39\r\n${this.thickness.toFixed(6)}\r\n`;
    return result
  }

}
