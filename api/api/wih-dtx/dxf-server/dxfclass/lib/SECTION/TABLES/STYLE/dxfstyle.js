module.exports = class Style{
  constructor(style){
    this.name = '';
    this.standardFlag = 0;
    this.fixedTextHeight = 0.0,
    this.widthFactor = 1.0,
    this.obliqueAngle = 0.0,
    this.textGeneration = 0,
    this.lastHeight = 0.0,
    this.primaryFont = 'TXT',
    this.bigFont = 'BIGFONT'

    if(style){
      this.name = style.name;
      this.standardFlag = style.standardFlag;
      this.fixedTextHeight = style.fixedTextHeight;
      this.widthFactor = style.widthFactor;
      this.obliqueAngle = style.obliqueAngle;
      this.textGeneration = style.textGeneration;
      this.lastHeight = style.lastHeight;
      this.primaryFont = style.primaryFont;
      this.bigFont = style.bigFont;
    }
  }

  static newStyle(style){
    return new Style(style)
  }

  toDXFString(){
    let result = `  0\r\nSTYLE\r\n`;
    result += `  2\r\n${this.name}\r\n`;
    result += ` 70\r\n    ${this.standardFlag}\r\n`;
    result += ` 40\r\n${this.fixedTextHeight.toFixed(1)}\r\n`;
    result += ` 41\r\n${this.widthFactor.toFixed(1)}\r\n`;
    result += ` 42\r\n${this.lastHeight.toFixed(1)}\r\n`;
    result += ` 50\r\n${this.obliqueAngle.toFixed(1)}\r\n`;
    result += ` 71\r\n     ${this.textGeneration}\r\n`;
    result += `  3\r\n${this.primaryFont}\r\n`;
    result += `  4\r\n${this.bigFont}\r\n`;
    return result
  }
}
