const TwoDObject = require('../dxf2dobject');

module.exports = class Line extends TwoDObject{
  constructor(line){
    super();
    this.lineTypeName = '';
    this.colorNumber = 0;
    this.thickness = 0;
    this.assign(line);
  }

  assign(line){
    if(line){
      this.layerName = line.layerName;
      this.lineTypeName = line.lineTypeName;
      this.colorNumber = line.colorNumber;
      this.dPoints = [{...this.dPoints[0], ...line.dPoints[0]},{...this.dPoints[1], ...line.dPoints[1]}];
    }
  }

  static newLine(line){
    return new Line(line);
  }

  static draw(x1, y1, x2, y2, layerName, lineTypeName, colorNumber){
    return new Line({
        layerName: layerName,
        lineTypeName: lineTypeName,
        colorNumber: colorNumber,
        dPoints: [{dX: x1,dY: y1},{dX: x2, dY: y2}]
      })  
  }

  toDXFString(){
    let result = `0\r\nLINE\r\n`;
    result += `8\r\n${this.layerName}\r\n`;
    result += `6\r\n${this.lineTypeName}\r\n`;
    result += `62\r\n${this.colorNumber}\r\n`;
    result += `10\r\n${this.dPoints[0].dX.toFixed(6)}\r\n`;
    result += `20\r\n${this.dPoints[0].dY.toFixed(6)}\r\n`;
    result += `30\r\n${this.dPoints[0].dZ.toFixed(6)}\r\n`;
    result += `11\r\n${this.dPoints[1].dX.toFixed(6)}\r\n`;
    result += `21\r\n${this.dPoints[1].dY.toFixed(6)}\r\n`;
    result += `31\r\n${this.dPoints[1].dZ.toFixed(6)}\r\n`;
    result += `39\r\n${this.thickness.toFixed(6)}\r\n`;
    return result
  }
}