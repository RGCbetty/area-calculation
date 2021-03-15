const Line = require('./dxfline');

module.exports = class Lines extends Array{
  constructor(lines = []){
    super();
    this.addLines(lines);
  }

  static newLines(...lines){
    return new Lines(lines);
  }

  addLines(lines){
    lines.forEach(line => {
      this.addLine(Line.newLine(line))
    })
  }

  addLine(line){
    super.push(line);
  };

  toDXFString(){
    let result = '';
    this.forEach(line => {
      result += line.toDXFString()
    })
    return result
  }

  draw(x1, y1, x2, y2, layerName, lineTypeName, colorNumber){
    this.addLine( Line.draw(x1, y1, x2, y2, layerName, lineTypeName, colorNumber) );
  }

}