module.exports = class Layer{
  constructor(layer){
    this.name = '';
    this.standardFlag = 0;
    this.colorNumber = 0;
    this.lineTypeName = '';
    this.trueColor = -1;

    if (layer){
      this.name = layer.name;
      this.colorNumber = layer.colorNumber;
      this.lineTypeName = layer.lineTypeName;
      this.standardFlag = layer.standardFlag;
      this.trueColor = layer.trueColor;
    }

  }

  static newLayer(layer){
    return new Layer(layer)
  }

  toDXFString(){
    let result = `0\r\nLAYER\r\n`
    result += `2\r\n${this.name}\r\n`
    result += `70\r\n0\r\n`

    if (this.trueColor !== -1){
      result += `420\r\n${this.trueColor}\r\n`
    }else{
      result += `62\r\n${this.colorNumber}\r\n`;
    }
    result += `6\r\n${this.lineTypeName}\r\n`;

    return result
  }

}