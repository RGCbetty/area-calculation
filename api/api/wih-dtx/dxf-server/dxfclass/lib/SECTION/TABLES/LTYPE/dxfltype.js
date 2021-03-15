module.exports = class LType{
  constructor(ltype){
    this.name = '';
    this.standardFlag = 0;
    this.description = '';
    this.alignment = 65;
    this.patterns = [];
    this.patternCount = 0;
    this.patternLength = 0;
    if (ltype){
      this.name = ltype.name;
      this.standardFlag = ltype.standardFlag;
      this.description = ltype.description;
      this.patterns = ltype.patterns;
      this.patternCount = ltype.patterns.length;
      this.patternLength = this.getElementsSum();
    }
  }

  static newLType(ltype){
    return new LType(ltype)
  }

  getElementsSum(){
    let sum = 0;
    this.patterns.forEach(pattern => {
      sum += Math.abs(pattern);  
    });
    return sum;
  }

  patternsToString(){
    let result = '';
    this.patterns.forEach( pattern => {
      result += ` 49\n${pattern}\n`
    })
    return result;
  }

  toDXFString(){
    let result = `  0\r\nLTYPE\r\n`;
    result += `  2\r\n${this.name}\r\n`;
    result += ` 70\r\n    ${this.standardFlag}\r\n`;
    result += `  3\r\n${this.description}\r\n`;
    result += ` 72\r\n    ${this.alignment}\r\n`;
    result += ` 73\r\n     ${this.patternCount}\r\n`;
    result += ` 40\r\n${this.patternLength.toFixed(1)}\r\n`;
    result += this.patternsToString();

    return result
  }
}