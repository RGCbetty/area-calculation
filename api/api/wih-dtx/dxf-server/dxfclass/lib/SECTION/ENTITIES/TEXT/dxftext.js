const TwoDObject = require('../dxf2dobject');

module.exports = class Text extends TwoDObject{
  constructor(text){
    super();
    this.height = 388;
    this.rotation = 0;
    this.thickness= 1;
    this.value = '';
    this.textStyle = 'STANDARD';
    this.dPoints = [{dX:0, dY:0, dZ:0}];
    this.assign(text)
  } 

  assign(text){
    if (text){
      this.layerName = text.layerName;
      this.colorNumber = text.colorNumber;
      this.thickness = text.thickness;
      this.dPoints = [{...this.dPoints[0], ...text.dPoints[0]}];
      this.height = text.height;
      this.value = text.value;
      this.rotation = text.rotation;
      this.textStyle = text.textStyle;
    }
  }

  static newText(text){
    return new Text(text);
  }

  static draw(x1, y1, value, layerName, colorNumber, thickness, height, rotation, textStyle){
    return new Text({
      'layerName' : layerName,
      'colorNumber' : colorNumber,
      'thickness' : thickness,
      'dPoints' : [{dX: x1, dY: y1}],
      'height' : height,
      'value' : value,
      'rotation' : rotation,
      'textStyle' : textStyle
    })
  }

  toDXFString(){
    //https://www.autodesk.com/techpubs/autocad/acadr14/dxf/text_al_u05_c.htm
    let y = (this.dPoints[0].dY) - (this.height / 2)
    let result = `0\r\nTEXT\r\n`;
    result += `8\r\n${this.layerName}\r\n`;
    result += `62\r\n${this.colorNumber}\r\n`;
    result += `39\r\n${this.thickness.toFixed(6)}\r\n`;
    result += `10\r\n${this.dPoints[0].dX.toFixed(6)}\r\n`;
    result += `20\r\n${y}\r\n`;
    result += `30\r\n${this.dPoints[0].dZ.toFixed(6)}\r\n`;
    result += `40\r\n${this.height.toFixed(6)}\r\n`;
    result += `1\r\n${this.value}\r\n`;
    result += `50\r\n${this.rotation}\r\n`;
    result += `7\r\n${this.textStyle}\r\n`;
    result += `73\r\n2\r\n`;
    result += `72\r\n1\r\n`;
    return result;
  }
}